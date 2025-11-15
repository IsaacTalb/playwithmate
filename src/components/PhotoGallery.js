import { useState, useEffect } from 'react'
import { uploadPhoto, fetchGallery, deletePhoto } from '../../utils/googleDriveService'

export default function PhotoGallery() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadGallery()
  }, [])

  async function loadGallery() {
    setLoading(true)
    setError(null)
    try {
      const galleryPhotos = await fetchGallery()
      setPhotos(galleryPhotos)
    } catch (err) {
      setError('Failed to load gallery')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleFileUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }

    setUploading(true)
    setError(null)

    try {
      await uploadPhoto(file)
      await loadGallery() // Refresh gallery
    } catch (err) {
      setError('Upload failed. Make sure Apps Script is configured.')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(fileId) {
    if (!confirm('Delete this photo?')) return

    try {
      await deletePhoto(fileId)
      await loadGallery()
    } catch (err) {
      setError('Failed to delete photo')
      console.error(err)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Photo Gallery</h2>

      {/* Upload Section */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <label className="flex items-center justify-center w-full cursor-pointer">
          <div className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:border-blue-500 dark:hover:border-blue-400">
            <div className="text-3xl mb-2">📸</div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {uploading ? 'Uploading...' : 'Click to upload or drag photos'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Images only, max 5MB
            </p>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded">
          {error}
        </div>
      )}

      {/* Gallery Grid */}
      {loading ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Loading gallery...
        </div>
      ) : photos.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No photos yet. Upload your first photo!
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group">
              <img
                src={photo.thumbnail || photo.url}
                alt={photo.name}
                className="w-full h-32 object-cover rounded-lg shadow"
              />
              <button
                onClick={() => handleDelete(photo.id)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete photo"
              >
                ✕
              </button>
              <a
                href={photo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-black/20 flex items-center justify-center transition-opacity"
              >
                <span className="text-white text-2xl">🔍</span>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
