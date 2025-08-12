'use client'

import { Clock, Users, Star, ShoppingCart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getCourses, Course, addToCart } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [addingToCart, setAddingToCart] = useState<number | null>(null)
  const { authenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    
    async function fetchCourses() {
      try {
        const data = await getCourses()
        setCourses(data)
      } catch (err: unknown) {
        // if (err instanceof Error && err.message.includes('401')) {
        //   // router.push('/login')
        //   setError('Failed to load courses')
        // } else {
        // }
        console.log(err)
        setError('Failed to load courses')
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [router])

  const handleAddToCart = async (courseId: number) => {
    setAddingToCart(courseId)
    try {
      await addToCart(courseId)
      // Show success message or redirect to cart
      router.push('/cart')
    } catch (error) {
      console.error('Failed to add to cart:', error)
      // Show error message
    } finally {
      setAddingToCart(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-xl">Loading courses...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-black">Our Courses</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our comprehensive selection of technology courses. Available online and in-person at Ijebu Ode, Nigeria.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              {course.images ? (
                <img src={`/images/courses/${course.images}`} alt={course.title} className="h-48 w-full object-cover" />
              ) : (
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600"></div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{course.level}</span>
                  <span className="text-2xl font-bold text-green-600">{course.price}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {course.students} students
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {authenticated ? (
                    <>
                      <button
                        onClick={() => handleAddToCart(course.id)}
                        disabled={addingToCart === course.id}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center"
                      >
                        {addingToCart === course.id ? (
                          'Adding...'
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => router.push('/cart')}
                        className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                      >
                        Cart
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => router.push('/login')}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Login to Enroll
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}