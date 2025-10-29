'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MoreHorizontal, Search, Filter, Eye, Ban, Trash2 } from 'lucide-react';
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

interface AdminProduct {
  id: string;
  name: string;
  vendor: string;
  vendorId: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'banned';
  imageUrl: string;
  createdDate: string;
  totalSales: number;
  revenue: number;
}

const mockAdminProducts: AdminProduct[] = [
  {
    id: 'PROD001',
    name: 'Ergonomic Office Chair',
    vendor: 'TechCorp Solutions',
    vendorId: 'VEN001',
    category: 'Furniture',
    price: 299.99,
    stock: 50,
    status: 'active',
    imageUrl: 'https://picsum.photos/seed/p1/200/200',
    createdDate: '2024-01-15',
    totalSales: 125,
    revenue: 37498.75
  },
  {
    id: 'PROD002',
    name: 'Wireless Mechanical Keyboard',
    vendor: 'Electronics Plus',
    vendorId: 'VEN003',
    category: 'Electronics',
    price: 129.99,
    stock: 8,
    status: 'active',
    imageUrl: 'https://picsum.photos/seed/p2/200/200',
    createdDate: '2024-01-18',
    totalSales: 89,
    revenue: 11569.11
  },
  {
    id: 'PROD003',
    name: '4K UHD Monitor',
    vendor: 'Electronics Plus',
    vendorId: 'VEN003',
    category: 'Electronics',
    price: 499.99,
    stock: 25,
    status: 'active',
    imageUrl: 'https://picsum.photos/seed/p3/200/200',
    createdDate: '2024-01-20',
    totalSales: 67,
    revenue: 33499.33
  },
  {
    id: 'PROD004',
    name: 'Noise-Cancelling Headphones',
    vendor: 'TechCorp Solutions',
    vendorId: 'VEN001',
    category: 'Electronics',
    price: 199.99,
    stock: 0,
    status: 'inactive',
    imageUrl: 'https://picsum.photos/seed/p4/200/200',
    createdDate: '2024-01-22',
    totalSales: 45,
    revenue: 8999.55
  },
  {
    id: 'PROD005',
    name: 'Adjustable Standing Desk',
    vendor: 'Home Essentials',
    vendorId: 'VEN004',
    category: 'Furniture',
    price: 399.99,
    stock: 15,
    status: 'banned',
    imageUrl: 'https://picsum.photos/seed/p5/200/200',
    createdDate: '2024-01-25',
    totalSales: 12,
    revenue: 4799.88
  },
  {
    id: 'PROD006',
    name: 'Gaming Mouse',
    vendor: 'TechCorp Solutions',
    vendorId: 'VEN001',
    category: 'Electronics',
    price: 79.99,
    stock: 35,
    status: 'active',
    imageUrl: 'https://picsum.photos/seed/p6/200/200',
    createdDate: '2024-01-20',
    totalSales: 156,
    revenue: 12478.44
  },
  {
    id: 'PROD007',
    name: 'Bluetooth Speaker',
    vendor: 'Electronics Plus',
    vendorId: 'VEN003',
    category: 'Electronics',
    price: 149.99,
    stock: 22,
    status: 'active',
    imageUrl: 'https://picsum.photos/seed/p7/200/200',
    createdDate: '2024-01-22',
    totalSales: 78,
    revenue: 11699.22
  },
  {
    id: 'PROD008',
    name: 'Coffee Table',
    vendor: 'Home Essentials',
    vendorId: 'VEN004',
    category: 'Furniture',
    price: 199.99,
    stock: 18,
    status: 'active',
    imageUrl: 'https://picsum.photos/seed/p8/200/200',
    createdDate: '2024-01-25',
    totalSales: 34,
    revenue: 6799.66
  }
];

const statusBadgeVariant = {
  'active': 'default',
  'inactive': 'secondary',
  'banned': 'destructive',
} as const;

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>(mockAdminProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleProductAction = (action: 'activate' | 'deactivate' | 'ban' | 'delete', productId: string) => {
    setProducts(prev => prev.map(product => {
      if (product.id === productId) {
        switch (action) {
          case 'activate':
            return { ...product, status: 'active' as const };
          case 'deactivate':
            return { ...product, status: 'inactive' as const };
          case 'ban':
            return { ...product, status: 'banned' as const };
          default:
            return product;
        }
      }
      return product;
    }));

    if (action === 'delete') {
      setProducts(prev => prev.filter(product => product.id !== productId));
    }
  };

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'active').length;
  const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-semibold">Product Management</h1>
        <Button>Export Products</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              {activeProducts} active products
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
              From all products
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">
              Product categories
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="banned">Banned</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
          <CardDescription>
            Manage products from all vendors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={product.imageUrl}
                      width="64"
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{product.vendor}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant[product.status]} className="capitalize">
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.totalSales}</TableCell>
                  <TableCell>${product.revenue.toLocaleString()}</TableCell>
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
                        {product.status !== 'active' && (
                          <DropdownMenuItem 
                            onClick={() => handleProductAction('activate', product.id)}
                            className="text-green-600"
                          >
                            Activate Product
                          </DropdownMenuItem>
                        )}
                        {product.status === 'active' && (
                          <DropdownMenuItem 
                            onClick={() => handleProductAction('deactivate', product.id)}
                            className="text-yellow-600"
                          >
                            Deactivate Product
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem 
                          onClick={() => handleProductAction('ban', product.id)}
                          className="text-red-600"
                        >
                          <Ban className="mr-2 h-4 w-4" />
                          Ban Product
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleProductAction('delete', product.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Product
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