import { useEffect, useRef, useState, type PropsWithChildren, type RefObject } from 'react'
import { ArrowLeft, Box, FileText, GripVertical } from 'lucide-react'
import { Model3D } from './Model3D.tsx'
import type { ModelRef } from '@webspatial/react-sdk'

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

const DOCUMENT_LAST_MODIFIED = new Date('2026-07-22T22:34:26Z').getTime()
const VEHICLE_MODEL_SRC = '/usdz/vehicle-speedster.usdz'

function formatElapsedTime(milliseconds: number) {
  const minutes = Math.max(0, Math.floor(milliseconds / 60_000))
  if (minutes < 1) return 'just now'
  if (minutes === 1) return '1 minute ago'
  if (minutes < 60) return `${minutes} minutes ago`

  const hours = Math.floor(minutes / 60)
  if (hours === 1) return '1 hour ago'
  if (hours < 24) return `${hours} hours ago`

  const days = Math.floor(hours / 24)
  if (days === 1) return '1 day ago'
  return `${days} days ago`
}

function DocumentLastModified() {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 60_000)
    return () => window.clearInterval(interval)
  }, [])

  return <p className="mt-8 text-[13px] text-neutral-500">Last modified {formatElapsedTime(now - DOCUMENT_LAST_MODIFIED)}</p>
}

const PLANET_ROTATION_DEGREES_PER_SECOND = 30

function useModelSelfRotation(modelRef: RefObject<ModelRef | null>) {
  useEffect(() => {
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

    const startAnimation = () => {
      if (mounted) animationFrame = requestAnimationFrame(animate)
    }

    void modelRef.current?.ready?.then(startAnimation)

    return () => {
      mounted = false
      if (animationFrame !== undefined) cancelAnimationFrame(animationFrame)
    }
  }, [modelRef])
}

function PlanetModelSlot({
  src = VEHICLE_MODEL_SRC,
  className = '',
}: {
  src?: string
  className?: string
}) {
  const modelRef = useRef<ModelRef>(null)
  useModelSelfRotation(modelRef)

  return (
    <div className={`notion-planet-model ${className}`}>
      <Model3D
        modelRef={modelRef}
        enable-xr={true}
        src={src}
        className="webspatial-model"
      />
      <div className="notion-model-label" aria-hidden="true">
        <Box size={16} strokeWidth={1.8} />
        <span>3D Model</span>
      </div>
    </div>
  )
}

function SolarSystemCollection() {
  return (
    <div className="notion-model-card mt-4">
      <PlanetModelSlot src={VEHICLE_MODEL_SRC} />
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

const documentSections = [
  { title: 'Recently edited', items: documents.slice(0, 2) },
  { title: 'Private', items: documents.slice(2) },
]

function PlanetDetail({ planet, onBack }: { planet: (typeof planets)[number]; onBack: () => void }) {
  return (
    <>
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
      >
        <ArrowLeft size={16} strokeWidth={1.8} />
        Back to Solar System
      </button>
      <h1 className="text-3xl font-bold">{planet.name}</h1>
      <div className="notion-planet-detail mt-6">
        <article className="notion-planet-detail-copy">
          <h2 className="sr-only">Planet details</h2>
          <NotionTextBlock>
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="mt-3 text-[16px] leading-7">{planet.description}</p>
          </NotionTextBlock>
          <NotionTextBlock className="mt-6">
            <h2 className="text-xl font-semibold">Notes</h2>
            <p className="mt-3 text-[16px] leading-7">{planet.note}</p>
          </NotionTextBlock>
        </article>
        <PlanetModelSlot className="notion-planet-detail-model" />
      </div>
    </>
  )
}

function SolarSystemDocument() {
  const [selectedPlanet, setSelectedPlanet] = useState<(typeof planets)[number] | null>(null)

  if (selectedPlanet) {
    return <PlanetDetail planet={selectedPlanet} onBack={() => setSelectedPlanet(null)} />
  }

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
      <div className="notion-planet-grid mt-4">
        {planets.map((planet) => (
          <article
            className="notion-model-card notion-planet-card"
            key={planet.name}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedPlanet(planet)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                setSelectedPlanet(planet)
              }
            }}
            aria-label={`Open ${planet.name} details`}
          >
            <PlanetModelSlot />
            <div className="notion-model-card-copy">
              <h3 className="text-lg font-semibold">{planet.name}</h3>
              <p className="mt-2 line-clamp-3 text-[15px] leading-6">{planet.description}</p>
            </div>
          </article>
        ))}
      </div>
      <DocumentLastModified />
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
      <DocumentLastModified />
    </>
  )
}

export default function DocumentWorkspace() {
  const getSelectedIndex = () => {
    const url = new URL(window.location.href)
    const slug = url.pathname.startsWith('/doc/') ? url.pathname.slice('/doc/'.length) : ''

    if (slug) return documents.findIndex((document) => document.slug === slug)
    return 0
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
      className="flex h-full w-full flex-col gap-6 overflow-hidden p-4 shadow sm:p-6 md:p-8 lg:flex-row lg:p-12"
    >
      <aside
        enable-xr={true}
        style={{ '--xr-background-material': 'translucent' }}
        className="notion-sidebar hidden h-full min-h-0 w-1/5 min-w-[240px] flex-col rounded-2xl bg-white/5 px-5 py-6 lg:flex"
      >
        <div className="flex items-center gap-2 text-white/90">
          <FileText size={20} strokeWidth={1.8} aria-hidden="true" />
          <h2 className="text-lg font-semibold">Documents</h2>
        </div>
        <div className="mt-6 min-h-0 flex-1 overflow-y-auto [scrollbar-width:none]">
          <div className="space-y-6">
            {documentSections.map((section) => (
              <section key={section.title}>
                <div className="flex items-center justify-between px-3 text-sm font-medium text-white/60">
                  <span>{section.title}</span>
                  <span>{section.items.length}</span>
                </div>
                <ul className="mt-2 space-y-2">
                  {section.items.map((document) => {
                    const index = documents.indexOf(document)

                    return (
                      <li key={document.title}>
                        <button
                          type="button"
                          onClick={() => selectDocument(index)}
                          title={document.title}
                          className={`flex w-full items-center gap-2 truncate rounded-lg px-3 py-2 text-left text-[15px] transition-colors ${
                            selectedIndex === index
                              ? 'bg-white/10 text-white'
                              : 'text-white/90 hover:bg-white/10'
                          }`}
                        >
                          <FileText className="shrink-0" size={18} strokeWidth={1.8} aria-hidden="true" />
                          <span className="truncate">{document.title}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </aside>

      <div
        enable-xr={true}
        style={{ '--xr-background-material': 'regular' }}
        className={`notion-document-content h-full min-h-0 flex-1 overflow-auto rounded-2xl px-6 py-8 ${selectedDocument ? 'bg-white text-neutral-900' : 'bg-white/10 text-neutral-200'}`}
      >
        <div className="w-full">
          {selectedDocument ? <DocumentBody title={selectedDocument.title} /> : <h1 className="text-lg font-semibold text-white/90">Click a document on the left to get started</h1>}
        </div>
      </div>
    </div>
  )
}
