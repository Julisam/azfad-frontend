import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getBlogPosts } from '@/lib/api'
import type { BlogPost } from '@/lib/api'

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const posts = await getBlogPosts()
        setBlogPosts(posts)
      } catch (error) {
        console.error('Failed to fetch blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-xl">Loading blog posts...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        {/* Summer Camp Banner */}
        <div className="bg-linear-to-r from-orange-500 to-red-500 text-white rounded-lg p-8 mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">🏕️ Summer Coding Camp 2024</h2>
            <p className="text-xl mb-6">
              4-week intensive coding program for secondary school students during holidays!
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <span>📅 Duration: 4 weeks</span>
              <span>🎯 Target: Secondary school students</span>
              <span>📍 Location: Ijebu Ode, Nigeria</span>
            </div>
            <Link to="/contact" className="inline-block mt-6 bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Register Now
            </Link>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-600">Coding Tutorials & Insights</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn programming concepts, get industry insights, and stay updated with the latest tech trends.
          </p>
        </div>

        {blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No blog posts yet</h2>
            <p className="text-gray-600">Check back soon for exciting content!</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="h-48 bg-linear-to-br from-blue-500 to-purple-600"></div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-3 text-black hover:text-blue-600">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author_name}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <Link to={`/blog/${post.slug}`} className="inline-flex items-center text-blue-600 font-semibold mt-4 hover:text-blue-800">
                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Want to contribute to our blog?</p>
          <Link to="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
