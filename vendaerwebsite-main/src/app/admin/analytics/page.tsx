'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { OverviewChart } from '@/components/overview-chart';
import { salesData } from '@/lib/data';
import { TrendingUp, Users, Package, ShoppingCart, DollarSign } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const analyticsData = {
  totalRevenue: 245000,
  revenueGrowth: 18.2,
  totalVendors: 25,
  activeVendors: 22,
  totalProducts: 1250,
  totalOrders: 3420,
  topVendors: [
    { name: 'Electronics Plus', revenue: 85000, orders: 1200, growth: 25.5 },
    { name: 'TechCorp Solutions', revenue: 67000, orders: 890, growth: 15.2 },
    { name: 'Home Essentials', revenue: 45000, orders: 650, growth: 12.8 },
    { name: 'Fashion Hub', revenue: 32000, orders: 480, growth: 8.5 },
  ],
  categoryStats: [
    { category: 'Electronics', percentage: 45, revenue: 110250 },
    { category: 'Furniture', percentage: 30, revenue: 73500 },
    { category: 'Fashion', percentage: 15, revenue: 36750 },
    { category: 'Home & Garden', percentage: 10, revenue: 24500 },
  ]
};

export default function AdminAnalyticsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-semibold">Platform Analytics</h1>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analyticsData.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{analyticsData.revenueGrowth}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.activeVendors}</div>
            <p className="text-xs text-muted-foreground">
              of {analyticsData.totalVendors} total vendors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalProducts.toLocaleString()}</div>
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
            <div className="text-2xl font-bold">{analyticsData.totalOrders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              All time orders
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue across all vendors</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart data={salesData} />
          </CardContent>
        </Card>

        {/* Top Vendors */}
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Top Performing Vendors</CardTitle>
            <CardDescription>Based on revenue this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topVendors.map((vendor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{vendor.name}</p>
                    <p className="text-sm text-muted-foreground">${vendor.revenue.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{vendor.orders} orders</span>
                    <span className="text-green-600">+{vendor.growth}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
          <CardDescription>Revenue distribution by product categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.categoryStats.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category.category}</span>
                  <span className="text-sm text-muted-foreground">
                    ${category.revenue.toLocaleString()} ({category.percentage}%)
                  </span>
                </div>
                <Progress value={category.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}