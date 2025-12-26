import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { isAuthenticated as checkAuth, logout as apiLogout } from '@/lib/api'

interface AuthContextType {
  authenticated: boolean
  loading: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const isAuth = checkAuth()
        setAuthenticated(isAuth)
      } catch (error) {
        console.error('Auth check failed:', error)
        setAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }
    
    checkAuthStatus()
  }, [])

  const login = () => {
    setAuthenticated(true)
  }

  const logout = () => {
    apiLogout()
    setAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ authenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
