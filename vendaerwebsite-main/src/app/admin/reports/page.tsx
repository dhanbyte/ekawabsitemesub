'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const reportTypes = [
  { id: 'sales', name: 'Sales Report', description: 'Monthly sales performance' },
  { id: 'vendors', name: 'Vendor Report', description: 'Vendor performance metrics' },
  { id: 'products', name: 'Product Report', description: 'Product analytics' },
  { id: 'financial', name: 'Financial Report', description: 'Revenue and commission data' },
];

const generatedReports = [
  {
    id: 'RPT001',
    name: 'January 2024 Sales Report',
    type: 'Sales Report',
    generatedDate: '2024-02-01',
    status: 'completed',
    size: '2.4 MB',
    downloadUrl: '#'
  },
  {
    id: 'RPT002',
    name: 'Vendor Performance Q1 2024',
    type: 'Vendor Report',
    generatedDate: '2024-01-31',
    status: 'completed',
    size: '1.8 MB',
    downloadUrl: '#'
  },
  {
    id: 'RPT003',
    name: 'Product Analytics December',
    type: 'Product Report',
    generatedDate: '2024-01-30',
    status: 'processing',
    size: '-',
    downloadUrl: '#'
  },
  {
    id: 'RPT004',
    name: 'Financial Summary Q4 2023',
    type: 'Financial Report',
    generatedDate: '2024-01-29',
    status: 'failed',
    size: '-',
    downloadUrl: '#'
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'processing':
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case 'failed':
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    default:
      return null;
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'completed':
      return 'default';
    case 'processing':
      return 'secondary';
    case 'failed':
      return 'destructive';
    default:
      return 'outline';
  }
};

export default function AdminReportsPage() {
  const [selectedReportType, setSelectedReportType] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');

  const handleGenerateReport = () => {
    // Simulate report generation
    console.log('Generating report:', selectedReportType, selectedPeriod);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-semibold">Reports & Analytics</h1>
      </div>

      {/* Generate New Report */}
      <Card>
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
          <CardDescription>
            Create custom reports for different aspects of your platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Period</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 days</SelectItem>
                  <SelectItem value="last-3-months">Last 3 months</SelectItem>
                  <SelectItem value="last-6-months">Last 6 months</SelectItem>
                  <SelectItem value="last-year">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleGenerateReport}
                disabled={!selectedReportType || !selectedPeriod}
                className="w-full"
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Types */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {reportTypes.map((type) => (
          <Card key={type.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{type.name}</CardTitle>
              <CardDescription className="text-sm">{type.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-3 w-3 mr-2" />
                Quick Generate
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Generated Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Reports</CardTitle>
          <CardDescription>
            View and download previously generated reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Generated Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {generatedReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{new Date(report.generatedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(report.status)}
                      <Badge variant={getStatusVariant(report.status)} className="capitalize">
                        {report.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{report.size}</TableCell>
                  <TableCell>
                    {report.status === 'completed' ? (
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-2" />
                        Download
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" disabled>
                        {report.status === 'processing' ? 'Processing...' : 'Failed'}
                      </Button>
                    )}
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