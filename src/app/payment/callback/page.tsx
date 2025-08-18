'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { verifyPayment } from '@/lib/api'
import { CheckCircle, XCircle, Loader } from 'lucide-react'

function PaymentCallbackContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const reference = searchParams.get('reference')
    
    if (!reference) {
      setStatus('failed')
      setMessage('Payment reference not found')
      return
    }

    const handleVerification = async () => {
      try {
        await verifyPayment(reference)
        setStatus('success')
        setMessage('Payment successful! Redirecting to your courses...')
        setTimeout(() => router.push('/my-courses'), 3000)
      } catch (error) {
        setStatus('failed')
        setMessage('Payment verification failed')
      }
    }

    handleVerification()
  }, [searchParams, router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
        {status === 'loading' && (
          <>
            <Loader className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-spin" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifying Payment</h2>
            <p className="text-gray-600">Please wait while we confirm your payment...</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={() => router.push('/my-courses')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Go to My Courses
            </button>
          </>
        )}
        
        {status === 'failed' && (
          <>
            <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={() => router.push('/cart')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Back to Cart
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default function PaymentCallback() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><Loader className="w-16 h-16 text-blue-600 animate-spin" /></div>}>
      <PaymentCallbackContent />
    </Suspense>
  )
}