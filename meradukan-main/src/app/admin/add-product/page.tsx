'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AddProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [userType, setUserType] = useState('admin') // 'admin' or 'vendor'
  const [vendorBrand, setVendorBrand] = useState('My Store') // Mock vendor brand
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Tech',
    subcategory: '',
    price: '',
    originalPrice: '',
    image: '',
    images: [],
    description: '',
    quantity: '10',
    brand: '',
    slug: ''
  })
  
  const [dragActive, setDragActive] = useState(false)

  // Set brand based on user type
  useEffect(() => {
    if (userType === 'admin') {
      setFormData(prev => ({ ...prev, brand: 'ShopWave' }))
    } else {
      setFormData(prev => ({ ...prev, brand: vendorBrand }))
    }
  }, [userType, vendorBrand])

  const categoryOptions = {
    'Tech': ['Mobile Accessories', 'Headphones', 'Chargers', 'Cables', 'Power Banks', 'Speakers'],
    'Home': ['Kitchen', 'Decor', 'Furniture', 'Appliances', 'Storage', 'Lighting'],
    'New Arrivals': ['Best Selling', 'Customizable', 'Diwali Special', 'Fragrance', 'Gifts', 'Pooja Essentials'],
    'Electronics': ['Smartphones', 'Laptops', 'Tablets', 'Cameras', 'Gaming', 'Wearables']
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.originalPrice) {
      alert('Please fill all required fields')
      return
    }
    
    setLoading(true)

    try {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        alert('Please login first')
        router.push('/admin/login')
        return
      }

      // Upload images first
      const uploadedImages = []
      for (const img of formData.images) {
        if (img.file) {
          const formDataImg = new FormData()
          formDataImg.append('file', img.file)
          
          const uploadResponse = await fetch('/api/upload', {
            method: 'POST',
            body: formDataImg
          })
          
          if (uploadResponse.ok) {
            const uploadData = await uploadResponse.json()
            uploadedImages.push(uploadData.url)
          }
        }
      }

      const productData = {
        name: formData.name,
        category: formData.category,
        subcategory: formData.subcategory,
        brand: formData.brand,
        price_original: parseFloat(formData.originalPrice),
        price_discounted: formData.price ? parseFloat(formData.price) : null,
        quantity: parseInt(formData.quantity),
        images: uploadedImages,
        main_image: uploadedImages[0] || null,
        description: formData.description || ''
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      })

      const data = await response.json()
      
      if (data.success) {
        alert('Product added successfully!')
        router.push('/admin/products')
      } else {
        alert('Error: ' + (data.error || 'Failed to add product'))
      }
    } catch (error) {
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Mock function to detect user type - replace with actual auth logic
  useEffect(() => {
    // Check if current path is admin or vendor
    const path = window.location.pathname
    if (path.includes('/admin/')) {
      setUserType('admin')
    } else if (path.includes('/vendor/')) {
      setUserType('vendor')
      // In real app, fetch vendor brand from user profile
      setVendorBrand('My Vendor Store')
    }
  }, [])

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  // Handle file selection
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    handleFiles(files)
  }

  // Process selected files
  const handleFiles = (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    const remainingSlots = 7 - formData.images.length
    const filesToProcess = imageFiles.slice(0, remainingSlots)
    
    filesToProcess.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newImage = {
          file: file,
          preview: e.target.result,
          url: e.target.result // In real app, upload to server and get URL
        }
        
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, newImage]
        }))
      }
      reader.readAsDataURL(file)
    })
  }

  // Remove image
  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">📦 Add New Product</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Enter the details for the new product. Click save to add it.</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={(e) => {
                setFormData(prev => ({
                  ...prev,
                  category: e.target.value,
                  subcategory: ''
                }))
              }}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select category</option>
              <option value="Tech">Tech</option>
              <option value="Home">Home</option>
              <option value="New Arrivals">New Arrivals</option>
              <option value="Electronics">Electronics</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                placeholder="0"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="0"
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>


            
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput').click()}
              style={{
                border: `2px dashed ${dragActive ? '#007bff' : '#ccc'}`,
                borderRadius: '8px',
                padding: '40px 20px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: dragActive ? '#f8f9fa' : '#fafafa',
                marginBottom: '10px'
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>📷</div>
              <p style={{ margin: '0', color: '#666' }}>
                Drag & drop images here or click to browse
              </p>
              <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>
                Supports: JPG, PNG, WebP (Max 7 images)
              </p>
            </div>
            
            <input
              id="fileInput"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            
            {formData.images.length > 0 && (
              <div style={{ marginTop: '15px' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Selected Images ({formData.images.length}/7):</p>
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '5px 0' }}>
                  {formData.images.map((img, index) => (
                    <div 
                      key={index} 
                      style={{ 
                        position: 'relative', 
                        border: '1px solid #ddd', 
                        borderRadius: '4px', 
                        overflow: 'hidden',
                        minWidth: '60px',
                        height: '60px',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        const btn = e.currentTarget.querySelector('.close-btn')
                        if (btn) btn.style.opacity = '1'
                      }}
                      onMouseLeave={(e) => {
                        const btn = e.currentTarget.querySelector('.close-btn')
                        if (btn) btn.style.opacity = '0'
                      }}
                    >
                      <img 
                        src={img.preview} 
                        alt={`Preview ${index + 1}`}
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      />
                      <button
                        type="button"
                        className="close-btn"
                        onClick={() => removeImage(index)}
                        style={{
                          position: 'absolute',
                          top: '2px',
                          right: '2px',
                          background: 'rgba(255,0,0,0.8)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '16px',
                          height: '16px',
                          fontSize: '10px',
                          cursor: 'pointer',
                          opacity: '0',
                          transition: 'opacity 0.2s'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={() => router.push('/admin/products')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </div>
          </form>
        </div>
      </div>
    </div>
  )
  )
}