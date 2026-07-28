import { useEffect, useRef, useState, type PropsWithChildren, type RefObject } from 'react'
import { ArrowLeft, Box, FileText, GripVertical, Image as ImageIcon } from 'lucide-react'
import { Model3D } from './Model3D.tsx'
import {
  AttachmentAsset,
  AttachmentEntity,
  Entity,
  ModelAsset,
  ModelEntity,
  Reality,
  SceneGraph,
  WebSpatialRuntime,
} from '@webspatial/react-sdk/default'
import type { ModelRef } from '@webspatial/react-sdk'

type DocumentItem = {
  title: string
  slug: string
}

type PlanetAnnotation = {
  id: string
  title: string
  description: string
  position: [number, number, number]
}

type PlanetAnnotations = [PlanetAnnotation, PlanetAnnotation]

const defaultAnnotationPositions = {
  first: [-0.62, 0.28, 0.3] as [number, number, number],
  second: [0.62, -0.22, 0.3] as [number, number, number],
}

const saturnAnnotationPositions = {
  first: [-0.72, 0.22, 0.3] as [number, number, number],
  second: [0.72, -0.18, 0.3] as [number, number, number],
}

const planetModelSources = {
  sun: '/usdz/planet-sun.usdz',
  mercury: '/usdz/planet-mercury.usdz',
  venus: '/usdz/planet-venus.usdz',
  earth: '/usdz/planet-earth.usdz',
  mars: '/usdz/planet-mars.usdz',
  jupiter: '/usdz/planet-jupiter.usdz',
  saturn: '/usdz/planet-saturn.usdz',
  uranus: '/usdz/planet-uranus.usdz',
  neptune: '/usdz/planet-neptune.usdz',
} as const

const orbitModelSources = {
  sun: '/usdz/orbit-sun.usdz',
  mercury: '/usdz/orbit-mercury.usdz',
  venus: '/usdz/orbit-venus.usdz',
  earth: '/usdz/orbit-earth.usdz',
  mars: '/usdz/orbit-mars.usdz',
  jupiter: '/usdz/orbit-jupiter.usdz',
  saturn: '/usdz/orbit-saturn.usdz',
  uranus: '/usdz/orbit-uranus.usdz',
  neptune: '/usdz/orbit-neptune.usdz',
} as const

