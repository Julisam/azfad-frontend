'use client'

import { useState, useEffect } from 'react'
import { getCart, removeFromCart, checkout, CartItem } from '@/lib/api'
import { Trash2, ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const router = useRouter()

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const items = await getCart()
      setCartItems(items)
      setSelectedItems(items.map(item => item.id))
    } catch (error) {
      console.error('Failed to fetch cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (cartItemId: number) => {
    try {
      await removeFromCart(cartItemId)
      setCartItems(cartItems.filter(item => item.id !== cartItemId))
      setSelectedItems(selectedItems.filter(id => id !== cartItemId))
    } catch (error) {
      console.error('Failed to remove item:', error)
    }
  }

  const handleCheckout = async () => {
    if (selectedItems.length === 0) return
    
    setProcessing(true)
    try {
      await checkout(selectedItems)
      router.push('/my-courses')
    } catch (error) {
      console.error('Checkout failed:', error)
    } finally {
      setProcessing(false)
    }
  }

  const toggleItemSelection = (itemId: number) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const totalPrice = cartItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + parseFloat(item.course.price.replace('₦', '').replace(',', '')), 0)

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
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center mb-8">
            <ShoppingCart className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">My Cart</h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Browse our courses and add some to your cart!</p>
              <button
                onClick={() => router.push('/courses')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-start space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleItemSelection(item.id)}
                        className="mt-1 w-4 h-4 text-blue-600 rounded"
                      />
                      <img
                        src={`/images/courses/${item.course.images}` || '/images/course-placeholder.jpg'}
                        alt={item.course.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{item.course.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{item.course.level} • {item.course.duration}</p>
                        <p className="text-blue-600 font-semibold mt-2">{item.course.price}</p>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Selected Items ({selectedItems.length})</span>
                      <span>₦{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>₦{totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleCheckout}
                    disabled={selectedItems.length === 0 || processing}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processing ? 'Processing...' : 'Proceed to Checkout'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}