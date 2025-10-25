'use client';

import { useState } from 'react';
import { MoreHorizontal, UserPlus, Search, Filter } from 'lucide-react';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'pending' | 'suspended';
  joinDate: string;
  products: number;
  totalSales: number;
  commission: number;
  address: string;
}

const mockVendors: Vendor[] = [
  {
    id: 'VEN001',
    name: 'TechCorp Solutions',
    email: 'contact@techcorp.com',
    phone: '+1-555-0123',
    status: 'active',
    joinDate: '2024-01-15',
    products: 45,
    totalSales: 25000,
    commission: 15,
    address: 'New York, NY'
  },
  {
    id: 'VEN002',
    name: 'Fashion Hub',
    email: 'info@fashionhub.com',
    phone: '+1-555-0124',
    status: 'pending',
    joinDate: '2024-01-20',
    products: 0,
    totalSales: 0,
    commission: 12,
    address: 'Los Angeles, CA'
  },
  {
    id: 'VEN003',
    name: 'Electronics Plus',
    email: 'sales@electronicsplus.com',
    phone: '+1-555-0125',
    status: 'active',
    joinDate: '2024-01-18',
    products: 78,
    totalSales: 45000,
    commission: 18,
    address: 'Chicago, IL'
  },
  {
    id: 'VEN004',
    name: 'Home Essentials',
    email: 'support@homeessentials.com',
    phone: '+1-555-0126',
    status: 'active',
    joinDate: '2024-01-22',
    products: 32,
    totalSales: 18000,
    commission: 14,
    address: 'Houston, TX'
  },
  {
    id: 'VEN005',
    name: 'Sports World',
    email: 'contact@sportsworld.com',
    phone: '+1-555-0127',
    status: 'suspended',
    joinDate: '2024-01-25',
    products: 15,
    totalSales: 5000,
    commission: 10,
    address: 'Miami, FL'
  },
];

const statusBadgeVariant = {
  'active': 'default',
  'pending': 'secondary',
  'suspended': 'destructive',
} as const;

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    action: 'approve' | 'suspend' | 'delete' | null;
    vendor: Vendor | null;
  }>({ open: false, action: null, vendor: null });
  const [editDialog, setEditDialog] = useState<{
    open: boolean;
    vendor: Vendor | null;
  }>({ open: false, vendor: null });
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleVendorAction = (action: 'approve' | 'suspend' | 'delete', vendor: Vendor) => {
    setActionDialog({ open: true, action, vendor });
  };

  const handleEditVendor = (vendor: Vendor) => {
    setEditingVendor({ ...vendor });
    setEditDialog({ open: true, vendor });
  };

  const handleSaveEdit = () => {
    if (!editingVendor) return;
    setVendors(prev => prev.map(v => v.id === editingVendor.id ? editingVendor : v));
    setEditDialog({ open: false, vendor: null });
    setEditingVendor(null);
  };

  const confirmAction = () => {
    if (!actionDialog.vendor || !actionDialog.action) return;

    const vendorId = actionDialog.vendor.id;
    
    setVendors(prev => prev.map(vendor => {
      if (vendor.id === vendorId) {
        switch (actionDialog.action) {
          case 'approve':
            return { ...vendor, status: 'active' as const };
          case 'suspend':
            return { ...vendor, status: 'suspended' as const };
          default:
            return vendor;
        }
      }
      return vendor;
    }));

    if (actionDialog.action === 'delete') {
      setVendors(prev => prev.filter(vendor => vendor.id !== vendorId));
    }

    setActionDialog({ open: false, action: null, vendor: null });
  };

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="font-headline text-3xl font-semibold">Vendor Management</h1>
          <Button className="gap-1">
            <UserPlus className="h-4 w-4" />
            Add Vendor
          </Button>
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
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Vendors</CardTitle>
            <CardDescription>
              Manage vendor accounts and approvals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Total Sales</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
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
                    <TableCell>
                      <Badge variant={statusBadgeVariant[vendor.status]} className="capitalize">
                        {vendor.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{vendor.products}</TableCell>
                    <TableCell>${vendor.totalSales.toLocaleString()}</TableCell>
                    <TableCell>{vendor.commission}%</TableCell>
                    <TableCell>{new Date(vendor.joinDate).toLocaleDateString()}</TableCell>
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
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>View Products</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditVendor(vendor)}>Edit Vendor</DropdownMenuItem>
                          {vendor.status === 'pending' && (
                            <DropdownMenuItem 
                              onClick={() => handleVendorAction('approve', vendor)}
                              className="text-green-600"
                            >
                              Approve Vendor
                            </DropdownMenuItem>
                          )}
                          {vendor.status === 'active' && (
                            <DropdownMenuItem 
                              onClick={() => handleVendorAction('suspend', vendor)}
                              className="text-yellow-600"
                            >
                              Suspend Vendor
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onClick={() => handleVendorAction('delete', vendor)}
                            className="text-red-600"
                          >
                            Delete Vendor
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

      {/* Action Confirmation Dialog */}
      <AlertDialog open={actionDialog.open} onOpenChange={(open) => 
        setActionDialog({ ...actionDialog, open })
      }>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionDialog.action === 'approve' && 'Approve Vendor'}
              {actionDialog.action === 'suspend' && 'Suspend Vendor'}
              {actionDialog.action === 'delete' && 'Delete Vendor'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionDialog.action === 'approve' && 
                `Are you sure you want to approve ${actionDialog.vendor?.name}? They will be able to start selling products.`
              }
              {actionDialog.action === 'suspend' && 
                `Are you sure you want to suspend ${actionDialog.vendor?.name}? They won't be able to sell products.`
              }
              {actionDialog.action === 'delete' && 
                `Are you sure you want to delete ${actionDialog.vendor?.name}? This action cannot be undone.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmAction}
              className={
                actionDialog.action === 'delete' 
                  ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                  : ''
              }
            >
              {actionDialog.action === 'approve' && 'Approve'}
              {actionDialog.action === 'suspend' && 'Suspend'}
              {actionDialog.action === 'delete' && 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Vendor Dialog */}
      <Dialog open={editDialog.open} onOpenChange={(open) => setEditDialog({ ...editDialog, open })}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Vendor</DialogTitle>
          </DialogHeader>
          {editingVendor && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Business Name</Label>
                <Input
                  id="name"
                  value={editingVendor.name}
                  onChange={(e) => setEditingVendor({...editingVendor, name: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={editingVendor.email}
                  onChange={(e) => setEditingVendor({...editingVendor, email: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={editingVendor.phone}
                  onChange={(e) => setEditingVendor({...editingVendor, phone: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={editingVendor.address}
                  onChange={(e) => setEditingVendor({...editingVendor, address: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="commission">Commission (%)</Label>
                <Input
                  id="commission"
                  type="number"
                  value={editingVendor.commission}
                  onChange={(e) => setEditingVendor({...editingVendor, commission: parseInt(e.target.value)})}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialog({ open: false, vendor: null })}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}