const planets = [
  {
    name: 'Sun',
    modelSrc: planetModelSources.sun,
    classification: 'G-type star',
    diameter: '1.39 million km',
    distance: '149.6 million km from Earth',
    orbitalPeriod: 'One galactic orbit: ~230 million years',
    rotationPeriod: 'About 25–35 Earth days',
    moons: '8 planets orbit it',
    temperature: 'About 5,500°C at the surface',
    gravity: '274 m/s²',
    atmosphere: 'Mostly hydrogen and helium plasma',
    description:
      'The star at the center of our solar system and the source of nearly all the energy that makes life on Earth possible. The Sun is a nearly perfect sphere of hot plasma, made mostly of hydrogen and helium.',
    note:
      'The Sun contains about 99.8% of the solar system’s total mass. Its gravity keeps the planets, dwarf planets, asteroids, comets, and other debris in orbit, while its light takes about eight minutes to reach Earth.',
    annotations: [
      {
        id: 'sunspots',
        title: 'Sunspots',
        description: 'Cooler, magnetically active regions that appear dark against the surrounding photosphere.',
        position: defaultAnnotationPositions.first,
      },
      {
        id: 'solar-prominences',
        title: 'Solar Prominences',
        description: 'Huge loops of plasma held above the surface by the Sun’s magnetic field.',
        position: defaultAnnotationPositions.second,
      },
    ] satisfies PlanetAnnotations,
  },
  {
    name: 'Mercury',
    modelSrc: planetModelSources.mercury,
    classification: 'Terrestrial planet',
    diameter: '4,879 km',
    distance: '57.9 million km from the Sun',
    orbitalPeriod: '88 Earth days',
    rotationPeriod: '58.6 Earth days',
    moons: '0',
    temperature: '−180°C to 430°C',
    gravity: '3.7 m/s²',
    atmosphere: 'Extremely thin exosphere',
    description:
      'The smallest planet and the closest to the Sun. Mercury has a heavily cratered, rocky surface that looks a little like the Moon, but its days and nights are far more extreme because it has almost no atmosphere to hold heat.',
    note:
      'A year lasts only 88 Earth days, while one sunrise-to-sunrise day lasts 176 Earth days. Despite being closest to the Sun, Mercury is not the hottest planet.',
    annotations: [
      {
        id: 'caloris-basin',
        title: 'Caloris Basin',
        description: 'A roughly 1,550 km-wide impact basin and one of the largest visible features on Mercury.',
        position: defaultAnnotationPositions.first,
      },
      {
        id: 'discovery-rupes',
        title: 'Discovery Rupes',
        description: 'A giant cliff formed as Mercury’s interior cooled and the planet contracted.',
        position: defaultAnnotationPositions.second,
      },
    ] satisfies PlanetAnnotations,
  },
  {
    name: 'Venus',
    modelSrc: planetModelSources.venus,
    classification: 'Terrestrial planet',
    diameter: '12,104 km',
    distance: '108.2 million km from the Sun',
    orbitalPeriod: '224.7 Earth days',
    rotationPeriod: '243 Earth days, retrograde',
    moons: '0',
    temperature: 'About 465°C',
    gravity: '8.87 m/s²',
    atmosphere: 'Mostly carbon dioxide',
    description:
      'A hot, cloud-covered rocky planet wrapped in a thick carbon dioxide atmosphere. Its clouds contain sulfuric acid, and the intense pressure at the surface is roughly 90 times that of Earth.',
    note:
      'Venus rotates backward compared with most planets, so the Sun would rise in the west and set in the east. Its runaway greenhouse effect makes it the hottest planet in the solar system.',
    annotations: [
      {
        id: 'maat-mons',
        title: 'Maat Mons',
        description: 'One of Venus’s tallest shield volcanoes, rising above the surrounding volcanic plains.',
        position: defaultAnnotationPositions.first,
      },
      {
        id: 'sulfuric-cloud-deck',
        title: 'Sulfuric Cloud Deck',
        description: 'Thick reflective clouds that hide the surface and help sustain the runaway greenhouse effect.',
        position: defaultAnnotationPositions.second,
      },
    ] satisfies PlanetAnnotations,
  },
  {
    name: 'Earth',
    modelSrc: planetModelSources.earth,
    classification: 'Terrestrial planet',
    diameter: '12,742 km',
    distance: '149.6 million km from the Sun',
    orbitalPeriod: '365.25 days',
    rotationPeriod: '23 hours 56 minutes',
    moons: '1',
    temperature: 'About 15°C average',
    gravity: '9.81 m/s²',
    atmosphere: 'Mostly nitrogen and oxygen',
    description:
      'Our home planet, with abundant liquid surface water and the only known life in the solar system. Earth’s atmosphere, magnetic field, and active geology work together to make the surface unusually stable and habitable.',
    note:
      'The oceans cover most of the planet, and the Moon helps steady Earth’s rotation and creates the tides. Earth is the densest and largest of the four rocky planets.',
    annotations: [
      {
        id: 'pacific-ocean',
        title: 'Pacific Ocean',
        description: 'Earth’s largest and deepest ocean basin, covering nearly one-third of the planet.',
        position: defaultAnnotationPositions.first,
      },
      {
        id: 'himalayas',
        title: 'Himalayas',
        description: 'A major mountain range created by the continuing collision of the Indian and Eurasian plates.',
        position: defaultAnnotationPositions.second,
      },
    ] satisfies PlanetAnnotations,
  },
  {
    name: 'Mars',
    modelSrc: planetModelSources.mars,
    classification: 'Terrestrial planet',
    diameter: '6,779 km',
    distance: '227.9 million km from the Sun',
    orbitalPeriod: '687 Earth days',
    rotationPeriod: '24 hours 37 minutes',
    moons: '2',
    temperature: 'About −63°C average',
    gravity: '3.71 m/s²',
    atmosphere: 'Thin, mostly carbon dioxide',
    description:
      'A cold, rocky world known for its iron-rich red surface. Mars has polar ice caps, enormous volcanoes, deep valleys, dusty plains, and two small moons named Phobos and Deimos.',
    note:
      'Evidence shows that ancient Mars once had flowing water on its surface. Its atmosphere is thin today, but the planet remains one of the best places to look for clues about past environments beyond Earth.',
    annotations: [
      {
        id: 'olympus-mons',
        title: 'Olympus Mons',
        description: 'The largest known volcano in the solar system.',
        position: defaultAnnotationPositions.first,
      },
      {
        id: 'valles-marineris',
        title: 'Valles Marineris',
        description: 'A canyon system stretching roughly 4,000 km across the Martian surface.',
        position: defaultAnnotationPositions.second,
      },
    ] satisfies PlanetAnnotations,
  },
  {
    name: 'Jupiter',
    modelSrc: planetModelSources.jupiter,
    classification: 'Gas giant',
    diameter: '139,820 km',
    distance: '778.5 million km from the Sun',
    orbitalPeriod: '11.86 Earth years',
    rotationPeriod: '9 hours 56 minutes',
    moons: '95+',
    temperature: 'About −110°C at cloud tops',
    gravity: '24.79 m/s²',
    atmosphere: 'Mostly hydrogen and helium',
    description:
      'The largest planet and a gas giant made mostly of hydrogen and helium. Its striped cloud bands are driven by powerful jet streams, and the Great Red Spot is a storm that has lasted for centuries.',
    note:
      'Jupiter has a faint ring system and dozens of moons, including volcanic Io, icy Europa, and Ganymede—the largest moon in the solar system. Its enormous gravity also shapes the paths of many smaller bodies.',
    annotations: [
      {
        id: 'great-red-spot',
        title: 'Great Red Spot',
        description: 'A massive long-lived anticyclonic storm larger than Earth.',
        position: defaultAnnotationPositions.first,
      },
      {
        id: 'equatorial-belts',
        title: 'Equatorial Belts',
        description: 'Alternating dark belts and bright zones shaped by powerful atmospheric jet streams.',
        position: defaultAnnotationPositions.second,
      },
    ] satisfies PlanetAnnotations,
  },
  {
    name: 'Saturn',
    modelSrc: planetModelSources.saturn,
    classification: 'Gas giant',
    diameter: '116,460 km',
    distance: '1.43 billion km from the Sun',
    orbitalPeriod: '29.45 Earth years',
    rotationPeriod: 'About 10 hours 42 minutes',
    moons: '140+',
    temperature: 'About −140°C at cloud tops',
    gravity: '10.44 m/s²',
    atmosphere: 'Mostly hydrogen and helium',
    description:
      'A gas giant surrounded by a bright, extensive ring system made mostly of water ice and rock. Saturn is the second-largest planet, but its average density is low enough that it would float in a large enough ocean.',
    note:
      'The rings are broad but surprisingly thin, divided into many bands and gaps by Saturn’s moons. Titan, Saturn’s largest moon, has a thick atmosphere and lakes made of liquid methane.',
    annotations: [
      {
        id: 'main-ring-system',
        title: 'Main Ring System',
        description: 'Vast bands of ice and rock organized into the A, B, and C rings with visible gaps.',
        position: saturnAnnotationPositions.first,
      },
      {
        id: 'north-polar-hexagon',
        title: 'North Polar Hexagon',
        description: 'A persistent six-sided jet stream surrounding Saturn’s north pole.',
        position: saturnAnnotationPositions.second,
      },
    ] satisfies PlanetAnnotations,
  },
  {
    name: 'Uranus',
    modelSrc: planetModelSources.uranus,
    classification: 'Ice giant',
    diameter: '50,724 km',
    distance: '2.87 billion km from the Sun',
    orbitalPeriod: '84 Earth years',
    rotationPeriod: '17 hours 14 minutes, retrograde',
    moons: '28',
    temperature: 'About −195°C',
    gravity: '8.69 m/s²',
    atmosphere: 'Hydrogen, helium, and methane',
    description:
      'A pale blue ice giant that rotates on its side, likely after a massive collision early in its history. Uranus has faint rings and an atmosphere containing methane, which gives it its blue-green color.',
    note:
      'Because of its extreme tilt, each pole can face the Sun for about 42 Earth years at a time. Uranus is also one of the coldest planetary atmospheres in the solar system.',
    annotations: [
      {
        id: 'extreme-axial-tilt',
        title: 'Extreme Axial Tilt',
        description: 'Uranus rotates nearly on its side, producing unusually long seasons.',
        position: defaultAnnotationPositions.first,
      },
      {
        id: 'faint-ring-system',
        title: 'Faint Ring System',
        description: 'Narrow, dark rings composed primarily of larger particles and dust.',
        position: defaultAnnotationPositions.second,
      },
    ] satisfies PlanetAnnotations,
  },
  {
    name: 'Neptune',
    modelSrc: planetModelSources.neptune,
    classification: 'Ice giant',
    diameter: '49,244 km',
    distance: '4.5 billion km from the Sun',
    orbitalPeriod: '164.8 Earth years',
    rotationPeriod: 'About 16 hours',
    moons: '16',
    temperature: 'About −200°C',
    gravity: '11.15 m/s²',
    atmosphere: 'Hydrogen, helium, and methane',
    description:
      'The most distant planet from the Sun. Neptune is a cold, windy ice giant with a deep blue atmosphere, faint rings, and some of the fastest winds measured anywhere in the solar system.',
    note:
      'Neptune was the first planet discovered through mathematical prediction rather than direct observation. Its large moon Triton orbits backward and may be a captured object from the distant Kuiper Belt.',
    annotations: [
      {
        id: 'great-dark-spots',
        title: 'Great Dark Spots',
        description: 'Large transient storm systems that appear and disappear in Neptune’s atmosphere.',
        position: defaultAnnotationPositions.first,
      },
      {
        id: 'methane-cloud-bands',
        title: 'Methane Cloud Bands',
        description: 'High-altitude clouds and fast-moving bands shaped by the solar system’s strongest planetary winds.',
        position: defaultAnnotationPositions.second,
      },
    ] satisfies PlanetAnnotations,
  },
]

