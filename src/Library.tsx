import type { ReactNode } from 'react'

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
    <div className="relative h-[min(680px,78vh)] w-[min(1120px,92vw)] text-[rgba(245,245,245,0.96)]">
      <div
        enable-xr={true}
        style={{ '--xr-background-material': 'translucent' }}
        className="flex h-full overflow-hidden rounded-[32px] border border-[rgba(255,255,255,0.12)] bg-white/5 shadow-[0_26px_70px_rgba(0,0,0,0.22)] backdrop-blur-md"
      >
        <div className="flex h-full w-full overflow-hidden">
          <aside className="w-[360px] shrink-0 bg-[rgba(0,0,0,0.28)] p-[28px]">
            <div className="text-[34px] font-extrabold tracking-[-0.03em] text-white/95">
              Amy's Notion
            </div>

            <div className="mt-[22px] flex flex-col gap-[22px]">
              <NavSection title="Recents" count={2}>
                <NavItem title="Q3 Product Development …" active />
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
            <div className="h-full w-full overflow-auto p-[34px]">
              <div className="text-[34px] font-extrabold tracking-[-0.03em]">
                Q3 Product Development Review
              </div>

              <div className="mt-[18px] space-y-[12px] text-[18px] leading-[1.45] opacity-95">
                <div>
                  <span className="font-bold">Date:</span> [Placeholder Date]
                </div>
                <div>
                  <span className="font-bold">Time:</span> 10:00 AM – 11:30 AM
                </div>
                <div>
                  <span className="font-bold">Location:</span> Virtual Conference (Zoom)
                </div>
                <div>
                  <span className="font-bold">Attendees:</span> Emma Carter (Product Manager), Liam Davis
                  (Engineering Lead), Olivia Foster (Design Lead), Noah Gray (QA Specialist), Sophia Hughes
                  (Marketing Representative)
                </div>
                <div>
                  <span className="font-bold">Absentees:</span> None
                </div>
                <div>
                  <span className="font-bold">Recorder:</span> Liam Davis
                </div>

                <div className="pt-[6px]">
                  <div className="font-bold">1. Call to Order & Agenda Review</div>
                  <div className="mt-[6px]">
                    The meeting was called to order by Emma Carter at 10:03 AM. The agenda was reviewed and
                    unanimously approved. Key discussion points included Q2 project retrospective, Q3
                    development roadmap, resource allocation, and cross-team collaboration updates.
                  </div>
                </div>

                <div className="pt-[6px]">
                  <div className="font-bold">2. Q2 Project Retrospective</div>
                  <ul className="mt-[6px] list-disc space-y-[6px] pl-[22px]">
                    <li>
                      <span className="font-bold">Achievements:</span> The team successfully launched the v2.3 app
                      update, meeting 95% of the planned milestones.
                    </li>
                    <li>
                      <span className="font-bold">Challenges:</span> Delays in the payment gateway integration were
                      attributed to third-party API issues.
                    </li>
                    <li>
                      <span className="font-bold">Action Items:</span>
                      <ul className="mt-[6px] list-disc space-y-[6px] pl-[22px]">
                        <li>
                          Olivia to draft a detailed design handoff checklist by next Friday (due [Date]) to
                          streamline cross-team collaboration.
                        </li>
                        <li>
                          Noah to schedule a training session on third-party API troubleshooting for the
                          engineering team within two weeks.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
