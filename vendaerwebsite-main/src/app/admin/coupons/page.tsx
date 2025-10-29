'use client';

import { useState } from 'react';
import { Plus, Copy, Edit, Trash2, Percent, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const mockCoupons = [
  { id: 'CPN001', code: 'SUMMER50', type: 'percentage', value: 50, minAmount: 100, maxDiscount: 500, usageLimit: 1000, usedCount: 245, status: 'active', expiryDate: '2024-08-31' },
  { id: 'CPN002', code: 'WELCOME20', type: 'percentage', value: 20, minAmount: 50, maxDiscount: 100, usageLimit: 500, usedCount: 89, status: 'active', expiryDate: '2024-12-31' },
  { id: 'CPN003', code: 'FLAT100', type: 'fixed', value: 100, minAmount: 500, maxDiscount: 100, usageLimit: 200, usedCount: 156, status: 'expired', expiryDate: '2024-01-31' },
];

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState(mockCoupons);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    type: 'percentage',
    value: 0,
    minAmount: 0,
    maxDiscount: 0,
    usageLimit: 100,
    expiryDate: ''
  });

  const handleAddCoupon = () => {
    const coupon = {
      id: `CPN${String(coupons.length + 1).padStart(3, '0')}`,
      ...newCoupon,
      usedCount: 0,
      status: 'active' as const
    };
    setCoupons([...coupons, coupon]);
    setNewCoupon({ code: '', type: 'percentage', value: 0, minAmount: 0, maxDiscount: 0, usageLimit: 100, expiryDate: '' });
    setIsAddOpen(false);
  };

  const activeCoupons = coupons.filter(c => c.status === 'active').length;
  const totalUsage = coupons.reduce((sum, c) => sum + c.usedCount, 0);

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="font-headline text-3xl font-semibold">Coupon Management</h1>
          <Button onClick={() => setIsAddOpen(true)} className="gap-1">
            <Plus className="h-4 w-4" />
            Create Coupon
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Coupons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coupons.length}</div>
              <p className="text-xs text-muted-foreground">{activeCoupons} active</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsage}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg Usage Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round((totalUsage / coupons.reduce((sum, c) => sum + c.usageLimit, 0)) * 100)}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Expired</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coupons.filter(c => c.status === 'expired').length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Coupons</CardTitle>
            <CardDescription>Manage discount codes and promotions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Min Amount</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{coupon.code}</code>
                        <Button variant="ghost" size="sm"><Copy className="h-3 w-3" /></Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {coupon.type === 'percentage' ? <Percent className="h-3 w-3" /> : <DollarSign className="h-3 w-3" />}
                        <span className="capitalize">{coupon.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {coupon.type === 'percentage' ? `${coupon.value}%` : `$${coupon.value}`}
                    </TableCell>
                    <TableCell>${coupon.minAmount}</TableCell>
                    <TableCell>{coupon.usedCount}/{coupon.usageLimit}</TableCell>
                    <TableCell>
                      <Badge variant={coupon.status === 'active' ? 'default' : coupon.status === 'expired' ? 'destructive' : 'secondary'}>
                        {coupon.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(coupon.expiryDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm"><Edit className="h-3 w-3" /></Button>
                        <Button variant="outline" size="sm" className="text-red-600"><Trash2 className="h-3 w-3" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Coupon</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Coupon Code</Label>
              <Input value={newCoupon.code} onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})} placeholder="SUMMER50" />
            </div>
            <div className="grid gap-2">
              <Label>Discount Type</Label>
              <Select value={newCoupon.type} onValueChange={(value) => setNewCoupon({...newCoupon, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Discount Value</Label>
              <Input type="number" value={newCoupon.value} onChange={(e) => setNewCoupon({...newCoupon, value: parseInt(e.target.value)})} />
            </div>
            <div className="grid gap-2">
              <Label>Minimum Amount</Label>
              <Input type="number" value={newCoupon.minAmount} onChange={(e) => setNewCoupon({...newCoupon, minAmount: parseInt(e.target.value)})} />
            </div>
            <div className="grid gap-2">
              <Label>Usage Limit</Label>
              <Input type="number" value={newCoupon.usageLimit} onChange={(e) => setNewCoupon({...newCoupon, usageLimit: parseInt(e.target.value)})} />
            </div>
            <div className="grid gap-2">
              <Label>Expiry Date</Label>
              <Input type="date" value={newCoupon.expiryDate} onChange={(e) => setNewCoupon({...newCoupon, expiryDate: e.target.value})} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button onClick={handleAddCoupon} disabled={!newCoupon.code}>Create Coupon</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}