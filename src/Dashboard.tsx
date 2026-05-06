import type { CSSProperties } from 'react'

type IconProps = { size?: number; strokeWidth?: number; opacity?: number }

function IconHome({ size = 22, strokeWidth = 1.8, opacity = 0.9 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
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

function IconLibrary({ size = 22, strokeWidth = 1.8, opacity = 0.9 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
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

function IconClock({ size = 18, strokeWidth = 1.8, opacity = 0.85 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
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

function IconCalendar({ size = 18, strokeWidth = 1.8, opacity = 0.85 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
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

function IconDoc({ size = 28, strokeWidth = 1.8, opacity = 0.85 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
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
  const itemStyle: CSSProperties = {
    width: 38,
    height: 38,
    borderRadius: 999,
    display: 'grid',
    placeItems: 'center',
    border: '1px solid rgba(255,255,255,0.16)',
    boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
  }

  const plainItemStyle: CSSProperties = {
    width: 38,
    height: 38,
    borderRadius: 999,
    display: 'grid',
    placeItems: 'center',
    opacity: 0.8,
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: -46,
        top: 130,
        width: 72,
        height: 372,
        borderRadius: 44,
        border: '1px solid rgba(255,255,255,0.14)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.28)',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 18,
      }}
      aria-label="Sidebar"
    >
      <div style={itemStyle} aria-label="Home">
        <IconHome />
      </div>
      <div style={plainItemStyle} aria-label="Library">
        <IconLibrary opacity={0.75} />
      </div>
      <div style={plainItemStyle} aria-label="Activity">
        <svg
          width={22}
          height={22}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.75 }}
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
      <div style={plainItemStyle} aria-label="Tasks">
        <svg
          width={22}
          height={22}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.75 }}
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
      <div style={{ flex: 1 }} />
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.16)',
          opacity: 0.75,
          display: 'grid',
          placeItems: 'center',
        }}
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
      style={{
        flex: 1,
        minWidth: 150,
        height: 172,
        borderRadius: 24,
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
        padding: 18,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <IconDoc />
        <div
          style={{
            fontSize: 18,
            fontWeight: 650,
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
            maxWidth: 160,
          }}
        >
          {title}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: 0.9 }}>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.18)',
          }}
          aria-hidden="true"
        />
        <div style={{ fontSize: 16, opacity: 0.9 }}>Feb 2</div>
      </div>
    </div>
  )
}

function EventRow({ color, title, time }: { color: string; title: string; time: string }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 18,
        alignItems: 'flex-start',
        paddingLeft: 18,
        borderLeft: `4px solid ${color}`,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ fontSize: 18, fontWeight: 650, letterSpacing: '-0.01em' }}>{title}</div>
        <div style={{ fontSize: 16, opacity: 0.78 }}>{time}</div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div
      style={{
        position: 'relative',
        width: 'min(1120px, 92vw)',
        height: 'min(680px, 78vh)',
        padding: 46,
        boxSizing: 'border-box',
        color: 'rgba(245,245,245,0.96)',
      }}
    >
      <Sidebar />

      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 26,
        }}
      >
        <div
          style={{
            textAlign: 'center',
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginTop: 4,
          }}
        >
          Mock Notion
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: 0.85 }}>
            <IconClock />
            <div style={{ fontSize: 18, letterSpacing: '-0.01em' }}>Recently visited</div>
          </div>

          <div style={{ display: 'flex', gap: 18 }}>
            <RecentlyVisitedCard title={'Q3 Product\nDevelopment …'} />
            <RecentlyVisitedCard title={'Feature\nSpecification …'} />
            <RecentlyVisitedCard title={'User Flow &\nInteraction …'} />
            <RecentlyVisitedCard title={'Product\nRoadmap Q1 …'} />
            <RecentlyVisitedCard title={'UI/UX Design\nSpecification'} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: 0.85 }}>
            <IconCalendar />
            <div style={{ fontSize: 18, letterSpacing: '-0.01em' }}>Upcoming Event</div>
          </div>

          <div
            style={{
              flex: 1,
              borderRadius: 26,
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 26px 70px rgba(0,0,0,0.22)',
              padding: 26,
              display: 'flex',
              gap: 24,
              minHeight: 250,
            }}
          >
            <div
              style={{
                width: 190,
                paddingTop: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 28,
              }}
            >
              <div style={{ color: 'rgba(255,175,83,0.95)', fontSize: 18, fontWeight: 700 }}>
                Today March 9
              </div>
              <div style={{ fontSize: 18, fontWeight: 650, opacity: 0.7 }}>Tuesday March 10</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, paddingTop: 8 }}>
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
