
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Loader2, Wallet, ArrowLeft, Download, Trash2, CalendarDays, Edit, Zap, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useFormState, useFormStatus } from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import { submitOrder } from './actions';
import { tailors } from '@/lib/tailors';
import { Separator } from '@/components/ui/separator';
import { useSubscription } from '@/context/subscription-provider';
import { Badge } from '@/components/ui/badge';
import { addDays, format } from 'date-fns';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useApp } from '@/context/app-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CartItem } from '@/context/app-context';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

const initialState = {
  message: '',
  error: false,
  data: null
};

const EXPRESS_DELIVERY_FEE = 250;

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" size="lg" disabled={pending || disabled}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Confirming Order...
        </>
      ) : (
        'Proceed to Payment'
      )}
    </Button>
  );
}

const GooglePayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
      <path d="M22.5 10.1c0-.7-.1-1.4-.2-2.1H12v3.9h5.9c-.3 1.3-1 2.4-2.1 3.2v2.6h3.4c2-1.8 3.1-4.5 3.1-7.6z" fill="#4285F4"></path>
      <path d="M12 23c3.2 0 5.9-1.1 7.9-2.9l-3.4-2.6c-1.1.7-2.4 1.1-3.9 1.1-3.3 0-6.2-2.2-7.2-5.2H1.3v2.7C3.3 20.1 7.3 23 12 23z" fill="#34A853"></path>
      <path d="M4.8 13.8c-.2-.7-.2-1.4 0-2.1V9.1H1.3c-.8 1.6-1.3 3.4-1.3 5.4s.5 3.8 1.3 5.4l3.5-2.7z" fill="#FBBC05"></path>
      <path d="M12 4.2c1.7 0 3.3.6 4.5 1.8l3-3C17.9.6 15.2 0 12 0 7.3 0 3.3 2.9 1.3 6.9l3.5 2.7c1-3 3.9-5.4 7.2-5.4z" fill="#EA4335"></path>
      <path d="M0 0h24v24H0z" fill="none"></path>
    </svg>
);

const RazorpayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
      <path d="M187.1 201.8h-32.9l-11.4 20.3h-34.9l43.2-75.1h32.2l-21.6 38-1.5 2.7 27-44.1h32.9L187.1 201.8zm-44.2-61.1l-14.8 26h28.9l-14.1-26zM224 85.5c-4.6-2-9.6-3.2-15-3.8V53h-32.2v28.7h-18.7V53h-32.2v28.7h-18.7V53H75v32.5a43.5 43.5 0 0 0-15 3.8L32 30.2 0 85.5l54.8 24.8a43.5 43.5 0 0 0-3.8 15v18.7H22.2V176h28.8v18.7H22.2v32.2h28.8V256l55.3-32 55.3 32v-28.8h28.8v-32.2h-28.8V176h28.8v-32.2h-28.8v-18.7c0-5.4-1.2-10.4-3.8-15L256 85.5 224 30.2l-54.8 24.8c-4.6-2-9.6-3.2-15-3.8z"/>
    </svg>
);

const CreditCardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect width="20" height="14" x="2" y="5" rx="2"/>
        <line x1="2" x2="22" y1="10" y2="10"/>
    </svg>
);

const PaypalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.32,18.18,8,19.89a.57.57,0,0,0,.6.63h3.33a.56.56,0,0,0,.55-.42l.52-2.73a.83.83,0,0,1,.81-.67h.17c3.12,0,5.75-2.31,6-5.43.22-2.86-1.63-5-4.25-5.38a.56.56,0,0,0-.61.59l-.31,1.87a.82.82,0,0,1-.79.66H14c-1.51,0-2.82.68-3.48,1.87L9,15.11A.83.83,0,0,1,8.32,18.18Z" fill="#253b80"></path>
        <path d="M12.39,3.23h-4a.56.56,0,0,0-.55.42L4.36,18.82a.56.56,0,0,0,.55,.7H8.87a.56.56,0,0,0,.55-.42L10,15.63a.82.82,0,0,1,.8-.66h.17c3.84,0,6.67-2.67,6.91-6.2.22-3.32-2.11-5.89-5.35-6.16A.56.56,0,0,0,12.39,3.23Z" fill="#179bd7"></path>
        <path d="M4.36,18.82,2,4.27A.56.56,0,0,0,1.41,3.7L1.13,3.84a.56.56,0,0,0-.41.67L4,19.51a.57.57,0,0,0,.56.41H8.87a.56.56,0,0,0,.55-.42L9.84,17a.84.84,0,0,1-.74-1,.82.82,0,0,0-.73.13L4.91,18.4a.56.56,0,0,1-.55.42Z" fill="#222d65"></path>
    </svg>
);

const ApplePayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.39,14.73a5.3,5.3,0,0,1-2.2-1.37,5.56,5.56,0,0,1-1.3-2.12,4.06,4.06,0,0,1,1-2.87,4.32,4.32,0,0,1,2.83-1.39,1,1,0,0,1,.84.18,1,1,0,0,1,.35.78,4.5,4.5,0,0,1-.58,2.51,5,5,0,0,1-1.78,2.15C18,13.68,17.41,14.8,19.39,14.73Zm-6.52,2.05a4.87,4.87,0,0,1-2.31,1.38,4.42,4.42,0,0,1-2.73-.2,4.71,4.71,0,0,1-1.89-1.5,10.15,10.15,0,0,1-1.88-3.4,6.29,6.29,0,0,1,.83-4.11,5.2,5.2,0,0,1,2-2,4.48,4.48,0,0,1,2.91-.7,4.28,4.28,0,0,1,2.39.73,1.13,1.13,0,0,1,.51.81,1,1,0,0,1-.6.94,3,3,0,0,0-1.72-.48,3.22,3.22,0,0,0-2.22.7,4,4,0,0,0-1.4,2,6.48,6.48,0,0,0-.24,2.9,4.45,4.45,0,0,0,1.44,3.06,3.62,3.62,0,0,0,2.4.92,4.36,4.36,0,0,0,2.1-.53,1,1,0,0,1,1.17.84A.94.94,0,0,1,12.87,16.78Z" />
    </svg>
);

const PerfectPayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M17 4H7C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4Z"/>
        <path d="M12 14.5a2.5 2.5 0 0 0 0-5H10v5h2Z"/>
        <path d="M10 9.5V7"/>
    </svg>
);

