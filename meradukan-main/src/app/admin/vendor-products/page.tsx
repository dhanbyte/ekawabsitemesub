'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Package, Eye, Edit, Trash2 } from 'lucide-react'

export default function VendorProductsPage() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterVendor, setFilterVendor] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = () => {
    setProducts([
      { id: 1, name: 'Wireless Headphones', vendor: 'Tech Store', vendorId: 1, price: 2999, stock: 45, status: 'active', category: 'Electronics', addedDate: '2024-01-10' },
      { id: 2, name: 'Cotton T-Shirt', vendor: 'Fashion Hub', vendorId: 2, price: 599, stock: 0, status: 'out_of_stock', category: 'Clothing', addedDate: '2024-01-12' },
      { id: 3, name: 'Kitchen Mixer', vendor: 'Home Essentials', vendorId: 3, price: 4999, stock: 23, status: 'active', category: 'Home', addedDate: '2024-01-08' },
      { id: 4, name: 'Smartphone Case', vendor: 'Tech Store', vendorId: 1, price: 399, stock: 67, status: 'active', category: 'Electronics', addedDate: '2024-01-15' },
      { id: 5, name: 'Bluetooth Speaker', vendor: 'Tech Store', vendorId: 1, price: 1999, stock: 12, status: 'pending', category: 'Electronics', addedDate: '2024-01-18' },
    ])
  }

  const updateProductStatus = (productId, newStatus) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, status: newStatus } : p
    ))
  }

  const deleteProduct = (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId))
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.vendor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesVendor = filterVendor === 'all' || product.vendor === filterVendor
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus
    
    return matchesSearch && matchesVendor && matchesStatus
  })

  const vendors = [...new Set(products.map(p => p.vendor))]
  const statuses = [...new Set(products.map(p => p.status))]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vendor Products</h1>
          <p className="text-gray-600">Manage all products from vendors ({filteredProducts.length} products)</p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded"
          />
          <select
            value={filterVendor}
            onChange={(e) => setFilterVendor(e.target.value)}
            className="px-3 py-2 border rounded"
          >
            <option value="all">All Vendors</option>
            {vendors.map(vendor => (
              <option key={vendor} value={vendor}>{vendor}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border rounded"
          >
            <option value="all">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            All Vendor Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Product</th>
                  <th className="text-left p-4">Vendor</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-left p-4">Stock</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.category}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{product.vendor}</div>
                        <div className="text-sm text-gray-500">Added: {product.addedDate}</div>
                      </div>
                    </td>
                    <td className="p-4 font-medium">₹{product.price.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        product.stock > 10 ? 'bg-green-100 text-green-800' :
                        product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge variant={
                        product.status === 'active' ? 'default' : 
                        product.status === 'pending' ? 'secondary' : 'destructive'
                      }>
                        {product.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        {product.status === 'pending' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateProductStatus(product.id, 'active')}
                            >
                              Approve
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => updateProductStatus(product.id, 'rejected')}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(`/product/${product.id}`, '_blank')}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => deleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}