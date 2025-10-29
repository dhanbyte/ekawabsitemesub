'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { OverviewChart } from '@/components/overview-chart';
import { salesData } from '@/lib/data';

// Mock admin data
const adminStats = {
  totalVendors: 25,
  activeVendors: 22,
  pendingVendors: 3,
  totalProducts: 1250,
  totalOrders: 3420,
  totalRevenue: 125000,
  monthlyGrowth: 12.5
};

const recentVendors = [
  { id: 1, name: 'TechCorp Solutions', email: 'contact@techcorp.com', status: 'active', joinDate: '2024-01-15', products: 45 },
  { id: 2, name: 'Fashion Hub', email: 'info@fashionhub.com', status: 'pending', joinDate: '2024-01-20', products: 0 },
  { id: 3, name: 'Electronics Plus', email: 'sales@electronicsplus.com', status: 'active', joinDate: '2024-01-18', products: 78 },
  { id: 4, name: 'Home Essentials', email: 'support@homeessentials.com', status: 'active', joinDate: '2024-01-22', products: 32 },
  { id: 5, name: 'Sports World', email: 'contact@sportsworld.com', status: 'pending', joinDate: '2024-01-25', products: 0 },
];

const recentOrders = [
  { id: 'ORD001', vendor: 'TechCorp Solutions', customer: 'John Doe', amount: 299.99, status: 'delivered', date: '2024-01-25' },
  { id: 'ORD002', vendor: 'Electronics Plus', customer: 'Jane Smith', amount: 149.99, status: 'shipped', date: '2024-01-25' },
  { id: 'ORD003', vendor: 'Home Essentials', customer: 'Bob Johnson', amount: 89.99, status: 'processing', date: '2024-01-24' },
  { id: 'ORD004', vendor: 'TechCorp Solutions', customer: 'Alice Brown', amount: 199.99, status: 'pending', date: '2024-01-24' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'delivered': return 'bg-green-100 text-green-800';
    case 'shipped': return 'bg-blue-100 text-blue-800';
    case 'processing': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function AdminDashboard() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-semibold">Admin Dashboard</h1>
        <Button>Generate Report</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.totalVendors}</div>
            <p className="text-xs text-muted-foreground">
              {adminStats.pendingVendors} pending approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.totalProducts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all vendors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.totalOrders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${adminStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{adminStats.monthlyGrowth}% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Platform Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue across all vendors</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart data={salesData} />
          </CardContent>
        </Card>

        {/* Recent Vendors */}
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Recent Vendors</CardTitle>
            <CardDescription>
              Latest vendor registrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentVendors.slice(0, 4).map((vendor) => (
                <div className="flex items-center justify-between" key={vendor.id}>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://picsum.photos/seed/${vendor.name}/100`} />
                      <AvatarFallback>{vendor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{vendor.name}</p>
                      <p className="text-xs text-muted-foreground">{vendor.products} products</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(vendor.status)}>
                    {vendor.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Recent Orders</CardTitle>
          <CardDescription>Latest orders across all vendors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.vendor}</p>
                  </div>
                  <div>
                    <p className="text-sm">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="font-medium">${order.amount}</p>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}