export default function CartPage() {
  const { toast } = useToast();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(submitOrder, initialState);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [isCustomizeDialogOpen, setIsCustomizeDialogOpen] = useState(false);
  const [currentItemToCustomize, setCurrentItemToCustomize] = useState<CartItem | null>(null);
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard');
  const [nearbyTailors, setNearbyTailors] = useState<any[]>([]);
  const [isLocating, setIsLocating] = useState(true);


  const { activePlan, discount } = useSubscription();
  const { addMultipleOrders, cart, removeFromCart, clearCart, updateCartItemNote } = useApp();

  // Simulate fetching user's location and sorting tailors
  useEffect(() => {
    setIsLocating(true);
    // Simulate a delay for fetching location
    setTimeout(() => {
      // In a real app, you'd use Geolocation API. Here we just shuffle for simulation.
      const sortedTailors = [...tailors].sort(() => Math.random() - 0.5);
      setNearbyTailors(sortedTailors);
      setIsLocating(false);
    }, 1500);
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const discountAmount = (subtotal * discount) / 100;
  const deliveryFee = deliveryOption === 'express' ? EXPRESS_DELIVERY_FEE : 0;
  const finalPrice = subtotal - discountAmount + deliveryFee;
  
  const standardDeliveryDate = format(addDays(new Date(), 10), 'PPP');
  const expressDeliveryDate = format(addDays(new Date(), 5), 'PPP');
  const estimatedDeliveryDate = deliveryOption === 'standard' ? standardDeliveryDate : expressDeliveryDate;

  const openCustomizeDialog = (item: CartItem) => {
    setCurrentItemToCustomize(item);
    setIsCustomizeDialogOpen(true);
  };

  const handleSaveCustomization = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentItemToCustomize) return;

    const formData = new FormData(e.currentTarget);
    const sleeveLength = formData.get('sleeveLength') as string;
    const fit = formData.get('fit') as string;
    const collarStyle = formData.get('collarStyle') as string;
    const cuffStyle = formData.get('cuffStyle') as string;
    const pocketStyle = formData.get('pocketStyle') as string;
    const monogram = formData.get('monogram') as string;
    const additionalNotes = formData.get('additionalNotes') as string;
    
    let noteParts = [];
    if (sleeveLength) noteParts.push(`Sleeves: ${sleeveLength}`);
    if (fit) noteParts.push(`Fit: ${fit}`);
    if (collarStyle) noteParts.push(`Collar: ${collarStyle}`);
    if (cuffStyle) noteParts.push(`Cuffs: ${cuffStyle}`);
    if (pocketStyle) noteParts.push(`Pocket: ${pocketStyle}`);
    if (monogram) noteParts.push(`Monogram: "${monogram}"`);
    if (additionalNotes) noteParts.push(`Notes: ${additionalNotes}`);

    const note = noteParts.join(', ');

    updateCartItemNote(currentItemToCustomize.id, note);
    setIsCustomizeDialogOpen(false);
    toast({
        title: 'Customization Saved',
        description: `Your preferences for ${currentItemToCustomize.name} have been updated.`
    });
  };
  
  const handleDownloadInvoice = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('PerfectFit', 14, 22);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Navi Mumbai, Maharashtra, India', 14, 30);
    doc.text('support@perfectfit.com', 14, 35);
    doc.text('+91 9867408609', 14, 40);

    doc.setFontSize(18);
    doc.text('Invoice', pageWidth - 14, 22, { align: 'right' });
    doc.setFontSize(10);
    doc.text(`Invoice #: INV-${new Date().getTime()}`, pageWidth - 14, 30, { align: 'right' });
    doc.text(`Date: ${format(new Date(), 'PPP')}`, pageWidth - 14, 35, { align: 'right' });

    doc.setLineWidth(0.5);
    doc.line(14, 50, pageWidth - 14, 50);
    doc.setFont('helvetica', 'bold');
    doc.text('Bill To:', 14, 58);
    doc.setFont('helvetica', 'normal');
    doc.text('User', 14, 64);
    doc.text('user@example.com', 14, 69);
    doc.text('123 Fashion Ave, Style City, 10001', 14, 74);
    
    (doc as any).autoTable({
        startY: 85,
        head: [['Item', 'Type', 'Price', 'Customization']],
        body: submittedData?.items.map((item: CartItem) => [
            item.name, 
            item.purchaseType, 
            `₹${item.price.toFixed(2)}`,
            item.customizationNote || 'N/A'
        ]),
        theme: 'striped',
        headStyles: { fillColor: [143, 88, 240] },
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.text('Subtotal:', pageWidth - 60, finalY);
    doc.text(`₹${subtotal.toFixed(2)}`, pageWidth - 14, finalY, { align: 'right' });

    if(discount > 0) {
        doc.text(`Discount (${discount}%):`, pageWidth - 60, finalY + 7);
        doc.text(`-₹${discountAmount.toFixed(2)}`, pageWidth - 14, finalY + 7, { align: 'right' });
    }
    
    if(deliveryFee > 0) {
        doc.text('Express Delivery Fee:', pageWidth - 60, finalY + 14);
        doc.text(`₹${deliveryFee.toFixed(2)}`, pageWidth - 14, finalY + 14, { align: 'right' });
    }

    const totalYPosition = finalY + (deliveryFee > 0 ? 21 : (discount > 0 ? 14 : 7));

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Total Amount:', pageWidth - 60, totalYPosition);
    doc.text(`₹${finalPrice.toFixed(2)}`, pageWidth - 14, totalYPosition, { align: 'right' });
    
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setLineWidth(0.5);
    doc.line(14, pageHeight - 30, pageWidth - 14, pageHeight - 30);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Thank you for your business!', pageWidth / 2, pageHeight - 22, { align: 'center' });
    doc.text('If you have any questions, please contact support@perfectfit.com.', pageWidth / 2, pageHeight - 15, { align: 'center' });

    doc.save(`PerfectFit-Invoice-Order.pdf`);
  };

  useEffect(() => {
    if (state.message && !state.error) {
        setSubmittedData(state.data);
        setIsPaymentDialogOpen(true);
    } else if (state.message && state.error) {
        toast({
          variant: 'destructive',
          title: 'Order Error',
          description: state.message,
        });
    }
  }, [state, toast]);

  const handlePaymentConfirmation = (method: string) => {
    setIsPaymentDialogOpen(false);
    setSelectedPaymentMethod(null);
    
    const newOrders = submittedData.items.map((item: CartItem) => ({
        id: `ORD0${Math.floor(Math.random() * 900) + 100}`,
        item: item.name,
        image: item.image,
        dataAiHint: item.dataAiHint,
        type: item.purchaseType,
        status: 'Processing',
        date: format(new Date(), 'yyyy-MM-dd'),
        customizationNote: item.customizationNote,
        price: item.price,
    }));
    addMultipleOrders(newOrders);
    clearCart();

    toast({
      title: 'Payment Successful!',
      description: method === 'PerfectPay'
        ? `${state.message} You've earned 5% cashback!`
        : state.message,
      action: (
        <Button variant="outline" size="sm" onClick={handleDownloadInvoice}>
            <Download className="mr-2 h-4 w-4" />
            Download Invoice
        </Button>
      ),
    });
    formRef.current?.reset();
    router.push('/orders');
  };

  const closeDialog = () => {
    setIsPaymentDialogOpen(false);
    setSelectedPaymentMethod(null);
  }

  return (
    <div className="animate-fade-in-up">
        {cart.length === 0 ? (
            <Card className="shadow-lg text-center py-20">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                        <ShoppingCart className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle className="text-3xl">Your Cart is Empty</CardTitle>
                    <CardDescription className="text-lg">Looks like you haven't added anything to your cart yet.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/dashboard">Start Shopping</Link>
                    </Button>
                </CardContent>
            </Card>
        ) : (
        <form ref={formRef} action={formAction}>
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-3xl flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
                                <ShoppingCart className="h-8 w-8" />
                                Your Shopping Cart
                            </CardTitle>
                            <CardDescription>
                                Review and customize your items before purchase.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex items-start gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                        className="rounded-md object-cover"
                                        data-ai-hint={item.dataAiHint}
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold">{item.name}</h3>
                                        <div className="flex items-center gap-2">
                                            <p className="text-muted-foreground capitalize">{item.type}</p>
                                            <Badge variant={item.purchaseType === 'Buy' ? 'default' : 'secondary'} className="capitalize">{item.purchaseType}</Badge>
                                        </div>
                                        {item.customizationNote && <p className="text-xs text-muted-foreground italic mt-1 line-clamp-1">Note: {item.customizationNote}</p>}
                                    </div>
                                    <div className="text-right flex flex-col items-end gap-2">
                                        <p className="text-xl font-bold">₹{item.price.toFixed(2)}</p>
                                        <div className="flex items-center gap-1">
                                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => openCustomizeDialog(item)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFromCart(item.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                             <input type="hidden" name="items" value={JSON.stringify(cart)} />
                        </CardContent>
                    </Card>
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle>Tailor Selection</CardTitle>
                            <CardDescription>Select a tailor for your custom-fit items.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="tailor">Nearby Tailors</Label>
                                {isLocating ? (
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>Finding tailors near you...</span>
                                    </div>
                                ) : (
                                <Select name="tailor" required>
                                    <SelectTrigger id="tailor">
                                        <SelectValue placeholder="Select a tailor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {nearbyTailors.map((tailor, index) => (
                                            <SelectItem key={tailor.id} value={tailor.id}>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                                    <span>{tailor.name} - {tailor.location}</span>
                                                    {index === 0 && <Badge variant="secondary">Nearest</Badge>}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                <div className="lg:col-span-1 space-y-8 sticky top-24">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="w-full space-y-2">
                                <div className="flex justify-between items-center text-muted-foreground">
                                    <span>Subtotal ({cart.length} items)</span>
                                    <span>₹{subtotal.toFixed(2)}</span>
                                </div>
                                {activePlan && (
                                    <div className="flex justify-between items-center text-primary font-medium">
                                        <span>{activePlan} Discount ({discount}%)</span>
                                        <span>-₹{discountAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center text-muted-foreground">
                                    <span>Delivery Fee</span>
                                    <span>{deliveryFee > 0 ? `₹${deliveryFee.toFixed(2)}` : 'Free'}</span>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between items-center font-bold text-xl">
                                    <span>Total</span>
                                    <span>₹{finalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                             <Separator className="my-2"/>
                             <RadioGroup defaultValue="standard" value={deliveryOption} onValueChange={(value) => setDeliveryOption(value as 'standard' | 'express')}>
                                <Label htmlFor="standard-delivery" className={cn("flex justify-between items-center p-3 rounded-md border-2 cursor-pointer", deliveryOption === 'standard' && "border-primary")}>
                                    <div>
                                        <p className="font-semibold">Standard Delivery</p>
                                        <p className="text-sm text-muted-foreground">Est. {standardDeliveryDate}</p>
                                    </div>
                                    <p className="font-semibold">Free</p>
                                    <RadioGroupItem value="standard" id="standard-delivery" className="sr-only"/>
                                </Label>
                                <Label htmlFor="express-delivery" className={cn("flex justify-between items-center p-3 rounded-md border-2 cursor-pointer", deliveryOption === 'express' && "border-primary")}>
                                    <div className="flex items-center gap-2">
                                        <Zap className="h-5 w-5 text-primary" />
                                        <div>
                                            <p className="font-semibold">Express Delivery</p>
                                            <p className="text-sm text-muted-foreground">Est. {expressDeliveryDate}</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold">₹{EXPRESS_DELIVERY_FEE.toFixed(2)}</p>
                                    <RadioGroupItem value="express" id="express-delivery" className="sr-only"/>
                                </Label>
                             </RadioGroup>
                             <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                                <CalendarDays className="h-4 w-4"/>
                                <span>Estimated Delivery: {estimatedDeliveryDate}</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                             <SubmitButton disabled={cart.length === 0} />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </form>
        )}

        <Dialog open={isPaymentDialogOpen} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
                        <Wallet />
                        {selectedPaymentMethod === 'creditCard' ? 'Enter Card Details' : 'Complete Your Payment'}
                    </DialogTitle>
                     <DialogDescription>
                        {selectedPaymentMethod === 'creditCard'
                            ? `Please provide your payment information for the amount of ₹${finalPrice.toFixed(2)}.`
                            : `Choose your preferred payment method to finalize your order for ₹${finalPrice.toFixed(2)}.`}
                    </DialogDescription>
                </DialogHeader>

                {selectedPaymentMethod === 'creditCard' ? (
                     <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input id="card-number" placeholder="1234 5678 9101 1121" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="expiry">Expiry (MM/YY)</Label>
                                <Input id="expiry" placeholder="MM/YY" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input id="cvc" placeholder="123" />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="name-on-card">Name on Card</Label>
                            <Input id="name-on-card" placeholder="John Doe" />
                        </div>
                        <Button className="w-full" onClick={() => handlePaymentConfirmation('Credit Card')}>Pay Now</Button>
                    </div>
                ) : (
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                       <Button variant="outline" className="w-full justify-center gap-3 py-4 text-base" onClick={() => setSelectedPaymentMethod('creditCard')}>
                            <CreditCardIcon />
                            Credit Card
                       </Button>
                       <Button variant="outline" className="w-full justify-center gap-3 py-4 text-base" onClick={() => handlePaymentConfirmation('Google Pay')}>
                            <GooglePayIcon />
                            Google Pay
                       </Button>
                       <Button variant="outline" className="w-full justify-center gap-3 py-4 text-base" onClick={() => handlePaymentConfirmation('Apple Pay')}>
                            <ApplePayIcon />
                            Apple Pay
                       </Button>
                       <Button variant="outline" className="w-full justify-center gap-3 py-4 text-base" onClick={() => handlePaymentConfirmation('Paypal')}>
                            <PaypalIcon />
                            Paypal
                       </Button>
                       <Button variant="outline" className="w-full justify-center gap-3 py-4 text-base" onClick={() => handlePaymentConfirmation('Razorpay')}>
                            <RazorpayIcon />
                            Razorpay
                       </Button>
                       <div className="relative">
                            <Button variant="outline" className="w-full justify-center gap-3 py-4 text-base" disabled>
                                <PerfectPayIcon />
                                PerfectPay
                            </Button>
                            <Badge variant="secondary" className="absolute -top-2 -right-2">Coming Soon</Badge>
                       </div>
                    </div>
                )}

                <DialogFooter>
                    {selectedPaymentMethod === 'creditCard' && (
                        <Button variant="ghost" onClick={() => setSelectedPaymentMethod(null)}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    )}
                    <Button variant="ghost" onClick={closeDialog}>Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <Dialog open={isCustomizeDialogOpen} onOpenChange={setIsCustomizeDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Customize {currentItemToCustomize?.name}</DialogTitle>
                    <DialogDescription>
                        Specify your preferences for this item.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSaveCustomization}>
                    <div className="py-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="sleeveLength">Sleeve Length</Label>
                                <Select name="sleeveLength" defaultValue="standard">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Standard">Standard</SelectItem>
                                        <SelectItem value="Shorter (-1 inch)">Shorter (-1 inch)</SelectItem>
                                        <SelectItem value="Longer (+1 inch)">Longer (+1 inch)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="fit">Fit</Label>
                                <Select name="fit" defaultValue="standard">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Slim Fit">Slim Fit</SelectItem>
                                        <SelectItem value="Standard Fit">Standard Fit</SelectItem>
                                        <SelectItem value="Loose Fit">Loose Fit</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                               <Label htmlFor="collarStyle">Collar Style</Label>
                                <Select name="collarStyle" defaultValue="standard">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Standard Collar">Standard Collar</SelectItem>
                                        <SelectItem value="Spread Collar">Spread Collar</SelectItem>
                                        <SelectItem value="Button-Down">Button-Down</SelectItem>
                                        <SelectItem value="Mandarin">Mandarin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                               <Label htmlFor="cuffStyle">Cuff Style</Label>
                                <Select name="cuffStyle" defaultValue="one-button">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="One-Button Barrel">One-Button Barrel</SelectItem>
                                        <SelectItem value="Two-Button Barrel">Two-Button Barrel</SelectItem>
                                        <SelectItem value="French Cuff">French Cuff</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                               <Label htmlFor="pocketStyle">Pocket Style</Label>
                                <Select name="pocketStyle" defaultValue="none">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="None">None</SelectItem>
                                        <SelectItem value="Standard Left Pocket">Standard Left Pocket</SelectItem>
                                        <SelectItem value="Both Sides">Pockets on Both Sides</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                               <Label htmlFor="monogram">Monogram (Optional)</Label>
                               <Input id="monogram" name="monogram" placeholder="e.g., JD"/>
                            </div>
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="additionalNotes">Additional Notes</Label>
                           <Textarea 
                                id="additionalNotes" 
                                name="additionalNotes"
                                placeholder="e.g., 'Please use mother-of-pearl buttons.'"/>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setIsCustomizeDialogOpen(false)}>Cancel</Button>
                        <Button type="submit">Save Customizations</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  );
}
