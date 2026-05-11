type MiniDay = { day: number; muted?: boolean; selected?: boolean }

function MiniCalendar() {
  const days: MiniDay[] = [
    { day: 1 },
    { day: 2 },
    { day: 3 },
    { day: 4 },
    { day: 5 },
    { day: 6 },
    { day: 7 },
    { day: 8 },
    { day: 9 },
    { day: 10 },
    { day: 11 },
    { day: 12 },
    { day: 13 },
    { day: 14 },
    { day: 15 },
    { day: 16 },
    { day: 17 },
    { day: 18 },
    { day: 19 },
    { day: 20 },
    { day: 21 },
    { day: 22, selected: true },
    { day: 23 },
    { day: 24 },
    { day: 25 },
    { day: 26 },
    { day: 27 },
    { day: 28 },
    { day: 29 },
    { day: 30 },
    { day: 31 },
  ]

  return (
    <div className="rounded-[22px] bg-white/10 p-[18px]">
      <div className="grid grid-cols-7 gap-y-[10px] text-[12px] font-medium opacity-70">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <div key={d} className="text-center">
            {d}
          </div>
        ))}
      </div>
      <div className="mt-[10px] grid grid-cols-7 gap-y-[10px] text-[14px]">
        {days.map((d, idx) => (
          <div key={idx} className="flex items-center justify-center">
            <div
              className={`flex h-[22px] min-w-[22px] items-center justify-center rounded-full px-[6px] leading-none ${
                d.selected
                  ? 'bg-[#FF8B2C] text-white'
                  : d.muted
                    ? 'opacity-40'
                    : 'opacity-85'
              }`}
            >
              {d.day}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CalendarCheckbox({ checked }: { checked?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border ${
        checked ? 'border-[#2F7DFF] bg-[#2F7DFF]' : 'border-white/35 bg-transparent'
      }`}
    >
      {checked ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 6L9 17l-5-5"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </div>
  )
}

function LeftRail() {
  return (
    <aside className="w-[370px] shrink-0 bg-[rgba(0,0,0,0.28)] p-[28px] text-white">
      <div className="text-[34px] font-extrabold tracking-[-0.03em]">March 2026</div>

      <div className="mt-[18px]">
        <MiniCalendar />
      </div>

      <div className="mt-[18px] rounded-[18px] bg-white/10 px-[18px] py-[14px] text-[18px] opacity-55">
        Meet with…
      </div>

      <div className="mt-[18px] flex flex-col gap-[14px]">
        <label className="flex items-center gap-[14px] text-[18px] opacity-90">
          <CalendarCheckbox checked />
          <span>Amy003@gmail.com</span>
        </label>
        <label className="flex items-center gap-[14px] text-[18px] opacity-90">
          <CalendarCheckbox checked />
          <span>US Public Holidays Calendar</span>
        </label>
        <div className="flex items-center gap-[14px] text-[18px] opacity-55">
          <div className="flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border border-white/25">
            +
          </div>
          <span>Add calendar account</span>
        </div>
      </div>
    </aside>
  )
}

type EventBlock = {
  col: number
  top: number
  height: number
  title: string
  time: string
  color: string
  accent?: string
}

function DayHeader({ label, active }: { label: string; active?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-[6px] text-[16px] font-medium opacity-70">
      <div>{label}</div>
      {active ? (
        <div className="rounded-[8px] bg-[#E84B3C] px-[6px] py-[2px] text-[12px] font-bold leading-none text-white">
          9
        </div>
      ) : null}
    </div>
  )
}

export default function Calendar() {
  const hours = Array.from({ length: 12 }, (_, i) => i + 9) // 9AM–8PM markers (showing 9–8)

  const events: EventBlock[] = [
    { col: 0, top: 150, height: 120, title: 'Research', time: '12:30 – 2:30 PM', color: '#CFEFF7' },
    { col: 0, top: 300, height: 110, title: 'Meeting Kevin', time: '3 – 5:15 PM', color: '#EBD8F7' },
    { col: 1, top: 260, height: 160, title: 'Design with Peter', time: '2 – 5:15 PM', color: '#CFEFF7' },
    { col: 1, top: 340, height: 80, title: '1111', time: '3:15 PM', color: '#CFEFF7', accent: '#2F7DFF' },
    {
      col: 2,
      top: 120,
      height: 200,
      title: 'Research with HCI  Group',
      time: '10:45 AM – 1:15 PM',
      color: '#E7D7FB',
      accent: '#2F7DFF',
    },
    { col: 2, top: 320, height: 120, title: 'Meeting David', time: '1:15 – 3 PM', color: '#D7F2D9' },
    { col: 2, top: 430, height: 120, title: 'interview', time: '3 – 5 PM', color: '#CFEFF7', accent: '#2F7DFF' },
    { col: 3, top: 240, height: 160, title: 'Interview (with RY)', time: '12:15 – 2 PM', color: '#CFEFF7', accent: '#2F7DFF' },
    { col: 3, top: 400, height: 130, title: 'discussion', time: '2 – 4 PM', color: '#EFE2B7', accent: '#2F7DFF' },
  ]

  return (
    <div className="relative h-[min(720px,82vh)] w-[min(1220px,94vw)]">
      <div
        enable-xr={true}
        style={{ '--xr-background-material': 'translucent' }}
        className="flex h-full overflow-hidden rounded-[56px] border border-[rgba(255,255,255,0.12)] bg-white/5 shadow-[0_26px_70px_rgba(0,0,0,0.22)] backdrop-blur-md"
      >
        <LeftRail />

        <main className="relative flex min-w-0 flex-1 bg-[rgba(255,255,255,0.92)] text-black">
          <div className="flex h-full w-full flex-col">
            <div className="flex h-[56px] items-center border-b border-black/10 px-[18px]">
              <div className="mr-[10px] text-[18px] opacity-60">+</div>
              <div className="text-[14px] font-medium opacity-60">GMT+8</div>
              <div className="flex flex-1 items-center justify-center gap-[140px]">
                <DayHeader label="Mon" active />
                <DayHeader label="Tue 10" />
                <DayHeader label="Wed 11" />
                <DayHeader label="Thu 12" />
              </div>
              <div className="ml-[10px] text-[18px] opacity-60">±</div>
            </div>

            <div className="flex min-h-0 flex-1">
              <div className="w-[72px] shrink-0 border-r border-black/10 pt-[8px] text-right text-[12px] opacity-60">
                <div className="pr-[10px]">All-day</div>
                {hours.map((h) => (
                  <div key={h} className="pr-[10px]" style={{ height: 56 }}>
                    {h === 12
                      ? '12PM'
                      : h > 12
                        ? `${h - 12}PM`
                        : `${h}AM`}
                  </div>
                ))}
              </div>

              <div className="relative min-w-0 flex-1">
                <div className="grid h-full grid-cols-4">
                  {Array.from({ length: 4 }).map((_, col) => (
                    <div key={col} className="relative border-r border-black/10">
                      <div className="absolute left-0 top-[28px] h-[1px] w-full bg-black/10" />
                      {hours.map((h) => (
                        <div key={h} className="h-[56px] border-t border-black/10" />
                      ))}
                    </div>
                  ))}
                </div>

                {events.map((e, idx) => (
                  <div
                    key={idx}
                    className="absolute rounded-[12px] px-[10px] py-[10px] text-[13px] leading-[1.15] shadow-[0_14px_40px_rgba(0,0,0,0.08)]"
                    style={{
                      left: `calc(${e.col} * 25% + 10px)`,
                      width: 'calc(25% - 20px)',
                      top: e.top,
                      height: e.height,
                      background: e.color,
                      borderLeft: `4px solid ${e.accent ?? 'transparent'}`,
                    }}
                  >
                    <div className="font-semibold opacity-90">{e.title}</div>
                    <div className="mt-[4px] opacity-60">{e.time}</div>
                  </div>
                ))}

                <div
                  className="absolute left-[0px] right-[0px] flex items-center"
                  style={{ top: 506 }}
                >
                  <div className="ml-[10px] rounded-[6px] bg-[#E84B3C] px-[6px] py-[2px] text-[11px] font-bold text-white">
                    5:14PM
                  </div>
                  <div className="ml-[10px] h-[2px] flex-1 bg-[#E84B3C]" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

