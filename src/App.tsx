import { useEffect, useState } from 'react'

import Dashboard from './Dashboard'
import Ai from './Ai'
import Library from './Library'

function App() {
  const initialRoute =
    ((): 'dashboard' | 'library' | 'ai' => {
      const route = new URLSearchParams(window.location.search).get('route')
      if (route === 'library' || route === 'ai') return route
      return 'dashboard'
    })()

  const [route, setRoute] = useState<'dashboard' | 'library' | 'ai'>(initialRoute)

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
      ) : (
        <Ai />
      )}
    </div>
  )
}

export default App
