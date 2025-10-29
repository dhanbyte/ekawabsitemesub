'use client';

import { useState } from 'react';
import { AlertTriangle, Package, TrendingDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

const mockInventory = [
  { id: 'PROD001', name: 'Wireless Headphones', vendor: 'TechCorp', currentStock: 5, minStock: 10, maxStock: 100, status: 'low', lastUpdated: '2024-01-28' },
  { id: 'PROD002', name: 'Gaming Mouse', vendor: 'TechCorp', currentStock: 0, minStock: 15, maxStock: 80, status: 'out', lastUpdated: '2024-01-27' },
  { id: 'PROD003', name: 'Office Chair', vendor: 'Furniture Plus', currentStock: 45, minStock: 20, maxStock: 100, status: 'good', lastUpdated: '2024-01-28' },
  { id: 'PROD004', name: 'Bluetooth Speaker', vendor: 'Electronics Hub', currentStock: 12, minStock: 15, maxStock: 60, status: 'low', lastUpdated: '2024-01-26' },
  { id: 'PROD005', name: 'Standing Desk', vendor: 'Furniture Plus', currentStock: 8, minStock: 10, maxStock: 50, status: 'low', lastUpdated: '2024-01-25' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'good': return 'default';
    case 'low': return 'secondary';
    case 'out': return 'destructive';
    default: return 'outline';
  }
};

const getStockPercentage = (current: number, max: number) => {
  return Math.round((current / max) * 100);
};

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState(mockInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const lowStockCount = inventory.filter(item => item.status === 'low').length;
  const outOfStockCount = inventory.filter(item => item.status === 'out').length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * 50), 0); // Assuming avg price $50

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-semibold">Inventory Management</h1>
        <Button>Bulk Update Stock</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventory.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{lowStockCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStockCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-8" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="good">Good Stock</SelectItem>
            <SelectItem value="low">Low Stock</SelectItem>
            <SelectItem value="out">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stock Levels</CardTitle>
          <CardDescription>Monitor and manage product inventory across all vendors</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.vendor}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{item.currentStock}</span>
                      <span className="text-xs text-muted-foreground">/ {item.maxStock}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Progress value={getStockPercentage(item.currentStock, item.maxStock)} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        {getStockPercentage(item.currentStock, item.maxStock)}% of capacity
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(item.status)} className="capitalize">
                      {item.status === 'out' ? 'Out of Stock' : item.status === 'low' ? 'Low Stock' : 'Good Stock'}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(item.lastUpdated).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Update Stock</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}