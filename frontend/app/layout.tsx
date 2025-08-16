import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

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
      <body className="font-coolvetica">{children}</body>
    </html>
  )
}
