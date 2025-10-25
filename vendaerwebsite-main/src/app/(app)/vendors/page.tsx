'use client';

import { useState } from 'react';
import { MoreHorizontal, UserPlus, Search, Eye, Mail, Phone } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface VendorPartner {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'pending' | 'inactive';
  joinDate: string;
  products: number;
  totalSales: number;
  rating: number;
  address: string;
  category: string;
}

const mockVendorPartners: VendorPartner[] = [
  {
    id: 'VP001',
    name: 'Global Electronics',
    email: 'contact@globalelectronics.com',
    phone: '+1-555-0101',
    status: 'active',
    joinDate: '2024-01-10',
    products: 156,
    totalSales: 45000,
    rating: 4.8,
    address: 'San Francisco, CA',
    category: 'Electronics'
  },
  {
    id: 'VP002',
    name: 'Fashion Forward',
    email: 'info@fashionforward.com',
    phone: '+1-555-0102',
    status: 'pending',
    joinDate: '2024-01-28',
    products: 0,
    totalSales: 0,
    rating: 0,
    address: 'New York, NY',
    category: 'Fashion'
  },
  {
    id: 'VP003',
    name: 'Home Comfort',
    email: 'sales@homecomfort.com',
    phone: '+1-555-0103',
    status: 'active',
    joinDate: '2024-01-15',
    products: 89,
    totalSales: 32000,
    rating: 4.6,
    address: 'Chicago, IL',
    category: 'Home & Garden'
  },
  {
    id: 'VP004',
    name: 'Sports Zone',
    email: 'team@sportszone.com',
    phone: '+1-555-0104',
    status: 'inactive',
    joinDate: '2024-01-05',
    products: 45,
    totalSales: 18000,
    rating: 4.2,
    address: 'Miami, FL',
    category: 'Sports'
  },
];

const statusBadgeVariant = {
  'active': 'default',
  'pending': 'secondary',
  'inactive': 'outline',
} as const;

export default function VendorsPage() {
  const [vendors, setVendors] = useState<VendorPartner[]>(mockVendorPartners);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedVendor, setSelectedVendor] = useState<VendorPartner | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (vendor: VendorPartner) => {
    setSelectedVendor(vendor);
    setIsDetailOpen(true);
  };

  const handleStatusChange = (vendorId: string, newStatus: VendorPartner['status']) => {
    setVendors(prev => prev.map(v => v.id === vendorId ? { ...v, status: newStatus } : v));
  };

  const activeVendors = vendors.filter(v => v.status === 'active').length;
  const pendingVendors = vendors.filter(v => v.status === 'pending').length;
  const totalProducts = vendors.reduce((sum, v) => sum + v.products, 0);
  const totalSales = vendors.reduce((sum, v) => sum + v.totalSales, 0);

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="font-headline text-3xl font-semibold">Vendor Partners</h1>
          <Button className="gap-1">
            <UserPlus className="h-4 w-4" />
            Invite Vendor
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeVendors}</div>
              <p className="text-xs text-muted-foreground">
                {pendingVendors} pending approval
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">Across all vendors</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Combined revenue</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.6</div>
              <p className="text-xs text-muted-foreground">Vendor performance</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vendors..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Vendor Partners</CardTitle>
            <CardDescription>
              Manage your vendor partnerships and collaborations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://picsum.photos/seed/${vendor.name}/100`} />
                          <AvatarFallback>{vendor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{vendor.name}</p>
                          <p className="text-sm text-muted-foreground">{vendor.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{vendor.category}</TableCell>
                    <TableCell>
                      <Badge variant={statusBadgeVariant[vendor.status]} className="capitalize">
                        {vendor.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{vendor.products}</TableCell>
                    <TableCell>${vendor.totalSales.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="text-sm">{vendor.rating}</span>
                        <span className="text-yellow-400 ml-1">★</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewDetails(vendor)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Message
                          </DropdownMenuItem>
                          {vendor.status === 'pending' && (
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(vendor.id, 'active')}
                              className="text-green-600"
                            >
                              Approve Partnership
                            </DropdownMenuItem>
                          )}
                          {vendor.status === 'active' && (
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(vendor.id, 'inactive')}
                              className="text-yellow-600"
                            >
                              Pause Partnership
                            </DropdownMenuItem>
                          )}
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

      {/* Vendor Details Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Vendor Details</DialogTitle>
          </DialogHeader>
          {selectedVendor && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`https://picsum.photos/seed/${selectedVendor.name}/100`} />
                  <AvatarFallback className="text-lg">{selectedVendor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedVendor.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedVendor.category}</p>
                  <Badge variant={statusBadgeVariant[selectedVendor.status]} className="mt-1 capitalize">
                    {selectedVendor.status}
                  </Badge>
                </div>
              </div>
              
              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedVendor.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedVendor.phone}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Address: </span>
                  {selectedVendor.address}
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Joined: </span>
                  {new Date(selectedVendor.joinDate).toLocaleDateString()}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold">{selectedVendor.products}</div>
                  <div className="text-xs text-muted-foreground">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">${selectedVendor.totalSales.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Sales</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{selectedVendor.rating}</div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
