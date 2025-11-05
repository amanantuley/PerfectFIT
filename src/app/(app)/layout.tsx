'use client';

import React, { useEffect, useState } from 'react';
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
import {
  LayoutDashboard,
  Package,
  User,
  LogOut,
  Undo2,
  Info,
  Mail,
  Percent,
  Crown,
  MessageSquare,
  HeartPulse,
  HelpCircle,
  ShoppingCart,
  Settings,
  Gem,
  Award,
  Wallet,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { SubscriptionProvider, useSubscription } from '@/context/subscription-provider';
import { AppProvider } from '@/context/app-context';
import { auth, signOut } from '@/lib/firebase';

const pageTitles: { [key: string]: string } = {
  '/dashboard': 'Dashboard',
  '/orders': 'My Orders',
  '/cart': 'My Cart',
  '/wallet': 'My Wallet',
  '/returns': 'Returns & Refunds',
  '/fitness': 'Fitness Tracking',
  '/feedback': 'Feedback',
  '/rewards': 'Rewards',
  '/subscription': 'Subscription',
  '/offers': 'Offers',
  '/about': 'About Us',
  '/contact': 'Contact Us',
  '/faq': 'FAQ',
  '/profile': 'My Profile',
  '/settings': 'Settings',
};

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpenMobile } = useSidebar();
  const { isPremium } = useSubscription();
  const [user, setUser] = useState<any>(null);

  // ✅ Listen to Firebase user state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
    setOpenMobile(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      handleNavigation('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path: string) => pathname === path;
  const pageTitle = pageTitles[pathname] || 'Dashboard';

  return (
    <>
      <Sidebar side="left" variant="inset" collapsible="icon">
        {/* ✅ HEADER */}
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2 group-data-[collapsible=icon]:p-0">
            <Logo />
            {isPremium && (
              <Gem className="h-5 w-5 text-yellow-400 group-data-[collapsible=icon]:hidden" />
            )}
          </div>
        </SidebarHeader>

        {/* ✅ MENU ITEMS */}
        <SidebarContent>
          <SidebarMenu>
            {[
              { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
              { path: '/orders', icon: Package, label: 'My Orders' },
              { path: '/cart', icon: ShoppingCart, label: 'My Cart' },
              { path: '/wallet', icon: Wallet, label: 'My Wallet' },
              { path: '/returns', icon: Undo2, label: 'Returns & Refunds' },
              { path: '/fitness', icon: HeartPulse, label: 'Fitness Tracking' },
              { path: '/feedback', icon: MessageSquare, label: 'Feedback' },
              { path: '/rewards', icon: Award, label: 'Rewards' },
            ].map(({ path, icon: Icon, label }) => (
              <SidebarMenuItem key={path}>
                <SidebarMenuButton
                  onClick={() => handleNavigation(path)}
                  isActive={isActive(path)}
                  tooltip={label}
                >
                  <Icon />
                  {label}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            <SidebarSeparator className="my-2" />

            {[
              { path: '/subscription', icon: Crown, label: 'Subscription' },
              { path: '/offers', icon: Percent, label: 'Offers' },
            ].map(({ path, icon: Icon, label }) => (
              <SidebarMenuItem key={path}>
                <SidebarMenuButton
                  onClick={() => handleNavigation(path)}
                  isActive={isActive(path)}
                  tooltip={label}
                >
                  <Icon />
                  {label}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            <SidebarSeparator className="my-2" />

            {[
              { path: '/about', icon: Info, label: 'About Us' },
              { path: '/contact', icon: Mail, label: 'Contact Us' },
              { path: '/faq', icon: HelpCircle, label: 'FAQ' },
            ].map(({ path, icon: Icon, label }) => (
              <SidebarMenuItem key={path}>
                <SidebarMenuButton
                  onClick={() => handleNavigation(path)}
                  isActive={isActive(path)}
                  tooltip={label}
                >
                  <Icon />
                  {label}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        {/* ✅ FOOTER WITH USER PROFILE */}
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-full group-data-[collapsible=icon]:w-auto">
                <Button variant="ghost" className="w-full justify-start gap-2 p-2 h-auto">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user?.photoURL || 'https://placehold.co/100x100?text=U'}
                      alt="User Avatar"
                    />
                    <AvatarFallback>{user?.displayName?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="group-data-[collapsible=icon]:hidden text-left">
                    <p className="text-sm font-medium text-sidebar-foreground">
                      {user?.displayName || 'User'}
                    </p>
                    <p className="text-xs text-muted-foreground truncate max-w-[130px]">
                      {user?.email || 'guest@perfectfit.ai'}
                    </p>
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
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>

      {/* ✅ MAIN CONTENT AREA */}
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-xl font-semibold tracking-tight">{pageTitle}</h1>
          </div>
        </header>

        <SidebarInset>
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </SidebarInset>
      </div>
    </>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppProvider>
        <SubscriptionProvider>
          <AppLayoutContent>{children}</AppLayoutContent>
        </SubscriptionProvider>
      </AppProvider>
    </SidebarProvider>
  );
}
