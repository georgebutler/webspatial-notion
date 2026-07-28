import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import userAvatar from './assets/images/dashboard-avatar.webp'
import alexAvatar from './assets/images/guest-alex-rivera.webp'
import mayaAvatar from './assets/images/guest-maya-chen.webp'
import samAvatar from './assets/images/guest-sam-lee.webp'

type IconProps = { size?: number; strokeWidth?: number; className?: string }

function IconClock({ size = 18, strokeWidth = 1.8, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ? `opacity-[0.85] ${className}` : 'opacity-[0.85]'}
    >
      <path
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconCalendar({ size = 18, strokeWidth = 1.8, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ? `opacity-[0.85] ${className}` : 'opacity-[0.85]'}
    >
      <path
        d="M7 3v3M17 3v3"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M4.5 8h15"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M6.5 5.5h11A2 2 0 0 1 19.5 7.5v12A2 2 0 0 1 17.5 21.5h-11A2 2 0 0 1 4.5 19.5v-12A2 2 0 0 1 6.5 5.5Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconDoc({ size = 28, strokeWidth = 1.8, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ? `opacity-[0.85] ${className}` : 'opacity-[0.85]'}
    >
      <path
        d="M7 3.5h6.5L18.5 8v12A1.5 1.5 0 0 1 17 21.5H7A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M13.5 3.5V8H18.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M8 12h8M8 15h6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  )
}

type WorkspaceItem = {
  title: string
  type: 'Document' | 'List' | 'Database'
  lastAccessed: Date
  path?: string
}

type EventGuest = {
  name: string
  avatar: string
}

type DashboardEvent = {
  title: string
  description: string
  start: number
  end: number
  startMinute: number
  endMinute: number
  guests: EventGuest[]
}

const daysAgo = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date
}

const workspaceItems: WorkspaceItem[] = [
  { title: "Newton's Cradle", type: 'Document', lastAccessed: daysAgo(0), path: '/doc/newtons-cradle' },
  { title: 'The Solar System', type: 'Document', lastAccessed: daysAgo(1), path: '/doc/the-solar-system' },
  { title: 'Q3 Product Development', type: 'Document', lastAccessed: daysAgo(2), path: '/doc/q3-product-development' },
  { title: 'Feature Specification', type: 'Document', lastAccessed: daysAgo(3), path: '/doc/feature-specification' },
  { title: 'Product Roadmap Q1', type: 'Document', lastAccessed: daysAgo(4), path: '/doc/product-roadmap-q1' },
  { title: 'User Flow & Interaction', type: 'List', lastAccessed: daysAgo(5), path: '/todo' },
  { title: 'Company Database Overview', type: 'Database', lastAccessed: daysAgo(13) },
]

const eventColors = ['bg-cyan-400', 'bg-emerald-400', 'bg-yellow-400', 'bg-fuchsia-400']
const EVENTS_PER_PAGE = 5
const upcomingEvents: DashboardEvent[] = [
  {
    title: 'Research',
    description: 'Review interaction patterns and capture notes for the next product iteration.',
    start: 14,
    end: 15,
    startMinute: 0,
    endMinute: 15,
    guests: [{ name: 'You', avatar: userAvatar }],
  },
  {
    title: 'Design review',
    description: 'Align on the updated spatial document flow and resolve open visual feedback.',
    start: 15,
    end: 16,
    startMinute: 15,
    endMinute: 0,
    guests: [
      { name: 'You', avatar: userAvatar },
      { name: 'Maya Chen', avatar: mayaAvatar },
      { name: 'Alex Rivera', avatar: alexAvatar },
    ],
  },
  {
    title: 'Prototype testing',
    description: 'Test model interactions, scrolling, and navigation in the latest spatial build.',
    start: 16,
    end: 17,
    startMinute: 0,
    endMinute: 15,
    guests: [
      { name: 'You', avatar: userAvatar },
      { name: 'Sam Lee', avatar: samAvatar },
    ],
  },
  {
    title: 'Team sync',
    description: 'Share progress, confirm priorities, and identify blockers for this week.',
    start: 14,
    end: 15,
    startMinute: 15,
    endMinute: 0,
    guests: [
      { name: 'You', avatar: userAvatar },
      { name: 'Maya Chen', avatar: mayaAvatar },
      { name: 'Sam Lee', avatar: samAvatar },
    ],
  },
  {
    title: 'Content planning',
    description: 'Outline the next set of documents and prepare examples for the demo.',
    start: 15,
    end: 16,
    startMinute: 0,
    endMinute: 15,
    guests: [
      { name: 'You', avatar: userAvatar },
      { name: 'Alex Rivera', avatar: alexAvatar },
    ],
  },
  {
    title: 'Weekly review',
    description: 'Review completed work and agree on the next round of improvements.',
    start: 16,
    end: 17,
    startMinute: 15,
    endMinute: 0,
    guests: [
      { name: 'You', avatar: userAvatar },
      { name: 'Sam Lee', avatar: samAvatar },
      { name: 'Alex Rivera', avatar: alexAvatar },
    ],
  },
]

