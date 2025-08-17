declare module 'vanta/dist/vanta.halo.min' {
  interface VantaHaloEffect {
    resize: () => void;
    destroy: () => void;
  }

  interface VantaHaloConstructor {
    (opts: {
      el: HTMLElement;
      THREE: any;
      mouseControls?: boolean;
      touchControls?: boolean;
      gyroControls?: boolean;
      minHeight?: number;
      minWidth?: number;
      scale?: number;
      scaleMobile?: number;
      backgroundColor?: number;
      color?: number;
      size?: number;
      spacing?: number;
    }): VantaHaloEffect;
  }

  const HALO: VantaHaloConstructor;
  export default HALO;
}
