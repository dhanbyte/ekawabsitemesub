'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Eye, Package } from 'lucide-react'

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterVendor, setFilterVendor] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [stats, setStats] = useState({})

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = () => {
    const mockOrders = [
      { id: 'VO001', vendor: 'Tech Store', vendorId: 1, customer: 'John Doe', customerEmail: 'john@example.com', amount: 2999, status: 'pending', date: '2024-01-15', items: 2, products: ['Wireless Headphones', 'Phone Case'] },
      { id: 'VO002', vendor: 'Fashion Hub', vendorId: 2, customer: 'Jane Smith', customerEmail: 'jane@example.com', amount: 1299, status: 'shipped', date: '2024-01-14', items: 3, products: ['Cotton T-Shirt', 'Jeans', 'Shoes'] },
      { id: 'VO003', vendor: 'Home Essentials', vendorId: 3, customer: 'Mike Johnson', customerEmail: 'mike@example.com', amount: 4999, status: 'delivered', date: '2024-01-13', items: 1, products: ['Kitchen Mixer'] },
      { id: 'VO004', vendor: 'Tech Store', vendorId: 1, customer: 'Sarah Wilson', customerEmail: 'sarah@example.com', amount: 799, status: 'processing', date: '2024-01-12', items: 2, products: ['Phone Case', 'Charger'] },
      { id: 'VO005', vendor: 'Fashion Hub', vendorId: 2, customer: 'Alice Brown', customerEmail: 'alice@example.com', amount: 1599, status: 'cancelled', date: '2024-01-10', items: 1, products: ['Designer Bag'] },
      { id: 'VO006', vendor: 'Tech Store', vendorId: 1, customer: 'Bob Wilson', customerEmail: 'bob@example.com', amount: 3499, status: 'delivered', date: '2024-01-08', items: 1, products: ['Laptop Stand'] },
    ]
    
    setOrders(mockOrders)
    
    // Calculate stats
    const totalOrders = mockOrders.length
    const pendingOrders = mockOrders.filter(o => o.status === 'pending').length
    const acceptedOrders = mockOrders.filter(o => ['processing', 'shipped', 'delivered'].includes(o.status)).length
    const rejectedOrders = mockOrders.filter(o => o.status === 'cancelled').length
    const totalRevenue = mockOrders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + o.amount, 0)
    const totalProducts = mockOrders.reduce((sum, o) => sum + o.items, 0)
    
    setStats({
      totalOrders,
      pendingOrders,
      acceptedOrders,
      rejectedOrders,
      totalRevenue,
      totalProducts,
      acceptanceRate: ((acceptedOrders / totalOrders) * 100).toFixed(1)
    })
  }

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    ))
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.vendor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesVendor = filterVendor === 'all' || order.vendor === filterVendor
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus
    
    return matchesSearch && matchesVendor && matchesStatus
  })

  const vendors = [...new Set(orders.map(o => o.vendor))]
  const statuses = [...new Set(orders.map(o => o.status))]

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vendor Orders</h1>
          <p className="text-gray-600">Track and manage all vendor orders ({filteredOrders.length} orders)</p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search orders..."
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

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-blue-600">{stats.totalOrders}</div>
          <div className="text-sm text-gray-600">Total Orders</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-green-600">{stats.acceptedOrders}</div>
          <div className="text-sm text-gray-600">Accepted</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-red-600">{stats.rejectedOrders}</div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-purple-600">{stats.totalProducts}</div>
          <div className="text-sm text-gray-600">Total Products</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-green-600">₹{stats.totalRevenue?.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Revenue</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-orange-600">{stats.acceptanceRate}%</div>
          <div className="text-sm text-gray-600">Accept Rate</div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            All Vendor Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Order ID</th>
                  <th className="text-left p-4">Vendor</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Items</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium">{order.id}</div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{order.vendor}</div>
                        <div className="text-sm text-gray-500">Vendor ID: {order.vendorId}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-gray-500">{order.customerEmail}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="flex items-center gap-1">
                          <Package className="h-4 w-4 text-gray-400" />
                          {order.items} items
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {order.products.join(', ')}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-medium">₹{order.amount.toLocaleString()}</td>
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className={`px-2 py-1 rounded text-sm border ${getStatusColor(order.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4 text-gray-600">{order.date}</td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        {order.status === 'pending' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, 'processing')}
                              className="bg-green-50 text-green-700 hover:bg-green-100"
                            >
                              Accept
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, 'cancelled')}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(`/admin/orders/${order.id}`, '_blank')}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            const details = `Order: ${order.id}\nVendor: ${order.vendor}\nCustomer: ${order.customer} (${order.customerEmail})\nProducts: ${order.products.join(', ')}\nAmount: ₹${order.amount}\nStatus: ${order.status}\nDate: ${order.date}`
                            navigator.clipboard.writeText(details)
                            alert('Order details copied to clipboard!')
                          }}
                        >
                          Copy
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