const ORBIT_MODEL_FALLBACK_SRC = '/usdz/orbit-solar-system-browser.usdz'
const SATURN_TILT_DEGREES = (0.47 * 180) / Math.PI

const orbitBodies = [
  { name: 'Mercury', modelSrc: orbitModelSources.mercury, distance: 0.18, scale: 0.008, speed: 4.15, spin: 0.04, tilt: 0.01 },
  { name: 'Venus', modelSrc: orbitModelSources.venus, distance: 0.26, scale: 0.012, speed: 1.62, spin: -0.01, tilt: 3.1 },
  { name: 'Earth', modelSrc: orbitModelSources.earth, distance: 0.34, scale: 0.013, speed: 1, spin: 0.3, tilt: 0.41 },
  { name: 'Mars', modelSrc: orbitModelSources.mars, distance: 0.42, scale: 0.011, speed: 0.53, spin: 0.3, tilt: 0.44 },
  { name: 'Jupiter', modelSrc: orbitModelSources.jupiter, distance: 0.55, scale: 0.028, speed: 0.084, spin: 0.7, tilt: 0.05 },
  { name: 'Saturn', modelSrc: orbitModelSources.saturn, distance: 0.7, scale: 0.024, speed: 0.034, spin: 0.65, tilt: 0.47 },
  { name: 'Uranus', modelSrc: orbitModelSources.uranus, distance: 0.84, scale: 0.018, speed: 0.012, spin: 0.4, tilt: 1.71 },
  { name: 'Neptune', modelSrc: orbitModelSources.neptune, distance: 0.96, scale: 0.018, speed: 0.006, spin: 0.45, tilt: 0.49 },
]

function getPlanetTiltDegrees(planetName: string) {
  return planetName === 'Saturn' ? SATURN_TILT_DEGREES : 0
}

function DocumentLastModified() {
  return <p className="mt-8 text-[13px] text-neutral-500">Last modified 1 day ago</p>
}

const PLANET_ROTATION_DEGREES_PER_SECOND = 30
const MIN_INTERACTIVE_MODEL_SCALE = 0.25
const MAX_INTERACTIVE_MODEL_SCALE = 4
const DETAIL_MODEL_SCALE = 0.23
const DETAIL_ATTACHMENT_HORIZONTAL_SCALE = 0.25
const DETAIL_ATTACHMENT_VERTICAL_DEPTH_SCALE = 0.15
const COMPACT_ATTACHMENT_SIZE = { width: 156, height: 44 }
const EXPANDED_ATTACHMENT_SIZE = { width: 232, height: 112 }

