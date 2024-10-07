import React, { useState, useEffect } from 'react'
import { Bus } from 'lucide-react'

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed w-full z-10 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bus size={24} className={isScrolled ? 'text-blue-600' : 'text-white'} />
          <h1 className={`text-2xl font-bold ${isScrolled ? 'text-blue-600' : 'text-white'}`}>ShuttleEase</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#home" className={`hover:text-blue-400 transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'}`}>Home</a></li>
            <li><a href="#booking" className={`hover:text-blue-400 transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'}`}>Book Now</a></li>
            <li><a href="#schedule" className={`hover:text-blue-400 transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'}`}>Schedules</a></li>
            <li><a href="#about" className={`hover:text-blue-400 transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'}`}>About</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header