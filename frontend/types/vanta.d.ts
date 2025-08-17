declare module 'vanta/dist/vanta.halo.min' {
  import { Object3D } from 'three'
  
  interface VantaHaloOptions {
    el: HTMLElement
    THREE: any
    mouseControls?: boolean
    touchControls?: boolean
    gyroControls?: boolean
    minHeight?: number
    minWidth?: number
    scale?: number
    scaleMobile?: number
    backgroundColor?: number
    amplitudeFactor?: number
    xOffset?: number
    yOffset?: number
    size?: number
  }

  interface VantaEffect {
    resize: () => void
    destroy: () => void
  }

  interface VantaHaloConstructor {
    (options: VantaHaloOptions): VantaEffect
  }

  const HALO: VantaHaloConstructor
  export default HALO
}
