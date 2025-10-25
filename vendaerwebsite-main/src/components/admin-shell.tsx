'use client';

import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from '@/components/ui/sidebar';
import { AdminNav } from '@/components/admin-nav';
import { AdminUserNav } from '@/components/admin-user-nav';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import Link from 'next/link';
import { useSidebar } from './ui/sidebar';

function AdminLogo() {
  const { state } = useSidebar();
  return (
    <Button variant="ghost" asChild className="h-10 w-full justify-start px-2 text-lg font-bold">
      <Link href="/admin/dashboard" className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-red-500" />
        {state === 'expanded' && <span className="font-headline text-red-500">Admin Panel</span>}
      </Link>
    </Button>
  )
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <AdminLogo />
        </SidebarHeader>
        <SidebarContent>
          <AdminNav />
        </SidebarContent>
        <SidebarFooter>
          <AdminUserNav />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}