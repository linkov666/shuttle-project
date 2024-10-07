import React from 'react'
import { Facebook, Instagram, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        {/* ... (previous footer content) ... */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; 2024 ShuttleEase. All rights reserved.</p>
          <Link to="/admin" className="text-sm text-gray-400 hover:text-blue-400 mt-2 inline-block">Admin Dashboard</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer