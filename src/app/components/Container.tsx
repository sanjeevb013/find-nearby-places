// app/components/Container.tsx
import { ReactNode } from 'react'

export default function Container({ children }: { children: ReactNode }) {
  return (
    <main className="max-w-full m-0">
      {children}
    </main>
  )
}