function ItemIcon({ type }: { type: WorkspaceItem['type'] }) {
  if (type === 'List') {
    return <IconCalendar size={32} className="text-neutral-200" />
  }
  if (type === 'Database') {
    return <IconDoc size={32} className="text-neutral-200" />
  }
  return <IconDoc size={32} className="text-neutral-200" />
}

function RecentlyVisitedCard({ item }: { item: WorkspaceItem }) {
  const openItem = () => {
    if (!item.path) return
    const url = new URL(item.path, window.location.origin)
    window.open(url.toString(), '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      type="button"
      onClick={openItem}
      title={item.type === 'Database' ? 'No action' : 'Open document'}
      className="flex min-w-0 cursor-pointer flex-col rounded-2xl bg-white/10 p-4 text-left backdrop-blur transition-colors hover:bg-white/15"
    >
      <div>
        <ItemIcon type={item.type} />
      </div>
      <div className="my-3 max-w-[220px] truncate text-[15px] leading-5 font-semibold text-neutral-100">
        {item.title}
      </div>
      <div className="mt-auto flex items-center justify-between gap-4">
        <img
          src={userAvatar}
          alt=""
          className="h-6 w-6 rounded-full border-2 border-black/20 object-cover"
        />
        <div className="dashboard-updated-label whitespace-nowrap text-right text-[12px] font-medium text-neutral-400">
          Updated · {item.lastAccessed.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </div>
      </div>
    </button>
  )
}

function RecentlyVisited() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [itemsPerPage, setItemsPerPage] = useState(workspaceItems.length)
  const [activePage, setActivePage] = useState(0)
  const pages = useMemo(() => {
    const nextPages: WorkspaceItem[][] = []

    for (let index = 0; index < workspaceItems.length; index += itemsPerPage) {
      nextPages.push(workspaceItems.slice(index, index + itemsPerPage))
    }

    return nextPages
  }, [itemsPerPage])
  const currentPage = Math.min(activePage, pages.length - 1)

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const updateItemsPerPage = () => {
      const width = viewport.clientWidth
      const cardWidth = 180
      const gap = 12
      const nextItemsPerPage = Math.max(1, Math.floor((width + gap) / (cardWidth + gap)))
      setItemsPerPage(Math.min(workspaceItems.length, nextItemsPerPage))
    }

    updateItemsPerPage()
    const resizeObserver = new ResizeObserver(updateItemsPerPage)
    resizeObserver.observe(viewport)
    return () => resizeObserver.disconnect()
  }, [])

  const scrollToPage = (page: number) => {
    const viewport = viewportRef.current
    if (!viewport) return

    viewport.scrollTo({
      left: viewport.clientWidth * page,
      behavior: 'smooth',
    })
    setActivePage(page)
  }

  const handleScroll = () => {
    const viewport = viewportRef.current
    if (!viewport || viewport.clientWidth === 0) return
    setActivePage(Math.min(pages.length - 1, Math.round(viewport.scrollLeft / viewport.clientWidth)))
  }

  return (
    <section className="shrink-0">
      <div className="flex items-center gap-2 text-white/90">
        <IconClock size={20} />
        <p className="text-lg font-semibold">Recently visited</p>
      </div>
      <div className="mt-3 flex min-w-0 items-center gap-2 sm:block">
        <div
          ref={viewportRef}
          onScroll={handleScroll}
          className="min-w-0 flex-1 snap-x snap-mandatory overflow-x-auto pb-2 [scrollbar-width:none] sm:w-full"
        >
          <div className="flex">
            {pages.map((page, pageIndex) => (
              <div
                key={pageIndex}
                className="grid w-full shrink-0 snap-start items-stretch gap-3"
                style={{ gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))` }}
              >
                {page.map((item) => (
                  <RecentlyVisitedCard key={item.title} item={item} />
                ))}
              </div>
            ))}
          </div>
        </div>
        {pages.length > 1 && (
          <div className="flex shrink-0 flex-col items-center justify-center gap-2 sm:mt-1 sm:flex-row" aria-label="Recently visited pages">
            <button
              type="button"
              onClick={() => scrollToPage(currentPage - 1)}
              disabled={currentPage === 0}
              className="dashboard-pagination-arrow flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition-colors disabled:cursor-default disabled:opacity-30"
              aria-label="Show previous recently visited page"
            >
              <ChevronUp className="sm:hidden" size={16} strokeWidth={1.8} aria-hidden="true" />
              <ChevronLeft className="hidden sm:block" size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              {pages.map((_, page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => scrollToPage(page)}
                  className={`dashboard-pagination-dot h-2 w-2 cursor-pointer rounded-full transition-colors ${
                    currentPage === page ? 'is-active' : ''
                  }`}
                  aria-label={`Show recently visited page ${page + 1}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => scrollToPage(currentPage + 1)}
              disabled={currentPage === pages.length - 1}
              className="dashboard-pagination-arrow flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition-colors disabled:cursor-default disabled:opacity-30"
              aria-label="Show next recently visited page"
            >
              <ChevronDown className="sm:hidden" size={16} strokeWidth={1.8} aria-hidden="true" />
              <ChevronRight className="hidden sm:block" size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function EventGuests({ guests }: { guests: EventGuest[] }) {
  return (
    <div
      className="absolute top-4 right-4 flex -space-x-2"
      aria-label={`Guests: ${guests.map((guest) => guest.name).join(', ')}`}
    >
      {guests.map((guest) => (
        <img
          key={guest.name}
          src={guest.avatar}
          alt=""
          className="h-7 w-7 rounded-full border-2 border-black/20 object-cover"
        />
      ))}
    </div>
  )
}

function EventRow({ index, event }: { index: number; event: DashboardEvent }) {
  const formatTime = (hour: number, minute: number) => {
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${String(minute).padStart(2, '0')} ${period}`
  }

  return (
    <div className="dashboard-event-card relative flex min-w-0 flex-1 items-stretch gap-3 rounded-xl border border-white/10 px-3 py-2.5">
      <div className={`w-1 shrink-0 rounded ${eventColors[index % eventColors.length]}`} />
      <div className="min-w-0 flex-1">
        <div className="min-w-0 pr-20">
          <div className="text-[15px] font-semibold text-white/95">{event.title}</div>
          <div className="mt-0.5 text-[13px] font-medium text-neutral-400">
            {formatTime(event.start, event.startMinute)} - {formatTime(event.end, event.endMinute)}
          </div>
          <p className="mt-1 line-clamp-2 text-[12px] leading-[18px] text-white/70">
            {event.description}
          </p>
        </div>
      </div>
      <EventGuests guests={event.guests} />
    </div>
  )
}

export default function Dashboard() {
  const today = new Date()
  const eventViewportRef = useRef<HTMLDivElement>(null)
  const [activeEventPage, setActiveEventPage] = useState(0)
  const eventPageCount = Math.ceil(upcomingEvents.length / EVENTS_PER_PAGE)
  const currentEventPage = Math.min(activeEventPage, eventPageCount - 1)
  const eventPages = useMemo(() => {
    const pages: DashboardEvent[][] = []

    for (let index = 0; index < upcomingEvents.length; index += EVENTS_PER_PAGE) {
      pages.push(upcomingEvents.slice(index, index + EVENTS_PER_PAGE))
    }

    return pages
  }, [])

  const scrollToEventPage = (page: number) => {
    const viewport = eventViewportRef.current
    if (!viewport) return

    viewport.scrollTo({
      top: viewport.clientHeight * page,
      behavior: 'smooth',
    })
    setActiveEventPage(page)
  }

  const handleEventScroll = () => {
    const viewport = eventViewportRef.current
    if (!viewport || viewport.clientHeight === 0) return
    setActiveEventPage(
      Math.min(eventPageCount - 1, Math.round(viewport.scrollTop / viewport.clientHeight)),
    )
  }

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto [scrollbar-width:none] sm:overflow-hidden">
      <div className="relative flex min-h-full w-full flex-col gap-6 sm:min-h-0 sm:flex-1 sm:overflow-hidden">
        <RecentlyVisited />

        <section className="flex shrink-0 flex-col sm:min-h-0 sm:flex-1">
          <div className="flex items-center gap-2 text-white/90">
            <IconCalendar size={20} />
            <p className="text-lg font-semibold">Upcoming Events</p>
          </div>
          <div className="mt-2 flex min-h-0 w-full items-center gap-2 sm:flex-1 sm:items-stretch">
            <div
              ref={eventViewportRef}
              onScroll={handleEventScroll}
              className="min-h-0 min-w-0 flex-1 snap-y snap-mandatory overflow-y-auto rounded-2xl bg-white/10 px-4 py-3 backdrop-blur [scrollbar-width:none]"
            >
              <div className="flex h-full flex-col">
                {eventPages.map((page, pageIndex) => {
                  const eventPageStart = pageIndex * EVENTS_PER_PAGE

                  return (
                    <div key={pageIndex} className="min-h-full w-full shrink-0 snap-start space-y-2">
                      {page.map((event, index) => {
                        const eventIndex = eventPageStart + index

                        return (
                          <div key={event.title} className="flex items-start gap-4">
                            <p className={`dashboard-event-date mt-0.5 w-[132px] shrink-0 text-[13px] font-medium sm:w-[164px] ${eventIndex === 0 ? 'text-orange-400' : 'text-neutral-400'}`}>
                              {eventIndex === 0
                                ? today.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })
                                : new Date(today.getTime() + eventIndex * 86400000).toLocaleDateString(undefined, {
                                    weekday: 'long',
                                    month: 'long',
                                    day: 'numeric',
                                  })}
                            </p>
                            <EventRow index={eventIndex} event={event} />
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
            {eventPageCount > 1 && (
              <div className="flex shrink-0 flex-col items-center justify-center gap-2" aria-label="Upcoming event pages">
                <button
                  type="button"
                  onClick={() => scrollToEventPage(currentEventPage - 1)}
                  disabled={currentEventPage === 0}
                  className="dashboard-pagination-arrow flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition-colors disabled:cursor-default disabled:opacity-30"
                  aria-label="Show previous upcoming events page"
                >
                  <ChevronUp size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
                <div className="flex flex-col items-center gap-2">
                  {Array.from({ length: eventPageCount }, (_, page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => scrollToEventPage(page)}
                      className={`dashboard-pagination-dot h-2 w-2 cursor-pointer rounded-full transition-colors ${
                        currentEventPage === page ? 'is-active' : ''
                      }`}
                      aria-label={`Show upcoming events page ${page + 1}`}
                      aria-current={currentEventPage === page ? 'page' : undefined}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => scrollToEventPage(currentEventPage + 1)}
                  disabled={currentEventPage === eventPageCount - 1}
                  className="dashboard-pagination-arrow flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition-colors disabled:cursor-default disabled:opacity-30"
                  aria-label="Show next upcoming events page"
                >
                  <ChevronDown size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
