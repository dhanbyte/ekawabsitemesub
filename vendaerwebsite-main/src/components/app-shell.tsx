'use client';

import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from '@/components/ui/sidebar';
import { MainNav } from '@/components/main-nav';
import { UserNav } from '@/components/user-nav';
import { Button } from '@/components/ui/button';
import { Package2 } from 'lucide-react';
import Link from 'next/link';
import { useSidebar } from './ui/sidebar';

function AppLogo() {
  const { state } = useSidebar();
  return (
    <Button variant="ghost" asChild className="h-10 w-full justify-start px-2 text-lg font-bold">
      <Link href="/dashboard" className="flex items-center gap-2">
        <Package2 className="h-6 w-6" />
        {state === 'expanded' && <span className="font-headline">VendorVerse</span>}
      </Link>
    </Button>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <AppLogo />
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
        <SidebarFooter>
          <UserNav />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
