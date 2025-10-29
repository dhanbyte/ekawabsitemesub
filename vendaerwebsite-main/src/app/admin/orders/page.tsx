'use client';

import { useState } from 'react';
import { MoreHorizontal, Search, Download, Eye, Truck, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  vendor: string;
  vendorId: string;
  products: string[];
  total: number;
  commission: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  date: string;
  shippingAddress: string;
  paymentMethod: string;
}

const mockAdminOrders: AdminOrder[] = [
  {
    id: 'ORD001',
    customerName: 'Alice Johnson',
    customerEmail: 'alice@example.com',
    vendor: 'TechCorp Solutions',
    vendorId: 'VEN001',
    products: ['Ergonomic Office Chair', 'Gaming Mouse'],
    total: 379.98,
    commission: 57.00,
    status: 'delivered',
    date: '2024-01-26',
    shippingAddress: '123 Main St, New York, NY 10001',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD002',
    customerName: 'Bob Williams',
    customerEmail: 'bob@example.com',
    vendor: 'Electronics Plus',
    vendorId: 'VEN003',
    products: ['Wireless Mechanical Keyboard'],
    total: 129.99,
    commission: 23.40,
    status: 'shipped',
    date: '2024-01-25',
    shippingAddress: '456 Oak Ave, Chicago, IL 60601',
    paymentMethod: 'PayPal'
  },
  {
    id: 'ORD003',
    customerName: 'Charlie Brown',
    customerEmail: 'charlie@example.com',
    vendor: 'Electronics Plus',
    vendorId: 'VEN003',
    products: ['4K UHD Monitor', 'Bluetooth Speaker'],
    total: 649.98,
    commission: 117.00,
    status: 'processing',
    date: '2024-01-25',
    shippingAddress: '789 Pine St, Los Angeles, CA 90210',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD004',
    customerName: 'Diana Miller',
    customerEmail: 'diana@example.com',
    vendor: 'TechCorp Solutions',
    vendorId: 'VEN001',
    products: ['Noise-Cancelling Headphones'],
    total: 199.99,
    commission: 30.00,
    status: 'pending',
    date: '2024-01-24',
    shippingAddress: '321 Elm St, Houston, TX 77001',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD005',
    customerName: 'Ethan Davis',
    customerEmail: 'ethan@example.com',
    vendor: 'Home Essentials',
    vendorId: 'VEN004',
    products: ['Adjustable Standing Desk'],
    total: 399.99,
    commission: 56.00,
    status: 'cancelled',
    date: '2024-01-23',
    shippingAddress: '654 Maple Dr, Miami, FL 33101',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD006',
    customerName: 'Frank Wilson',
    customerEmail: 'frank@example.com',
    vendor: 'Home Essentials',
    vendorId: 'VEN004',
    products: ['Coffee Table'],
    total: 199.99,
    commission: 28.00,
    status: 'delivered',
    date: '2024-01-26',
    shippingAddress: '987 Cedar St, Seattle, WA 98101',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD007',
    customerName: 'Grace Lee',
    customerEmail: 'grace@example.com',
    vendor: 'TechCorp Solutions',
    vendorId: 'VEN001',
    products: ['Gaming Mouse', 'Ergonomic Office Chair'],
    total: 379.98,
    commission: 57.00,
    status: 'shipped',
    date: '2024-01-25',
    shippingAddress: '456 Birch Ave, Portland, OR 97201',
    paymentMethod: 'PayPal'
  },
  {
    id: 'ORD008',
    customerName: 'Henry Clark',
    customerEmail: 'henry@example.com',
    vendor: 'Electronics Plus',
    vendorId: 'VEN003',
    products: ['Bluetooth Speaker', '4K UHD Monitor'],
    total: 649.98,
    commission: 117.00,
    status: 'processing',
    date: '2024-01-24',
    shippingAddress: '321 Spruce Dr, Denver, CO 80201',
    paymentMethod: 'Credit Card'
  }
];

const statusStyles = {
  pending: 'secondary',
  processing: 'default',
  shipped: 'default',
  delivered: 'default',
  cancelled: 'destructive',
  refunded: 'destructive',
} as const;

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>(mockAdminOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.products.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOrderAction = (action: 'process' | 'ship' | 'deliver' | 'cancel', orderId: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        switch (action) {
          case 'process':
            return { ...order, status: 'processing' as const };
          case 'ship':
            return { ...order, status: 'shipped' as const };
          case 'deliver':
            return { ...order, status: 'delivered' as const };
          case 'cancel':
            return { ...order, status: 'cancelled' as const };
          default:
            return order;
        }
      }
      return order;
    }));
  };

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalCommission = orders.reduce((sum, order) => sum + order.commission, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-semibold">Order Management</h1>
        <Button className="gap-1">
          <Download className="h-4 w-4" />
          Export Orders
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              {pendingOrders} pending orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              From all orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Commission</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCommission.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Total earned commission
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalRevenue / totalOrders).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Average order value
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>
            Manage orders from all vendors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://picsum.photos/seed/${order.customerName}/100`} />
                        <AvatarFallback>{order.customerName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{order.vendor}</TableCell>
                  <TableCell>
                    <div className="max-w-[200px]">
                      <p className="text-sm truncate">{order.products.join(', ')}</p>
                      <p className="text-xs text-muted-foreground">{order.products.length} item(s)</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusStyles[order.status]} className="capitalize">
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>${order.commission.toFixed(2)}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {order.status === 'pending' && (
                          <DropdownMenuItem 
                            onClick={() => handleOrderAction('process', order.id)}
                            className="text-blue-600"
                          >
                            Mark as Processing
                          </DropdownMenuItem>
                        )}
                        {order.status === 'processing' && (
                          <DropdownMenuItem 
                            onClick={() => handleOrderAction('ship', order.id)}
                            className="text-green-600"
                          >
                            <Truck className="mr-2 h-4 w-4" />
                            Mark as Shipped
                          </DropdownMenuItem>
                        )}
                        {order.status === 'shipped' && (
                          <DropdownMenuItem 
                            onClick={() => handleOrderAction('deliver', order.id)}
                            className="text-green-600"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark as Delivered
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>Generate Invoice</DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleOrderAction('cancel', order.id)}
                          className="text-red-600"
                        >
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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