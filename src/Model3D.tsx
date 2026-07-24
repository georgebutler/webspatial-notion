import { Model, type ModelRef } from '@webspatial/react-sdk/default'
import { type ComponentProps, type Ref } from 'react'

type Model3DProps = Omit<ComponentProps<typeof Model>, 'children' | 'ref' | 'src' | 'enable-xr'> & {
  src: string
  modelRef?: Ref<ModelRef>
}

function setModelRef(modelRef: Ref<ModelRef> | undefined, model: ModelRef | null) {
  if (typeof modelRef === 'function') {
    modelRef(model)
  } else if (modelRef) {
    modelRef.current = model
  }
}

export function Model3D({ src, modelRef, ...props }: Model3DProps) {
  const assignModelRef = (model: ModelRef | null) => {
    setModelRef(modelRef, model)

    if (model) {
      console.info('[WebSpatial model] ref assigned', {
        src,
        tagName: model instanceof HTMLElement ? model.tagName : typeof model,
        ready: typeof model.ready,
        currentSrc: model.currentSrc,
        spatialId: model instanceof HTMLElement ? model.getAttribute('data-spatial-id') : undefined,
      })
    }
  }

  return <Model ref={assignModelRef} src={src} enable-xr {...props} />
}
