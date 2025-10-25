'use client';

import { useState } from 'react';
import { Plus, Edit, Eye, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

const mockBanners = [
  { id: 'BAN001', title: 'Summer Sale', description: 'Up to 50% off on electronics', status: 'active', position: 'homepage-hero', createdDate: '2024-01-15' },
  { id: 'BAN002', title: 'New Arrivals', description: 'Check out latest products', status: 'inactive', position: 'homepage-secondary', createdDate: '2024-01-20' },
];

const mockPages = [
  { id: 'PAGE001', title: 'About Us', slug: 'about', status: 'published', lastModified: '2024-01-25' },
  { id: 'PAGE002', title: 'Privacy Policy', slug: 'privacy', status: 'published', lastModified: '2024-01-20' },
  { id: 'PAGE003', title: 'Terms & Conditions', slug: 'terms', status: 'draft', lastModified: '2024-01-22' },
];

export default function AdminContentPage() {
  const [banners, setBanners] = useState(mockBanners);
  const [pages, setPages] = useState(mockPages);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-semibold">Content Management</h1>
      </div>

      <Tabs defaultValue="banners" className="space-y-4">
        <TabsList>
          <TabsTrigger value="banners">Banners & Sliders</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="settings">Site Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="banners" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Website Banners</h2>
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              Add Banner
            </Button>
          </div>
          
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {banners.map((banner) => (
                    <TableRow key={banner.id}>
                      <TableCell className="font-medium">{banner.title}</TableCell>
                      <TableCell>{banner.description}</TableCell>
                      <TableCell className="capitalize">{banner.position.replace('-', ' ')}</TableCell>
                      <TableCell>
                        <Badge variant={banner.status === 'active' ? 'default' : 'secondary'}>
                          {banner.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(banner.createdDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm"><Edit className="h-3 w-3" /></Button>
                          <Button variant="outline" size="sm"><Eye className="h-3 w-3" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Website Pages</h2>
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              Add Page
            </Button>
          </div>
          
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pages.map((page) => (
                    <TableRow key={page.id}>
                      <TableCell className="font-medium">{page.title}</TableCell>
                      <TableCell>/{page.slug}</TableCell>
                      <TableCell>
                        <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
                          {page.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(page.lastModified).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm"><Edit className="h-3 w-3" /></Button>
                          <Button variant="outline" size="sm"><Eye className="h-3 w-3" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Configuration</CardTitle>
              <CardDescription>Manage website appearance and content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Site Title</Label>
                <Input defaultValue="VendorVerse" />
              </div>
              <div className="grid gap-2">
                <Label>Site Description</Label>
                <Textarea defaultValue="Your central hub for managing vendor operations" />
              </div>
              <div className="flex items-center justify-between">
                <Label>Maintenance Mode</Label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <Label>User Registration</Label>
                <Switch defaultChecked />
              </div>
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}