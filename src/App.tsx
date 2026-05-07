import Dashboard from './Dashboard'

function App() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-transparent">
      <div
        enable-xr={true}
        style={{
          '--xr-background-material': 'translucent'
        }}
      >
        <Dashboard />
      </div>
    </div>
  )
}

export default App
