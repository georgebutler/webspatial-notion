import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Spatial } from '@webspatial/core-sdk'

const isSpatial = Spatial.prototype.runInSpatialWeb()
document.documentElement.classList.toggle('isSpatial', isSpatial)
document.documentElement.classList.toggle('is-web', !isSpatial)
document.body.classList.toggle('isSpatial', isSpatial)
document.body.classList.toggle('is-web', !isSpatial)

if (isSpatial) {
  document.documentElement.classList.add('bg-transparent')
  document.documentElement.style.setProperty('--xr-background-material', 'transparent')
}

document.body.classList.toggle('text-white', isSpatial)
document.body.classList.toggle('text-black', !isSpatial)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
