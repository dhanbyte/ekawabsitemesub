'use client';

import { useState } from 'react';
import { Send, Mail, MessageSquare, Bell, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const mockNotifications = [
  { id: 'NOT001', title: 'New Product Approval Required', message: 'TechCorp has submitted 3 new products for review', type: 'system', recipients: 'admins', status: 'sent', date: '2024-01-28' },
  { id: 'NOT002', title: 'Weekly Sales Report', message: 'Your weekly performance summary is ready', type: 'email', recipients: 'vendors', status: 'scheduled', date: '2024-01-29' },
  { id: 'NOT003', title: 'Low Stock Alert', message: 'Multiple products are running low on inventory', type: 'alert', recipients: 'vendors', status: 'sent', date: '2024-01-27' },
];

const mockTemplates = [
  { id: 'TPL001', name: 'Welcome New Vendor', subject: 'Welcome to VendorVerse!', type: 'email', usage: 15 },
  { id: 'TPL002', name: 'Product Approved', subject: 'Your product has been approved', type: 'notification', usage: 89 },
  { id: 'TPL003', name: 'Low Stock Warning', subject: 'Stock Alert: {{product_name}}', type: 'alert', usage: 34 },
];

export default function AdminCommunicationsPage() {
  const [notifications] = useState(mockNotifications);
  const [templates] = useState(mockTemplates);
  const [newMessage, setNewMessage] = useState({
    type: 'email',
    recipients: 'all-vendors',
    subject: '',
    message: ''
  });

  const handleSendMessage = () => {
    console.log('Sending message:', newMessage);
    setNewMessage({ type: 'email', recipients: 'all-vendors', subject: '', message: '' });
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-semibold">Communications Center</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">Email campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Templates</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.filter(n => n.status === 'scheduled').length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="compose" className="space-y-4">
        <TabsList>
          <TabsTrigger value="compose">Compose Message</TabsTrigger>
          <TabsTrigger value="history">Message History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="compose">
          <Card>
            <CardHeader>
              <CardTitle>Send New Message</CardTitle>
              <CardDescription>Communicate with vendors and users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Message Type</Label>
                  <Select value={newMessage.type} onValueChange={(value) => setNewMessage({...newMessage, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="notification">In-App Notification</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Recipients</Label>
                  <Select value={newMessage.recipients} onValueChange={(value) => setNewMessage({...newMessage, recipients: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-vendors">All Vendors</SelectItem>
                      <SelectItem value="active-vendors">Active Vendors</SelectItem>
                      <SelectItem value="all-customers">All Customers</SelectItem>
                      <SelectItem value="admins">Admins Only</SelectItem>
                      <SelectItem value="custom">Custom Selection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input value={newMessage.subject} onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})} placeholder="Enter message subject" />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea value={newMessage.message} onChange={(e) => setNewMessage({...newMessage, message: e.target.value})} placeholder="Type your message here..." rows={6} />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="schedule" />
                <Label htmlFor="schedule">Schedule for later</Label>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSendMessage} className="gap-1">
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
                <Button variant="outline">Save as Draft</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Message History</CardTitle>
              <CardDescription>View sent and scheduled messages</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell className="font-medium">{notification.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {notification.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="capitalize">{notification.recipients}</TableCell>
                      <TableCell>
                        <Badge variant={notification.status === 'sent' ? 'default' : 'secondary'}>
                          {notification.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(notification.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
              <CardDescription>Manage reusable message templates</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Usage Count</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>{template.subject}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {template.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{template.usage}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Use</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Communication Settings</CardTitle>
              <CardDescription>Configure messaging preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Sender Email</Label>
                <Input defaultValue="noreply@vendorverse.com" />
              </div>
              <div className="space-y-2">
                <Label>Email Signature</Label>
                <Textarea defaultValue="Best regards,\nThe VendorVerse Team" rows={3} />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="auto-notifications" defaultChecked />
                <Label htmlFor="auto-notifications">Enable automatic notifications</Label>
              </div>
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}