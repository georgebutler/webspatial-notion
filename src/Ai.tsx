export default function Ai() {
  return (
    <div className="relative h-[min(680px,78vh)] w-[min(1120px,92vw)] text-white">
      <div
        enable-xr={true}
        style={{ '--xr-background-material': 'translucent' }}
        className="flex h-full flex-col gap-[34px] overflow-hidden rounded-[56px] border border-[rgba(255,255,255,0.12)] bg-white/5 p-[54px] shadow-[0_26px_70px_rgba(0,0,0,0.22)] backdrop-blur-md"
      >
        <div className="flex flex-col gap-[16px]">
          <div className="text-[76px] font-extrabold tracking-[-0.04em]">Notion AI</div>
          <div className="text-[34px] font-medium tracking-[-0.02em] opacity-90">
            Here are a few things I can do, or ask me anything!
          </div>
        </div>

        <div className="flex flex-1">
          <div className="w-full rounded-[40px] border border-white/10 bg-white/10 p-[34px] shadow-[0_26px_70px_rgba(0,0,0,0.18)] backdrop-blur-md">
            <textarea
              rows={6}
              placeholder="Ask, search, or make anything..."
              className="h-full w-full resize-none bg-transparent text-[38px] font-semibold leading-[1.15] tracking-[-0.02em] text-white/90 outline-none placeholder:text-white/40"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

