import { useState } from 'react'

type DocumentItem = {
  title: string
}

const documents: DocumentItem[] = [
  { title: 'The Solar System' },
  { title: 'Q3 Product Development' },
  { title: 'Feature Specification' },
  { title: 'Product Roadmap Q1' },
]

function SolarSystemDocument() {
  return (
    <>
      <h1 className="text-3xl font-bold">The Solar System</h1>
      <p className="mt-4 text-[16px] leading-7">
        The solar system is our cosmic neighborhood, centered on the Sun and made up of planets, moons,
        dwarf planets, asteroids, comets, and dust held together by gravity.
      </p>
      <figure className="mt-8 overflow-hidden rounded-2xl border border-black/10 bg-[#15171d]">
        <img
          src="/solar-system-placeholder.svg"
          alt="Placeholder illustration of the solar system and its planetary orbits"
          className="block aspect-[16/9] w-full object-cover"
        />
      </figure>
      <p className="mt-8 text-[16px] leading-7">
        The eight planets orbit the Sun in order: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and
        Neptune. Mercury is the smallest and closest to the Sun; Venus is a hot, cloud-covered rocky world;
        Earth is the only known planet with life; Mars is a cold, iron-rich planet; Jupiter is the largest
        planet; Saturn is known for its bright rings; Uranus is an ice giant that rotates on its side; and
        Neptune is a distant, windy ice giant. Together, these worlds show the remarkable variety of planets
        in our solar system.
      </p>
    </>
  )
}

function DocumentBody({ title }: { title: string }) {
  if (title === 'The Solar System') return <SolarSystemDocument />

  return (
    <>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-4 text-[16px] leading-7">
        This document captures the current state of work, decisions, and action items. It is intended to be
        a living document that reflects ongoing progress and aligns the team.
      </p>
      <h2 className="mt-8 text-2xl font-semibold">Goals</h2>
      <p className="mt-3 text-[16px] leading-7">
        - Deliver a delightful user experience across core workflows.
        <br />
        - Ensure performance and reliability under production traffic.
        <br />
        - Maintain a flexible architecture to support rapid iteration.
      </p>
      <h2 className="mt-8 text-2xl font-semibold">Notes</h2>
      <p className="mt-3 text-[16px] leading-7">
        The navigation has been simplified to reduce cognitive load. We are exploring a component-driven
        approach to keep features modular and testable. Upcoming work includes refining the document editing
        experience and improving collaboration tools.
      </p>
      <h2 className="mt-8 text-2xl font-semibold">Tasks</h2>
      <p className="mt-3 text-[16px] leading-7">
        1. Finalize document layout and typography.
        <br />
        2. Add autosave and version history.
        <br />
        3. Integrate comments and mentions.
      </p>
      <p className="mt-8 text-[14px] text-neutral-600">Last updated: Today — Draft</p>
    </>
  )
}

export default function DocumentWorkspace() {
  const selectedTitle = new URLSearchParams(window.location.search).get('title')
  const initialIndex = selectedTitle ? documents.findIndex((document) => document.title === selectedTitle) : -1
  const [selectedIndex, setSelectedIndex] = useState(initialIndex)
  const selectedDocument = selectedIndex >= 0 ? documents[selectedIndex] : null

  return (
    <div
      enable-xr={true}
      style={{ '--xr-background-material': 'regular' }}
      className="flex h-full w-full flex-col gap-6 overflow-hidden border border-white/10 p-4 shadow sm:p-6 md:p-8 lg:flex-row lg:p-12"
    >
      <aside className="hidden h-full min-h-0 w-1/5 min-w-[240px] flex-col rounded-2xl bg-white/5 px-5 py-6 lg:flex">
        <h2 className="text-lg font-semibold text-white/90">Documents</h2>
        <div className="mt-4 min-h-0 flex-1 overflow-y-auto [scrollbar-width:none]">
          <ul className="space-y-2">
          {documents.map((document, index) => (
            <li key={document.title}>
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
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
        <div className="mx-auto max-w-[900px]">
          {documents[0] ? <DocumentBody title={documents[0].title} /> : <h1 className="text-2xl font-semibold">Select a document to get started</h1>}
        </div>
      </div>

      <div className={`hidden h-full flex-1 overflow-auto rounded-2xl px-6 py-8 lg:block ${selectedDocument ? 'bg-white text-neutral-900' : 'bg-white/10 text-neutral-200'}`}>
        <div className="mx-auto max-w-[900px]">
          {selectedDocument ? <DocumentBody title={selectedDocument.title} /> : <h1 className="text-lg font-semibold text-white/90">Click a document on the left to get started</h1>}
        </div>
      </div>
    </div>
  )
}
