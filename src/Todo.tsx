import { useState } from 'react'

type TodoItem = { id: string; title: string; done?: boolean }

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`flex h-[34px] w-[34px] items-center justify-center rounded-[8px] border-2 transition-colors duration-200 ${
        checked ? 'border-[#2F7DFF] bg-[#2F7DFF]' : 'border-white/45 bg-transparent'
      }`}
    >
      {checked ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export default function Todo() {
  const [items, setItems] = useState<TodoItem[]>([
    { id: '1', title: 'Revise the design plan', done: false },
    { id: '2', title: 'Review the interaction effects with David', done: true },
    { id: '3', title: 'Wait for David to fix the bugs', done: false },
    { id: '4', title: 'Continue the architectural software research', done: false },
  ])

  return (
    <div className="relative h-[min(680px,78vh)] w-[min(1120px,92vw)] text-white">
      <div
        enable-xr={true}
        style={{ '--xr-background-material': 'translucent' }}
        className="flex h-full flex-col gap-[34px] overflow-hidden rounded-[56px] border border-[rgba(255,255,255,0.12)] bg-white/5 p-[54px] shadow-[0_26px_70px_rgba(0,0,0,0.22)] backdrop-blur-md"
      >
        <div className="flex flex-col gap-[16px]">
          <div className="text-[76px] font-extrabold tracking-[-0.04em]">TODO</div>
          <div className="text-[34px] font-medium tracking-[-0.02em] opacity-55">Today</div>
        </div>

        <div className="flex flex-1">
          <div className="w-full rounded-[40px] border border-white/10 bg-white/10 p-[34px] shadow-[0_26px_70px_rgba(0,0,0,0.18)] backdrop-blur-md">
            <div className="flex flex-col gap-[20px]">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setItems((prev) =>
                      prev.map((p) => (p.id === item.id ? { ...p, done: !p.done } : p)),
                    )
                  }
                  className="flex items-center gap-[20px] text-left"
                  aria-pressed={!!item.done}
                >
                  <Checkbox checked={!!item.done} />
                  <div
                    className={`text-[34px] tracking-[-0.02em] ${
                      item.done ? 'opacity-45' : 'opacity-95'
                    }`}
                  >
                    {item.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

