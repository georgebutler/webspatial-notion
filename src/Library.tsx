import type { ReactNode } from 'react'
import { Model } from '@webspatial/react-sdk'

type IconProps = { size?: number; strokeWidth?: number; className?: string }

function IconDoc({ size = 20, strokeWidth = 1.8, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ? `opacity-[0.9] ${className}` : 'opacity-[0.9]'}
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

function IconCube({ size = 18, strokeWidth = 1.8, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ? `opacity-[0.9] ${className}` : 'opacity-[0.9]'}
    >
      <path
        d="M12 3.5 20 8v8l-8 4.5L4 16V8l8-4.5Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M12 12.5 20 8M12 12.5 4 8M12 12.5v8"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconGrip({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ? `opacity-[0.5] ${className}` : 'opacity-[0.5]'}
    >
      <circle cx="6" cy="5" r="1.3" fill="currentColor" />
      <circle cx="12" cy="5" r="1.3" fill="currentColor" />
      <circle cx="6" cy="9" r="1.3" fill="currentColor" />
      <circle cx="12" cy="9" r="1.3" fill="currentColor" />
      <circle cx="6" cy="13" r="1.3" fill="currentColor" />
      <circle cx="12" cy="13" r="1.3" fill="currentColor" />
    </svg>
  )
}

function IconExpand({ size = 22, strokeWidth = 1.8, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ? `opacity-[0.75] ${className}` : 'opacity-[0.75]'}
    >
      <path
        d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function NavSection({
  title,
  count,
  children,
}: {
  title: string
  count: number
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex items-center justify-between px-[6px] text-[16px] opacity-50">
        <div>{title}</div>
        <div>{count}</div>
      </div>
      <div className="flex flex-col gap-[6px]">{children}</div>
    </div>
  )
}

function NavItem({
  title,
  active,
}: {
  title: string
  active?: boolean
}) {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-[14px] rounded-[16px] px-[16px] py-[12px] text-left transition-[background-color] duration-200 ${
        active ? 'bg-white/15' : 'hover:bg-white/10'
      }`}
      aria-current={active ? 'page' : undefined}
    >
      <IconDoc className="text-white/85" />
      <div className="min-w-0 flex-1 truncate text-[18px] tracking-[-0.01em] text-white/90">
        {title}
      </div>
    </button>
  )
}

export default function Library() {
  return (
    <div className="relative h-[min(760px,86vh)] w-[min(1180px,94vw)]">
      <div
        enable-xr={true}
        style={{ '--xr-background-material': 'translucent' }}
        className="flex h-full overflow-hidden rounded-[36px] border border-[rgba(255,255,255,0.12)] bg-white/5 shadow-[0_26px_70px_rgba(0,0,0,0.22)] backdrop-blur-md"
      >
        <div className="flex h-full w-full overflow-hidden">
          <aside className="w-[360px] shrink-0 bg-[rgba(0,0,0,0.34)] p-[28px]">
            <div className="text-[34px] font-extrabold tracking-[-0.03em] text-white/95">
              Amy's Notion
            </div>

            <div className="mt-[22px] flex flex-col gap-[22px]">
              <NavSection title="Recents" count={2}>
                <NavItem title="Solar System Overview" active />
                <NavItem title="Feature Specification v2.1" />
              </NavSection>

              <NavSection title="Private" count={3}>
                <NavItem title="User Flow & Interaction …" />
                <NavItem title="UI/UX Design Specification" />
                <NavItem title="Product Roadmap Q1 2026" />
              </NavSection>
            </div>
          </aside>

          <main className="flex min-w-0 flex-1 bg-[rgba(255,255,255,0.92)] text-black">
            <div className="h-full w-full overflow-auto px-[40px] py-[30px]">
              <div className="text-[38px] font-extrabold leading-none tracking-[-0.03em]">
                The Solar System
              </div>

              <div className="mt-[22px] flex flex-col gap-[12px] text-[21px] leading-[1.32] opacity-95">
                <section className="relative rounded-[12px] border border-black/10 bg-white/70 px-[22px] py-[16px] shadow-[0_8px_28px_rgba(0,0,0,0.05)]">
                  <IconGrip className="absolute right-[14px] top-[12px] text-black" />
                  <p className="max-w-[760px]">
                    The solar system consists of the Sun and everything that orbits it—eight planets, dwarf
                    planets, moons, asteroids, comets, and interplanetary dust.
                  </p>
                </section>

                <section className="relative overflow-hidden rounded-[14px] border border-black/10 bg-[#15171d] shadow-[0_10px_34px_rgba(0,0,0,0.12)]">
                  <div className="pointer-events-none absolute z-10 m-[16px] flex items-center gap-[8px] rounded-full bg-black/35 px-[10px] py-[6px] text-[13px] font-semibold text-white/88 backdrop-blur-md">
                    <IconCube size={16} />
                    <span>3D Model</span>
                  </div>
                  <button
                    type="button"
                    className="absolute right-[12px] top-[12px] z-10 flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-black/35 text-white backdrop-blur-md transition-colors duration-200 hover:bg-black/50"
                    aria-label="Expand 3D model"
                  >
                    <IconExpand size={21} />
                  </button>
                  <Model
                    enable-xr={true}
                    src="/usdz/Planets.usdz"
                    className="flex aspect-[16/8.7] w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_42%,rgba(255,170,76,0.36),transparent_24%),linear-gradient(135deg,#232734_0%,#101219_55%,#07080c_100%)] text-white"
                    style={{ '--xr-depth': '260px' }}
                    aria-label="Interactive 3D model of the solar system"
                  >
                    <div className="flex h-full w-full items-center justify-center px-[28px] text-center text-[18px] font-medium text-white/70">
                      Interactive solar system model
                    </div>
                  </Model>
                </section>

                <section className="relative rounded-[12px] border border-black/10 bg-white/70 px-[22px] py-[16px] shadow-[0_8px_28px_rgba(0,0,0,0.05)]">
                  <IconGrip className="absolute right-[14px] top-[12px] text-black" />
                  <p className="max-w-[760px]">
                    The inner planets—Mercury, Venus, Earth, and Mars—are rocky and closer to the Sun. The
                    outer planets—Jupiter, Saturn, Uranus, and Neptune—are gas or ice giants. Use the model
                    above to explore the solar system in 3D. Rotate, zoom, and inspect each planet in detail.
                  </p>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
