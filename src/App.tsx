import Dashboard from './Dashboard'

function App() {
  return (
    <div
      style={{
        backgroundColor: 'transparent',
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
          '--xr-background-material': 'translucent'
        }}
      >
        <Dashboard />
      </div>
    </div>
  )
}

export default App
