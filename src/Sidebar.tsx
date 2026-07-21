import iconLibrary from './assets/sidebar-icons/library.svg'
import iconAi from './assets/sidebar-icons/ai.svg'
import iconTodo from './assets/sidebar-icons/todo.svg'
import iconCalendar from './assets/sidebar-icons/calendar.svg'

const items = [
  { label: 'Documents', iconSrc: iconLibrary, path: '/doc' },
  { label: 'Notion AI', iconSrc: iconAi, path: '/ai' },
  { label: 'Todo list', iconSrc: iconTodo, path: '/todo' },
  { label: 'Calendar', iconSrc: iconCalendar, path: '/calendar' },
]

export default function Sidebar() {
  const openScene = (path: string, name: string) => {
    const url = new URL(path, window.location.origin)
    window.open(url.toString(), name, 'noopener,noreferrer')
  }

  return (
    <div
      enable-xr={true}
      style={{ '--xr-background-material': 'translucent' }}
      className="notion-sidebar inline-flex w-[68px] flex-col items-center gap-3 rounded-[34px] border border-white/10 p-3 shadow sm:w-[68px]"
      aria-label="Sidebar"
    >
      {items.map((item, index) => (
        <button
          key={item.path}
          type="button"
          onClick={() => openScene(item.path, `${item.path.slice(1)}Scene`)}
          className={`flex w-full items-center justify-center rounded-full p-2 transition-colors ${
            index === 0
              ? 'bg-white/15 ring-1 ring-white/30'
              : 'hover:bg-white/10 hover:ring-1 hover:ring-white/20 focus-visible:bg-white/10 focus-visible:ring-1 focus-visible:ring-white/20'
          }`}
          aria-label={item.label}
        >
          <img src={item.iconSrc} alt="" className="h-6 w-6 object-contain" width="24" height="24" />
        </button>
      ))}
    </div>
  )
}
