'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Settings, LogOut, Shield, ChevronsUpDown, User } from 'lucide-react';
import Link from 'next/link';
import { useSidebar } from './ui/sidebar';

export function AdminUserNav() {
  const { state } = useSidebar();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-auto w-full justify-start gap-2 px-2 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://picsum.photos/seed/admin-avatar/100/100"
              alt="@admin"
            />
            <AvatarFallback className="bg-red-100 text-red-600">A</AvatarFallback>
          </Avatar>
          {state === 'expanded' && (
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col items-start">
                <p className="text-sm font-medium leading-none">Admin User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@vendorverse.com
                </p>
              </div>
              <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none flex items-center gap-2">
              <Shield className="h-4 w-4 text-red-500" />
              Admin User
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              admin@vendorverse.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/admin/settings" className="flex items-center w-full">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/admin/settings" className="flex items-center w-full">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/" className="flex items-center w-full">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}