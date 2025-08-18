import { jwtDecode } from 'jwt-decode'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

export interface Course {
  id: number
  title: string
  description: string
  duration: string
  students: number
  rating: number
  price: string
  level: string
  images: string
}

export interface User {
  id: number
  email: string
}

export interface Profile {
  username: string
  first_name: string
  last_name: string
  middlename: string
  email: string
  phone: string
  address: string
  bio: string
  image: string
}

export interface CartItem {
  id: number
  course: Course
  added_at: string
}

export interface MyCourse {
  id: number
  course: Course
  enrolled_at: string
  progress: number
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  author_name: string
  image: string
  created_at: string
}

export interface AuthResponse {
  access: string
  refresh: string
  user: {
    id: number
    email: string
    first_name?: string
    last_name?: string
  }
}

async function getAuthHeaders(): Promise<Record<string, string>> {
  const token = await getValidToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function getValidToken(): Promise<string | null> {
  const token = localStorage.getItem('access_token')
  if (!token) return null

  try {
    const decoded = jwtDecode(token)
    const currentTime = Date.now() / 1000
    
    if (decoded.exp && decoded.exp < currentTime) {
      return await refreshToken()
    }
    
    return token
  } catch (error) {
    console.error('Invalid token:', error)
    logout()
    return null
  }
}

async function refreshToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem('refresh_token')
  if (!refreshToken) {
    logout()
    window.location.href = '/login'
    return null
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken }),
    })

    if (!response.ok) {
      logout()
      window.location.href = '/login'
      return null
    }

    const data = await response.json()
    localStorage.setItem('access_token', data.access)
    return data.access
  } catch (error) {
    console.error('Token refresh failed:', error)
    logout()
    window.location.href = '/login'
    return null
  }
}

export async function getCourses(): Promise<Course[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(await getAuthHeaders()),
      },
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('Network error - check if backend is running on port 8000')
      throw new Error('Unable to connect to server. Please check if the backend is running.')
    }
    console.error('Error fetching courses:', error)
    throw error
  }
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Login failed')
  }
  
  const data = await response.json()
  localStorage.setItem('access_token', data.access)
  localStorage.setItem('refresh_token', data.refresh)
  localStorage.setItem('user_first_name', data.user.first_name || '')
  localStorage.setItem('user_last_name', data.user.last_name || '')
  localStorage.setItem('user_image_filename', data.user.image || '')
  return data
}

export async function register(firstName: string, lastName: string, email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      first_name: firstName,
      last_name: lastName,
      email, 
      password 
    }),
  })
  
  if (!response.ok) {
    const error = await response.json()
    const errorMessage = error.email?.[0] || error.error || 'Registration failed'
    throw new Error(errorMessage)
  }
  
  const data = await response.json()
  localStorage.setItem('access_token', data.access)
  localStorage.setItem('refresh_token', data.refresh)
  localStorage.setItem('user_first_name', data.user.first_name || '')
  localStorage.setItem('user_last_name', data.user.last_name || '')
  localStorage.setItem('user_image_filename', data.user.image || '')
  return data
}

export function logout() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('user_first_name')
  localStorage.removeItem('user_last_name')
  localStorage.removeItem('user_image_filename')
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('access_token')
}

export async function getProfile(): Promise<Profile> {
  const response = await fetch(`${API_BASE_URL}/profile/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(await getAuthHeaders()),
    },
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch profile')
  }
  
  return response.json()
}

export async function updateProfile(profile: Partial<Profile>): Promise<Profile> {
  const response = await fetch(`${API_BASE_URL}/profile/update/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(await getAuthHeaders()),
    },
    body: JSON.stringify(profile),
  })
  
  if (!response.ok) {
    throw new Error('Failed to update profile')
  }
  
  return response.json()
}

export async function uploadProfileImage(imageFile: File, oldFilename?: string): Promise<{ filename: string }> {
  const formData = new FormData()
  formData.append('image', imageFile)
  if (oldFilename) {
    formData.append('oldFilename', oldFilename)
  }

  const response = await fetch('/upload/profile-image', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to upload image')
  }

  return response.json()
}

// Cart functions
export async function addToCart(courseId: number): Promise<CartItem> {
  const response = await fetch(`${API_BASE_URL}/cart/add/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(await getAuthHeaders()),
    },
    body: JSON.stringify({ course_id: courseId }),
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to add to cart')
  }
  
  return response.json()
}

export async function getCart(): Promise<CartItem[]> {
  const response = await fetch(`${API_BASE_URL}/cart/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(await getAuthHeaders()),
    },
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch cart')
  }
  
  return response.json()
}

export async function removeFromCart(cartItemId: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/cart/remove/${cartItemId}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(await getAuthHeaders()),
    },
  })
  
  if (!response.ok) {
    throw new Error('Failed to remove from cart')
  }
}

export async function initializePayment(cartItemIds: number[]): Promise<{authorization_url: string}> {
  const response = await fetch(`${API_BASE_URL}/payment/initialize/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(await getAuthHeaders()),
    },
    body: JSON.stringify({ cart_items: cartItemIds }),
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Payment initialization failed')
  }
  console.log('HELLO')
  return response.json()
  
}

export async function verifyPayment(reference: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/payment/verify/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(await getAuthHeaders()),
    },
    body: JSON.stringify({ reference }),
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Payment verification failed')
  }
}

export async function checkout(cartItemIds: number[]): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/checkout/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(await getAuthHeaders()),
    },
    body: JSON.stringify({ cart_items: cartItemIds }),
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Checkout failed')
  }
}

// My Courses functions
export async function getMyCourses(): Promise<MyCourse[]> {
  const response = await fetch(`${API_BASE_URL}/my-courses/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(await getAuthHeaders()),
    },
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch my courses')
  }
  
  return response.json()
}

// Blog functions
export async function getBlogPosts(): Promise<BlogPost[]> {
  const response = await fetch(`${API_BASE_URL}/blog/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch blog posts')
  }
  
  return response.json()
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const response = await fetch(`${API_BASE_URL}/blog/${slug}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch blog post')
  }
  
  return response.json()
}