import Link from 'next/link'
import { ArrowRight, Code, Users, Award } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-blue-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Empowering the Next Generation of Tech Stars
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Learn cutting-edge programming and technology skills with expert instructors in Nigeria and abroad. Join our hybrid classes - online and physical.
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

      {/* Featured Service */}
      <section>
        <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <div className="max-w-4xl mx-auto text-center">
            {/* <h2 className="text-3xl font-bold mb-6">Featured Programme</h2> */}
            <h3 className="text-2xl font-semibold mb-4">Post-UTME Practice & Simulation Platform</h3>
            <p className="text-xl mb-8 opacity-90">
              Specially designed for university aspirants, including OOU candidates.
              Our comprehensive platform helps students boost confidence, improve speed,
              and master the exact format of university screening tests.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <h4 className="font-semibold mb-2">Real-time CBT Simulation</h4>
                <p className="text-sm opacity-90">Experience the actual exam environment with our authentic simulation</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <h4 className="font-semibold mb-2">Speed Enhancement</h4>
                <p className="text-sm opacity-90">Improve your answering speed with timed practice sessions</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <h4 className="font-semibold mb-2">Confidence Building</h4>
                <p className="text-sm opacity-90">Build confidence through extensive practice and performance tracking</p>
              </div>
            </div>

            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Learn More About Our Platform
            </button>
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