'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import Logo from './Logo'
import UserProfileDropdown from './UserProfileDropdown'

export default function Header() {
  const { authenticated } = useAuth()
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Logo />
          </Link>
          <div className="hidden md:flex space-x-2">
            <Link href="/" className="text-gray-700 px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">Home</Link>
            <Link href="/courses" className="text-gray-700 px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">Courses</Link>
            <Link href="/blog" className="text-gray-700 px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">Blog</Link>
            <Link href="/about" className="text-gray-700 px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">About</Link>
            <Link href="/services" className="text-gray-700 px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">Services</Link>
            <Link href="/contact" className="text-gray-700 px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">Contact</Link>
          </div>
          <div className="flex space-x-4">
            {authenticated ? (
              <UserProfileDropdown />
            ) : (
              <>
                <Link href="/login" className="text-gray-700 px-4 py-2 rounded-lg border border-blue-400 hover:bg-gray-100">
                  Log In
                </Link>
                <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}