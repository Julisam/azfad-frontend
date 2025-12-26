import { useRef } from 'react'
import Logo from '@/components/Logo'

export default function LogoExport() {
  const logoRef = useRef<HTMLDivElement>(null)

  const downloadAsJPEG = () => {
    if (!logoRef.current) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 400
    canvas.height = 200

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const svgData = new XMLSerializer().serializeToString(logoRef.current.querySelector('svg')!)
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)

    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 50, 50, 100, 100)

      ctx.fillStyle = '#1e3a8a'
      ctx.font = 'bold 32px Arial'
      ctx.fillText('AzFad', 170, 90)

      ctx.fillStyle = '#6b7280'
      ctx.font = '18px Arial'
      ctx.fillText('Coding Academy', 170, 115)

      canvas.toBlob((blob) => {
        if (blob) {
          const link = document.createElement('a')
          link.download = 'azfad-logo.jpg'
          link.href = URL.createObjectURL(blob)
          link.click()
        }
      }, 'image/jpeg', 0.9)

      URL.revokeObjectURL(url)
    }
    img.src = url
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-3xl font-bold mb-8">Logo Export</h1>

        <div className="bg-white p-8 rounded-lg shadow-lg inline-block mb-8">
          <div ref={logoRef}>
            <Logo size="lg" />
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={downloadAsJPEG}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Download as JPEG
          </button>
        </div>
      </div>
    </div>
  )
}
