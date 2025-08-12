'use client'

import { useState, useEffect } from 'react'
import { getProfile, updateProfile, uploadProfileImage, Profile } from '@/lib/api'
import ProtectedRoute from '@/components/ProtectedRoute'
import imageCompression from 'browser-image-compression'

function capitalizeFirstLetter(input: string | null): string {
  if (input === null || input.length === 0) {
    return "";
  }
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<Profile>({
    username: '',
    first_name: '',
    last_name: '',
    middlename: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    image: ''
  })
  const [loading, setLoading] = useState(true)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const data = await getProfile()
      setProfile(data)
    } catch (error) {
      console.error('Failed to load profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!profile.first_name.trim() || !profile.last_name.trim()) {
      alert('First name and last name are required fields.')
      return
    }
    try {
      const updatedProfile = await updateProfile(profile)
      setProfile(updatedProfile)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to save profile:', error)
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 800,
          useWebWorker: true
        }
        
        const compressedFile = await imageCompression(file, options)
        setImageFile(compressedFile)
        
        const reader = new FileReader()
        reader.onload = () => setImagePreview(reader.result as string)
        reader.readAsDataURL(compressedFile)
      } catch (error) {
        console.error('Image compression error:', error)
      }
    }
  }

  const handleImageUpload = async () => {
    if (!imageFile) return
    
    setUploadingImage(true)
    try {
      const oldFilename = profile.image
      const { filename } = await uploadProfileImage(imageFile, oldFilename)
      
      const updatedProfile = await updateProfile({ image: filename })
      setProfile(updatedProfile)
      localStorage.setItem('user_image_filename', filename)
      
      setImageFile(null)
      setImagePreview(null)
    } catch (error) {
      console.error('Failed to upload image:', error)
    } finally {
      setUploadingImage(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <div className="flex items-start space-x-8">
            <div className="flex-shrink-0">
              <div className="relative">
                {imagePreview || (profile.image && `/profilepics/${profile.image}`) ? (
                  <img
                    src={imagePreview || `/profilepics/${profile.image}`}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                    {profile.first_name[0] + profile.last_name[0]}
                  </div>
                )}
                
                {isEditing && (
                  <div className="mt-4 space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="text-xs text-gray-500 mt-1">Images will be automatically compressed to under 1MB</p>
                    {imageFile && (
                      <button
                        onClick={handleImageUpload}
                        disabled={uploadingImage}
                        className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
                      >
                        {uploadingImage ? 'Uploading...' : 'Upload Image'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-6 text-black">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                {isEditing ? (
                  <input
                  type="text"
                  value={profile.username}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value.toLowerCase() })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profile.username}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Surname *</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.last_name}
                    onChange={(e) => setProfile({ ...profile, last_name: capitalizeFirstLetter(e.target.value) })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profile.last_name}</p>
                )}
              </div>

              
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.first_name}
                    onChange={(e) => setProfile({ ...profile, first_name: capitalizeFirstLetter(e.target.value) })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profile.first_name}</p>
                )}
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.middlename}
                    onChange={(e) => setProfile({ ...profile, middlename: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profile.middlename}</p>
                )}
              </div>



              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <p className="text-gray-900">{profile.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profile.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profile.address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profile.bio}</p>
                )}
              </div>

              {isEditing && (
                <div className="flex space-x-4">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </ProtectedRoute>
  )
}