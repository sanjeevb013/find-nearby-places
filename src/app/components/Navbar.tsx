'use client'

import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { Sun, Moon } from 'lucide-react'

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
  console.log(theme,"hhh")
  return (
    <nav className="flex justify-between p-4 bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
      <h1 className="text-xl flex items-center font-semibold tracking-wide">
        {displayedText}
      </h1>
      <label className="relative inline-flex items-center cursor-pointer">
  <input
    type="checkbox"
    className="sr-only peer"
    onChange={toggleTheme}
    checked={theme === 'dark'}
  />
  <div className="w-14 h-8 bg-gray-300 peer-checked:bg-blue-600 rounded-full relative transition-colors duration-300">
    <div className={`absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-all duration-300 transform peer-checked:translate-x-6 ${theme === 'dark' ? `left-[50%]`:`left-[1%]` }`} />
  </div>
  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
    {/* {theme === 'light' ? 'Light' : 'Dark'} */}
     {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
  </span>
</label>


    </nav>
  )
}
