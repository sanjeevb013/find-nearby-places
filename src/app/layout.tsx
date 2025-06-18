import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Container from './components/Container'
import ThemeProvider from './context/ThemeContext' // Import this
import { ReactNode } from 'react'
import type { Metadata } from 'next'
import ReduxProvider from './providers/ReduxProvider'

export const metadata: Metadata = {
  title: 'My Next App',
  description: 'Scalable Layout with Navbar and Footer',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
        <ThemeProvider>
          <div className="page-container">
            <Navbar />
            <Container>{children}</Container>
          </div>
          <Footer />
        </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
