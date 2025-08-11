
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { FileText, Calendar, Tag, CheckCircle, XCircle, RefreshCw, Truck, Undo, Package, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const orders = [
  {
    id: 'ORD015',
    item: 'Navy Blue Suit',
    image: 'https://placehold.co/64x64.png',
    dataAiHint: 'blue suit',
    type: 'Rent',
    status: 'Processing',
    date: '2025-07-15',
  },
  {
    id: 'ORD014',
    item: 'Classic White Shirt',
    image: 'https://placehold.co/64x64.png',
    dataAiHint: 'white shirt',
    type: 'Buy',
    status: 'Shipped',
    date: '2025-07-12',
  },
  {
    id: 'ORD012',
    item: 'Charcoal Gray Suit',
    image: 'https://placehold.co/64x64.png',
    dataAiHint: 'gray suit',
    type: 'Buy',
    status: 'Delivered',
    date: '2025-06-28',
  },
  {
    id: 'ORD011',
    item: 'Casual Checkered Shirt',
    image: 'https://placehold.co/64x64.png',
    dataAiHint: 'checkered shirt',
    type: 'Rent',
    status: 'Returned',
    date: '2025-06-10',
  },
  {
    id: 'ORD009',
    item: 'Classic White Shirt',
    image: 'https://placehold.co/64x64.png',
    dataAiHint: 'white shirt',
    type: 'Buy',
    status: 'Canceled',
    date: '2025-05-20',
  },
];

type Order = (typeof orders)[0];

const initialConversation = [
    {
        role: 'user',
        name: 'You',
        content: "Hi! Just wanted to confirm if it's possible to add functional cuff buttons to my order?",
        avatar: "https://placehold.co/100x100.png",
    },
    {
        role: 'tailor',
        name: 'John "The Stitch" Doe',
        content: "Hello! Absolutely, consider it done. We'll add surgeon's cuffs to your suit jacket. Great choice!",
        avatar: "https://placehold.co/100x100.png",
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
    const [isMessageOpen, setIsMessageOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const handleOpenMessageDialog = (order: Order) => {
        setSelectedOrder(order);
        setIsMessageOpen(true);
    };

  return (
    <>
    <Card className="shadow-lg animate-fade-in-up">
      <CardHeader>
        <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">My Orders</CardTitle>
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
                <CardFooter className="px-4 pb-3 flex flex-col sm:flex-row gap-2">
                   <Badge variant={statusConfig.variant} className="w-full justify-center py-2">
                        <statusConfig.icon className="h-4 w-4 mr-2" />
                        {statusConfig.text}
                    </Badge>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => handleOpenMessageDialog(order)}>
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Message Tailor
                    </Button>
                </CardFooter>
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
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                            <TableCell>{order.date}</TableCell>
                             <TableCell className="text-right">
                                <Button variant="outline" size="sm" onClick={() => handleOpenMessageDialog(order)}>
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    Message Tailor
                                </Button>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>

    <Dialog open={isMessageOpen} onOpenChange={setIsMessageOpen}>
        <DialogContent className="h-[32rem] flex flex-col p-0">
             <DialogHeader className="p-4 border-b">
                <DialogTitle>Conversation about {selectedOrder?.item}</DialogTitle>
                <DialogDescription>Order ID: {selectedOrder?.id}</DialogDescription>
            </DialogHeader>
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-6">
                    {initialConversation.map((message, index) => (
                         <div
                            key={index}
                            className={cn(
                                "flex items-start gap-4",
                                message.role === 'user' ? 'justify-end' : 'justify-start'
                            )}
                        >
                            {message.role === 'tailor' && (
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage src={message.avatar} alt={message.name} data-ai-hint="person face" />
                                    <AvatarFallback>T</AvatarFallback>
                                </Avatar>
                            )}
                            <div className={cn(
                                "max-w-xs space-y-2",
                                message.role === 'user' && 'text-right'
                            )}>
                                <p className="font-bold text-sm">{message.name}</p>
                                <div
                                    className={cn(
                                        "rounded-lg px-4 py-3 text-sm",
                                        message.role === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-br-none'
                                            : 'bg-muted rounded-bl-none'
                                    )}
                                >
                                    <p className="whitespace-pre-wrap">{message.content}</p>
                                </div>
                            </div>
                            {message.role === 'user' && (
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage src={message.avatar} alt={message.name} data-ai-hint="person avatar" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                </div>
            </ScrollArea>
             <div className="p-4 border-t bg-background">
                <form className="flex items-center gap-4">
                    <Input placeholder="Type your message..." className="flex-1" />
                    <Button type="submit">
                        <Send className="mr-2 h-4 w-4" />
                        Send
                    </Button>
                </form>
            </div>
        </DialogContent>
    </Dialog>
    </>
  );
}
