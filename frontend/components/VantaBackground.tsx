'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import VANTA from 'vanta/dist/vanta.halo.min'

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const [vantaEffect, setVantaEffect] = useState<any>(null)

  useEffect(() => {
    // Load Vanta from CDN dynamically (only on client)
    const loadVanta = async () => {
      if (!vantaEffect) {
        const VANTA = await import('vanta/dist/vanta.halo.min') // if copied to node_modules
          .catch(() => null)

        // If not available in node_modules, fallback to global window
        if (!VANTA && typeof window !== 'undefined') {
          // @ts-ignore
          window.VANTA && setVantaEffect(
            // @ts-ignore
            window.VANTA.HALO({
              el: vantaRef.current,
              THREE,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 100.00,
              minWidth: 100.00,
              amplitudeFactor: 1,
              xOffset: 0.,
              yOffset: 0.05,
              size: 2
            })
          )
        } else if (VANTA) {
          setVantaEffect(
            VANTA.default({
              el: vantaRef.current,
              THREE,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 100.00,
              minWidth: 100.00,
              amplitudeFactor: 1,
              xOffset: 0.0,
              yOffset: 0.05,
              size: 2.0
            })
          )
        }
      }
    }

    loadVanta()

    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return <div ref={vantaRef} className="w-full h-full" />
}
