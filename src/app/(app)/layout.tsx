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
  SidebarSeparator,
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
import { LayoutDashboard, Package, User, LogOut, Undo2, Info, Mail, Percent, Crown, MessageSquare, HeartPulse, Download, HelpCircle, ShoppingCart, Settings, Gem, Award, Wallet } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import ChatWidget from '@/components/chat-widget';
import { SubscriptionProvider, useSubscription } from '@/context/subscription-provider';

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpenMobile } = useSidebar();
  const { isPremium } = useSubscription();

  const handleNavigation = (path: string) => {
    router.push(path);
    setOpenMobile(false);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <Sidebar side="left" variant="inset" collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2 group-data-[collapsible=icon]:p-0">
            <Logo />
            {isPremium && <Gem className="h-5 w-5 text-yellow-400 group-data-[collapsible=icon]:hidden" />}
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/dashboard')}
                isActive={isActive('/dashboard')}
                tooltip="Dashboard"
              >
                <LayoutDashboard />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/orders')}
                isActive={isActive('/orders')}
                tooltip="Orders"
              >
                <Package />
                My Orders
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={() => handleNavigation('/cart')} isActive={isActive('/cart')} tooltip="My Cart">
                    <ShoppingCart />
                    My Cart
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={() => handleNavigation('/wallet')} isActive={isActive('/wallet')} tooltip="PerfectPay Wallet">
                    <Wallet />
                    My Wallet
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/returns')}
                isActive={isActive('/returns')}
                tooltip="Returns & Refunds"
              >
                <Undo2 />
                Returns & Refunds
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/fitness')}
                isActive={isActive('/fitness')}
                tooltip="Fitness Tracking"
              >
                <HeartPulse />
                Fitness Tracking
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={() => handleNavigation('/feedback')} isActive={isActive('/feedback')} tooltip="Feedback">
                    <MessageSquare />
                    Feedback
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => handleNavigation('/rewards')} isActive={isActive('/rewards')} tooltip="Rewards">
                <Award />
                Rewards
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarSeparator className="my-2" />

            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/subscription')}
                isActive={isActive('/subscription')}
                tooltip="Subscription"
              >
                <Crown />
                Subscription
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/offers')}
                isActive={isActive('/offers')}
                tooltip="Offers"
              >
                <Percent />
                Offers
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/download')}
                isActive={isActive('/download')}
                tooltip="Download App"
              >
                <Download />
                Download App
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarSeparator className="my-2" />
            
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/about')}
                isActive={isActive('/about')}
                tooltip="About Us"
              >
                <Info />
                About Us
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/contact')}
                isActive={isActive('/contact')}
                tooltip="Contact Us"
              >
                <Mail />
                Contact Us
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => handleNavigation('/faq')} isActive={isActive('/faq')} tooltip="FAQ">
                <HelpCircle />
                FAQ
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
                            <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="person avatar" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="group-data-[collapsible=icon]:hidden text-left">
                            <p className="text-sm font-medium text-sidebar-foreground">User</p>
                        </div>
                    </Button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mb-2" side="top" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigation('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigation('/login')}>
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
           {/* Can add breadcrumbs or other header content here */}
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
        <ChatWidget />
      </SidebarInset>
    </>
  );
}


export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SubscriptionProvider>
        <AppLayoutContent>{children}</AppLayoutContent>
      </SubscriptionProvider>
    </SidebarProvider>
  );
}
