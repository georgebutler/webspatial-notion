import { spawn } from 'node:child_process'
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import net from 'node:net'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUTPUT = path.join(ROOT, 'docs/images/webspatial-notion-dashboard.webp')
const VIEWPORT = { width: 1600, height: 1035 }
const SCREENSHOT_NOW = '2026-08-10T12:00:00-07:00'
const DEFAULT_SERVER_PORT = 4173
const DEFAULT_DEBUG_PORT = 9222
const CHROME_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
]

let serverProcess
let chromeProcess
let chromeSocket
let temporaryDirectory
let shuttingDown = false

function commandExists(command) {
  return new Promise((resolve) => {
    const child = spawn('which', [command], { stdio: 'ignore' })
    child.once('exit', (code) => resolve(code === 0))
    child.once('error', () => resolve(false))
  })
}

async function resolveChrome() {
  if (process.env.CHROME_PATH) {
    await access(process.env.CHROME_PATH)
    return process.env.CHROME_PATH
  }

  for (const candidate of CHROME_CANDIDATES) {
    try {
      await access(candidate)
      return candidate
    } catch {
      // Continue through known application locations.
    }
  }

  for (const command of ['google-chrome', 'chromium', 'chromium-browser']) {
    if (await commandExists(command)) {
      return command
    }
  }

  throw new Error('Chrome was not found. Set CHROME_PATH and try again.')
}

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: ROOT,
      env: process.env,
      stdio: 'inherit',
    })

    child.once('error', reject)
    child.once('exit', (code, signal) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(
        new Error(
          `${command} ${args.join(' ')} failed with ${
            signal ? `signal ${signal}` : `exit code ${code}`
          }.`,
        ),
      )
    })
  })
}

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer()
    server.unref()
    server.once('error', () => resolve(false))
    server.listen(port, '127.0.0.1', () => {
      server.close(() => resolve(true))
    })
  })
}

async function findAvailablePort(startPort) {
  for (let port = startPort; port < startPort + 100; port += 1) {
    if (await isPortAvailable(port)) {
      return port
    }
  }

  throw new Error(`No available port found from ${startPort}.`)
}

async function waitForHttp(url, timeout = 60_000) {
  const started = Date.now()

  while (Date.now() - started < timeout) {
    try {
      const response = await fetch(url)
      if (response.ok) return
    } catch {
      // Wait for the preview server.
    }

    await new Promise((resolve) => setTimeout(resolve, 200))
  }

  throw new Error(`Timed out waiting for Vite preview at ${url}.`)
}

async function waitForChrome(debugPort, timeout = 30_000) {
  const started = Date.now()

  while (Date.now() - started < timeout) {
    try {
      const response = await fetch(`http://127.0.0.1:${debugPort}/json/list`)
      if (response.ok) {
        const targets = await response.json()
        const target = targets.find((candidate) => candidate.type === 'page')
        if (target?.webSocketDebuggerUrl) return target
      }
    } catch {
      // Wait for Chrome DevTools.
    }

    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  throw new Error('Timed out waiting for Chrome DevTools.')
}

async function createCdpClient(webSocketDebuggerUrl) {
  const socket = new WebSocket(webSocketDebuggerUrl)
  const pending = new Map()
  let nextId = 0

  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true })
    socket.addEventListener('error', reject, { once: true })
  })

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data)
    const handler = pending.get(message.id)
    if (!handler) return

    pending.delete(message.id)
    if (message.error) {
      handler.reject(new Error(message.error.message))
    } else {
      handler.resolve(message.result)
    }
  })

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++nextId
      pending.set(id, { resolve, reject })
      socket.send(JSON.stringify({ id, method, params }))
    })

  const evaluate = async (expression) => {
    const response = await send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true,
    })

    if (response.exceptionDetails) {
      throw new Error(
        response.exceptionDetails.exception?.description
          ?? response.exceptionDetails.text,
      )
    }

    return response.result.value
  }

  const waitFor = async (expression, label, timeout = 60_000) => {
    const started = Date.now()

    while (Date.now() - started < timeout) {
      if (await evaluate(`Boolean(${expression})`)) return
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    throw new Error(`Timed out waiting for ${label}.`)
  }

  return { evaluate, send, socket, waitFor }
}

