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

const statusVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status.toLowerCase()) {
    case 'shipped':
    case 'processing':
      return 'secondary';
    case 'delivered':
      return 'default';
    case 'returned':
        return 'outline';
    case 'canceled':
      return 'destructive';
    default:
      return 'outline';
  }
};

export default function OrdersPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>My Orders</CardTitle>
        <CardDescription>Here is a list of your recent orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
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
                {orders.map((order) => (
                <TableRow key={order.id}>
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
                    <Badge variant={statusVariant(order.status)}>{order.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{order.date}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
