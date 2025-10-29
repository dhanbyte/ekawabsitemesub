'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
import { ShoppingCart, ArrowLeft, Search, Package, Truck, CheckCircle, Clock, MapPin, Copy, FileText } from 'lucide-react'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        window.location.href = '/admin/login'
        return
      }

      const response = await fetch('/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      const data = await response.json()
      if (data.success) {
        setOrders(data.orders)
      } else {
        console.error('Failed to fetch orders:', data.error)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/orders', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ orderId, status })
      })

      const data = await response.json()
      
      if (data.success) {
        toast({ title: "Success", description: `Order status updated to ${status}` })
        fetchOrders()
      } else {
        toast({ title: "Error", description: data.error || 'Update failed' })
      }
    } catch (error) {
      console.error('Update error:', error);
      toast({ title: "Error", description: "Failed to update order" })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />
      case 'processing': return <Package className="h-4 w-4" />
      case 'shipped': return <Truck className="h-4 w-4" />
      case 'delivered': return <CheckCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-600'
      case 'processing': return 'bg-blue-100 text-blue-600'
      case 'shipped': return 'bg-purple-100 text-purple-600'
      case 'delivered': return 'bg-green-100 text-green-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const filteredOrders = orders.filter(order =>
    order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">📦 Order Management</h1>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">All Orders ({filteredOrders.length})</h2>
          </div>
          
          {isLoading ? (
            <div className="p-6">
              <div className="animate-pulse space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-12 text-center">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">No orders found</p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredOrders.map((order) => (
                <div key={order._id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">Order #{order.orderId}</h3>
                      <p className="text-sm text-gray-500">Customer: {order.userId}</p>
                      <p className="text-sm text-gray-500">
                        Date: {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-blue-600 font-medium">
                        Payment: {order.paymentMethod || (Math.random() > 0.5 ? 'Prepaid' : 'COD')}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">₹{order.total?.toLocaleString()}</div>
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Items:</h4>
                    <div className="space-y-2">
                      {order.items?.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm">
                          <img 
                            src={item.image || '/images/placeholder.jpg'} 
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="flex-1">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-gray-500 ml-2">x{item.quantity}</span>
                          </div>
                          <span className="font-medium">₹{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Details */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-2 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Customer Details:
                    </h4>
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded relative">
                      <div className="space-y-1">
                        <div><strong>Email:</strong> {order.userId}</div>
                        {order.shippingAddress && (
                          <>
                            <div><strong>Name:</strong> {order.shippingAddress.name}</div>
                            <div><strong>Phone:</strong> {order.shippingAddress.phone}</div>
                            <div><strong>Address:</strong> {order.shippingAddress.address}</div>
                            <div><strong>City:</strong> {order.shippingAddress.city}</div>
                            <div><strong>State:</strong> {order.shippingAddress.state}</div>
                            <div><strong>Pincode:</strong> {order.shippingAddress.pincode}</div>
                          </>
                        )}
                        {order.paymentId && <div><strong>Payment ID:</strong> {order.paymentId}</div>}
                        {order.paymentMethod && <div><strong>Payment Method:</strong> {order.paymentMethod}</div>}
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="absolute top-2 right-2"
                        onClick={() => {
                          const details = `Order: ${order.orderId}\nCustomer: ${order.userId}\n${order.shippingAddress ? `Name: ${order.shippingAddress.name}\nPhone: ${order.shippingAddress.phone}\nAddress: ${order.shippingAddress.address}\nCity: ${order.shippingAddress.city}\nState: ${order.shippingAddress.state}\nPincode: ${order.shippingAddress.pincode}` : ''}\n${order.paymentId ? `Payment ID: ${order.paymentId}` : ''}\nTotal: ₹${order.total}`
                          navigator.clipboard.writeText(details)
                          toast({ title: "Copied!", description: "Customer details copied to clipboard" })
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 items-center">
                    {order.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => updateOrderStatus(order.orderId || order._id, 'processing')}
                        >
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => updateOrderStatus(order.orderId || order._id, 'cancelled')}
                        >
                          Decline
                        </Button>
                      </>
                    )}
                    
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.orderId || order._id, e.target.value)}
                      className="px-3 py-1 border rounded text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    
                    <Link href={`/admin/orders/invoice/${order.orderId || order._id}`}>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <FileText className="h-4 w-4 mr-1" />
                        Invoice
                      </Button>
                    </Link>
                    
                    {order.status === 'shipped' && (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Tracking ID"
                          className="px-2 py-1 border rounded text-sm w-32"
                          defaultValue={order.trackingId || ''}
                          onBlur={(e) => {
                            console.log('Update tracking:', e.target.value)
                          }}
                        />
                        <Button size="sm" variant="outline">
                          Track
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}