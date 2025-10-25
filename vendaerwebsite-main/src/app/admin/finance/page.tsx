'use client';

import { useState } from 'react';
import { DollarSign, TrendingUp, CreditCard, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const mockPayouts = [
  { id: 'PAY001', vendor: 'TechCorp Solutions', amount: 2400, commission: 360, netAmount: 2040, status: 'completed', date: '2024-01-25', method: 'bank' },
  { id: 'PAY002', vendor: 'Electronics Plus', amount: 1800, commission: 324, netAmount: 1476, status: 'pending', date: '2024-01-28', method: 'paypal' },
  { id: 'PAY003', vendor: 'Home Essentials', amount: 1200, commission: 168, netAmount: 1032, status: 'processing', date: '2024-01-27', method: 'bank' },
];

const mockCommissions = [
  { vendor: 'TechCorp Solutions', totalSales: 15000, commissionRate: 15, commissionEarned: 2250, orders: 45 },
  { vendor: 'Electronics Plus', totalSales: 12000, commissionRate: 18, commissionEarned: 2160, orders: 38 },
  { vendor: 'Home Essentials', totalSales: 8000, commissionRate: 14, commissionEarned: 1120, orders: 28 },
  { vendor: 'Fashion Hub', totalSales: 6000, commissionRate: 12, commissionEarned: 720, orders: 22 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'default';
    case 'processing': return 'secondary';
    case 'pending': return 'outline';
    default: return 'destructive';
  }
};

export default function AdminFinancePage() {
  const [payouts] = useState(mockPayouts);
  const [commissions] = useState(mockCommissions);

  const totalRevenue = commissions.reduce((sum, c) => sum + c.totalSales, 0);
  const totalCommission = commissions.reduce((sum, c) => sum + c.commissionEarned, 0);
  const pendingPayouts = payouts.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.netAmount, 0);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-semibold">Financial Management</h1>
        <Button className="gap-1">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commission Earned</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCommission.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Platform earnings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingPayouts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{payouts.filter(p => p.status === 'pending').length} vendors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Commission Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(commissions.reduce((sum, c) => sum + c.commissionRate, 0) / commissions.length)}%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payouts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payouts">Vendor Payouts</TabsTrigger>
          <TabsTrigger value="commissions">Commission Tracking</TabsTrigger>
          <TabsTrigger value="taxes">Tax Management</TabsTrigger>
        </TabsList>

        <TabsContent value="payouts">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Payouts</CardTitle>
              <CardDescription>Manage payments to vendors</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payout ID</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Gross Amount</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Net Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payouts.map((payout) => (
                    <TableRow key={payout.id}>
                      <TableCell className="font-medium">{payout.id}</TableCell>
                      <TableCell>{payout.vendor}</TableCell>
                      <TableCell>${payout.amount.toLocaleString()}</TableCell>
                      <TableCell>${payout.commission.toLocaleString()}</TableCell>
                      <TableCell className="font-medium">${payout.netAmount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(payout.status)} className="capitalize">
                          {payout.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(payout.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {payout.status === 'pending' && (
                          <Button variant="outline" size="sm">Process Payment</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commissions">
          <Card>
            <CardHeader>
              <CardTitle>Commission Overview</CardTitle>
              <CardDescription>Track commission earnings by vendor</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Total Sales</TableHead>
                    <TableHead>Commission Rate</TableHead>
                    <TableHead>Commission Earned</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commissions.map((commission, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{commission.vendor}</TableCell>
                      <TableCell>${commission.totalSales.toLocaleString()}</TableCell>
                      <TableCell>{commission.commissionRate}%</TableCell>
                      <TableCell className="font-medium">${commission.commissionEarned.toLocaleString()}</TableCell>
                      <TableCell>{commission.orders}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress value={(commission.totalSales / totalRevenue) * 100} className="h-2" />
                          <div className="text-xs text-muted-foreground">
                            {Math.round((commission.totalSales / totalRevenue) * 100)}% of total
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="taxes">
          <Card>
            <CardHeader>
              <CardTitle>Tax Management</CardTitle>
              <CardDescription>Manage tax calculations and reporting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">$1,250</div>
                      <p className="text-xs text-muted-foreground">Sales Tax Collected</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">$890</div>
                      <p className="text-xs text-muted-foreground">Income Tax Due</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">Q1 2024</div>
                      <p className="text-xs text-muted-foreground">Next Filing Period</p>
                    </CardContent>
                  </Card>
                </div>
                <Button>Generate Tax Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}