function useModelSelfRotation(
  modelRef: RefObject<ModelRef | null>,
  isLoaded: boolean,
  src: string,
  tiltDegrees = 0,
  enabled = true,
  rotationAxis: 'x' | 'y' | 'z' = 'y',
  positionZ = 0,
) {
  const isSpatial = document.documentElement.classList.contains('isSpatial')
  const shouldInitialize = isSpatial ? isLoaded : true
  const baseTransformRef = useRef<{ src: string; matrix: DOMMatrix } | null>(null)

  useEffect(() => {
    if (!shouldInitialize) return

    let mounted = true
    let animationFrame: number | undefined
    let previousTime: number | undefined

    const animate = (time: number) => {
      if (!mounted) return

      const model = modelRef.current
      const deltaSeconds = previousTime === undefined ? 0 : Math.min((time - previousTime) / 1000, 0.1)
      previousTime = time

      if (model && deltaSeconds > 0) {
        const rotationDegrees = PLANET_ROTATION_DEGREES_PER_SECOND * deltaSeconds
        model.entityTransform = DOMMatrix.fromMatrix(model.entityTransform).rotateSelf(
          rotationAxis === 'x' ? rotationDegrees : 0,
          rotationAxis === 'y' ? rotationDegrees : 0,
          rotationAxis === 'z' ? rotationDegrees : 0,
        )
      }

      animationFrame = requestAnimationFrame(animate)
    }

    const initializeModel = () => {
      if (!mounted) return

      const model = modelRef.current
      if (model) {
        if (!baseTransformRef.current || baseTransformRef.current.src !== src) {
          const baseTransform = DOMMatrix.fromMatrix(model.entityTransform)
          if (tiltDegrees !== 0) {
            baseTransform.rotateSelf(tiltDegrees, 0, 0)
          }
          baseTransformRef.current = { src, matrix: baseTransform }
        }

        const transformed = DOMMatrix.fromMatrix(baseTransformRef.current.matrix)
        transformed.m43 += positionZ
        model.entityTransform = transformed
      }
      if (enabled && animationFrame === undefined) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    if (isSpatial) {
      initializeModel()
    } else {
      let readyPromise: Promise<unknown> | undefined
      try {
        readyPromise = modelRef.current?.ready
      } catch {
        readyPromise = undefined
      }
      void readyPromise?.then(initializeModel).catch(() => {})
    }

    return () => {
      mounted = false
      if (animationFrame !== undefined) cancelAnimationFrame(animationFrame)
    }
  }, [
    enabled,
    isSpatial,
    modelRef,
    positionZ,
    rotationAxis,
    shouldInitialize,
    src,
    tiltDegrees,
  ])
}

function PlanetModelSlot({
  src,
  browserSrc,
  instanceKey,
  tiltDegrees = 0,
  browserTiltDegrees,
  rotate = true,
  interactive = false,
  magnifiable = interactive,
  rotationAxis = 'y',
  autoPlay = false,
  loop = false,
  positionZ = 0,
  onActivate,
  label = '3D Model',
  className = '',
}: {
  src: string
  browserSrc?: string
  instanceKey: string
  tiltDegrees?: number
  browserTiltDegrees?: number
  rotate?: boolean
  interactive?: boolean
  magnifiable?: boolean
  rotationAxis?: 'x' | 'y' | 'z'
  autoPlay?: boolean
  loop?: boolean
  positionZ?: number
  onActivate?: () => void
  label?: string
  className?: string
}) {
  const isSpatial = document.documentElement.classList.contains('isSpatial')
  const resolvedSrc = isSpatial ? src : (browserSrc ?? src)
  const resolvedTiltDegrees = isSpatial ? tiltDegrees : (browserTiltDegrees ?? tiltDegrees)
  const modelRef = useRef<ModelRef>(null)
  const dragBaseRef = useRef({ x: 0, y: 0, z: 0 })
  const magnificationBaseRef = useRef(1)
  const modelScaleRef = useRef(1)
  const [isLoaded, setIsLoaded] = useState(false)
  useModelSelfRotation(
    modelRef,
    isLoaded,
    resolvedSrc,
    resolvedTiltDegrees,
    rotate,
    rotationAxis,
    positionZ,
  )

  return (
    <div className={`notion-model-block ${className}`}>
      <div className="notion-planet-model">
        <Model3D
          key={instanceKey}
          modelRef={modelRef}
          src={resolvedSrc}
          className="webspatial-model"
          loading="eager"
          autoPlay={autoPlay}
          loop={loop}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(false)}
          onSpatialTap={onActivate ? () => onActivate() : undefined}
          onSpatialDragStart={interactive ? () => {
            dragBaseRef.current = { x: 0, y: 0, z: 0 }
          } : undefined}
          onSpatialDrag={interactive ? (event) => {
            const model = modelRef.current
            if (!model) return

            const x = event.translationX
            const y = event.translationY
            const z = event.translationZ
            const transform = DOMMatrix.fromMatrix(model.entityTransform)
            transform.translateSelf(
              x - dragBaseRef.current.x,
              y - dragBaseRef.current.y,
              z - dragBaseRef.current.z,
            )
            model.entityTransform = transform
            dragBaseRef.current = { x, y, z }
          } : undefined}
          onSpatialMagnify={magnifiable ? (event) => {
            const model = modelRef.current
            if (!model || event.magnification <= 0) return

            const scaleDelta = event.magnification / magnificationBaseRef.current
            const nextScale = Math.min(
              MAX_INTERACTIVE_MODEL_SCALE,
              Math.max(MIN_INTERACTIVE_MODEL_SCALE, modelScaleRef.current * scaleDelta),
            )
            const appliedScale = nextScale / modelScaleRef.current
            model.entityTransform = DOMMatrix.fromMatrix(model.entityTransform).scaleSelf(appliedScale)
            modelScaleRef.current = nextScale
            magnificationBaseRef.current = event.magnification
          } : undefined}
          onSpatialMagnifyEnd={magnifiable ? () => {
            magnificationBaseRef.current = 1
          } : undefined}
        />
        <div className="notion-model-label" aria-hidden="true">
          <Box size={16} strokeWidth={1.8} />
          <span>{label}</span>
        </div>
      </div>
      <div className="notion-model-block-handle" aria-hidden="true">
        <GripVertical size={16} strokeWidth={2} />
      </div>
    </div>
  )
}

