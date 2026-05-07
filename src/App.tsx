import { useState } from 'react'

import Dashboard from './Dashboard'
import Library from './Library'

function App() {
  const [route, setRoute] = useState<'dashboard' | 'library'>('dashboard')

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-transparent">
      {route === 'dashboard' ? (
        <Dashboard onNavigate={setRoute} />
      ) : (
        <Library onNavigate={setRoute} />
      )}
    </div>
  )
}

export default App
