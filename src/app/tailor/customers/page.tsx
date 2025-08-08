
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
import { MoreHorizontal, Plus, Star } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/context/translation-provider';

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


export default function TailorCustomersPage() {
    const { t } = useTranslation();

    return (
        <Card className="animate-fade-in-up">
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
                {/* Mobile View */}
                <div className="md:hidden space-y-4">
                {customers.map((customer) => (
                    <Card key={customer.email} className="overflow-hidden transition-all hover:shadow-md hover:bg-muted/50">
                        <CardContent className="p-4 flex gap-4">
                            <div className="flex-1 space-y-2">
                                <p className="font-bold flex items-center gap-2">
                                    {customer.name}
                                    {customer.isPriority && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                                </p>
                                <div className="text-sm text-muted-foreground">
                                    <p>{customer.email}</p>
                                    <p>{customer.phone}</p>
                                </div>
                                <div className="flex items-center">
                                    <Badge variant="secondary">{t('Orders')}: {customer.orders}</Badge>
                                </div>
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
                                    <DropdownMenuItem>{t('View Details')}</DropdownMenuItem>
                                    <DropdownMenuItem>{t('Message')}</DropdownMenuItem>
                                    <DropdownMenuItem>{t('Add Note')}</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardContent>
                    </Card>
                ))}
                </div>

                {/* Desktop View */}
                <div className="hidden md:block overflow-x-auto">
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
                                                <DropdownMenuItem>{t('View Details')}</DropdownMenuItem>
                                                <DropdownMenuItem>{t('Message')}</DropdownMenuItem>
                                                <DropdownMenuItem>{t('Add Note')}</DropdownMenuItem>
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
    );
}
