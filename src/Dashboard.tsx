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
  { title: "Newton's Cradle", type: 'Document', lastAccessed: daysAgo(0) },
  { title: 'The Solar System', type: 'Document', lastAccessed: daysAgo(1) },
  { title: 'Q3 Product Development', type: 'Document', lastAccessed: daysAgo(2) },
  { title: 'Feature Specification', type: 'Document', lastAccessed: daysAgo(3) },
  { title: 'Product Roadmap Q1', type: 'Document', lastAccessed: daysAgo(4) },
  { title: 'User Flow & Interaction', type: 'List', lastAccessed: daysAgo(5) },
  { title: 'Company Database Overview', type: 'Database', lastAccessed: daysAgo(13) },
]

const eventColors = ['bg-cyan-400', 'bg-emerald-400', 'bg-yellow-400', 'bg-fuchsia-400']
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
    if (item.type === 'Database') return
    const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const path = item.type === 'List' ? '/todo' : `/doc/${slug}`
    const url = new URL(path, window.location.origin)
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
      <div className="my-3 max-w-[220px] text-[15px] leading-5 font-semibold text-neutral-100">
        {item.title}
      </div>
      <div className="mt-auto flex items-center justify-between gap-4">
        <img
          src={userAvatar}
          alt=""
          className="h-6 w-6 rounded-full object-cover"
        />
        <div className="text-right text-[13px] font-medium text-neutral-400">
          {item.lastAccessed.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </div>
      </div>
    </button>
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
    <div className="relative flex min-w-0 flex-1 items-stretch gap-3 rounded-xl border border-white/10 p-4">
      <div className={`w-1 shrink-0 rounded ${eventColors[index % eventColors.length]}`} />
      <div className="min-w-0 flex-1">
        <div className="min-w-0 pr-20">
          <div className="text-[15px] font-semibold text-white/95">{event.title}</div>
          <div className="mt-1 text-[13px] font-medium text-neutral-400">
            {formatTime(event.start, event.startMinute)} - {formatTime(event.end, event.endMinute)}
          </div>
          <p className="mt-2 max-w-[480px] text-[13px] leading-5 text-white/70">
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

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="relative flex min-h-0 w-full flex-1 flex-col gap-6 overflow-hidden">
        <section className="shrink-0">
          <div className="flex items-center gap-2 text-white/90">
            <IconClock size={20} />
            <p className="text-lg font-semibold">Recently visited</p>
          </div>
          <div className="mt-3 w-full overflow-x-auto pb-2 [scrollbar-width:none]">
            <div className="grid min-w-full grid-flow-col auto-cols-[minmax(180px,1fr)] items-stretch gap-3">
              {workspaceItems.map((item) => (
                <RecentlyVisitedCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-center gap-2 text-white/90">
            <IconCalendar size={20} />
            <p className="text-lg font-semibold">Upcoming Events</p>
          </div>
          <div className="mt-3 min-h-0 w-full flex-1 overflow-y-auto rounded-2xl bg-white/10 px-4 py-6 backdrop-blur [scrollbar-width:none]">
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-start gap-4">
                  <p className={`mt-0.5 w-[132px] shrink-0 text-[13px] font-medium sm:w-[164px] ${index === 0 ? 'text-orange-400' : 'text-neutral-400'}`}>
                    {index === 0
                      ? today.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })
                      : new Date(today.getTime() + index * 86400000).toLocaleDateString(undefined, {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                        })}
                  </p>
                  <EventRow index={index} event={event} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
