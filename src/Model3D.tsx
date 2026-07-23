import { Model, type ModelRef } from '@webspatial/react-sdk'
import { type ComponentProps, type ReactNode, type Ref } from 'react'

type Model3DProps = Omit<ComponentProps<typeof Model>, 'children' | 'ref' | 'src'> & {
  src: string
  poster?: string
  modelRef?: Ref<ModelRef>
  children?: ReactNode
}

export function Model3D({ src, poster, modelRef, children, ...props }: Model3DProps) {
  return (
    <Model ref={modelRef} src={src} {...props}>
      {poster ? <img className="notion-model-poster" src={poster} alt="" aria-hidden="true" /> : null}
      {children}
    </Model>
  )
}
