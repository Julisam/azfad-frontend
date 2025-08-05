'use client'

import { Clock, Users, Star } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getCourses, Course } from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    

    async function fetchCourses() {
      try {
        const data = await getCourses()
        setCourses(data)
      } catch (err) {
        // if (err instanceof Error && err.message.includes('401')) {
        //   // router.push('/login')
        //   setError('Failed to load courses')
        // } else {
        // }
        setError('Failed to load courses')
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [router])

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
                <img src={`http://localhost:3000/images/courses/${course.images}`} alt={course.title} className="h-48 w-full object-cover" />
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
                
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}