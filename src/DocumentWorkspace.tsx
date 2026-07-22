import { useEffect, useRef, useState, type ComponentProps, type PropsWithChildren } from 'react'
import { Model, type ModelRef } from '@webspatial/react-sdk'
import { Box, FileText, GripVertical } from 'lucide-react'

type DocumentItem = {
  title: string
  slug: string
}

const planets = [
  {
    name: 'Sun',
    description:
      'The star at the center of our solar system and the source of nearly all the energy that makes life on Earth possible. The Sun is a nearly perfect sphere of hot plasma, made mostly of hydrogen and helium.',
    note:
      'The Sun contains about 99.8% of the solar system’s total mass. Its gravity keeps the planets, dwarf planets, asteroids, comets, and other debris in orbit, while its light takes about eight minutes to reach Earth.',
  },
  {
    name: 'Mercury',
    description:
      'The smallest planet and the closest to the Sun. Mercury has a heavily cratered, rocky surface that looks a little like the Moon, but its days and nights are far more extreme because it has almost no atmosphere to hold heat.',
    note:
      'A year lasts only 88 Earth days, while one sunrise-to-sunrise day lasts 176 Earth days. Despite being closest to the Sun, Mercury is not the hottest planet.',
  },
  {
    name: 'Venus',
    description:
      'A hot, cloud-covered rocky planet wrapped in a thick carbon dioxide atmosphere. Its clouds contain sulfuric acid, and the intense pressure at the surface is roughly 90 times that of Earth.',
    note:
      'Venus rotates backward compared with most planets, so the Sun would rise in the west and set in the east. Its runaway greenhouse effect makes it the hottest planet in the solar system.',
  },
  {
    name: 'Earth',
    description:
      'Our home planet, with abundant liquid surface water and the only known life in the solar system. Earth’s atmosphere, magnetic field, and active geology work together to make the surface unusually stable and habitable.',
    note:
      'The oceans cover most of the planet, and the Moon helps steady Earth’s rotation and creates the tides. Earth is the densest and largest of the four rocky planets.',
  },
  {
    name: 'Mars',
    description:
      'A cold, rocky world known for its iron-rich red surface. Mars has polar ice caps, enormous volcanoes, deep valleys, dusty plains, and two small moons named Phobos and Deimos.',
    note:
      'Evidence shows that ancient Mars once had flowing water on its surface. Its atmosphere is thin today, but the planet remains one of the best places to look for clues about past environments beyond Earth.',
  },
  {
    name: 'Jupiter',
    description:
      'The largest planet and a gas giant made mostly of hydrogen and helium. Its striped cloud bands are driven by powerful jet streams, and the Great Red Spot is a storm that has lasted for centuries.',
    note:
      'Jupiter has a faint ring system and dozens of moons, including volcanic Io, icy Europa, and Ganymede—the largest moon in the solar system. Its enormous gravity also shapes the paths of many smaller bodies.',
  },
  {
    name: 'Saturn',
    description:
      'A gas giant surrounded by a bright, extensive ring system made mostly of water ice and rock. Saturn is the second-largest planet, but its average density is low enough that it would float in a large enough ocean.',
    note:
      'The rings are broad but surprisingly thin, divided into many bands and gaps by Saturn’s moons. Titan, Saturn’s largest moon, has a thick atmosphere and lakes made of liquid methane.',
  },
  {
    name: 'Uranus',
    description:
      'A pale blue ice giant that rotates on its side, likely after a massive collision early in its history. Uranus has faint rings and an atmosphere containing methane, which gives it its blue-green color.',
    note:
      'Because of its extreme tilt, each pole can face the Sun for about 42 Earth years at a time. Uranus is also one of the coldest planetary atmospheres in the solar system.',
  },
  {
    name: 'Neptune',
    description:
      'The most distant planet from the Sun. Neptune is a cold, windy ice giant with a deep blue atmosphere, faint rings, and some of the fastest winds measured anywhere in the solar system.',
    note:
      'Neptune was the first planet discovered through mathematical prediction rather than direct observation. Its large moon Triton orbits backward and may be a captured object from the distant Kuiper Belt.',
  },
]

const PLANET_ROTATION_DEGREES_PER_SECOND = 3
function useModelSelfRotation(modelRef: React.RefObject<ModelRef | null>, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    let mounted = true
    let animationFrame: number | undefined
    let previousTime: number | undefined

    const animate = (time: number) => {
      if (!mounted) return

      const model = modelRef.current
      const deltaSeconds = previousTime === undefined ? 0 : Math.min((time - previousTime) / 1000, 0.1)
      previousTime = time

      if (model && deltaSeconds > 0) {
        model.entityTransform = DOMMatrix.fromMatrix(model.entityTransform).rotateSelf(
          0,
          PLANET_ROTATION_DEGREES_PER_SECOND * deltaSeconds,
          0,
        )
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      mounted = false
      if (animationFrame !== undefined) cancelAnimationFrame(animationFrame)
    }
  }, [enabled, modelRef])
}

