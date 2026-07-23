import { Model, type ModelRef } from '@webspatial/react-sdk'
import { type ComponentProps, type Ref } from 'react'

type Model3DProps = Omit<ComponentProps<typeof Model>, 'children' | 'poster' | 'ref' | 'src'> & {
  src: string
  poster?: string
  alt: string
  modelRef?: Ref<ModelRef>
}

export function Model3D({ src, poster, alt, modelRef, ...props }: Model3DProps) {
  return (
    <Model ref={modelRef} src={src} poster={poster} {...props}>
      {poster ? <img src={poster} alt={alt} /> : null}
    </Model>
  )
}