function PlanetAnnotationCard({
  annotation,
  expanded,
  onToggle,
}: {
  annotation: PlanetAnnotation
  expanded: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`planet-annotation-card ${expanded ? 'is-expanded' : ''}`}
      aria-expanded={expanded}
    >
      <span className="planet-annotation-title">{annotation.title}</span>
      {expanded ? <span className="planet-annotation-description">{annotation.description}</span> : null}
    </button>
  )
}

function AnnotatedPlanetModel({
  planet,
}: {
  planet: (typeof planets)[number]
}) {
  const magnificationBaseRef = useRef(1)
  const magnificationFactorRef = useRef(1)
  const [magnificationFactor, setMagnificationFactor] = useState(1)
  const [expandedAnnotationId, setExpandedAnnotationId] = useState<string | null>(null)
  const modelAssetId = `detail-${planet.name.toLowerCase()}-asset`
  const tiltRadians = (getPlanetTiltDegrees(planet.name) * Math.PI) / 180

  return (
    <div className="notion-model-block notion-planet-detail-model">
      <div className="notion-planet-model">
        <Reality className="notion-planet-detail-reality">
          <ModelAsset id={modelAssetId} src={planet.modelSrc} />
          {planet.annotations.map((annotation) => {
            const attachmentName = `${planet.name.toLowerCase()}-${annotation.id}`

            return (
              <AttachmentAsset key={attachmentName} name={attachmentName}>
                <PlanetAnnotationCard
                  annotation={annotation}
                  expanded={expandedAnnotationId === annotation.id}
                  onToggle={() => {
                    setExpandedAnnotationId((current) => current === annotation.id ? null : annotation.id)
                  }}
                />
              </AttachmentAsset>
            )
          })}
          <SceneGraph>
            <Entity>
              <ModelEntity
                model={modelAssetId}
                rotation={{ x: tiltRadians, y: 0, z: 0 }}
                scale={{
                  x: DETAIL_MODEL_SCALE * magnificationFactor,
                  y: DETAIL_MODEL_SCALE * magnificationFactor,
                  z: DETAIL_MODEL_SCALE * magnificationFactor,
                }}
                onSpatialMagnify={(event) => {
                  if (event.magnification <= 0) return

                  const scaleDelta = event.magnification / magnificationBaseRef.current
                  const nextMagnification = Math.min(
                    MAX_INTERACTIVE_MODEL_SCALE,
                    Math.max(
                      MIN_INTERACTIVE_MODEL_SCALE,
                      magnificationFactorRef.current * scaleDelta,
                    ),
                  )
                  magnificationFactorRef.current = nextMagnification
                  magnificationBaseRef.current = event.magnification
                  setMagnificationFactor(nextMagnification)
                }}
                onSpatialMagnifyEnd={() => {
                  magnificationBaseRef.current = 1
                }}
              />
              {planet.annotations.map((annotation) => {
                const attachmentName = `${planet.name.toLowerCase()}-${annotation.id}`
                const expanded = expandedAnnotationId === annotation.id

                return (
                  <AttachmentEntity
                    key={attachmentName}
                    attachment={attachmentName}
                    position={[
                      annotation.position[0] * magnificationFactor * DETAIL_ATTACHMENT_HORIZONTAL_SCALE,
                      annotation.position[1] * magnificationFactor * DETAIL_ATTACHMENT_VERTICAL_DEPTH_SCALE,
                      annotation.position[2] * magnificationFactor * DETAIL_ATTACHMENT_VERTICAL_DEPTH_SCALE,
                    ]}
                    size={expanded ? EXPANDED_ATTACHMENT_SIZE : COMPACT_ATTACHMENT_SIZE}
                  />
                )
              })}
            </Entity>
          </SceneGraph>
        </Reality>
        <div className="notion-model-label" aria-hidden="true">
          <Box size={16} strokeWidth={1.8} />
          <span>3D Model</span>
        </div>
      </div>
      <div className="notion-model-block-handle" aria-hidden="true">
        <GripVertical size={16} strokeWidth={2} />
      </div>
    </div>
  )
}

