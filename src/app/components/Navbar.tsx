'use client'

import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { Sun, Moon, LogOut } from 'lucide-react'
import { signOut } from 'firebase/auth'
import { auth } from '../utils/firebaseConfig' // make sure this points to your Firebase config
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [displayedText, setDisplayedText] = useState('')
  const [index, setIndex] = useState(0)
  const router = useRouter()
  const fullText = 'Discover restaurants, parks, and Hospitals around you instantly!'

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[index])
        setIndex((prev) => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [index, fullText])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/login') // redirect to login page
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <nav className="flex justify-between p-4 bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
      <h1 className="text-xl flex items-center font-semibold tracking-wide">
        {displayedText}
      </h1>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            onChange={toggleTheme}
            checked={theme === 'dark'}
          />
          <div className="w-14 h-8 bg-gray-300 peer-checked:bg-blue-600 rounded-full relative transition-colors duration-300">
            <div
              className={`absolute top-1 bg-white w-6 h-6 rounded-full transition-all duration-300 transform peer-checked:translate-x-6 ${
                theme === 'dark' ? `left-[50%]` : `left-[1%]`
              }`}
            />
          </div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
          </span>
        </label>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className=" bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center gap-1 cursor-pointer"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  )
}
