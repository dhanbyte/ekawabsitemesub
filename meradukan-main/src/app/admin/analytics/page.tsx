'use client'
import { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, Users, ShoppingCart } from 'lucide-react'

export default function AnalyticsPage() {
  const [stats, setStats] = useState(null)
  const [topProducts, setTopProducts] = useState(null)
  const [salesTrends, setSalesTrends] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d')

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    setIsLoading(true)
    
    // Always use mock data for consistent display
    const mockStats = {
      totalRevenue: 485000,
      totalOrders: 234,
      totalUsers: 1567,
      avgOrderValue: 2073
    }
    
    const mockProducts = [
      { name: 'Wireless Bluetooth Earbuds', unitsSold: 145, revenue: 289750, category: 'Electronics', growth: '+23%' },
      { name: 'Smart Fitness Watch', unitsSold: 98, revenue: 245000, category: 'Wearables', growth: '+18%' },
      { name: 'Phone Case Premium', unitsSold: 234, revenue: 93600, category: 'Accessories', growth: '+15%' },
      { name: 'Wireless Charger', unitsSold: 87, revenue: 86130, category: 'Electronics', growth: '+12%' },
      { name: 'Bluetooth Speaker', unitsSold: 76, revenue: 75240, category: 'Audio', growth: '+8%' }
    ]
    
    const mockTrends = [
      { date: '2024-01-01', sales: 12000, orders: 24 },
      { date: '2024-01-02', sales: 15000, orders: 31 },
      { date: '2024-01-03', sales: 18000, orders: 36 },
      { date: '2024-01-04', sales: 14000, orders: 28 },
      { date: '2024-01-05', sales: 22000, orders: 44 },
      { date: '2024-01-06', sales: 19000, orders: 38 },
      { date: '2024-01-07', sales: 25000, orders: 50 }
    ]
    
    // Simulate API delay
    setTimeout(() => {
      setStats(mockStats)
      setTopProducts(mockProducts)
      setSalesTrends(mockTrends)
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {!stats ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          ))
        ) : (
          <>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold">₹{stats.totalRevenue?.toLocaleString() || 0}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold">{stats.totalOrders || 0}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Customers</p>
                  <p className="text-2xl font-bold">{stats.totalUsers || 0}</p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Order Value</p>
                  <p className="text-2xl font-bold">₹{stats.avgOrderValue || 0}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-500" />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sales Trends */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Sales Trends</h2>
          </div>
          <div className="p-6">
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {salesTrends?.map((trend: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded border">
                    <div>
                      <div className="text-sm font-medium">{new Date(trend.date).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500">{trend.orders} orders</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">₹{trend.sales.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">revenue</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Top Selling Products</h2>
          </div>
          <div className="p-6">
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded animate-pulse">
                    <div>
                      <div className="h-4 bg-gray-200 rounded mb-2 w-32"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="text-right">
                      <div className="h-4 bg-gray-200 rounded mb-2 w-16"></div>
                      <div className="h-3 bg-gray-200 rounded w-12"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-3 font-medium">Rank</th>
                    <th className="text-left p-3 font-medium">Product</th>
                    <th className="text-left p-3 font-medium">Sales</th>
                    <th className="text-left p-3 font-medium">Revenue</th>
                    <th className="text-left p-3 font-medium">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts?.map((product: any, index: number) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">#{index + 1}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div>
                          <h3 className="font-medium text-sm">{product.name}</h3>
                          <p className="text-xs text-gray-500">{product.category}</p>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-sm">
                          <div className="font-medium">{product.unitsSold} units</div>
                          <div className="text-gray-500 text-xs">sold</div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-green-600">₹{product.revenue?.toLocaleString()}</div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1 text-green-600 text-sm">
                          <TrendingUp className="h-3 w-3" />
                          {product.growth}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}