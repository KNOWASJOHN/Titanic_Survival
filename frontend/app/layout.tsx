import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Script from 'next/script'

export const metadata: Metadata = {
  title: "Titanic Survival Predictor",
  description: "Predict survival chances on the Titanic using historical data and machine learning",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/vanta/dist/vanta.halo.min.js" strategy="beforeInteractive" />
      </head>
      <body className="font-coolvetica">{children}</body>
    </html>
  )
}


