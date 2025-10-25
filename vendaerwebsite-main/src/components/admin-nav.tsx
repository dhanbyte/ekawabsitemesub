'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  Shield,
  AlertTriangle,
  Tag,
  User,
  FileText,
  Percent,
  Archive,
  DollarSign,
  MessageSquare,
  Activity,
  Server,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const adminNavItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/users', icon: User, label: 'Users' },
  { href: '/admin/vendors', icon: Users, label: 'Vendors' },
  { href: '/admin/products', icon: Package, label: 'Products' },
  { href: '/admin/categories', icon: Tag, label: 'Categories' },
  { href: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  { href: '/admin/coupons', icon: Percent, label: 'Coupons' },
  { href: '/admin/inventory', icon: Archive, label: 'Inventory' },
  { href: '/admin/finance', icon: DollarSign, label: 'Finance' },
  { href: '/admin/communications', icon: MessageSquare, label: 'Communications' },
  { href: '/admin/content', icon: FileText, label: 'Content' },
  { href: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/admin/reports', icon: AlertTriangle, label: 'Reports' },
  { href: '/admin/logs', icon: Activity, label: 'Logs' },
  { href: '/admin/maintenance', icon: Server, label: 'Maintenance' },
  { href: '/admin/settings', icon: Settings, label: 'Settings' },
];

export function AdminNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex flex-col', className)} {...props}>
      <SidebarMenu>
        {adminNavItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))}
              tooltip={item.label}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </nav>
  );
}