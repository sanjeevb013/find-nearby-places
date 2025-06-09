// app/layout.tsx
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Container from './components/Container'
import { ReactNode } from 'react'
import type { Metadata } from 'next' // ✅ Import Metadata type

export const metadata: Metadata = {
  title: 'My Next App',
  description: 'Scalable Layout with Navbar and Footer',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="page-container">
          <Navbar />
          <Container>{children}</Container>
        </div>
        <Footer />
      </body>
    </html>
  )
}

