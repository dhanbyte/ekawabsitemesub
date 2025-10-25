'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, Store, Package, TrendingUp, User } from 'lucide-react'

export default function VendorsPage() {
  const [vendors, setVendors] = useState([])
  const [stats, setStats] = useState({
    totalVendors: 0,
    activeVendors: 0,
    totalProducts: 0,
    totalRevenue: 0
  })
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchVendors()
  }, [])

  const fetchVendors = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        window.location.href = '/admin/login'
        return
      }

      const response = await fetch('/api/vendors', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      const data = await response.json()
      if (data.success) {
        setVendors(data.vendors)
        
        const isVendor = data.vendors[0]?.orders !== undefined
        setStats({
          totalVendors: data.vendors.length,
          activeVendors: data.vendors.filter(v => v.status === 'active').length,
          totalProducts: data.vendors.reduce((sum, v) => sum + (isVendor ? v.orders : v.products || 0), 0),
          totalRevenue: data.vendors.reduce((sum, v) => sum + (isVendor ? v.spent : v.revenue || 0), 0)
        })
      }
    } catch (error) {
      console.error('Error fetching vendors:', error)
    }
  }

  const updateVendorStatus = async (vendorId, newStatus) => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/vendors', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ vendorId, status: newStatus })
      })
      
      if (response.ok) {
        fetchVendors()
      } else {
        alert('Failed to update vendor status')
      }
    } catch (error) {
      alert('Failed to update vendor status')
    }
  }

  const deleteVendor = (vendorId) => {
    if (confirm('Are you sure you want to delete this vendor?')) {
      setVendors(vendors.filter(v => v.id !== vendorId))
      fetchVendors() // Refresh stats
    }
  }

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{window.location.pathname.includes('/vendor/') ? 'Customer Management' : 'Vendor Management'}</h1>
        <p className="text-gray-600">{window.location.pathname.includes('/vendor/') ? 'View your customers and their orders' : 'Manage all vendors and their stores'}</p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder={window.location.pathname.includes('/vendor/') ? 'Search customers by name, email, or status...' : 'Search vendors by name, email, or status...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{window.location.pathname.includes('/vendor/') ? 'Total Customers' : 'Total Vendors'}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVendors}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{window.location.pathname.includes('/vendor/') ? 'Active Customers' : 'Active Vendors'}</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeVendors}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{window.location.pathname.includes('/vendor/') ? 'Total Orders' : 'Total Products'}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{window.location.pathname.includes('/vendor/') ? 'Total Sales' : 'Total Revenue'}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{window.location.pathname.includes('/vendor/') ? 'All Customers' : 'All Vendors'} ({filteredVendors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-3 font-medium">{window.location.pathname.includes('/vendor/') ? 'Customer' : 'Vendor'}</th>
                  <th className="text-left p-3 font-medium">Contact</th>
                  <th className="text-left p-3 font-medium">{window.location.pathname.includes('/vendor/') ? 'Orders' : 'Performance'}</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          {window.location.pathname.includes('/vendor/') ? 
                            <User className="h-5 w-5 text-blue-600" /> : 
                            <Store className="h-5 w-5 text-blue-600" />
                          }
                        </div>
                        <div>
                          <h3 className="font-medium">{vendor.name}</h3>
                          <p className="text-sm text-gray-500">Joined: {vendor.joinDate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div>{vendor.email}</div>
                        <div className="text-gray-500">{vendor.phone}</div>
                        <div className="text-gray-500">{vendor.address}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div className="font-medium">{window.location.pathname.includes('/vendor/') ? `${vendor.orders || 0} Orders` : `${vendor.products || 0} Products`}</div>
                        <div className="text-green-600">₹{(vendor.spent || vendor.revenue || 0).toLocaleString()}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant={
                        vendor.status === 'active' ? 'default' : 
                        vendor.status === 'pending' ? 'secondary' : 'destructive'
                      }>
                        {vendor.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        {!window.location.pathname.includes('/vendor/') ? (
                          // Admin actions for vendors
                          <>
                            {vendor.status === 'pending' && (
                              <>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => updateVendorStatus(vendor.id, 'active')}
                                >
                                  Approve
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => updateVendorStatus(vendor.id, 'rejected')}
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                            {vendor.status === 'active' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => updateVendorStatus(vendor.id, 'suspended')}
                              >
                                Suspend
                              </Button>
                            )}
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => window.open(`/admin/vendors/${vendor.id}`, '_blank')}
                            >
                              View
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => deleteVendor(vendor.id)}
                            >
                              Delete
                            </Button>
                          </>
                        ) : (
                          // Vendor actions for customers
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => window.open(`/vendor/customers/${vendor.id}`, '_blank')}
                            >
                              View Orders
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => alert('Contact customer: ' + vendor.email)}
                            >
                              Contact
                            </Button>
                          </>
                        )}
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