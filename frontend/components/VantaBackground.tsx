'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

declare global {
  interface Window {
    VANTA: {
      HALO: (opts: any) => any;
    };
  }
}

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const [vantaEffect, setVantaEffect] = useState<any>(null)

  useEffect(() => {
    if (!vantaEffect && vantaRef.current && window.VANTA) {
      const effect = window.VANTA.HALO({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: window.innerHeight,
        minWidth: window.innerWidth,
        amplitudeFactor: 1,
        xOffset: 0.0,
        yOffset: 0.0,
        size: 1.75,
        backgroundColor: 0x0
      })
      
      setVantaEffect(effect)
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  useEffect(() => {
    if (!vantaEffect) return

    const handleResize = () => {
      if (vantaEffect) {
        vantaEffect.resize()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [vantaEffect])

  return (
    <div 
      ref={vantaRef} 
      className="fixed inset-0 w-full h-full"
    />
  )
}
