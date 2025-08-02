
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
import {
  LayoutGrid,
  Users,
  ClipboardList,
  Scissors,
  Wand2,
  BarChart,
  CircleDollarSign,
  Languages,
} from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const TailorLogo = () => (
    <div className="flex items-center gap-3 group">
      <div className="bg-pink-500 rounded-lg p-2 transition-transform duration-300 ease-in-out group-hover:scale-110">
        <Scissors className="h-6 w-6 text-white" />
      </div>
      <h1 className="text-2xl font-bold">
        PerfectFit-Tailors
      </h1>
    </div>
);


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
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        <SidebarHeader className="p-4">
          <TailorLogo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu className="px-4">
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/tailor/dashboard')}
                isActive={isActive('/tailor/dashboard')}
                tooltip="Dashboard"
              >
                <LayoutGrid />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/tailor/customers')}
                isActive={isActive('/tailor/customers')}
                tooltip="Customers"
              >
                <Users />
                Customers
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/tailor/orders')}
                isActive={isActive('/tailor/orders')}
                tooltip="Orders"
              >
                <ClipboardList />
                Orders
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/tailor/designs')}
                isActive={isActive('/tailor/designs')}
                tooltip="Designs"
              >
                <Scissors />
                Designs
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/tailor/ai-assistant')}
                isActive={isActive('/tailor/ai-assistant')}
                tooltip="AI Assistant"
              >
                <Wand2 />
                AI Assistant
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/tailor/reports')}
                isActive={isActive('/tailor/reports')}
                tooltip="Reports"
              >
                <BarChart />
                Reports
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/tailor/charges')}
                isActive={isActive('/tailor/charges')}
                tooltip="Charges"
              >
                <CircleDollarSign />
                Charges
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 sm:px-6">
           <SidebarTrigger className="md:hidden" />
           <div className="flex-1"></div>
           <div className="flex items-center gap-4">
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Languages className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Language</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>English</DropdownMenuItem>
                    <DropdownMenuItem>Hindi</DropdownMenuItem>
                    <DropdownMenuItem>Marathi</DropdownMenuItem>
                    <DropdownMenuItem>Urdu</DropdownMenuItem>
                </DropdownMenuContent>
             </DropdownMenu>
            <Avatar className="h-9 w-9">
                <AvatarImage src="https://placehold.co/100x100.png" alt="Tailor" data-ai-hint="person avatar"/>
                <AvatarFallback>T</AvatarFallback>
            </Avatar>
           </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 bg-secondary/40">{children}</main>
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
