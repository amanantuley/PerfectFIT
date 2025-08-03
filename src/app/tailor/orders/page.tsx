

'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, RefreshCw, Truck, Package, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTranslation } from '@/context/translation-provider';

const allOrders = [
  { orderId: '#T302', customer: 'Liam Johnson', item: 'Navy Blue Suit', date: '2025-07-20', status: 'In Progress' },
  { orderId: '#T301', customer: 'Olivia Smith', item: 'Classic White Shirt', date: '2025-07-18', status: 'Completed' },
  { orderId: '#T300', customer: 'Noah Williams', item: 'Charcoal Gray Suit', date: '2025-07-15', status: 'Shipped' },
  { orderId: '#T299', customer: 'Emma Brown', item: 'Casual Checkered Shirt', date: '2025-07-14', status: 'Completed' },
  { orderId: '#T298', customer: 'James Jones', item: 'Black Tuxedo', date: '2025-07-12', status: 'In Progress' },
  { orderId: '#T297', customer: 'Sophia Garcia', item: 'Linen Trousers', date: '2025-07-11', status: 'New' },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'In Progress':
      return { variant: 'secondary' as const, icon: RefreshCw };
    case 'Completed':
      return { variant: 'default' as const, icon: CheckCircle };
    case 'Shipped':
      return { variant: 'secondary' as const, icon: Truck };
    default:
      return { variant: 'outline' as const, icon: Package };
  }
};

export default function TailorOrdersPage() {
  const { t } = useTranslation();

  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle>{t('Manage Orders')}</CardTitle>
        <CardDescription>{t('View, update, and manage all incoming customer orders.')}</CardDescription>
      </CardHeader>
      <CardContent>
         {/* Mobile View */}
        <div className="md:hidden space-y-4">
            {allOrders.map((order) => {
                 const { variant, icon: Icon } = getStatusConfig(order.status);
                 return (
                    <Card key={order.orderId} className="overflow-hidden transition-all hover:shadow-md hover:bg-muted/50">
                        <CardContent className="p-4 flex flex-col gap-3">
                             <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <p className="font-bold">{t(order.item as any)}</p>
                                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                                    <p className="text-xs text-muted-foreground">{order.orderId} &bull; {order.date}</p>
                                </div>
                                 <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">{t('Open menu')}</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>{t('Actions')}</DropdownMenuLabel>
                                        <DropdownMenuItem>{t('View Order Details')}</DropdownMenuItem>
                                        <DropdownMenuItem>{t('Update Status')}</DropdownMenuItem>
                                        <DropdownMenuItem>{t('Contact Customer')}</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <Badge variant={variant} className="gap-1.5 self-start">
                                <Icon className="h-3.5 w-3.5" />
                                {t(order.status as any)}
                            </Badge>
                        </CardContent>
                    </Card>
                 )
            })}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>{t('Order ID')}</TableHead>
                <TableHead>{t('Customer')}</TableHead>
                <TableHead>{t('Item')}</TableHead>
                <TableHead>{t('Order Date')}</TableHead>
                <TableHead>{t('Status')}</TableHead>
                <TableHead className="text-right">{t('Actions')}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {allOrders.map((order) => {
                const { variant, icon: Icon } = getStatusConfig(order.status);
                return (
                    <TableRow key={order.orderId} className="transition-colors hover:bg-muted/30">
                    <TableCell className="font-medium">{order.orderId}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{t(order.item as any)}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                        <Badge variant={variant} className="gap-1.5">
                        <Icon className="h-3.5 w-3.5" />
                        {t(order.status as any)}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">{t('Open menu')}</span>
                            <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t('Actions')}</DropdownMenuLabel>
                            <DropdownMenuItem>{t('View Order Details')}</DropdownMenuItem>
                            <DropdownMenuItem>{t('Update Status')}</DropdownMenuItem>
                            <DropdownMenuItem>{t('Contact Customer')}</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                );
                })}
            </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
