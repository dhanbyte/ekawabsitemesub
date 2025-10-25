'use client';

import { useState } from 'react';
import { Server, Database, HardDrive, Cpu, Activity, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

const systemMetrics = {
  cpu: { usage: 45, cores: 8, temperature: 65 },
  memory: { used: 6.8, total: 16, percentage: 42 },
  disk: { used: 120, total: 500, percentage: 24 },
  network: { inbound: 1.2, outbound: 0.8 }
};

const backupHistory = [
  { id: 'BKP001', type: 'Full Backup', size: '2.4 GB', status: 'completed', date: '2024-01-28 02:00:00' },
  { id: 'BKP002', type: 'Incremental', size: '156 MB', status: 'completed', date: '2024-01-27 02:00:00' },
  { id: 'BKP003', type: 'Database Only', size: '890 MB', status: 'completed', date: '2024-01-26 02:00:00' },
  { id: 'BKP004', type: 'Full Backup', size: '2.3 GB', status: 'failed', date: '2024-01-25 02:00:00' },
];

export default function AdminMaintenancePage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [isBackingUp, setIsBackingUp] = useState(false);

  const handleBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => setIsBackingUp(false), 3000);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-semibold">System Maintenance</h1>
        <div className="flex items-center gap-2">
          <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
          <Switch id="maintenance-mode" checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
        </div>
      </div>

      {maintenanceMode && (
        <Alert>
          <AlertDescription>
            Maintenance mode is enabled. The website is currently unavailable to users.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.cpu.usage}%</div>
            <Progress value={systemMetrics.cpu.usage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{systemMetrics.cpu.cores} cores, {systemMetrics.cpu.temperature}°C</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.memory.percentage}%</div>
            <Progress value={systemMetrics.memory.percentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{systemMetrics.memory.used}GB / {systemMetrics.memory.total}GB</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disk Space</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.disk.percentage}%</div>
            <Progress value={systemMetrics.disk.percentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{systemMetrics.disk.used}GB / {systemMetrics.disk.total}GB</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Healthy</div>
            <p className="text-xs text-muted-foreground mt-1">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="backup" className="space-y-4">
        <TabsList>
          <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="cleanup">System Cleanup</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
        </TabsList>

        <TabsContent value="backup">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Backup Controls</CardTitle>
                <CardDescription>Manage system backups and restoration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-backup">Automatic Backups</Label>
                  <Switch id="auto-backup" checked={autoBackup} onCheckedChange={setAutoBackup} />
                </div>
                <div className="space-y-2">
                  <Button onClick={handleBackup} disabled={isBackingUp} className="w-full gap-1">
                    {isBackingUp ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
                    {isBackingUp ? 'Creating Backup...' : 'Create Full Backup'}
                  </Button>
                  <Button variant="outline" className="w-full gap-1">
                    <Download className="h-4 w-4" />
                    Download Latest Backup
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Next scheduled backup: Tomorrow at 2:00 AM</p>
                  <p>Backup retention: 30 days</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Backup History</CardTitle>
                <CardDescription>Recent backup operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {backupHistory.map((backup) => (
                    <div key={backup.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{backup.type}</p>
                        <p className="text-sm text-muted-foreground">{backup.size} • {new Date(backup.date).toLocaleDateString()}</p>
                      </div>
                      <Badge variant={backup.status === 'completed' ? 'default' : 'destructive'}>
                        {backup.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Monitoring</CardTitle>
              <CardDescription>Real-time system performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Database Response Time</span>
                      <span className="text-sm text-muted-foreground">12ms</span>
                    </div>
                    <Progress value={20} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">API Response Time</span>
                      <span className="text-sm text-muted-foreground">45ms</span>
                    </div>
                    <Progress value={35} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Page Load Time</span>
                      <span className="text-sm text-muted-foreground">1.2s</span>
                    </div>
                    <Progress value={60} />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Active Connections</span>
                      <span className="text-sm text-muted-foreground">234</span>
                    </div>
                    <Progress value={47} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Cache Hit Rate</span>
                      <span className="text-sm text-muted-foreground">89%</span>
                    </div>
                    <Progress value={89} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Error Rate</span>
                      <span className="text-sm text-muted-foreground">0.1%</span>
                    </div>
                    <Progress value={1} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cleanup">
          <Card>
            <CardHeader>
              <CardTitle>System Cleanup</CardTitle>
              <CardDescription>Clean up temporary files and optimize system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Temporary Files</h4>
                  <p className="text-sm text-muted-foreground mb-3">245 MB of temp files</p>
                  <Button variant="outline" size="sm" className="w-full">Clean Up</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Log Files</h4>
                  <p className="text-sm text-muted-foreground mb-3">1.2 GB of old logs</p>
                  <Button variant="outline" size="sm" className="w-full">Archive Logs</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Cache</h4>
                  <p className="text-sm text-muted-foreground mb-3">890 MB cached data</p>
                  <Button variant="outline" size="sm" className="w-full">Clear Cache</Button>
                </div>
              </div>
              <Button className="w-full">Run Full System Cleanup</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="updates">
          <Card>
            <CardHeader>
              <CardTitle>System Updates</CardTitle>
              <CardDescription>Manage system and security updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Security Updates</h4>
                  <Badge>3 Available</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Critical security patches available</p>
                <Button size="sm">Install Updates</Button>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">System Updates</h4>
                  <Badge variant="outline">Up to Date</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">System is running latest version</p>
                <Button variant="outline" size="sm">Check for Updates</Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Last update check: 2 hours ago</p>
                <p>Auto-updates: Enabled for security patches</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}