function SolarSystemOrbitScene() {
  const [time, setTime] = useState(0)

  useEffect(() => {
    let animationFrame: number

    const animate = () => {
      setTime((current) => current + 0.005)
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <div className="notion-model-block mt-4">
      <div className="notion-planet-model notion-orbit-scene">
        <Reality className="notion-orbit-reality">
          <ModelAsset id="orbitSun" src={orbitModelSources.sun} />
          {orbitBodies.map((body) => (
            <ModelAsset
              key={body.name}
              id={`orbit${body.name}`}
              src={body.modelSrc}
            />
          ))}
          <SceneGraph>
            <ModelEntity
              model="orbitSun"
              position={{ x: 0, y: 0, z: 0 }}
              rotation={{ x: 0, y: time * 0.05, z: 0 }}
              scale={{ x: 0.04, y: 0.04, z: 0.04 }}
            />
            {orbitBodies.map((body) => {
              const angle = time * body.speed
              return (
                <Entity
                  key={body.name}
                  position={{
                    x: Math.cos(angle) * body.distance,
                    y: 0,
                    z: Math.sin(angle) * body.distance,
                  }}
                >
                  <ModelEntity
                    model={`orbit${body.name}`}
                    rotation={{ x: 0, y: time * body.spin, z: body.tilt }}
                    scale={{ x: body.scale, y: body.scale, z: body.scale }}
                  />
                </Entity>
              )
            })}
          </SceneGraph>
        </Reality>
        <div className="notion-model-label" aria-hidden="true">
          <Box size={16} strokeWidth={1.8} />
          <span>3D Model</span>
        </div>
      </div>
      <div className="notion-model-block-handle" aria-hidden="true">
        <GripVertical size={16} strokeWidth={2} />
      </div>
    </div>
  )
}

function SolarSystemCollection() {
  const isSpatial = document.documentElement.classList.contains('isSpatial')
  return isSpatial ? (
    <SolarSystemOrbitScene />
  ) : (
    <PlanetModelSlot
      src={ORBIT_MODEL_FALLBACK_SRC}
      instanceKey="solar-system-overview"
      tiltDegrees={90}
      rotationAxis="z"
      className="mt-4"
    />
  )
}

function NotionTextBlock({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`notion-text-block ${className}`}>
      <GripVertical className="notion-text-block-handle" size={16} strokeWidth={2} aria-hidden="true" />
      {children}
    </div>
  )
}

function NotionImageBlock({
  src,
  alt,
}: {
  src: string
  alt: string
}) {
  return (
    <figure className="notion-image-block">
      <div className="notion-image-viewport">
        <img src={src} alt={alt} />
        <div className="notion-model-label" aria-hidden="true">
          <ImageIcon size={16} strokeWidth={1.8} />
          <span>Image</span>
        </div>
        <div className="notion-model-block-handle" aria-hidden="true">
          <GripVertical size={16} strokeWidth={2} />
        </div>
      </div>
    </figure>
  )
}

const documents: DocumentItem[] = [
  { title: 'The Solar System', slug: 'the-solar-system' },
  { title: "Newton's Cradle", slug: 'newtons-cradle' },
  { title: 'Q3 Product Development', slug: 'q3-product-development' },
  { title: 'Feature Specification', slug: 'feature-specification' },
  { title: 'Product Roadmap Q1', slug: 'product-roadmap-q1' },
]

const documentSections = [
  { title: 'Recently edited', items: documents.slice(0, 2) },
  { title: 'Private', items: documents.slice(2) },
]

function PlanetFact({
  label,
  value,
  compact = false,
}: {
  label: string
  value: string
  compact?: boolean
}) {
  return (
    <div className={compact ? 'notion-planet-fact notion-planet-fact-compact' : 'notion-planet-fact'}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

function PlanetDetail({ planet, onBack }: { planet: (typeof planets)[number]; onBack: () => void }) {
  const isSpatial = document.documentElement.classList.contains('isSpatial')
  const supportsAttachments = isSpatial
    && WebSpatialRuntime.supports('Reality')
    && WebSpatialRuntime.supports('SceneGraph')
    && WebSpatialRuntime.supports('Entity')
    && WebSpatialRuntime.supports('ModelAsset')
    && WebSpatialRuntime.supports('ModelEntity')
    && WebSpatialRuntime.supports('AttachmentAsset')
    && WebSpatialRuntime.supports('AttachmentEntity')

  return (
    <>
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
      >
        <ArrowLeft size={16} strokeWidth={1.8} />
        Back to Solar System
      </button>
      <h1 className="text-3xl font-bold">{planet.name}</h1>
      <div className="notion-planet-detail mt-4">
        <article className="notion-planet-detail-copy">
          <h2 className="sr-only">Planet details</h2>
          <NotionTextBlock>
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="mt-3 text-[16px] leading-7">{planet.description}</p>
          </NotionTextBlock>
          <NotionTextBlock className="mt-6">
            <h2 className="text-xl font-semibold">Notes</h2>
            <p className="mt-3 text-[16px] leading-7">{planet.note}</p>
          </NotionTextBlock>
          <NotionTextBlock className="mt-6">
            <h2 className="text-xl font-semibold">Quick facts</h2>
            <dl className="notion-planet-facts mt-4">
              <PlanetFact label="Type" value={planet.classification} />
              <PlanetFact label="Diameter" value={planet.diameter} />
              <PlanetFact label="Distance" value={planet.distance} />
              <PlanetFact label="Year" value={planet.orbitalPeriod} />
              <PlanetFact label="Rotation" value={planet.rotationPeriod} />
              <PlanetFact label="Moons" value={planet.moons} />
              <PlanetFact label="Temperature" value={planet.temperature} />
              <PlanetFact label="Gravity" value={planet.gravity} />
              <PlanetFact label="Atmosphere" value={planet.atmosphere} />
            </dl>
          </NotionTextBlock>
        </article>
        {supportsAttachments ? (
          <AnnotatedPlanetModel planet={planet} />
        ) : (
          <PlanetModelSlot
            src={planet.modelSrc}
            instanceKey={`detail-${planet.name}`}
            tiltDegrees={getPlanetTiltDegrees(planet.name)}
            rotate={!isSpatial}
            magnifiable
            className="notion-planet-detail-model"
          />
        )}
      </div>
    </>
  )
}

function SolarSystemDocument() {
  const [selectedPlanet, setSelectedPlanet] = useState<(typeof planets)[number] | null>(null)

  if (selectedPlanet) {
    return <PlanetDetail planet={selectedPlanet} onBack={() => setSelectedPlanet(null)} />
  }

  return (
    <>
      <h1 className="text-3xl font-bold">The Solar System</h1>
      <NotionTextBlock className="mt-4 text-[16px] leading-7">
        The solar system is our cosmic neighborhood, centered on the Sun and made up of planets, moons,
        dwarf planets, asteroids, comets, and dust held together by gravity.
      </NotionTextBlock>
      <SolarSystemCollection />
      <NotionTextBlock className="mt-4 text-[16px] leading-7">
        The eight planets orbit the Sun in order: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and
        Neptune. Mercury is the smallest and closest to the Sun; Venus is a hot, cloud-covered rocky world;
        Earth is the only known planet with life; Mars is a cold, iron-rich planet; Jupiter is the largest
        planet; Saturn is known for its bright rings; Uranus is an ice giant that rotates on its side; and
        Neptune is a distant, windy ice giant. Together, these worlds show the remarkable variety of planets
        in our solar system.
      </NotionTextBlock>
      <h2 className="mt-8 text-2xl font-semibold">Our Solar System</h2>
      <div className="notion-planet-list mt-2">
        {planets.map((planet) => (
          <article
            className="notion-planet-row"
            key={planet.name}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedPlanet(planet)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                setSelectedPlanet(planet)
              }
            }}
            aria-label={`Open ${planet.name} details`}
          >
            <PlanetModelSlot
              src={planet.modelSrc}
              instanceKey={`card-${planet.name}`}
              tiltDegrees={getPlanetTiltDegrees(planet.name)}
              onActivate={() => setSelectedPlanet(planet)}
              className="notion-planet-row-model"
            />
            <NotionTextBlock className="notion-planet-row-copy">
              <h3 className="text-lg font-semibold">{planet.name}</h3>
              <p className="mt-1 text-sm font-medium text-neutral-600">{planet.classification}</p>
              <p className="mt-2 text-[15px] leading-6">{planet.description}</p>
              <p className="mt-3 border-t border-black/10 pt-3 text-[15px] leading-6 text-neutral-600">
                <span className="font-semibold text-neutral-900">Notes:</span> {planet.note}
              </p>
              <dl className="notion-planet-card-facts mt-4">
                <PlanetFact label="Diameter" value={planet.diameter} compact />
                <PlanetFact label="Year" value={planet.orbitalPeriod} compact />
                <PlanetFact label="Moons" value={planet.moons} compact />
              </dl>
            </NotionTextBlock>
          </article>
        ))}
      </div>
      <DocumentLastModified />
    </>
  )
}

