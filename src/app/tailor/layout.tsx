
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
  User,
  LogOut,
  Settings,
} from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import ChatWidget from '@/components/chat-widget';
import { TranslationProvider, useTranslation } from '@/context/translation-provider';
import Logo from '@/components/logo';

function TailorLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpenMobile } = useSidebar();
  const { t, setLanguage } = useTranslation();

  const handleNavigation = (path: string) => {
    router.push(path);
    setOpenMobile(false);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        <SidebarHeader className="p-4">
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu className="px-4">
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/tailor/dashboard')}
                isActive={isActive('/tailor/dashboard')}
                tooltip={t('Dashboard')}
              >
                <LayoutGrid />
                {t('Dashboard')}
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/tailor/customers')}
                isActive={isActive('/tailor/customers')}
                tooltip={t('Customers')}
              >
                <Users />
                {t('Customers')}
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/tailor/orders')}
                isActive={isActive('/tailor/orders')}
                tooltip={t('Orders')}
              >
                <ClipboardList />
                {t('Orders')}
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/tailor/designs')}
                isActive={isActive('/tailor/designs')}
                tooltip={t('Designs')}
              >
                <Scissors />
                {t('Designs')}
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/tailor/ai-assistant')}
                isActive={isActive('/tailor/ai-assistant')}
                tooltip={t('AI Assistant')}
              >
                <Wand2 />
                {t('AI Assistant')}
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/tailor/reports')}
                isActive={isActive('/tailor/reports')}
                tooltip={t('Reports')}
              >
                <BarChart />
                {t('Reports')}
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleNavigation('/tailor/earnings')}
                isActive={isActive('/tailor/earnings')}
                tooltip={t('Earnings')}
              >
                <CircleDollarSign />
                {t('Earnings')}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-full group-data-[collapsible=icon]:w-auto">
                    <Button variant="ghost" className="w-full justify-start gap-2 p-2 h-auto">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://placehold.co/100x100.png" alt="Tailor" data-ai-hint="person avatar" />
                            <AvatarFallback>T</AvatarFallback>
                        </Avatar>
                        <div className="group-data-[collapsible=icon]:hidden text-left">
                            <p className="text-sm font-medium text-sidebar-foreground">{t('Tailor')}</p>
                        </div>
                    </Button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mb-2" side="top" align="start">
                <DropdownMenuLabel>{t('My Account')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigation('/tailor/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>{t('Profile')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation('/tailor/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{t('Settings')}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigation('/')}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t('Log out')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </SidebarFooter>
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
                    <DropdownMenuLabel>{t('Language')}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => setLanguage('en')}>{t('English')}</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setLanguage('hi')}>{t('Hindi')}</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setLanguage('mr')}>{t('Marathi')}</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setLanguage('ur')}>{t('Urdu')}</DropdownMenuItem>
                </DropdownMenuContent>
             </DropdownMenu>
           </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 bg-secondary/40 overflow-y-auto">{children}</main>
        <ChatWidget />
      </SidebarInset>
    </>
  );
}


export default function TailorLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <TranslationProvider>
        <TailorLayoutContent>{children}</TailorLayoutContent>
      </TranslationProvider>
    </SidebarProvider>
  );
}
