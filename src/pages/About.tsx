import { Target, Users, Award, BookOpen } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">About AzFad Coding Academy</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Empowering the Next Generation of Tech Stars through quality programming education
            in Ijebu Ode, Nigeria and online worldwide.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-100 mb-6">
                To empower the next generation of tech stars by providing world-class programming
                education in Nigeria. We bridge the gap between traditional education and industry
                demands through practical, hands-on learning experiences.
              </p>
              <p className="text-gray-100">
                Our curriculum is designed by prominent industry experts and covers all major
                technologies including frontend, backend, mobile, data science, AI, and more.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg text-gray-600">
              <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Target className="w-5 h-5 text-blue-600 mr-3" />
                  Hybrid learning (online & physical)
                </li>
                <li className="flex items-center">
                  <Users className="w-5 h-5 text-blue-600 mr-3" />
                  Prominent industry tutors
                </li>
                <li className="flex items-center">
                  <Award className="w-5 h-5 text-blue-600 mr-3" />
                  Recognized certificates
                </li>
                <li className="flex items-center">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                  All tech stacks covered
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-600">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">New</div>
              <div className="text-gray-600">Fresh Start</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-600">Tech Stacks</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">Expert</div>
              <div className="text-gray-600">Industry Tutors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">Hybrid</div>
              <div className="text-gray-600">Learning Mode</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