function PlanetModelSlot({ planetName }: { planetName: string }) {
  const modelRef = useRef<ModelRef>(null)
  useModelSelfRotation(modelRef, true)

  const modelProps = {
    'enable-xr': true,
    poster: '/solar-system-placeholder.svg',
    src: `/usdz/${planetName}.usdz`,
    className: 'block h-full w-full object-cover',
  } as ComponentProps<typeof Model> & { poster: string }

  return (
    <div className="notion-planet-model">
      <div className="notion-model-label" aria-hidden="true">
        <Box size={16} strokeWidth={1.8} />
        <span>3D Model</span>
      </div>
      <Model
        ref={modelRef}
        {...modelProps}
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          aspectRatio: '1',
          backgroundColor: 'transparent',
        }}
      >
        <source src={`/usdz/${planetName}.usdz`} type="model/vnd.usdz+zip" />
        <img
          alt={planetName}
          src="/solar-system-placeholder.svg"
          className="model-fallback block h-full w-full object-cover"
        />
      </Model>
    </div>
  )
}

function SolarSystemCollection() {
  const modelRef = useRef<ModelRef>(null)
  const modelProps = {
    'enable-xr': true,
    autoPlay: true,
    loop: true,
    poster: '/solar-system-placeholder.svg',
    src: '/glb/Planets.glb',
    className: 'solar-system-collection-model block h-full w-full',
  } as ComponentProps<typeof Model> & { poster: string }

  return (
    <div className="notion-model-surface solar-system-collection relative mt-8">
      <div className="notion-model-label" aria-hidden="true">
        <Box size={16} strokeWidth={1.8} />
        <span>3D Model</span>
      </div>
      <Model
        ref={modelRef}
        {...modelProps}
        onLoad={() => {
          void modelRef.current?.play()
        }}
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          backgroundColor: 'transparent',
        }}
      >
        <source src="/glb/Planets.glb" type="model/gltf-binary" />
        <img
          alt="Loading Solar System models"
          src="/solar-system-placeholder.svg"
          className="model-fallback block h-full w-full object-contain"
        />
      </Model>
    </div>
  )
}

function NotionTextBlock({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`notion-text-block ${className}`}>
      <GripVertical className="notion-text-block-handle" size={16} strokeWidth={2} aria-hidden="true" />
      {children}
    </div>
  )
}

const documents: DocumentItem[] = [
  { title: 'The Solar System', slug: 'the-solar-system' },
  { title: 'Q3 Product Development', slug: 'q3-product-development' },
  { title: 'Feature Specification', slug: 'feature-specification' },
  { title: 'Product Roadmap Q1', slug: 'product-roadmap-q1' },
]

function SolarSystemDocument() {
  return (
    <>
      <h1 className="text-3xl font-bold">The Solar System</h1>
      <NotionTextBlock className="mt-4 text-[16px] leading-7">
        The solar system is our cosmic neighborhood, centered on the Sun and made up of planets, moons,
        dwarf planets, asteroids, comets, and dust held together by gravity.
      </NotionTextBlock>
      <SolarSystemCollection />
      <NotionTextBlock className="mt-4 text-[16px] leading-7">
        The eight planets orbit the Sun in order: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and
        Neptune. Mercury is the smallest and closest to the Sun; Venus is a hot, cloud-covered rocky world;
        Earth is the only known planet with life; Mars is a cold, iron-rich planet; Jupiter is the largest
        planet; Saturn is known for its bright rings; Uranus is an ice giant that rotates on its side; and
        Neptune is a distant, windy ice giant. Together, these worlds show the remarkable variety of planets
        in our solar system.
      </NotionTextBlock>
      <h2 className="mt-8 text-2xl font-semibold">Our Solar System</h2>
      <div className="mt-4 space-y-6">
        {planets.map((planet) => (
          <section className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)]" key={planet.name}>
            <NotionTextBlock className="flex flex-col justify-center">
              <h3 className="text-lg font-semibold">{planet.name}</h3>
              <p className="mt-2 text-[16px] leading-7">{planet.description}</p>
              <p className="mt-3 border-t border-black/10 pt-3 text-[15px] leading-6 text-neutral-600">
                <span className="font-semibold text-neutral-900">Notes:</span> {planet.note}
              </p>
            </NotionTextBlock>
            <div>
              <PlanetModelSlot planetName={planet.name} />
            </div>
          </section>
        ))}
      </div>
    </>
  )
}

