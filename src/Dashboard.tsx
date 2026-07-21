import userAvatar from './assets/user.png'

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

const daysAgo = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date
}

const workspaceItems: WorkspaceItem[] = [
  { title: 'Q3 Product Development', type: 'Document', lastAccessed: daysAgo(0) },
  { title: 'Feature Specification', type: 'Document', lastAccessed: daysAgo(1) },
  { title: 'Product Roadmap Q1', type: 'Document', lastAccessed: daysAgo(2) },
  { title: 'User Flow & Interaction', type: 'List', lastAccessed: daysAgo(3) },
  { title: 'Company Database Overview', type: 'Database', lastAccessed: daysAgo(12) },
]

const eventColors = ['bg-cyan-400', 'bg-emerald-400', 'bg-yellow-400', 'bg-fuchsia-400']

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
    const path = item.type === 'List' ? '/todo' : '/doc'
    const url = new URL(path, window.location.origin)
    url.searchParams.set('title', item.title)
    window.open(url.toString(), '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      type="button"
      onClick={openItem}
      title={item.type === 'Database' ? 'No action' : 'Open document'}
      className="flex shrink-0 cursor-pointer flex-col rounded-2xl bg-white/10 p-4 text-left backdrop-blur transition-colors hover:bg-white/15"
    >
      <div className="ml-1">
        <ItemIcon type={item.type} />
      </div>
      <div className="my-4 ml-1 w-[140px] leading-5 font-semibold text-neutral-100">
        {item.title}
      </div>
      <div className="mt-auto flex items-center justify-between pr-1 pl-1">
        <img
          src={userAvatar}
          alt=""
          className="h-6 w-6 rounded-full object-cover"
        />
        <div className="w-[106px] text-right text-[17px] font-semibold text-neutral-400">
          {item.lastAccessed.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </div>
      </div>
    </button>
  )
}

function EventRow({ index, title, start, end }: { index: number; title: string; start: number; end: number }) {
  const formatTime = (hour: number, minute: number) => {
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${String(minute).padStart(2, '0')} ${period}`
  }

  return (
    <div className="flex items-start gap-4">
      <div className={`h-16 w-[5px] rounded ${eventColors[index % eventColors.length]}`} />
      <div className="flex flex-col">
        <div className="text-[17px] font-semibold text-white/95">{title}</div>
        <div className="mt-3 text-[17px] font-semibold text-neutral-400">
          {formatTime(start, index % 2 ? 15 : 0)} - {formatTime(end, index % 2 ? 0 : 15)}
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const today = new Date()

  return (
    <div className="flex h-full w-full flex-col items-center overflow-hidden">
      <div className="relative mt-2 flex min-h-0 w-full flex-1 flex-col gap-6 overflow-hidden sm:mt-6 sm:gap-8">
        <section className="shrink-0">
          <div className="flex items-center gap-2 text-neutral-300">
            <IconClock size={20} />
            <p className="text-[17px]">Recently visited</p>
          </div>
          <div className="mt-4 w-full overflow-x-auto pb-2 [scrollbar-width:none]">
            <div className="flex w-max items-stretch gap-3">
              {workspaceItems.map((item) => (
                <RecentlyVisitedCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-center gap-2 text-neutral-300">
            <IconCalendar size={20} />
            <p className="text-[17px]">Upcoming Events</p>
          </div>
          <div className="mt-4 min-h-0 w-full flex-1 overflow-y-auto rounded-2xl bg-white/10 px-4 pt-5 pb-4 backdrop-blur sm:px-5 sm:pt-6 [scrollbar-width:none]">
            <div className="space-y-5">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="flex items-start gap-4 sm:gap-6">
                  <p className={`mt-1 w-[140px] shrink-0 text-[15px] font-semibold sm:w-[183px] sm:text-[17px] ${index === 0 ? 'text-orange-400' : 'text-neutral-400'}`}>
                    {index === 0
                      ? today.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })
                      : new Date(today.getTime() + index * 86400000).toLocaleDateString(undefined, {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                        })}
                  </p>
                  <EventRow index={index} title={index % 2 === 0 ? 'Research' : 'Meeting'} start={14 + (index % 3)} end={15 + (index % 3)} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
