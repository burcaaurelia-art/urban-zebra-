import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/85 backdrop-blur-md border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="flex items-center space-x-1 group select-none">
          <span className="text-white text-2xl sm:text-3xl font-extrabold tracking-tight group-hover:text-gold transition-colors">Urban</span>
          <span className="text-gold text-2xl sm:text-3xl font-extrabold tracking-tight group-hover:translate-x-0.5 transition-transform">.Zebra</span>
        </Link>
        <div className="hidden sm:flex space-x-6 text-sm font-medium">
          <Link to="/" className="text-white/80 hover:text-gold transition-colors">Blog</Link>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-gold transition-colors">Instagram</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-gold transition-colors">Facebook</a>
        </div>
      </div>
    </nav>
  )
}