function stopProcess(child) {
  if (!child || child.exitCode !== null) return Promise.resolve()

  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      try {
        process.kill(-child.pid, 'SIGKILL')
      } catch {
        // The process has already exited.
      }
    }, 3_000)

    child.once('exit', () => {
      clearTimeout(timeout)
      resolve()
    })

    try {
      process.kill(-child.pid, 'SIGTERM')
    } catch {
      clearTimeout(timeout)
      resolve()
    }
  })
}

async function cleanup() {
  if (shuttingDown) return
  shuttingDown = true

  try {
    chromeSocket?.close()
  } catch {
    // Continue cleanup.
  }

  await Promise.all([
    stopProcess(chromeProcess),
    stopProcess(serverProcess),
  ])

  if (temporaryDirectory) {
    await rm(temporaryDirectory, {
      force: true,
      maxRetries: 5,
      recursive: true,
      retryDelay: 200,
    })
  }
}

async function readWebpDimensions(filePath) {
  const buffer = await readFile(filePath)

  if (
    buffer.toString('ascii', 0, 4) !== 'RIFF'
    || buffer.toString('ascii', 8, 12) !== 'WEBP'
  ) {
    throw new Error(`${filePath} is not a WebP file.`)
  }

  let offset = 12
  while (offset + 8 <= buffer.length) {
    const type = buffer.toString('ascii', offset, offset + 4)
    const size = buffer.readUInt32LE(offset + 4)
    const dataOffset = offset + 8

    if (type === 'VP8 ') {
      return {
        width: buffer.readUInt16LE(dataOffset + 6) & 0x3fff,
        height: buffer.readUInt16LE(dataOffset + 8) & 0x3fff,
      }
    }

    if (type === 'VP8L') {
      const bits = buffer.readUInt32LE(dataOffset + 1)
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >> 14) & 0x3fff) + 1,
      }
    }

    if (type === 'VP8X') {
      return {
        width: buffer.readUIntLE(dataOffset + 4, 3) + 1,
        height: buffer.readUIntLE(dataOffset + 7, 3) + 1,
      }
    }

    offset = dataOffset + size + (size % 2)
  }

  throw new Error(`Unable to read WebP dimensions from ${filePath}.`)
}

async function main() {
  const chrome = await resolveChrome()
  const serverPort = await findAvailablePort(DEFAULT_SERVER_PORT)
  const debugPort = await findAvailablePort(DEFAULT_DEBUG_PORT)
  temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'webspatial-notion-readme-'))

  await runCommand('npm', ['run', 'build'])

  serverProcess = spawn(
    'npm',
    ['exec', '--', 'vite', 'preview', '--host', '127.0.0.1', '--port', String(serverPort)],
    {
      cwd: ROOT,
      detached: true,
      env: process.env,
      stdio: 'inherit',
    },
  )

  const baseUrl = `http://127.0.0.1:${serverPort}`
  await waitForHttp(baseUrl)

  const profilePath = path.join(temporaryDirectory, 'chrome-profile')
  await mkdir(profilePath, { recursive: true })

  chromeProcess = spawn(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      `--window-size=${VIEWPORT.width},${VIEWPORT.height}`,
      `--remote-debugging-port=${debugPort}`,
      `--user-data-dir=${profilePath}`,
      'about:blank',
    ],
    {
      detached: true,
      stdio: 'ignore',
    },
  )

  const target = await waitForChrome(debugPort)
  const client = await createCdpClient(target.webSocketDebuggerUrl)
  chromeSocket = client.socket
  await client.send('Page.enable')
  await client.send('Runtime.enable')
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: VIEWPORT.width,
    height: VIEWPORT.height,
    deviceScaleFactor: 1,
    mobile: false,
    screenWidth: VIEWPORT.width,
    screenHeight: VIEWPORT.height,
  })
  await client.send('Emulation.setTimezoneOverride', {
    timezoneId: 'America/Los_Angeles',
  })
  await client.send('Page.addScriptToEvaluateOnNewDocument', {
    source: `(() => {
      const NativeDate = Date
      const fixedTime = NativeDate.parse(${JSON.stringify(SCREENSHOT_NOW)})

      class FixedDate extends NativeDate {
        constructor(...args) {
          super(...(args.length === 0 ? [fixedTime] : args))
        }

        static now() {
          return fixedTime
        }
      }

      window.Date = FixedDate
    })()`,
  })

  await client.send('Page.navigate', { url: baseUrl })
  await client.waitFor("document.readyState === 'complete'", 'Dashboard document load')
  await client.waitFor(
    "document.documentElement.classList.contains('is-web')",
    'ordinary browser mode',
  )
  await client.waitFor(
    `Array.from(document.querySelectorAll('p')).some(
      (node) => node.textContent.trim() === 'Recently visited'
    )`,
    'Recently visited heading',
  )
  await client.waitFor(
    `Array.from(document.querySelectorAll('p')).some(
      (node) => node.textContent.trim() === 'Upcoming Events'
    )`,
    'Upcoming Events heading',
  )
  await client.waitFor(
    "document.querySelector('.recently-visited-title')?.textContent.trim() === 'Chinese Art Collection'",
    'fixed Recently visited content',
  )
  await client.waitFor(
    `Array.from(document.images)
      .filter((image) => {
        const rect = image.getBoundingClientRect()
        return rect.right > 0 && rect.left < innerWidth
          && rect.bottom > 0 && rect.top < innerHeight
      })
      .every((image) => image.complete && image.naturalWidth > 0)`,
    'visible Dashboard images',
  )

  const inspection = await client.evaluate(`(async () => {
    await document.fonts.ready
    scrollTo(0, 0)
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve))
    )

    const dashboard = document.querySelector('.notion-dashboard-main')
      ?.getBoundingClientRect()

    return {
      dashboardVisible: Boolean(
        dashboard
        && dashboard.width > 0
        && dashboard.height > 0
        && dashboard.top < innerHeight
        && dashboard.bottom > 0
      ),
      hasHorizontalOverflow:
        document.documentElement.scrollWidth > document.documentElement.clientWidth,
      viewport: { width: innerWidth, height: innerHeight },
    }
  })()`)

  if (
    inspection.viewport.width !== VIEWPORT.width
    || inspection.viewport.height !== VIEWPORT.height
  ) {
    throw new Error('Dashboard capture viewport does not match 1600×1035.')
  }
  if (!inspection.dashboardVisible) {
    throw new Error('The Dashboard panel is not visible in the capture viewport.')
  }
  if (inspection.hasHorizontalOverflow) {
    throw new Error('The Dashboard has unexpected horizontal overflow.')
  }

  await new Promise((resolve) => setTimeout(resolve, 300))
  const screenshot = await client.send('Page.captureScreenshot', {
    captureBeyondViewport: false,
    format: 'webp',
    fromSurface: true,
    quality: 88,
  })

  await mkdir(path.dirname(OUTPUT), { recursive: true })
  await writeFile(OUTPUT, Buffer.from(screenshot.data, 'base64'))

  const dimensions = await readWebpDimensions(OUTPUT)
  if (
    dimensions.width !== VIEWPORT.width
    || dimensions.height !== VIEWPORT.height
  ) {
    throw new Error(
      `${path.basename(OUTPUT)} is ${dimensions.width}×${dimensions.height}; expected 1600×1035.`,
    )
  }

  try {
    await client.send('Browser.close')
  } catch {
    // Process cleanup remains the fallback.
  }

  console.log(`Captured ${path.relative(ROOT, OUTPUT)} at 1600×1035.`)
}

try {
  await main()
} finally {
  await cleanup()
}
