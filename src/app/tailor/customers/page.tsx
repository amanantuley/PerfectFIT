
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
    return (
        <Card className="animate-fade-in-up">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-yellow-500 animate-text-rainbow bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">Customers</CardTitle>
                    <CardDescription>
                        Manage your customers and view their order history.
                    </CardDescription>
                </div>
                <Button className="bg-pink-500 hover:bg-pink-600">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Customer
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Orders</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
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
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                            <DropdownMenuItem>Message</DropdownMenuItem>
                                            <DropdownMenuItem>Add Note</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