function NewtonsCradleDocument() {
  return (
    <>
      <h1 className="text-3xl font-bold">Newton&apos;s Cradle</h1>
      <NotionTextBlock className="mt-4 text-[16px] leading-7">
        Newton&apos;s cradle is a compact demonstration of momentum, kinetic energy, and elastic collisions.
        When one ball is lifted and released, its motion travels through the aligned center balls and causes
        the ball at the opposite end to swing outward.
      </NotionTextBlock>

      <div className="newtons-cradle-media mt-4">
        <NotionImageBlock
          src="/images/newtons-cradle-notes.jpg"
          alt="Notebook notes illustrating Newton's cradle and the conservation of momentum and energy"
        />
        <PlanetModelSlot
          src="/usdz/newtons-cradle-spatial.usdz"
          browserSrc="/usdz/newtons-cradle-browser.usdz"
          instanceKey="newtons-cradle-document"
          rotate={false}
          interactive
          autoPlay
          loop
          positionZ={-0.2}
          label="3D Model (Animated)"
          className="newtons-cradle-model"
        />
      </div>

      <h2 className="mt-8 text-2xl font-semibold">How it works</h2>
      <NotionTextBlock className="mt-3 text-[16px] leading-7">
        The released ball accelerates as gravitational potential energy becomes kinetic energy. At impact,
        the first collision compresses the touching balls by a tiny amount. That compression creates a force
        pulse that travels through the row and pushes the final ball away with nearly the incoming speed.
      </NotionTextBlock>

      <h2 className="mt-8 text-2xl font-semibold">Momentum and energy</h2>
      <NotionTextBlock className="mt-3 text-[16px] leading-7">
        Momentum is conserved across the full system, and an ideal elastic collision also preserves kinetic
        energy. Those two requirements explain why releasing one ball usually sends one ball from the other
        side, while releasing two balls usually sends two. A single heavier or faster response would not
        satisfy both conservation laws at once.
      </NotionTextBlock>

      <NotionTextBlock className="mt-6">
        <h2 className="text-xl font-semibold">Key observations</h2>
        <dl className="notion-planet-facts mt-4">
          <PlanetFact label="Momentum" value="Transferred through the touching balls and conserved across the system." />
          <PlanetFact label="Kinetic energy" value="Approximately conserved while the collisions remain highly elastic." />
          <PlanetFact label="Center balls" value="Move only slightly as the compression pulse passes through them." />
          <PlanetFact label="Pendulum period" value="Depends mainly on string length and gravity for small swing angles." />
          <PlanetFact label="Ideal assumptions" value="Equal masses, aligned centers, taut strings, and elastic impacts." />
          <PlanetFact label="Observed losses" value="Sound, heat, air drag, string friction, and material deformation." />
        </dl>
      </NotionTextBlock>

      <h2 className="mt-8 text-2xl font-semibold">Experiments to try</h2>
      <NotionTextBlock className="mt-3 text-[16px] leading-7">
        Release one, two, and three balls from the same height and compare the number that leave the opposite
        side. Then change the release height to compare speed and swing amplitude. Small misalignments,
        unequal balls, or tangled strings make the transfer less clean and reveal where the ideal model
        breaks down.
      </NotionTextBlock>

      <h2 className="mt-8 text-2xl font-semibold">Why it eventually stops</h2>
      <NotionTextBlock className="mt-3 text-[16px] leading-7">
        A real cradle is not perfectly elastic. Every collision loses a little mechanical energy to sound,
        microscopic deformation, heat, air resistance, and friction at the suspension points. The swings
        therefore become smaller until the remaining motion is no longer visible.
      </NotionTextBlock>

      <DocumentLastModified />
    </>
  )
}

