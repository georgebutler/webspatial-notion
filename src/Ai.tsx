import { ArrowUp, History, Plus, Sparkles } from 'lucide-react'

export default function Ai() {
  return (
    <div
      enable-xr={true}
      style={{ '--xr-background-material': 'transparent' }}
      className="notion-ai-window flex h-full w-full flex-col items-start overflow-hidden border border-white/10 p-4 shadow sm:p-6 md:p-8 lg:p-12"
    >
      <div className="relative flex min-h-0 w-full flex-1 flex-col gap-4 lg:flex-row lg:gap-6">
        <aside
          enable-xr={true}
          style={{ '--xr-background-material': 'translucent' }}
          className="notion-ai-sidebar hidden h-full w-1/5 min-w-[240px] flex-col rounded-2xl bg-white/5 px-5 py-6 lg:flex"
        >
          <div className="flex items-center gap-2 text-white/90">
            <Sparkles size={20} strokeWidth={1.8} aria-hidden="true" />
            <h1 className="text-lg font-semibold">Notion AI</h1>
          </div>
          <div className="mt-6 min-h-0 flex-1 overflow-y-auto [scrollbar-width:none]">
            <div className="flex items-center gap-2 px-3 text-white/60">
              <History size={16} strokeWidth={1.8} aria-hidden="true" />
              <h2 className="text-sm font-medium">Recents</h2>
            </div>
            <ul className="mt-2 space-y-1">
              {['Roadmap brainstorming', 'Project sync notes', 'Bug triage 04/10', 'Marketing copy ideas', 'Sprint 12 planning', 'User feedback summary'].map((chat) => (
                <li key={chat}>
                  <button type="button" title={chat} className="w-full cursor-pointer truncate rounded-md px-3 py-1.5 text-left text-[15px] text-white/90 transition-colors hover:bg-white/10">
                    {chat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="flex h-full min-h-0 w-full min-w-0 flex-1 flex-col rounded-2xl">
          <div
            enable-xr={true}
            style={{ '--xr-background-material': 'translucent' }}
            className="notion-ai-chat flex min-h-0 w-full min-w-0 flex-1 flex-col rounded-2xl px-4 pt-4 pb-3 sm:px-5 sm:pt-5 sm:pb-4 md:px-6 md:pt-6 md:pb-4"
          >
            <div className="mt-2 min-h-0 flex-1 overflow-y-auto [scrollbar-width:none]">
              <div className="w-full space-y-3">
                <div className="flex max-w-[90%] items-end gap-3 md:max-w-[75%]">
                  <img
                    src="/icons/app-icon.svg"
                    alt=""
                    className="h-8 w-8 shrink-0 rounded-full border-2 border-black/20 bg-white object-contain p-1"
                  />
                  <div className="notion-ai-greeting relative rounded-xl bg-white/10 px-4 py-3 text-white">
                    <p className="text-[16px] leading-7">Hi! I&apos;m here to help. What would you like to work on today?</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full items-center gap-2">
              <button
                type="button"
                aria-label="Add attachment"
                title="Add attachment"
                className="notion-ai-attachment-button flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white/70 ring-1 ring-white/10 transition-colors hover:bg-white/15 hover:text-white"
              >
                <Plus size={20} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <input
                type="text"
                placeholder="Ask, search, or make anything..."
                className="notion-ai-input h-12 min-w-0 flex-1 rounded-xl bg-white/10 px-3 text-white/90 ring-1 ring-white/10 outline-none placeholder:text-white/60"
              />
              <button
                type="button"
                aria-label="Submit prompt"
                title="Submit prompt"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-neutral-900 ring-1 ring-white/10 transition-colors hover:bg-white/85"
              >
                <ArrowUp size={20} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
