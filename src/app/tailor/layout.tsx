
'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import Logo from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Package, User, LogOut, Settings, DollarSign, Briefcase } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';

function TailorLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  const handleNavigation = (path: string) => {
    router.push(path);
    setOpenMobile(false);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <Sidebar side="left" variant="inset" collapsible="icon">
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/tailor/dashboard')}
                isActive={isActive('/tailor/dashboard')}
                tooltip="Dashboard"
              >
                <LayoutDashboard />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/tailor/orders')}
                isActive={isActive('/tailor/orders')}
                tooltip="Orders"
              >
                <Package />
                Orders
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/tailor/earnings')}
                isActive={isActive('/tailor/earnings')}
                tooltip="Earnings"
              >
                <DollarSign />
                Earnings
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/tailor/profile')}
                isActive={isActive('/tailor/profile')}
                tooltip="My Profile"
              >
                <Briefcase />
                My Profile
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-full group-data-[collapsible=icon]:w-auto">
                    <Button variant="ghost" className="w-full justify-start gap-2 p-2 h-auto">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://placehold.co/100x100.png" alt="Tailor" data-ai-hint="person avatar"/>
                            <AvatarFallback>T</AvatarFallback>
                        </Avatar>
                        <div className="group-data-[collapsible=icon]:hidden text-left">
                            <p className="text-sm font-medium text-sidebar-foreground">Tailor</p>
                        </div>
                    </Button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mb-2" side="top" align="start">
                <DropdownMenuLabel>Tailor Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigation('/tailor/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigation('/')}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background/80 backdrop-blur-sm px-4 sm:px-6">
           <SidebarTrigger className="md:hidden" />
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </>
  );
}


export default function TailorLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <TailorLayoutContent>{children}</TailorLayoutContent>
    </SidebarProvider>
  );
}
