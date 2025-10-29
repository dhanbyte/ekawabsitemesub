'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
import { Package, Plus, Edit, Eye, Trash2 } from 'lucide-react'
import ErrorBoundary from '@/components/ErrorBoundary'

function ProductsPageContent() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      // Import product data directly from JSON files
      const { TECH_PRODUCTS } = await import('@/lib/data/tech')
      const { HOME_PRODUCTS } = await import('@/lib/data/home')
      const { NEWARRIVALS_PRODUCTS } = await import('@/lib/data/newarrivals')
      
      // Combine all products
      const allProducts = [...TECH_PRODUCTS, ...HOME_PRODUCTS, ...NEWARRIVALS_PRODUCTS]
      console.log('Admin fetched products:', allProducts.length)
      setProducts(allProducts)
    } catch (error) {
      console.error('Error loading products:', error)
      setProducts([])
      toast({ title: "Error", description: "Failed to load products" })
    } finally {
      setIsLoading(false)
    }
  }

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setProducts(products.filter((p: any) => p.id !== id))
        toast({ title: "Success", description: "Product deleted successfully" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete product" })
    }
  }

  const filteredProducts = products.filter((product: any) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products ({filteredProducts.length})</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-48"
          />
          <Link href="/admin/add-product">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-2 font-medium">Product</th>
                  <th className="text-left p-2 font-medium">Price</th>
                  <th className="text-left p-2 font-medium">Stock</th>
                  <th className="text-left p-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product: any) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-8 h-8 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium truncate max-w-xs">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="font-medium">₹{product.price.discounted || product.price.original}</div>
                      {product.price.discounted && (
                        <div className="text-xs text-gray-500 line-through">₹{product.price.original}</div>
                      )}
                    </td>
                    <td className="p-2">
                      <span className={`px-2 py-1 text-xs rounded ${
                        product.quantity > 5 ? 'bg-green-100 text-green-800' : 
                        product.quantity > 0 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.quantity}
                      </span>
                    </td>
                    <td className="p-2">
                      <div className="flex gap-1">
                        <Button
                          onClick={() => window.open(`/product/${product.slug}`, '_blank')}
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </Link>
                        <Button
                          onClick={() => deleteProduct(product.id)}
                          variant="destructive"
                          size="sm"
                          className="h-6 w-6 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredProducts.length === 0 && !isLoading && (
          <div className="text-center py-8">
            <Package className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <ErrorBoundary>
      <ProductsPageContent />
    </ErrorBoundary>
  )
}