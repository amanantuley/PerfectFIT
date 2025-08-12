
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, RefreshCw, Truck, Package, MoreHorizontal, FileText, Calendar, DollarSign, Loader2, Users } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useTranslation } from '@/context/translation-provider';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const allOrders = [
  { orderId: '#T302', customer: 'Liam Johnson', item: 'Navy Blue Suit', date: '2025-07-20', dueDate: '2025-08-05', status: 'In Progress', amount: 4500 },
  { orderId: '#T301', customer: 'Olivia Smith', item: 'Classic White Shirt', date: '2025-07-18', dueDate: '2025-07-25', status: 'Completed', amount: 800 },
  { orderId: '#T300', customer: 'Noah Williams', item: 'Charcoal Gray Suit', date: '2025-07-15', dueDate: '2025-07-30', status: 'Shipped', amount: 4200 },
  { orderId: '#T299', customer: 'Emma Brown', item: 'Casual Checkered Shirt', date: '2025-07-14', dueDate: '2025-07-21', status: 'Completed', amount: 950 },
  { orderId: '#T298', customer: 'James Jones', item: 'Black Tuxedo', date: '2025-07-12', dueDate: '2025-08-01', status: 'In Progress', amount: 5500 },
  { orderId: '#T297', customer: 'Sophia Garcia', item: 'Linen Trousers', date: '2025-07-11', dueDate: '2025-07-18', status: 'New', amount: 1200 },
];

type Order = typeof allOrders[0];
type OrderStatus = 'New' | 'In Progress' | 'Shipped' | 'Completed';

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
  const router = useRouter();
  const { toast } = useToast();

  const [orders, setOrders] = useState(allOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<OrderStatus | ''>('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleOpenDialog = (order: Order, type: 'details' | 'status') => {
    setSelectedOrder(order);
    if (type === 'details') setIsDetailOpen(true);
    if (type === 'status') {
      setNewStatus(order.status as OrderStatus);
      setIsStatusOpen(true);
    }
  };
  
  const handleUpdateStatus = () => {
    if (!selectedOrder || !newStatus) return;
    setIsUpdating(true);
    setTimeout(() => {
        setOrders(orders.map(o => o.orderId === selectedOrder.orderId ? { ...o, status: newStatus } : o));
        setIsUpdating(false);
        setIsStatusOpen(false);
        toast({
            title: t('Status Updated'),
            description: `${t('Order')} ${selectedOrder.orderId} ${t('has been updated to')} "${t(newStatus as any)}".`
        })
    }, 1000);
  };

  return (
    <>
    <Card className="animate-fade-in-up shadow-lg">
      <CardHeader>
        <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">{t('Manage Orders')}</CardTitle>
        <CardDescription>{t('View, update, and manage all incoming customer orders.')}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Mobile View */}
        <div className="md:hidden space-y-4">
            {orders.map((order) => {
                 const { variant, icon: Icon } = getStatusConfig(order.status);
                 return (
                    <Card key={order.orderId} className="overflow-hidden transition-all hover:shadow-md hover:bg-muted/50">
                        <CardContent className="p-4 flex flex-col gap-3">
                             <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <p className="font-bold">{t(order.item as any)}</p>
                                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                                    <p className="text-xs text-muted-foreground">{order.orderId} &bull; {t('Due' as any)}: {order.dueDate}</p>
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
                                        <DropdownMenuItem onClick={() => handleOpenDialog(order, 'details')}>{t('View Order Details')}</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.push('/tailor/messages')}>{t('Message Customer' as any)}</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => handleOpenDialog(order, 'status')}>{t('Update Status')}</DropdownMenuItem>
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
        <div className="hidden md:block rounded-md border">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>{t('Order ID')}</TableHead>
                <TableHead>{t('Customer')}</TableHead>
                <TableHead>{t('Item')}</TableHead>
                <TableHead>{t('Order Date')}</TableHead>
                <TableHead>{t('Due Date')}</TableHead>
                <TableHead>{t('Status')}</TableHead>
                <TableHead className="text-right">{t('Actions')}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => {
                const { variant, icon: Icon } = getStatusConfig(order.status);
                return (
                    <TableRow key={order.orderId} className="transition-colors hover:bg-muted/30">
                    <TableCell className="font-medium">{order.orderId}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{t(order.item as any)}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.dueDate}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleOpenDialog(order, 'details')}>{t('View Order Details')}</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push('/tailor/messages')}>{t('Message Customer' as any)}</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleOpenDialog(order, 'status')}>{t('Update Status')}</DropdownMenuItem>
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

    <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{t('Order Details')}</DialogTitle>
                <DialogDescription>{selectedOrder?.orderId}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" /> <span><b>{t('Item')}:</b> {t(selectedOrder?.item as any)}</span></div>
                <div className="flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground" /> <span><b>{t('Customer')}:</b> {selectedOrder?.customer}</span></div>
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /> <span><b>{t('Order Date')}:</b> {selectedOrder?.date}</span></div>
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /> <span><b>{t('Due Date')}:</b> {selectedOrder?.dueDate}</span></div>
                <div className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-muted-foreground" /> <span><b>{t('Amount')}:</b> ₹{selectedOrder?.amount.toFixed(2)}</span></div>
                <div className="flex items-center gap-2"><Package className="h-4 w-4 text-muted-foreground" /> <span><b>{t('Status')}:</b> {t(selectedOrder?.status as any)}</span></div>
            </div>
        </DialogContent>
    </Dialog>

    <Dialog open={isStatusOpen} onOpenChange={setIsStatusOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{t('Update Order Status')}</DialogTitle>
                <DialogDescription>{t('Select the new status for order')} {selectedOrder?.orderId}.</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-2">
                <Select value={newStatus} onValueChange={(v) => setNewStatus(v as OrderStatus)}>
                    <SelectTrigger>
                        <SelectValue placeholder={t('Select status')} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="New">{t('New')}</SelectItem>
                        <SelectItem value="In Progress">{t('In Progress')}</SelectItem>
                        <SelectItem value="Shipped">{t('Shipped')}</SelectItem>
                        <SelectItem value="Completed">{t('Completed')}</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <DialogFooter>
                <Button variant="ghost" onClick={() => setIsStatusOpen(false)}>{t('Cancel')}</Button>
                <Button onClick={handleUpdateStatus} disabled={isUpdating}>
                    {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t('Update')}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
  );
}
