import Dashboard from './Dashboard'

function App() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        enable-xr={true}
        style={{
          '--xr-background-material': 'translucent',
          borderRadius: 46,
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 30px 90px rgba(0,0,0,0.35)',
        }}
      >
        <Dashboard />
      </div>
    </div>
  )
}

export default App
