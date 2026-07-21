import Dashboard from './Dashboard'
import Ai from './Ai'
import Calendar from './Calendar'
import DocumentWorkspace from './DocumentWorkspace'
import Sidebar from './Sidebar'
import Todo from './Todo'

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'

  if (pathname === '/todo') return <Todo />
  if (pathname === '/ai') return <Ai />
  if (pathname === '/calendar') return <Calendar />

  if (pathname === '/doc' || pathname.startsWith('/doc/')) return <DocumentWorkspace />

  return (
    <div
      enable-xr={true}
      style={{ '--xr-background-material': 'transparent' }}
      className="h-screen w-screen overflow-hidden p-4 sm:p-6"
    >
      <div className="mx-auto flex h-full w-full max-w-[960px] gap-4 sm:gap-6">
        <aside className="flex w-[68px] shrink-0 items-center justify-center sm:w-[120px]">
          <Sidebar />
        </aside>
        <main className="min-w-0 flex-1 overflow-hidden">
          <div
            enable-xr={true}
            style={{ '--xr-background-material': 'translucent' }}
            className="h-full w-full overflow-hidden rounded-[28px] bg-white/10 p-4 shadow sm:p-6 md:p-8"
          >
            <div className="h-full w-full overflow-hidden">
              <Dashboard />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
