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
import Image from 'next/image';
import { FileText, Calendar, Tag, CheckCircle, XCircle, RefreshCw, Truck, Undo, Package } from 'lucide-react';

const orders = [
  {
    id: 'ORD015',
    item: 'Navy Blue Suit',
    image: 'https://placehold.co/40x40.png',
    dataAiHint: 'blue suit',
    type: 'Rent',
    status: 'Processing',
    date: '2025-07-15',
  },
  {
    id: 'ORD014',
    item: 'Classic White Shirt',
    image: 'https://placehold.co/40x40.png',
    dataAiHint: 'white shirt',
    type: 'Buy',
    status: 'Shipped',
    date: '2025-07-12',
  },
  {
    id: 'ORD012',
    item: 'Charcoal Gray Suit',
    image: 'https://placehold.co/40x40.png',
    dataAiHint: 'gray suit',
    type: 'Buy',
    status: 'Delivered',
    date: '2025-06-28',
  },
  {
    id: 'ORD011',
    item: 'Casual Checkered Shirt',
    image: 'https://placehold.co/40x40.png',
    dataAiHint: 'checkered shirt',
    type: 'Rent',
    status: 'Returned',
    date: '2025-06-10',
  },
  {
    id: 'ORD009',
    item: 'Classic White Shirt',
    image: 'https://placehold.co/40x40.png',
    dataAiHint: 'white shirt',
    type: 'Buy',
    status: 'Canceled',
    date: '2025-05-20',
  },
];

const getStatusConfig = (status: string) => {
  switch (status.toLowerCase()) {
    case 'processing':
      return { variant: 'secondary' as const, icon: RefreshCw, text: 'Processing' };
    case 'shipped':
      return { variant: 'secondary' as const, icon: Truck, text: 'Shipped' };
    case 'delivered':
      return { variant: 'default' as const, icon: CheckCircle, text: 'Delivered' };
    case 'returned':
      return { variant: 'outline' as const, icon: Undo, text: 'Returned' };
    case 'canceled':
      return { variant: 'destructive' as const, icon: XCircle, text: 'Canceled' };
    default:
      return { variant: 'outline' as const, icon: Package, text: status };
  }
};

export default function OrdersPage() {
  return (
    <Card className="shadow-lg animate-fade-in-up">
      <CardHeader>
        <CardTitle className="animate-text-rainbow bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent bg-size-200">My Orders</CardTitle>
        <CardDescription>Here is a list of your recent orders.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {orders.map((order) => {
            const statusConfig = getStatusConfig(order.status);
            return (
              <Card key={order.id} className="overflow-hidden transition-all hover:shadow-md hover:bg-muted/50">
                <CardContent className="p-4 flex gap-4">
                  <Image
                    src={order.image}
                    alt={order.item}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                    data-ai-hint={order.dataAiHint}
                  />
                  <div className="flex-1 space-y-2">
                    <p className="font-bold">{order.item}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <FileText className="h-4 w-4 mr-1.5"/>
                      <p>{order.id}</p>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Tag className="h-4 w-4 mr-1.5"/>
                      <p>{order.type}</p>
                    </div>
                     <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1.5"/>
                      <p>{order.date}</p>
                    </div>
                  </div>
                </CardContent>
                <div className="px-4 pb-3">
                   <Badge variant={statusConfig.variant} className="w-full justify-center py-2">
                        <statusConfig.icon className="h-4 w-4 mr-2" />
                        {statusConfig.text}
                    </Badge>
                </div>
              </Card>
            );
          })}
        </div>
        
        {/* Desktop View */}
        <div className="hidden md:block rounded-md border">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Order ID</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => {
                    const statusConfig = getStatusConfig(order.status);
                    return (
                        <TableRow key={order.id} className="transition-colors hover:bg-muted/50">
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>
                            <div className="flex items-center gap-3">
                                <Image
                                src={order.image}
                                alt={order.item}
                                width={40}
                                height={40}
                                className="rounded-md"
                                data-ai-hint={order.dataAiHint}
                                />
                                <span className="font-medium">{order.item}</span>
                            </div>
                            </TableCell>
                            <TableCell>{order.type}</TableCell>
                            <TableCell>
                                <Badge variant={statusConfig.variant} className="gap-1.5">
                                    <statusConfig.icon className="h-3.5 w-3.5" />
                                    {statusConfig.text}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">{order.date}</TableCell>
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