function DocumentBody({ title }: { title: string }) {
  if (title === 'The Solar System') return <SolarSystemDocument />
  if (title === "Newton's Cradle") return <NewtonsCradleDocument />

  return (
    <>
      <h1 className="text-3xl font-bold">{title}</h1>
      <NotionTextBlock className="mt-4 text-[16px] leading-7">
        This document captures the current state of work, decisions, and action items. It is intended to be
        a living document that reflects ongoing progress and aligns the team.
      </NotionTextBlock>
      <h2 className="mt-8 text-2xl font-semibold">Goals</h2>
      <NotionTextBlock className="mt-3 text-[16px] leading-7">
        - Deliver a delightful user experience across core workflows.
        <br />
        - Ensure performance and reliability under production traffic.
        <br />
        - Maintain a flexible architecture to support rapid iteration.
      </NotionTextBlock>
      <h2 className="mt-8 text-2xl font-semibold">Notes</h2>
      <NotionTextBlock className="mt-3 text-[16px] leading-7">
        The navigation has been simplified to reduce cognitive load. We are exploring a component-driven
        approach to keep features modular and testable. Upcoming work includes refining the document editing
        experience and improving collaboration tools.
      </NotionTextBlock>
      <h2 className="mt-8 text-2xl font-semibold">Tasks</h2>
      <NotionTextBlock className="mt-3 text-[16px] leading-7">
        1. Finalize document layout and typography.
        <br />
        2. Add autosave and version history.
        <br />
        3. Integrate comments and mentions.
      </NotionTextBlock>
      <DocumentLastModified />
    </>
  )
}

export default function DocumentWorkspace() {
  const getSelectedIndex = () => {
    const url = new URL(window.location.href)
    const slug = url.pathname.startsWith('/doc/') ? url.pathname.slice('/doc/'.length) : ''

    if (slug) return documents.findIndex((document) => document.slug === slug)
    return 0
  }

  const [selectedIndex, setSelectedIndex] = useState(getSelectedIndex)
  const selectedDocument = selectedIndex >= 0 ? documents[selectedIndex] : null

  useEffect(() => {
    const url = new URL(window.location.href)
    const normalizedPathname = url.pathname.replace(/\/+$/, '')

    if (normalizedPathname === '/doc') {
      url.pathname = `/doc/${documents[0].slug}`
      window.history.replaceState({}, '', url)
    }

    const handlePopState = () => setSelectedIndex(getSelectedIndex())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const selectDocument = (index: number) => {
    const document = documents[index]
    const url = new URL(window.location.href)
    url.pathname = `/doc/${document.slug}`
    url.search = ''
    window.history.pushState({}, '', url)
    setSelectedIndex(index)
  }

  return (
    <div
      className="notion-document-workspace flex h-full w-full flex-col gap-6 overflow-hidden p-4 sm:p-6 md:p-8 lg:flex-row lg:p-12"
    >
      <aside
        className="notion-sidebar hidden h-full min-h-0 w-1/5 min-w-[240px] flex-col rounded-2xl bg-white/5 px-5 py-6 lg:flex"
      >
        <div className="flex items-center gap-2 text-white/90">
          <FileText size={20} strokeWidth={1.8} aria-hidden="true" />
          <h2 className="text-lg font-semibold">Documents</h2>
        </div>
        <div className="mt-6 min-h-0 flex-1 overflow-y-auto [scrollbar-width:none]">
          <div className="space-y-6">
            {documentSections.map((section) => (
              <section key={section.title}>
                <div className="flex items-center justify-between px-3 text-sm font-medium text-white/60">
                  <span>{section.title}</span>
                  <span>{section.items.length}</span>
                </div>
                <ul className="mt-2 space-y-2">
                  {section.items.map((document) => {
                    const index = documents.indexOf(document)

                    return (
                      <li key={document.title}>
                        <button
                          type="button"
                          onClick={() => selectDocument(index)}
                          title={document.title}
                          className={`flex w-full cursor-pointer items-center gap-2 truncate rounded-lg px-3 py-2 text-left text-[15px] transition-colors ${
                            selectedIndex === index
                              ? 'bg-white/10 text-white'
                              : 'text-white/90 hover:bg-white/10'
                          }`}
                        >
                          <FileText className="shrink-0" size={18} strokeWidth={1.8} aria-hidden="true" />
                          <span className="truncate">{document.title}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </aside>

      <div
        className={`notion-document-content h-full min-h-0 flex-1 overflow-auto rounded-2xl px-6 py-8 ${selectedDocument ? 'bg-white text-neutral-900' : 'bg-white/10 text-neutral-200'}`}
      >
        <div className="w-full">
          {selectedDocument ? <DocumentBody title={selectedDocument.title} /> : <h1 className="text-lg font-semibold text-white/90">Click a document on the left to get started</h1>}
        </div>
      </div>
    </div>
  )
}
