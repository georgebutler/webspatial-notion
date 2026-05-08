import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Spatial } from '@webspatial/core-sdk'

const isSpatial = Spatial.prototype.runInSpatialWeb()
if (isSpatial) {
  // The body carries the "isSpatial" marker class, while html gets html-specific classes/styles.
  document.body.classList.add('isSpatial')
  document.documentElement.classList.add('bg-transparent')
  document.documentElement.style.setProperty('--xr-background-material', 'transparent')
}

// Global text color: spatial = white, non-spatial = black.
document.body.classList.toggle('text-white', isSpatial)
document.body.classList.toggle('text-black', !isSpatial)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
