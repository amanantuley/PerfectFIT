
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Orders</CardTitle>
        <CardDescription>View, update, and manage all incoming customer orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allOrders.map((order) => {
              const { variant, icon: Icon } = getStatusConfig(order.status);
              return (
                <TableRow key={order.orderId}>
                  <TableCell className="font-medium">{order.orderId}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.item}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge variant={variant} className="gap-1.5">
                      <Icon className="h-3.5 w-3.5" />
                      {order.status}
                    </Badge>
                  </TableCell>
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
                        <DropdownMenuItem>View Order Details</DropdownMenuItem>
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
