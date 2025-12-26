export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Azfad is your trusted tech consulting partner, delivering comprehensive solutions
            to drive your business forward in the digital age.
          </p>
        </div>

        {/* Featured Service */}
        <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Featured Service</h2>
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

        <div><br /><br /></div>

        {/* Azfad Solutions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Tech Consulting */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Tech Consulting</h3>
            <p className="text-gray-600">
              Strategic technology consulting to help businesses leverage cutting-edge solutions,
              optimize processes, and drive digital transformation.
            </p>
          </div>

          {/* Software Development */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Software Development</h3>
            <p className="text-gray-600">
              Custom software solutions tailored to your specific needs. From web applications
              to mobile apps and enterprise systems.
            </p>
          </div>

          {/* Web Development */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Web Development</h3>
            <p className="text-gray-600">
              Modern, responsive websites and web applications using the latest technologies
              and frameworks to ensure optimal performance and user experience.
            </p>
          </div>

          {/* Training & Education */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Training & Education</h3>
            <p className="text-gray-600">
              Comprehensive training programs to upskill your team in the latest technologies,
              programming languages, and development methodologies.
            </p>
          </div>

          {/* Cloud Solutions */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Cloud Solutions</h3>
            <p className="text-gray-600">
              Cloud migration, deployment, and management services to help you leverage
              the power of cloud computing for scalability and efficiency.
            </p>
          </div>

          {/* Digital Solutions */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Digital Solutions</h3>
            <p className="text-gray-600">
              Complete digital transformation solutions including automation,
              system integration, and process optimization.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Let&apos;s discuss how Azfad can help you achieve your technology goals.
          </p>
          <div className="space-x-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Get Started
            </button>
            <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}