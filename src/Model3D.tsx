import { Model, type ModelRef } from '@webspatial/react-sdk'
import { type ComponentProps, type Ref } from 'react'

type Model3DProps = Omit<ComponentProps<typeof Model>, 'children' | 'ref' | 'src'> & {
  src: string
  modelRef?: Ref<ModelRef>
}

export function Model3D({ src, modelRef, ...props }: Model3DProps) {
  return <Model ref={modelRef} src={src} {...props} />
}
