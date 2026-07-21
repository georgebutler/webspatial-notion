export default function Ai() {
  return (
    <div
      enable-xr={true}
      style={{ '--xr-background-material': 'regular' }}
      className="flex h-full w-full flex-col items-start overflow-hidden border border-white/10 p-4 shadow sm:p-6 md:p-8 lg:p-12"
    >
      <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">Notion AI</h1>
      <p className="mt-2 hidden text-neutral-300 lg:block">Ask me anything!</p>

      <div className="relative mt-4 flex min-h-0 w-full flex-1 flex-col gap-4 md:mt-6 lg:flex-row lg:gap-6">
        <aside className="hidden h-full w-1/5 min-w-[240px] flex-col rounded-2xl bg-white/5 px-5 py-6 lg:flex">
          <h2 className="text-lg font-semibold text-white/90">Recent Chats</h2>
          <ul className="mt-4 min-h-0 flex-1 space-y-2 overflow-y-auto [scrollbar-width:none]">
            {['Roadmap brainstorming', 'Project sync notes', 'Bug triage 04/10', 'Marketing copy ideas', 'Sprint 12 planning', 'User feedback summary'].map((chat) => (
              <li key={chat}>
                <button type="button" title={chat} className="w-full truncate rounded-lg px-3 py-2 text-left text-[15px] text-white/90 transition-colors hover:bg-white/10">
                  {chat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex h-full min-h-0 w-full min-w-0 flex-1 flex-col rounded-2xl">
          <p className="text-sm text-neutral-300 sm:text-base md:text-[17px] lg:hidden">Ask me anything!</p>
          <div className="mt-4 flex min-h-0 w-full min-w-0 flex-1 flex-col rounded-2xl px-4 pt-4 pb-3 sm:px-5 sm:pt-5 sm:pb-4 md:mt-6 md:px-6 md:pt-6 md:pb-4">
            <div className="mt-2 min-h-0 flex-1 overflow-y-auto [scrollbar-width:none]">
              <div className="w-full space-y-3">
                <div className="max-w-[85%] rounded-xl bg-white/10 px-4 py-3 text-white md:max-w-[70%]">
                  <p className="text-sm sm:text-base">Hi! I&apos;m here to help. What would you like to work on today?</p>
                </div>
              </div>
            </div>
            <textarea
              rows={3}
              placeholder="Ask, search, or make anything..."
              className="w-full resize-none rounded-xl bg-white/10 px-3 py-3 leading-6 text-white/90 ring-1 ring-white/10 outline-none placeholder:text-white/60 sm:leading-7"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
