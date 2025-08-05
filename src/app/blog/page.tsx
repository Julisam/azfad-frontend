import Link from 'next/link'
import { Calendar, User, ArrowRight } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React: A Beginner's Guide",
    excerpt: "Learn the fundamentals of React and start building your first component-based applications.",
    author: "AzFad Team",
    date: "2024-01-15",
    category: "Frontend",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Python vs JavaScript: Which Should You Learn First?",
    excerpt: "Compare two of the most popular programming languages and decide which fits your goals.",
    author: "AzFad Team", 
    date: "2024-01-12",
    category: "Programming",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Building Your First Mobile App with React Native",
    excerpt: "Step-by-step guide to creating cross-platform mobile applications.",
    author: "AzFad Team",
    date: "2024-01-10",
    category: "Mobile",
    readTime: "10 min read"
  }
]

export default function Blog() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        {/* Summer Camp Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-8 mb-12">
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
            <Link href="/contact" className="inline-block mt-6 bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
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

        <div className="grid lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-xl font-semibold mb-3 text-black hover:text-blue-600">
                  <Link href={`/blog/${post.id}`}>{post.title}</Link>
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>
                <Link href={`/blog/${post.id}`} className="inline-flex items-center text-blue-600 font-semibold mt-4 hover:text-blue-800">
                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Want to contribute to our blog?</p>
          <Link href="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}