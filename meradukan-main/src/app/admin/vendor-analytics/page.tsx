'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, TrendingUp, Users, Package, DollarSign } from 'lucide-react'

export default function VendorAnalyticsPage() {
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    activeVendors: 0,
    topVendors: [],
    monthlyData: [],
    categoryData: []
  })
  const [timeRange, setTimeRange] = useState('30d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = () => {
    setLoading(true)
    
    // Mock comprehensive analytics data
    const mockData = {
      totalRevenue: 485000,
      totalOrders: 234,
      activeVendors: 15,
      pendingVendors: 3,
      totalProducts: 456,
      avgOrderValue: 2073,
      topVendors: [
        { 
          id: 1, 
          name: 'Tech Store', 
          email: 'tech@store.com',
          revenue: 185000, 
          orders: 78, 
          products: 45,
          growth: '+18%', 
          rating: 4.8,
          joinDate: '2023-12-01',
          status: 'active'
        },
        { 
          id: 2, 
          name: 'Home Essentials', 
          email: 'home@essentials.com',
          revenue: 156000, 
          orders: 67, 
          products: 89,
          growth: '+15%', 
          rating: 4.6,
          joinDate: '2023-11-15',
          status: 'active'
        },
        { 
          id: 3, 
          name: 'Fashion Hub', 
          email: 'fashion@hub.com',
          revenue: 144000, 
          orders: 89, 
          products: 123,
          growth: '+22%', 
          rating: 4.7,
          joinDate: '2023-10-20',
          status: 'active'
        },
      ],
      monthlyData: [
        { month: 'Jan', revenue: 45000, orders: 23 },
        { month: 'Feb', revenue: 52000, orders: 28 },
        { month: 'Mar', revenue: 48000, orders: 25 },
        { month: 'Apr', revenue: 65000, orders: 34 },
        { month: 'May', revenue: 78000, orders: 42 },
        { month: 'Jun', revenue: 85000, orders: 48 },
      ],
      categoryData: [
        { category: 'Electronics', vendors: 5, revenue: 245000, orders: 125 },
        { category: 'Fashion', vendors: 4, revenue: 156000, orders: 89 },
        { category: 'Home & Garden', vendors: 3, revenue: 84000, orders: 45 },
        { category: 'Sports', vendors: 2, revenue: 67000, orders: 34 },
        { category: 'Books', vendors: 1, revenue: 23000, orders: 12 },
      ]
    }
    
    setTimeout(() => {
      setAnalytics(mockData)
      setLoading(false)
    }, 500)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vendor Analytics</h1>
          <p className="text-gray-600">Performance insights for all vendors</p>
        </div>
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          {/* Main Stats */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="bg-white p-4 rounded-lg shadow border">
              <div className="text-2xl font-bold text-green-600">₹{analytics.totalRevenue?.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <div className="text-2xl font-bold text-blue-600">{analytics.totalOrders}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <div className="text-2xl font-bold text-purple-600">{analytics.activeVendors}</div>
              <div className="text-sm text-gray-600">Active Vendors</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <div className="text-2xl font-bold text-yellow-600">{analytics.pendingVendors}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <div className="text-2xl font-bold text-orange-600">{analytics.totalProducts}</div>
              <div className="text-sm text-gray-600">Total Products</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <div className="text-2xl font-bold text-red-600">₹{analytics.avgOrderValue}</div>
              <div className="text-sm text-gray-600">Avg Order</div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Monthly Trends */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Monthly Revenue Trends</h3>
              <div className="space-y-3">
                {analytics.monthlyData?.map((data, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">{data.month}</span>
                    <div className="text-right">
                      <div className="font-bold text-green-600">₹{data.revenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{data.orders} orders</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Performance */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Category Performance</h3>
              <div className="space-y-3">
                {analytics.categoryData?.map((cat, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <div className="font-medium">{cat.category}</div>
                      <div className="text-sm text-gray-500">{cat.vendors} vendors</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">₹{cat.revenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{cat.orders} orders</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Top Vendors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Top Performing Vendors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-3 font-medium">Rank</th>
                  <th className="text-left p-3 font-medium">Vendor</th>
                  <th className="text-left p-3 font-medium">Performance</th>
                  <th className="text-left p-3 font-medium">Growth</th>
                  <th className="text-left p-3 font-medium">Rating</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {analytics.topVendors?.map((vendor, index) => (
                  <tr key={vendor.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div>
                        <h3 className="font-medium">{vendor.name}</h3>
                        <p className="text-sm text-gray-500">{vendor.email}</p>
                        <p className="text-xs text-gray-400">Since {vendor.joinDate}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div className="font-bold text-green-600">₹{vendor.revenue.toLocaleString()}</div>
                        <div className="text-gray-600">{vendor.orders} orders</div>
                        <div className="text-gray-600">{vendor.products} products</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="h-3 w-3" />
                        <span className="font-medium">{vendor.growth}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-medium">{vendor.rating}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(`/admin/vendors/${vendor.id}`, '_blank')}
                        >
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            const details = `Vendor: ${vendor.name}\nRevenue: ₹${vendor.revenue.toLocaleString()}\nOrders: ${vendor.orders}\nProducts: ${vendor.products}\nGrowth: ${vendor.growth}\nRating: ${vendor.rating}`
                            navigator.clipboard.writeText(details)
                            alert('Vendor details copied!')
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