import './globals.css'
import ThemeProvider from './context/ThemeContext' // Import this
import { ReactNode } from 'react'
import type { Metadata } from 'next'
import ReduxProvider from './providers/ReduxProvider'
import { AuthProvider } from './context/AuthContext'; 
import { Toaster } from 'react-hot-toast'

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
           <AuthProvider>        
            {children}
              <Toaster position="top-center" reverseOrder={false} />
          </AuthProvider>
        </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
