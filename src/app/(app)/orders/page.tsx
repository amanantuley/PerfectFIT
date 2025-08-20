
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
import { FileText, Calendar, Tag, CheckCircle, XCircle, RefreshCw, Truck, Undo, Package, MessageCircle, Send, Loader2, MapPin, DollarSign, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useApp, Order } from '@/context/app-context';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

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

const returnReasons = [
    "Size was too small",
    "Size was too large",
    "Didn't match description",
    "Arrived damaged",
    "Changed my mind",
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
    const { toast } = useToast();
    const router = useRouter();
    const { orders, addReturn, updateOrderStatus } = useApp();
    const [isMessageOpen, setIsMessageOpen] = useState(false);
    const [isReturnOpen, setIsReturnOpen] = useState(false);
    const [isSubmittingReturn, setIsSubmittingReturn] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const handleOpenMessageDialog = (order: Order) => {
        setSelectedOrder(order);
        setIsMessageOpen(true);
    };

    const handleOpenReturnDialog = (order: Order) => {
        setSelectedOrder(order);
        setIsReturnOpen(true);
    };

    const handleReturnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedOrder) return;

        const formData = new FormData(e.currentTarget);
        const reason = formData.get('returnReason') as string;

        if (!reason) {
            toast({
                variant: 'destructive',
                title: 'No Reason Selected',
                description: 'Please select a reason for the return.',
            });
            return;
        }

        setIsSubmittingReturn(true);
        setTimeout(() => {
            addReturn({
                id: `RET${selectedOrder.id.replace('ORD', '')}`,
                item: selectedOrder.item,
                image: selectedOrder.image,
                dataAiHint: selectedOrder.dataAiHint,
                status: 'Returned',
                date: new Date().toISOString().split('T')[0],
                reason: reason,
                refundDetails: {
                    originalPrice: 450.00, // Example price
                    returnFee: 15.00,
                    netRefund: 435.00,
                    refundStatus: 'Processing',
                    transactionId: `PENDING-${Date.now()}`
                }
            });

            updateOrderStatus(selectedOrder.id, 'Returned');

            setIsSubmittingReturn(false);
            setIsReturnOpen(false);
            toast({
                title: 'Return Requested',
                description: `Your request to return "${selectedOrder.item}" has been submitted.`,
            });
        }, 1500);
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
          {orders && orders.map((order) => {
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
                        <DollarSign className="h-4 w-4 mr-1.5" />
                        <p>₹{order.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Tag className="h-4 w-4 mr-1.5"/>
                      <p>{order.type}</p>
                    </div>
                     <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1.5"/>
                      <p>{order.date}</p>
                    </div>
                    {order.customizationNote && (
                        <div className="flex items-start text-sm text-muted-foreground">
                            <Edit className="h-4 w-4 mr-1.5 mt-0.5 shrink-0" />
                            <p className="line-clamp-2">{order.customizationNote}</p>
                        </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="px-4 pb-3 flex flex-col sm:flex-row gap-2">
                   <Badge variant={statusConfig.variant} className="w-full justify-center py-2">
                        <statusConfig.icon className="h-4 w-4 mr-2" />
                        {statusConfig.text}
                    </Badge>
                     {order.status === 'Shipped' && (
                        <Button variant="outline" size="sm" className="w-full" onClick={() => router.push(`/track/${order.id}`)}>
                            <MapPin className="mr-2 h-4 w-4" />
                            Track Order
                        </Button>
                    )}
                    {order.status === 'Delivered' && (
                        <Button variant="outline" size="sm" className="w-full" onClick={() => handleOpenReturnDialog(order)}>
                            <Undo className="mr-2 h-4 w-4" />
                            Request Return
                        </Button>
                    )}
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
                <TableHead>Item</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Customizations</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders && orders.map((order) => {
                    const statusConfig = getStatusConfig(order.status);
                    return (
                        <TableRow key={order.id} className="transition-colors hover:bg-muted/50">
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
                            <TableCell className="text-muted-foreground text-xs">
                                <p><b>ID:</b> {order.id}</p>
                                <p><b>Date:</b> {order.date}</p>
                                <p><b>Type:</b> {order.type}</p>
                                <p><b>Price:</b> ₹{order.price.toFixed(2)}</p>
                            </TableCell>
                            <TableCell className="max-w-xs">
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                    {order.customizationNote || 'No customizations'}
                                </p>
                            </TableCell>
                            <TableCell>
                                <Badge variant={statusConfig.variant} className="gap-1.5">
                                    <statusConfig.icon className="h-3.5 w-3.5" />
                                    {statusConfig.text}
                                </Badge>
                            </TableCell>
                             <TableCell className="text-right space-x-2">
                                {order.status === 'Shipped' && (
                                    <Button variant="outline" size="sm" onClick={() => router.push(`/track/${order.id}`)}>
                                        <MapPin className="mr-2 h-4 w-4" />
                                        Track
                                    </Button>
                                )}
                                {order.status === 'Delivered' && (
                                    <Button variant="outline" size="sm" onClick={() => handleOpenReturnDialog(order)}>
                                        <Undo className="mr-2 h-4 w-4" />
                                        Return
                                    </Button>
                                )}
                                <Button variant="outline" size="sm" onClick={() => handleOpenMessageDialog(order)}>
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    Message
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

    <Dialog open={isReturnOpen} onOpenChange={setIsReturnOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Request a Return</DialogTitle>
                <DialogDescription>
                    You are requesting a return for "{selectedOrder?.item}". Please select a reason below.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleReturnSubmit} className="py-4 space-y-4">
                <RadioGroup name="returnReason" className="space-y-2">
                    {returnReasons.map(reason => (
                        <Label key={reason} htmlFor={reason} className="flex items-center gap-2 cursor-pointer p-3 rounded-md border-2 border-transparent peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                            <RadioGroupItem value={reason} id={reason} />
                            <span>{reason}</span>
                        </Label>
                    ))}
                </RadioGroup>
                <DialogFooter>
                    <Button type="button" variant="ghost" onClick={() => setIsReturnOpen(false)}>Cancel</Button>
                    <Button type="submit" disabled={isSubmittingReturn}>
                        {isSubmittingReturn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit Return
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
    </>
  );
}
