type IconProps = { size?: number; strokeWidth?: number; className?: string }

function IconHome({ size = 22, strokeWidth = 1.8, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ? `opacity-90 ${className}` : 'opacity-90'}
    >
      <path
        d="M4 10.2L12 4l8 6.2V20a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 20v-9.8Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M9.5 21.5v-7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v7"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconLibrary({ size = 22, strokeWidth = 1.8, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ? `opacity-90 ${className}` : 'opacity-90'}
    >
      <path
        d="M6.5 5.5h9.5a2 2 0 0 1 2 2v12.5a1.5 1.5 0 0 1-1.5 1.5H6.5a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M8 9h8M8 12h8M8 15h6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  )
}

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

function Sidebar() {
  const itemClassName =
    'grid h-[38px] w-[38px] place-items-center rounded-full border border-[rgba(255,255,255,0.16)] shadow-[0_12px_30px_rgba(0,0,0,0.18)]'

  const plainItemClassName = 'grid h-[38px] w-[38px] place-items-center rounded-full opacity-80'

  return (
    <div
      enable-xr={true}
      style={{ '--xr-background-material': 'translucent' }}
      className="absolute left-[-46px] top-[130px] flex h-[372px] w-[72px] flex-col items-center gap-[18px] rounded-[44px] border border-[rgba(255,255,255,0.14)] bg-white/5 p-[10px] shadow-[0_20px_50px_rgba(0,0,0,0.28)] backdrop-blur-md"
      aria-label="Sidebar"
    >
      <div className={itemClassName} aria-label="Home">
        <IconHome />
      </div>
      <div className={plainItemClassName} aria-label="Library">
        <IconLibrary className="opacity-75" />
      </div>
      <div className={plainItemClassName} aria-label="Activity">
        <svg
          width={22}
          height={22}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-75"
        >
          <path
            d="M7 17l4-4 3 3 5-7"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.5 19.5h13"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className={plainItemClassName} aria-label="Tasks">
        <svg
          width={22}
          height={22}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-75"
        >
          <path
            d="M7 12l3 3 7-8"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.5 6.5h13"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="flex-1" />
      <div
        className="grid h-[30px] w-[30px] place-items-center rounded-[10px] border border-[rgba(255,255,255,0.16)] opacity-75"
        aria-label="Dock"
      >
        <svg
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 3.5h8.5L18.5 6.5v14A1.5 1.5 0 0 1 17 22H7A1.5 1.5 0 0 1 5.5 20.5V5A1.5 1.5 0 0 1 7 3.5Z"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinejoin="round"
          />
          <path
            d="M15.5 3.5V6.5h3"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}

function RecentlyVisitedCard({ title }: { title: string }) {
  return (
    <div
      className="flex h-[172px] min-w-[150px] flex-1 flex-col justify-between rounded-[24px] border border-[rgba(255,255,255,0.12)] p-[18px] shadow-[0_20px_50px_rgba(0,0,0,0.18)]"
    >
      <div className="flex flex-col gap-[10px]">
        <IconDoc />
        <div
          className="max-w-[160px] text-[18px] font-[650] leading-[1.12] tracking-[-0.02em]"
        >
          {title}
        </div>
      </div>

      <div className="flex items-center gap-[10px] opacity-90">
        <div
          className="h-[22px] w-[22px] rounded-full border border-[rgba(255,255,255,0.18)]"
          aria-hidden="true"
        />
        <div className="text-[16px] opacity-90">Feb 2</div>
      </div>
    </div>
  )
}

function EventRow({ color, title, time }: { color: string; title: string; time: string }) {
  return (
    <div
      className="flex items-start gap-[18px] border-l-[4px] pl-[18px]"
      style={{ borderLeftColor: color }}
    >
      <div className="flex flex-col gap-[6px]">
        <div className="text-[18px] font-[650] tracking-[-0.01em]">{title}</div>
        <div className="text-[16px] opacity-[0.78]">{time}</div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div
      className="relative h-[min(680px,78vh)] w-[min(1120px,92vw)] text-[rgba(245,245,245,0.96)]"
    >
      <Sidebar />

      <div
        enable-xr={true}
        style={{ '--xr-background-material': 'translucent' }}
        className="flex h-full flex-col gap-[26px] rounded-[32px] border border-[rgba(255,255,255,0.12)] bg-white/5 p-[46px] shadow-[0_26px_70px_rgba(0,0,0,0.22)] backdrop-blur-md"
      >
        <div
          className="mt-1 text-center text-[64px] font-extrabold tracking-[-0.03em]"
        >
          Good afternoon
        </div>

        <div className="flex flex-col gap-[14px]">
          <div className="flex items-center gap-[10px] opacity-[0.85]">
            <IconClock />
            <div className="text-[18px] tracking-[-0.01em]">Recently visited</div>
          </div>

          <div className="flex gap-[18px]">
            <RecentlyVisitedCard title={'Q3 Product\nDevelopment …'} />
            <RecentlyVisitedCard title={'Feature\nSpecification …'} />
            <RecentlyVisitedCard title={'User Flow &\nInteraction …'} />
            <RecentlyVisitedCard title={'Product\nRoadmap Q1 …'} />
            <RecentlyVisitedCard title={'UI/UX Design\nSpecification'} />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-[14px]">
          <div className="flex items-center gap-[10px] opacity-[0.85]">
            <IconCalendar />
            <div className="text-[18px] tracking-[-0.01em]">Upcoming Event</div>
          </div>

          <div
            className="flex min-h-[250px] flex-1 gap-[24px] rounded-[26px] border border-[rgba(255,255,255,0.12)] p-[26px] shadow-[0_26px_70px_rgba(0,0,0,0.22)]"
          >
            <div
              className="flex w-[190px] flex-col gap-[28px] pt-[8px]"
            >
              <div className="text-[18px] font-bold text-[rgba(255,175,83,0.95)]">
                Today March 9
              </div>
              <div className="text-[18px] font-[650] opacity-70">Tuesday March 10</div>
            </div>

            <div className="flex flex-col gap-[22px] pt-[8px]">
              <EventRow color="#21C0FF" title="Research" time="2:15 – 3:15 PM" />
              <EventRow color="#43D36E" title="Meeting Kevin" time="4:00 – 6:00 PM" />
              <EventRow color="#FFD334" title="Research" time="2:15 – 3:15 PM" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
