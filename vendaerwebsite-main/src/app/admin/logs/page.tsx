'use client';

import { useState } from 'react';
import { Search, Filter, Download, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockActivityLogs = [
  { id: 'LOG001', user: 'admin@vendorverse.com', action: 'Approved vendor', details: 'TechCorp Solutions approved', level: 'info', timestamp: '2024-01-28 14:30:25' },
  { id: 'LOG002', user: 'john@techcorp.com', action: 'Product added', details: 'Added Wireless Headphones', level: 'info', timestamp: '2024-01-28 14:25:10' },
  { id: 'LOG003', user: 'system', action: 'Payment processed', details: 'Order #ORD001 payment completed', level: 'success', timestamp: '2024-01-28 14:20:45' },
  { id: 'LOG004', user: 'jane@electronics.com', action: 'Login failed', details: 'Invalid credentials attempt', level: 'warning', timestamp: '2024-01-28 14:15:30' },
  { id: 'LOG005', user: 'system', action: 'Database backup', details: 'Automated backup completed', level: 'success', timestamp: '2024-01-28 14:00:00' },
];

const mockErrorLogs = [
  { id: 'ERR001', type: 'Database Error', message: 'Connection timeout to payment gateway', severity: 'high', count: 3, lastOccurred: '2024-01-28 13:45:20' },
  { id: 'ERR002', type: 'API Error', message: 'Rate limit exceeded for email service', severity: 'medium', count: 12, lastOccurred: '2024-01-28 13:30:15' },
  { id: 'ERR003', type: 'Validation Error', message: 'Invalid product image format', severity: 'low', count: 8, lastOccurred: '2024-01-28 13:15:10' },
];

const mockSystemLogs = [
  { id: 'SYS001', service: 'Web Server', status: 'running', uptime: '15 days', lastRestart: '2024-01-13 09:00:00', cpu: 45, memory: 68 },
  { id: 'SYS002', service: 'Database', status: 'running', uptime: '15 days', lastRestart: '2024-01-13 09:01:30', cpu: 32, memory: 78 },
  { id: 'SYS003', service: 'Email Service', status: 'warning', uptime: '2 hours', lastRestart: '2024-01-28 12:00:00', cpu: 15, memory: 45 },
];

const getLevelIcon = (level: string) => {
  switch (level) {
    case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
    default: return <Info className="h-4 w-4 text-blue-500" />;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high': return 'destructive';
    case 'medium': return 'secondary';
    case 'low': return 'outline';
    default: return 'default';
  }
};

export default function AdminLogsPage() {
  const [activityLogs] = useState(mockActivityLogs);
  const [errorLogs] = useState(mockErrorLogs);
  const [systemLogs] = useState(mockSystemLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');

  const filteredActivityLogs = activityLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) || log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-semibold">System Logs</h1>
        <Button className="gap-1">
          <Download className="h-4 w-4" />
          Export Logs
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activityLogs.length}</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{errorLogs.length}</div>
            <p className="text-xs text-muted-foreground">Active issues</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98%</div>
            <p className="text-xs text-muted-foreground">Uptime</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{activityLogs.filter(l => l.level === 'warning').length}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Activity Logs</TabsTrigger>
          <TabsTrigger value="errors">Error Logs</TabsTrigger>
          <TabsTrigger value="system">System Status</TabsTrigger>
        </TabsList>

        <TabsContent value="activity">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search activities..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-8" />
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>Track user actions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Level</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActivityLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getLevelIcon(log.level)}
                          <Badge variant={log.level === 'error' ? 'destructive' : log.level === 'warning' ? 'secondary' : 'default'}>
                            {log.level}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell className="font-medium">{log.action}</TableCell>
                      <TableCell>{log.details}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{log.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors">
          <Card>
            <CardHeader>
              <CardTitle>Error Tracking</CardTitle>
              <CardDescription>Monitor and resolve system errors</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Error Type</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Last Occurred</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {errorLogs.map((error) => (
                    <TableRow key={error.id}>
                      <TableCell className="font-medium">{error.type}</TableCell>
                      <TableCell>{error.message}</TableCell>
                      <TableCell>
                        <Badge variant={getSeverityColor(error.severity)}>
                          {error.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>{error.count}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{error.lastOccurred}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Resolve</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Monitor system services and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Uptime</TableHead>
                    <TableHead>CPU Usage</TableHead>
                    <TableHead>Memory Usage</TableHead>
                    <TableHead>Last Restart</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {systemLogs.map((system) => (
                    <TableRow key={system.id}>
                      <TableCell className="font-medium">{system.service}</TableCell>
                      <TableCell>
                        <Badge variant={system.status === 'running' ? 'default' : 'secondary'}>
                          {system.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{system.uptime}</TableCell>
                      <TableCell>{system.cpu}%</TableCell>
                      <TableCell>{system.memory}%</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{system.lastRestart}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Restart</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}