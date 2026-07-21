export default function Calendar() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days = Array.from({ length: firstDay + daysInMonth }, (_, index) =>
    index < firstDay ? null : index - firstDay + 1,
  )
  const eventDays = new Map([
    [2, 'Research'],
    [7, 'Meeting'],
    [13, 'Research'],
    [18, 'Meeting'],
    [24, 'Research'],
  ])
  return (
    <div
      enable-xr={true}
      style={{ '--xr-background-material': 'regular' }}
      className="h-full w-full overflow-auto border border-white/10 p-4 font-bold text-white shadow sm:p-6 md:p-8"
    >
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl">{now.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</h1>
        <div className="text-sm font-normal text-neutral-300">Calendar</div>
      </div>
      <div className="grid grid-cols-7 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day} className="border-b border-white/10 px-2 py-3 text-center text-xs text-neutral-300 sm:text-sm">
            {day}
          </div>
        ))}
        {Array.from({ length: Math.ceil(days.length / 7) * 7 }, (_, index) => {
          const day = days[index] ?? null
          const event = day ? eventDays.get(day) : undefined
          return (
            <div key={index} className="min-h-[90px] border-b border-r border-white/10 p-2 text-sm last:border-r-0 sm:min-h-[120px]">
              {day ? (
                <>
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full ${day === now.getDate() ? 'bg-cyan-400 text-black' : 'text-neutral-200'}`}>
                    {day}
                  </div>
                  {event ? <div className="mt-3 rounded-lg bg-white/10 px-2 py-1 text-xs font-normal text-neutral-200">{event}</div> : null}
                </>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

