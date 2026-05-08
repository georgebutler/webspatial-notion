import iconHome from './assets/sidebar-icons/home.svg'
import iconLibrary from './assets/sidebar-icons/library.svg'
import iconAi from './assets/sidebar-icons/ai.svg'
import iconTodo from './assets/sidebar-icons/todo.svg'
import iconCalendar from './assets/sidebar-icons/calendar.svg'

export type Route = 'dashboard' | 'library'

export default function Sidebar({
  onNavigate,
}: {
  onNavigate?: (route: Route) => void
}) {
  const items: Array<{ label: string; iconSrc: string; route?: Route }> = [
    { label: 'Home', iconSrc: iconHome, route: 'dashboard' },
    { label: 'Library', iconSrc: iconLibrary, route: 'library' },
    { label: 'Notion AI', iconSrc: iconAi },
    { label: 'Todo list', iconSrc: iconTodo },
    { label: 'Notion Calendar', iconSrc: iconCalendar },
  ]

  const itemClassName =
    'group/item relative flex h-[86px] w-full items-center gap-0 rounded-full bg-white/10 px-0 text-white/70 transition-[background-color,color,box-shadow] duration-200 group-hover:gap-[18px] group-hover:px-[22px]'

  return (
    <div
      enable-xr={true}
      style={{ '--xr-background-material': 'translucent' }}
      className="group absolute right-[calc(100%+24px)] top-[130px] flex h-[372px] w-[72px] flex-col gap-[14px] overflow-hidden rounded-[44px] border border-[rgba(255,255,255,0.14)] bg-white/5 p-[12px] shadow-[0_20px_50px_rgba(0,0,0,0.28)] backdrop-blur-md transition-[width] duration-300 ease-out hover:w-[360px]"
      aria-label="Sidebar"
    >
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={() => {
            if (!item.route) return

            if (item.route === 'library') {
              const url = new URL(window.location.href)
              url.searchParams.set('route', 'library')

              const currentX = typeof window.screenX === 'number' ? window.screenX : 0
              const currentY = typeof window.screenY === 'number' ? window.screenY : 0
              const currentW = typeof window.outerWidth === 'number' ? window.outerWidth : 1120
              const currentH = typeof window.outerHeight === 'number' ? window.outerHeight : 760
              const availW = typeof window.screen?.availWidth === 'number' ? window.screen.availWidth : currentW
              const availH =
                typeof window.screen?.availHeight === 'number' ? window.screen.availHeight : currentH

              const width = Math.min(currentW, availW)
              const height = Math.min(currentH, availH)

              // Try to open next to the current window (avoid overlapping), fall back to a small offset.
              let left = currentX + currentW + 24
              let top = currentY
              if (left + width > availW) left = Math.max(0, currentX + 40)
              if (top + height > availH) top = Math.max(0, availH - height)

              const features = `popup=yes,width=${width},height=${height},left=${left},top=${top},noopener,noreferrer`
              window.open(url.toString(), '_blank', features)
              return
            }

            onNavigate?.(item.route)
          }}
          className={`${itemClassName} justify-center hover:bg-white/20 hover:text-white/95 hover:shadow-[0_10px_30px_rgba(0,0,0,0.22)] hover:ring-1 hover:ring-white/10 focus-visible:bg-white/20 focus-visible:text-white/95 focus-visible:shadow-[0_10px_30px_rgba(0,0,0,0.22)] focus-visible:ring-1 focus-visible:ring-white/15 group-hover:justify-start`}
          aria-label={item.label}
        >
          <img
            src={item.iconSrc}
            alt=""
            aria-hidden="true"
            className="h-[32px] w-[32px] shrink-0 opacity-60 transition-opacity duration-200 group-hover/item:opacity-90"
          />
          <span className="min-w-0 max-w-0 overflow-hidden truncate whitespace-nowrap text-[44px] font-medium leading-none tracking-[-0.02em] opacity-0 translate-x-[-8px] transition-[max-width,opacity,transform] duration-300 group-hover:max-w-[260px] group-hover:translate-x-0 group-hover:opacity-100">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  )
}
