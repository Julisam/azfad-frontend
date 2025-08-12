'use client'

import { useState, useEffect } from 'react'
import { getMyCourses, MyCourse } from '@/lib/api'
import { BookOpen, Clock, Award } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function MyCourses() {
  const [myCourses, setMyCourses] = useState<MyCourse[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchMyCourses()
  }, [])

  const fetchMyCourses = async () => {
    try {
      const courses = await getMyCourses()
      setMyCourses(courses)
    } catch (error) {
      console.error('Failed to fetch my courses:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
            </div>
            <button
              onClick={() => router.push('/courses')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Browse More Courses
            </button>
          </div>

          {myCourses.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No courses enrolled yet</h2>
              <p className="text-gray-600 mb-6">Start your learning journey by enrolling in a course!</p>
              <button
                onClick={() => router.push('/courses')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCourses.map((enrollment) => (
                <div key={enrollment.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={`/images/courses/${enrollment.course.images}` || '/images/course-placeholder.jpg'} 
                    alt={enrollment.course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{enrollment.course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{enrollment.course.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {enrollment.course.duration}
                      </div>
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-1" />
                        {enrollment.course.level}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{enrollment.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${enrollment.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm">
                        Continue Learning
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                        View Details
                      </button>
                    </div>

                    <div className="mt-3 text-xs text-gray-500">
                      Enrolled on {new Date(enrollment.enrolled_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}