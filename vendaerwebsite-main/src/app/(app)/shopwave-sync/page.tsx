'use client';

import { useState } from 'react';
import {
  syncShopwaveData,
  type SyncShopwaveDataInput,
  type SyncShopwaveDataOutput,
} from '@/ai/flows/sync-shopwave-data';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const placeholderVendorData = JSON.stringify(
  [
    { sku: 'ABC-123', stock: 95 },
    { sku: 'DEF-456', stock: 10 },
  ],
  null,
  2
);

const placeholderShopwaveData = JSON.stringify(
  [
    { sku: 'ABC-123', quantity: 100 },
    { sku: 'GHI-789', quantity: 50 },
  ],
  null,
  2
);

export default function ShopwaveSyncPage() {
  const [dataType, setDataType] =
    useState<'inventory' | 'orders' | 'customerData'>('inventory');
  const [vendorData, setVendorData] = useState(placeholderVendorData);
  const [shopwaveData, setShopwaveData] = useState(placeholderShopwaveData);
  const [result, setResult] = useState<SyncShopwaveDataOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSync = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const input: SyncShopwaveDataInput = {
      dataType,
      vendorData,
      shopwaveData,
    };

    try {
      const output = await syncShopwaveData(input);
      setResult(output);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="font-headline text-3xl font-semibold">Shopwave Sync</h1>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sync Data</CardTitle>
            <CardDescription>
              Select data type and provide data from Shopwave and your system to
              sync.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dataType">Data Type</Label>
              <Select
                value={dataType}
                onValueChange={(value) =>
                  setDataType(value as any)
                }
              >
                <SelectTrigger id="dataType">
                  <SelectValue placeholder="Select data type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inventory">Inventory</SelectItem>
                  <SelectItem value="orders">Orders</SelectItem>
                  <SelectItem value="customerData">Customer Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="shopwaveData">Shopwave Data (JSON)</Label>
              <Textarea
                id="shopwaveData"
                value={shopwaveData}
                onChange={(e) => setShopwaveData(e.target.value)}
                rows={8}
                placeholder="Paste Shopwave JSON data here"
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vendorData">Your Vendor Data (JSON)</Label>
              <Textarea
                id="vendorData"
                value={vendorData}
                onChange={(e) => setVendorData(e.target.value)}
                rows={8}
                placeholder="Paste your vendor JSON data here"
                className="font-mono text-sm"
              />
            </div>
            <Button onClick={handleSync} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sync with AI
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {isLoading && (
            <div className="flex h-full items-center justify-center rounded-lg border border-dashed">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p>AI is analyzing data...</p>
              </div>
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {result && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>AI Recommendations</CardTitle>
                  <CardDescription>
                    AI-powered suggestions to resolve discrepancies.
                  </CardDescription>
                </CardHeader>
                <CardContent className="whitespace-pre-wrap rounded-md bg-muted p-4 font-mono text-sm">
                  {result.recommendations}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Updated Vendor Data</CardTitle>
                  <CardDescription>
                    The synchronized data for your system.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    readOnly
                    value={result.updatedVendorData}
                    rows={10}
                    className="font-mono text-sm"
                  />
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
