
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Plus, Star, User, MessageSquare, StickyNote, Loader2 } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/context/translation-provider';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const customers = [
    {
        name: 'Rohan Sharma',
        email: 'rohan.sharma@example.com',
        phone: '9876543210',
        orders: 5,
        isPriority: false,
    },
    {
        name: 'Priya Patel',
        email: 'priya.patel@example.com',
        phone: '9876543211',
        orders: 8,
        isPriority: true,
    },
    {
        name: 'Amit Singh',
        email: 'amit.singh@example.com',
        phone: '9876543212',
        orders: 2,
        isPriority: false,
    },
    {
        name: 'Sneha Reddy',
        email: 'sneha.reddy@example.com',
        phone: '9876543213',
        orders: 12,
        isPriority: true,
    },
    {
        name: 'Vikram Mehta',
        email: 'vikram.mehta@example.com',
        phone: '9876543214',
        orders: 1,
        isPriority: false,
    },
];

type Customer = typeof customers[0];

export default function TailorCustomersPage() {
    const { t } = useTranslation();
    const router = useRouter();
    const { toast } = useToast();
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isNoteOpen, setIsNoteOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAction = (customer: Customer, action: 'details' | 'message' | 'note') => {
        setSelectedCustomer(customer);
        if (action === 'details') setIsDetailOpen(true);
        if (action === 'message') router.push('/tailor/messages');
        if (action === 'note') setIsNoteOpen(true);
    };

    const handleNoteSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsNoteOpen(false);
            toast({
                title: t('Note Saved'),
                description: `${t('A new note for')} ${selectedCustomer?.name} ${t('has been saved.')}`,
            });
        }, 1000);
    };

    return (
        <>
        <Card className="animate-fade-in-up shadow-lg">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">{t('Customers')}</CardTitle>
                    <CardDescription>
                        {t('Manage your customers and view their order history.')}
                    </CardDescription>
                </div>
                <Button className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    {t('Add Customer')}
                </Button>
            </CardHeader>
            <CardContent>
                <div className="md:hidden space-y-4">
                {customers.map((customer) => (
                    <Card key={customer.email} className="overflow-hidden transition-all hover:shadow-md hover:bg-muted/50">
                        <CardContent className="p-4 flex items-start gap-4">
                            <div className="flex-1 space-y-2">
                                <p className="font-bold flex items-center gap-2">
                                    {customer.name}
                                    {customer.isPriority && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                                </p>
                                <div className="text-sm text-muted-foreground">
                                    <p>{customer.email}</p>
                                    <p>{customer.phone}</p>
                                </div>
                                <div className="flex items-center pt-1">
                                    <Badge variant="secondary">{t('Orders')}: {customer.orders}</Badge>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0 flex-shrink-0">
                                        <span className="sr-only">{t('Open menu')}</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>{t('Actions')}</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => handleAction(customer, 'details')}>{t('View Details')}</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleAction(customer, 'message')}>{t('Message')}</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleAction(customer, 'note')}>{t('Add Note')}</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardContent>
                    </Card>
                ))}
                </div>

                <div className="hidden md:block rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('Name')}</TableHead>
                                <TableHead>{t('Contact')}</TableHead>
                                <TableHead>{t('Orders')}</TableHead>
                                <TableHead className="text-right">{t('Actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map((customer) => (
                                <TableRow key={customer.email} className="hover:bg-muted/30">
                                    <TableCell>
                                        <div className="font-medium flex items-center gap-2">
                                            {customer.name}
                                            {customer.isPriority && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>{customer.email}</div>
                                        <div className="text-xs text-muted-foreground">{customer.phone}</div>
                                    </TableCell>
                                    <TableCell>{customer.orders}</TableCell>
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
                                                <DropdownMenuItem onClick={() => handleAction(customer, 'details')}>{t('View Details')}</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleAction(customer, 'message')}>{t('Message')}</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleAction(customer, 'note')}>{t('Add Note')}</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>

        {/* Dialog for Customer Details */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2"><User /> {selectedCustomer?.name}</DialogTitle>
                    <DialogDescription>{selectedCustomer?.email} &bull; {selectedCustomer?.phone}</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <h3 className="font-semibold mb-2">{t('Order History')}</h3>
                    <p className="text-sm text-muted-foreground">{t('A list of past orders will appear here.')}</p>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDetailOpen(false)}>{t('Close')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* Dialog for Adding a Note */}
        <Dialog open={isNoteOpen} onOpenChange={setIsNoteOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2"><StickyNote /> {t('Add Note for')} {selectedCustomer?.name}</DialogTitle>
                    <DialogDescription>{t('Add a private note. This will not be visible to the customer.')}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleNoteSubmit} className="py-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="note">{t('Note')}</Label>
                        <Textarea id="note" placeholder={t('e.g., Prefers a specific type of lining...')} rows={4} />
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" type="button" onClick={() => setIsNoteOpen(false)}>{t('Cancel')}</Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {t('Save Note')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
        </>
    );
}
