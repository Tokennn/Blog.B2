'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { gsap } from 'gsap'

const navItems = [
  { href: '/', label: 'Accueil' },
  { href: '/about', label: 'À Propos' },
  { href: '/company', label: 'Entreprise' },
  { href: '/posts', label: 'Posts' },
  { href: '/contact', label: 'Contact' }
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Animation d'entrée de la navigation
    gsap.fromTo(
      '.nav-container',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.2 }
    )

    gsap.fromTo(
      '.nav-item',
      { y: -20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        ease: 'power2.out', 
        delay: 0.5,
        stagger: 0.1
      }
    )
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    
    if (!isOpen) {
      gsap.to('.mobile-menu', {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      })
    } else {
      gsap.to('.mobile-menu', {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.in'
      })
    }
  }

  return (
    <nav className="nav-container fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="nav-item flex items-center">
            <img 
              src="/logo-h100.png.png" 
              alt="Logo Blog" 
              className="h-14 w-auto hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:text-white hover:bg-gray-800 ${
                  pathname === item.href ? 'text-white bg-gray-800' : 'text-gray-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden nav-item p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="mobile-menu md:hidden absolute top-16 left-0 right-0 bg-black/98 backdrop-blur-sm border-b border-gray-800 opacity-0 -translate-y-5">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:text-white hover:bg-gray-800 ${
                    pathname === item.href ? 'text-white bg-gray-800' : 'text-gray-300'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}