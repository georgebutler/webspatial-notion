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
          onClick={() => (item.route ? onNavigate?.(item.route) : undefined)}
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

