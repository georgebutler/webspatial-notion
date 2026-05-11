import { useEffect, useState } from 'react'

import Dashboard from './Dashboard'
import Ai from './Ai'
import Calendar from './Calendar'
import Library from './Library'
import Todo from './Todo'

function App() {
  const initialRoute =
    ((): 'dashboard' | 'library' | 'ai' | 'todo' | 'calendar' => {
      const route = new URLSearchParams(window.location.search).get('route')
      if (route === 'library' || route === 'ai' || route === 'todo' || route === 'calendar') return route
      return 'dashboard'
    })()

  const [route, setRoute] = useState<'dashboard' | 'library' | 'ai' | 'todo' | 'calendar'>(initialRoute)

  useEffect(() => {
    const url = new URL(window.location.href)
    if (route === 'dashboard') url.searchParams.delete('route')
    else url.searchParams.set('route', route)
    window.history.replaceState({}, '', url)
  }, [route])

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-transparent">
      {route === 'dashboard' ? (
        <Dashboard onNavigate={setRoute} />
      ) : route === 'library' ? (
        <Library />
      ) : route === 'ai' ? (
        <Ai />
      ) : route === 'calendar' ? (
        <Calendar />
      ) : (
        <Todo />
      )}
    </div>
  )
}

export default App
