'use client'

import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  const fullText = 'Welcome Sanjeev'
  const [displayedText, setDisplayedText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[index])
        setIndex((prev) => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [index, fullText])

  return (
    <nav className="flex justify-between p-4 bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
      <h1 className="text-xl flex items-center font-semibold tracking-wide">
        {displayedText}
      </h1>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded cursor-pointer"
      >
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
    </nav>
  )
}
