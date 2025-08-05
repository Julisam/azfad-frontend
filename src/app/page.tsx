import Link from 'next/link'
import { ArrowRight, Code, Users, Award } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Empowering the Next Generation of Tech Stars
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Learn cutting-edge programming and technology skills with expert instructors in Ijebu Ode, Nigeria. Join our hybrid classes - online and physical.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/courses" className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Browse Courses
            </Link>
            <Link href="/about" className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Why Choose AzFad Coding Academy?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Code className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-600">Hybrid Learning</h3>
              <p className="text-gray-600">Choose between online live classes or physical sessions in Ijebu Ode, Nigeria.</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-600">Industry Experts</h3>
              <p className="text-gray-600">Learn from prominent tutors with extensive industry experience and expertise.</p>
            </div>
            <div className="text-center">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-600">Certificates</h3>
              <p className="text-gray-600">Earn recognized certificates upon successful completion of your courses.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Frontend Development", duration: "8 weeks", level: "Beginner" },
              { title: "Data Science & AI", duration: "10 weeks", level: "Intermediate" },
              { title: "Mobile App Development", duration: "12 weeks", level: "Beginner" }
            ].map((course, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <h3 className="text-xl font-semibold mb-2 text-black">{course.title}</h3>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>{course.duration}</span>
                  <span>{course.level}</span>
                </div>
                <Link href="/courses" className="text-blue-600 font-semibold flex items-center hover:text-blue-800">
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}