function DocumentBody({ title }: { title: string }) {
  if (title === 'The Solar System') return <SolarSystemDocument />

  return (
    <>
      <h1 className="text-3xl font-bold">{title}</h1>
      <NotionTextBlock className="mt-4 text-[16px] leading-7">
        This document captures the current state of work, decisions, and action items. It is intended to be
        a living document that reflects ongoing progress and aligns the team.
      </NotionTextBlock>
      <h2 className="mt-8 text-2xl font-semibold">Goals</h2>
      <NotionTextBlock className="mt-3 text-[16px] leading-7">
        - Deliver a delightful user experience across core workflows.
        <br />
        - Ensure performance and reliability under production traffic.
        <br />
        - Maintain a flexible architecture to support rapid iteration.
      </NotionTextBlock>
      <h2 className="mt-8 text-2xl font-semibold">Notes</h2>
      <NotionTextBlock className="mt-3 text-[16px] leading-7">
        The navigation has been simplified to reduce cognitive load. We are exploring a component-driven
        approach to keep features modular and testable. Upcoming work includes refining the document editing
        experience and improving collaboration tools.
      </NotionTextBlock>
      <h2 className="mt-8 text-2xl font-semibold">Tasks</h2>
      <NotionTextBlock className="mt-3 text-[16px] leading-7">
        1. Finalize document layout and typography.
        <br />
        2. Add autosave and version history.
        <br />
        3. Integrate comments and mentions.
      </NotionTextBlock>
      <NotionTextBlock className="mt-8 text-[14px] text-neutral-600">Last updated: Today — Draft</NotionTextBlock>
    </>
  )
}

export default function DocumentWorkspace() {
  const getSelectedIndex = () => {
    const url = new URL(window.location.href)
    const slug = url.pathname.startsWith('/doc/') ? url.pathname.slice('/doc/'.length) : ''

    if (slug) return documents.findIndex((document) => document.slug === slug)
    return -1
  }

  const [selectedIndex, setSelectedIndex] = useState(getSelectedIndex)
  const selectedDocument = selectedIndex >= 0 ? documents[selectedIndex] : null

  useEffect(() => {
    const handlePopState = () => setSelectedIndex(getSelectedIndex())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const selectDocument = (index: number) => {
    const document = documents[index]
    const url = new URL(window.location.href)
    url.pathname = `/doc/${document.slug}`
    url.search = ''
    window.history.pushState({}, '', url)
    setSelectedIndex(index)
  }

  return (
    <div
      enable-xr={true}
      style={{ '--xr-background-material': 'regular' }}
      className="flex h-full w-full flex-col gap-6 overflow-hidden border border-white/10 p-4 shadow sm:p-6 md:p-8 lg:flex-row lg:p-12"
    >
      <aside className="hidden h-full min-h-0 w-1/5 min-w-[240px] flex-col rounded-2xl bg-white/5 px-5 py-6 lg:flex">
        <div className="flex items-center gap-2 text-white/90">
          <FileText size={20} strokeWidth={1.8} aria-hidden="true" />
          <h2 className="text-lg font-semibold">Documents</h2>
        </div>
        <div className="mt-4 min-h-0 flex-1 overflow-y-auto [scrollbar-width:none]">
          <ul className="space-y-2">
          {documents.map((document, index) => (
            <li key={document.title}>
              <button
                type="button"
                onClick={() => selectDocument(index)}
                title={document.title}
                className={`w-full truncate rounded-lg px-3 py-2 text-left text-[15px] transition-colors ${
                  selectedIndex === index ? 'bg-white/10 text-white' : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {document.title}
              </button>
            </li>
          ))}
          </ul>
        </div>
      </aside>

      <div className={`h-full flex-1 overflow-auto rounded-2xl px-6 py-8 lg:hidden ${documents[0] ? 'bg-white text-neutral-900' : 'bg-white/10 text-neutral-200'}`}>
        <div className="w-full">
          {documents[0] ? <DocumentBody title={documents[0].title} /> : <h1 className="text-2xl font-semibold">Select a document to get started</h1>}
        </div>
      </div>

      <div className={`hidden h-full flex-1 overflow-auto rounded-2xl px-6 py-8 lg:block ${selectedDocument ? 'bg-white text-neutral-900' : 'bg-white/10 text-neutral-200'}`}>
        <div className="w-full">
          {selectedDocument ? <DocumentBody title={selectedDocument.title} /> : <h1 className="text-lg font-semibold text-white/90">Click a document on the left to get started</h1>}
        </div>
      </div>
    </div>
  )
}
