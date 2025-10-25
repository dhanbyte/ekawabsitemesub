'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';

type NavItem = 'profile' | 'business' | 'billing' | 'notifications';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<NavItem>('profile');

  const navItems = [
    { id: 'profile', label: 'Profile' },
    { id: 'business', label: 'Business Info' },
    { id: 'billing', label: 'Billing' },
    { id: 'notifications', label: 'Notifications' },
  ];

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="font-headline text-3xl font-semibold">Settings</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 text-sm text-muted-foreground">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as NavItem)}
              className={cn(
                'text-left',
                activeTab === item.id && 'font-semibold text-primary'
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="grid gap-6">
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you&apos;ll be logged
                  out.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save Password</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === 'business' && (
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>
                  Update your business name and details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Business Name</Label>
                    <Input
                      id="name"
                      placeholder="Business Name"
                      defaultValue="Vendor Inc."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Business Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Business Description"
                      defaultValue="Specializing in high-quality office equipment and ergonomic solutions."
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === 'billing' && (
            <Card>
              <CardHeader>
                <CardTitle>Bank Information</CardTitle>
                <CardDescription>
                  Manage your bank details for payouts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="bank-name">Bank Name</Label>
                    <Input
                      id="bank-name"
                      placeholder="e.g. Global Bank"
                      defaultValue="Global Bank Inc."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="account-holder-name">
                      Account Holder Name
                    </Label>
                    <Input
                      id="account-holder-name"
                      placeholder="e.g. Vendor Inc."
                      defaultValue="Vendor Inc."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="account-number">Account Number</Label>
                    <Input
                      id="account-number"
                      placeholder="e.g. 1234567890"
                      defaultValue="1234567890"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="routing-number">Routing Number</Label>
                    <Input
                      id="routing-number"
                      placeholder="e.g. 098765432"
                      defaultValue="0987654321"
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save Bank Information</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === 'notifications' && (
             <Card>
             <CardHeader>
               <CardTitle>Notifications</CardTitle>
               <CardDescription>
                 Manage your notification preferences.
               </CardDescription>
             </CardHeader>
             <CardContent className="grid gap-6">
                <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <Label htmlFor="marketing-emails" className="flex flex-col space-y-1">
                    <span>Marketing emails</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                        Receive emails about new products, features, and more.
                    </span>
                    </Label>
                    <Switch id="marketing-emails" defaultChecked/>
                </div>
                 <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <Label htmlFor="security-emails" className="flex flex-col space-y-1">
                    <span>Security emails</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                        Receive emails about your account security.
                    </span>
                    </Label>
                    <Switch id="security-emails" defaultChecked disabled />
                </div>
             </CardContent>
             <CardFooter className="border-t px-6 py-4">
              <Button>Save Preferences</Button>
            </CardFooter>
           </Card>
          )}
        </div>
      </div>
    </main>
  );
}
