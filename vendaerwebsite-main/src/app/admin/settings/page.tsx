'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

type SettingsTab = 'general' | 'platform' | 'payments' | 'notifications' | 'security';

const settingsData = {
  general: {
    platformName: 'VendorVerse',
    platformDescription: 'Your central hub for managing vendor operations',
    supportEmail: 'support@vendorverse.com',
    adminEmail: 'admin@vendorverse.com',
  },
  platform: {
    defaultCommission: 15,
    autoApproveVendors: false,
    requireProductApproval: true,
    maxProductsPerVendor: 1000,
    allowVendorRegistration: true,
  },
  payments: {
    paymentGateway: 'stripe',
    currency: 'USD',
    taxRate: 8.5,
    payoutSchedule: 'weekly',
    minimumPayout: 100,
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    vendorNotifications: true,
    orderNotifications: true,
  },
  security: {
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordPolicy: 'strong',
    loginAttempts: 5,
  }
};

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [settings, setSettings] = useState(settingsData);

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'platform', label: 'Platform' },
    { id: 'payments', label: 'Payments' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
  ];

  const handleSave = () => {
    console.log('Saving settings:', settings);
  };

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="font-headline text-3xl font-semibold">Platform Settings</h1>
      </div>
      
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        {/* Navigation */}
        <nav className="grid gap-4 text-sm text-muted-foreground">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTab)}
              className={`text-left ${
                activeTab === tab.id ? 'font-semibold text-primary' : ''
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="grid gap-6">
          {activeTab === 'general' && (
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Basic platform configuration and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input
                    id="platform-name"
                    value={settings.general.platformName}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, platformName: e.target.value }
                    })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="platform-description">Platform Description</Label>
                  <Textarea
                    id="platform-description"
                    value={settings.general.platformDescription}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, platformDescription: e.target.value }
                    })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input
                    id="support-email"
                    type="email"
                    value={settings.general.supportEmail}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, supportEmail: e.target.value }
                    })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    value={settings.general.adminEmail}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, adminEmail: e.target.value }
                    })}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'platform' && (
            <Card>
              <CardHeader>
                <CardTitle>Platform Configuration</CardTitle>
                <CardDescription>
                  Configure platform behavior and vendor policies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="default-commission">Default Commission Rate (%)</Label>
                  <Input
                    id="default-commission"
                    type="number"
                    value={settings.platform.defaultCommission}
                    onChange={(e) => setSettings({
                      ...settings,
                      platform: { ...settings.platform, defaultCommission: parseInt(e.target.value) }
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-approve Vendors</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically approve new vendor registrations
                    </p>
                  </div>
                  <Switch
                    checked={settings.platform.autoApproveVendors}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      platform: { ...settings.platform, autoApproveVendors: checked }
                    })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Product Approval</Label>
                    <p className="text-sm text-muted-foreground">
                      Products need admin approval before going live
                    </p>
                  </div>
                  <Switch
                    checked={settings.platform.requireProductApproval}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      platform: { ...settings.platform, requireProductApproval: checked }
                    })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="max-products">Max Products per Vendor</Label>
                  <Input
                    id="max-products"
                    type="number"
                    value={settings.platform.maxProductsPerVendor}
                    onChange={(e) => setSettings({
                      ...settings,
                      platform: { ...settings.platform, maxProductsPerVendor: parseInt(e.target.value) }
                    })}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'payments' && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>
                  Configure payment processing and payout settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="payment-gateway">Payment Gateway</Label>
                  <Select
                    value={settings.payments.paymentGateway}
                    onValueChange={(value) => setSettings({
                      ...settings,
                      payments: { ...settings.payments, paymentGateway: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="razorpay">Razorpay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select
                    value={settings.payments.currency}
                    onValueChange={(value) => setSettings({
                      ...settings,
                      payments: { ...settings.payments, currency: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                  <Input
                    id="tax-rate"
                    type="number"
                    step="0.1"
                    value={settings.payments.taxRate}
                    onChange={(e) => setSettings({
                      ...settings,
                      payments: { ...settings.payments, taxRate: parseFloat(e.target.value) }
                    })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="minimum-payout">Minimum Payout Amount</Label>
                  <Input
                    id="minimum-payout"
                    type="number"
                    value={settings.payments.minimumPayout}
                    onChange={(e) => setSettings({
                      ...settings,
                      payments: { ...settings.payments, minimumPayout: parseInt(e.target.value) }
                    })}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure notification preferences for the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, emailNotifications: checked }
                    })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send browser push notifications
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.pushNotifications}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, pushNotifications: checked }
                    })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Vendor Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify vendors about important updates
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.vendorNotifications}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, vendorNotifications: checked }
                    })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Order Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify about new orders and status changes
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.orderNotifications}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, orderNotifications: checked }
                    })}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure security policies and authentication settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for admin accounts
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Enabled</Badge>
                    <Switch
                      checked={settings.security.twoFactorAuth}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        security: { ...settings.security, twoFactorAuth: checked }
                      })}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                    })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password-policy">Password Policy</Label>
                  <Select
                    value={settings.security.passwordPolicy}
                    onValueChange={(value) => setSettings({
                      ...settings,
                      security: { ...settings.security, passwordPolicy: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                      <SelectItem value="strong">Strong (8+ chars, mixed case, numbers)</SelectItem>
                      <SelectItem value="very-strong">Very Strong (12+ chars, symbols)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="login-attempts">Max Login Attempts</Label>
                  <Input
                    id="login-attempts"
                    type="number"
                    value={settings.security.loginAttempts}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: { ...settings.security, loginAttempts: parseInt(e.target.value) }
                    })}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Settings</Button>
          </div>
        </div>
      </div>
    </main>
  );
}