import { Model, type ModelRef } from '@webspatial/react-sdk/default'
import { type ComponentProps, type Ref } from 'react'

type Model3DProps = Omit<ComponentProps<typeof Model>, 'children' | 'ref' | 'src' | 'enable-xr'> & {
  src: string
  modelRef?: Ref<ModelRef>
  stageMode?: 'orbit'
}

export function Model3D({ src, modelRef, stageMode, ...props }: Model3DProps) {
  const stageModeProps = stageMode ? { stagemode: stageMode } : {}

  return <Model ref={modelRef} src={src} enable-xr {...stageModeProps} {...props} />
}
