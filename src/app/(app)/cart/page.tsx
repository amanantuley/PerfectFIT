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
import { ShoppingCart, Loader2, Wallet, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useFormState, useFormStatus } from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import { submitOrder } from './actions';
import { garments } from '@/lib/garments';
import { tailors } from '@/lib/tailors';
import { Separator } from '@/components/ui/separator';
import { useSubscription } from '@/context/subscription-provider';
import { Badge } from '@/components/ui/badge';

const initialState = {
  message: '',
  error: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" size="lg" disabled={pending}>
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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
        <path d="M12 12a10 10 0 0 0-9.9 9.5"/>
    </svg>
);

const RazorpayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="m8.36 9.22 7.28 2.56-2.56 7.28-7.28-2.56 2.56-7.28Z"/>
      <path d="M12.5 4.5 9 8"/>
      <path d="m15.5 12.5 3.5 3.5"/>
    </svg>
);

const CreditCardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect width="20" height="14" x="2" y="5" rx="2"/>
        <line x1="2" x2="22" y1="10" y2="10"/>
    </svg>
);

const PaypalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M10.4.4H6.8l-3.3 15.1L4.6 22h3.9l.8-3.7.1-.4h.4c.3 0 .6.1.8.1.5.1 1.1.1 1.6.1s.9 0 1.3-.1c1.3-.2 2.4-.7 3.3-1.6.9-.9 1.3-2.1 1.3-3.5 0-1.2-.3-2.3-.9-3.3-.6-1-1.4-1.6-2.5-2-1.1-.3-2.3-.5-3.6-.5H11l.3-1.4.2-.9.1-.4zm2.8 9.3c.4.3.6.8.6 1.3 0 .6-.2 1.1-.5 1.5-.3.4-.8.7-1.3.8-.5.1-1 .2-1.5.2h-.5l2.2-10.4h.4c.6 0 1.2.1 1.7.2 1.1.3 1.9.9 2.4 1.8s.8 1.9.8 3c0 .8-.2 1.6-.5 2.2-.3.7-.8 1.2-1.4 1.5zM14.2 2.6H18l-1.2 5.5c0 .2-.1.3-.2.4-.1.1-.2.1-.4.1h-2.9l1-4.6.1-.5.1-.4-.1-.5z"/>
    </svg>
);

const ApplePayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
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
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(submitOrder, initialState);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

  const { activePlan, discount } = useSubscription();
  const itemInCart = garments[0];

  const originalPrice = itemInCart.price;
  const discountAmount = (originalPrice * discount) / 100;
  const finalPrice = originalPrice - discountAmount;

  useEffect(() => {
    if (state.message && !state.error) {
        // On successful form submission, open the payment dialog.
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
    toast({
      title: 'Payment Successful!',
      description: method === 'PerfectPay'
        ? `${state.message} You've earned 5% cashback!`
        : state.message,
    });
    formRef.current?.reset();
    // In a real app, you might redirect to an order confirmation page.
  };

  const closeDialog = () => {
    setIsPaymentDialogOpen(false);
    setSelectedPaymentMethod(null);
  }

  return (
    <div className="animate-fade-in-up">
        <form ref={formRef} action={formAction}>
            <Card className="shadow-lg max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl flex items-center gap-3 text-rainbow">
                        <ShoppingCart className="h-8 w-8" />
                        Customize Your Order
                    </CardTitle>
                    <CardDescription>
                        Select your preferences for the {itemInCart.name}.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="flex items-center gap-4 border-b pb-4">
                        <Image
                            src={itemInCart.image}
                            alt={itemInCart.name}
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                            data-ai-hint={itemInCart.dataAiHint}
                        />
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold">{itemInCart.name}</h3>
                            <p className="text-muted-foreground">Custom Tailored</p>
                        </div>
                         <div className="text-right">
                            {activePlan && (
                                <p className="text-muted-foreground line-through">${originalPrice.toFixed(2)}</p>
                            )}
                            <p className="text-xl font-bold">${finalPrice.toFixed(2)}</p>
                        </div>
                        <input type="hidden" name="itemName" value={itemInCart.name} />
                    </div>
                    
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-foreground">Fabric & Quality</h4>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="color">Color</Label>
                                <Select name="color" required>
                                    <SelectTrigger id="color">
                                        <SelectValue placeholder="Select a color" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="navy-blue">Navy Blue</SelectItem>
                                        <SelectItem value="charcoal-gray">Charcoal Gray</SelectItem>
                                        <SelectItem value="classic-white">Classic White</SelectItem>
                                        <SelectItem value="black">Black</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="quality">Cloth Quality</Label>
                                 <Select name="quality" required>
                                    <SelectTrigger id="quality">
                                        <SelectValue placeholder="Select quality" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="standard">Standard (Wool Blend)</SelectItem>
                                        <SelectItem value="premium">Premium (100% Merino Wool)</SelectItem>
                                        <SelectItem value="luxury">Luxury (Cashmere Blend)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    
                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-foreground">Style & Fit</h4>
                      <div className="grid sm:grid-cols-3 gap-6">
                          <div className="space-y-2">
                              <Label htmlFor="fit">Fit Style</Label>
                              <Select name="fit" required>
                                  <SelectTrigger id="fit">
                                      <SelectValue placeholder="Select a fit" />
                                  </SelectTrigger>
                                  <SelectContent>
                                      <SelectItem value="slim-fit">Slim Fit</SelectItem>
                                      <SelectItem value="modern-fit">Modern Fit</SelectItem>
                                      <SelectItem value="classic-fit">Classic Fit</SelectItem>
                                  </SelectContent>
                              </Select>
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="lapel">Lapel Style</Label>
                              <Select name="lapel" required>
                                  <SelectTrigger id="lapel">
                                      <SelectValue placeholder="Select a lapel" />
                                  </SelectTrigger>
                                  <SelectContent>
                                      <SelectItem value="notch">Notch Lapel</SelectItem>
                                      <SelectItem value="peak">Peak Lapel</SelectItem>
                                      <SelectItem value="shawl">Shawl Lapel</SelectItem>
                                  </SelectContent>
                              </Select>
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="buttons">Button Stance</Label>
                              <Select name="buttons" required>
                                  <SelectTrigger id="buttons">
                                      <SelectValue placeholder="Select buttons" />
                                  </SelectTrigger>
                                  <SelectContent>
                                      <SelectItem value="one-button">One-Button</SelectItem>
                                      <SelectItem value="two-button">Two-Button</SelectItem>
                                      <SelectItem value="double-breasted">Double-Breasted</SelectItem>
                                  </SelectContent>
                              </Select>
                          </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                     <div className="space-y-2">
                        <Label htmlFor="tailor">Nearby Tailor</Label>
                         <Select name="tailor" required>
                            <SelectTrigger id="tailor">
                                <SelectValue placeholder="Select a tailor" />
                            </SelectTrigger>
                            <SelectContent>
                                {tailors.map(tailor => (
                                    <SelectItem key={tailor.id} value={tailor.id}>
                                        {tailor.name} - {tailor.location}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="message">Customization Message (Optional)</Label>
                        <Textarea id="message" name="message" placeholder="e.g., 'I'd like slightly shorter sleeves and a modern, slim fit.'"/>
                    </div>
                </CardContent>
                <CardFooter className="flex-col items-stretch">
                     <div className="w-full space-y-2 mb-6">
                        <div className="flex justify-between items-center text-muted-foreground">
                            <span>Subtotal</span>
                            <span>${originalPrice.toFixed(2)}</span>
                        </div>
                        {activePlan && (
                            <div className="flex justify-between items-center text-primary font-medium">
                                <span>{activePlan} Discount ({discount}%)</span>
                                <span>-${discountAmount.toFixed(2)}</span>
                            </div>
                        )}
                        <Separator className="my-2" />
                        <div className="flex justify-between items-center font-bold text-xl">
                            <span>Total</span>
                            <span>${finalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                    <SubmitButton />
                </CardFooter>
            </Card>
        </form>

        <Dialog open={isPaymentDialogOpen} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl text-rainbow">
                        <Wallet />
                        {selectedPaymentMethod === 'creditCard' ? 'Enter Card Details' : 'Complete Your Payment'}
                    </DialogTitle>
                     <DialogDescription>
                        {selectedPaymentMethod === 'creditCard'
                            ? `Please provide your payment information for the amount of $${finalPrice.toFixed(2)}.`
                            : `Choose your preferred payment method to finalize your order for $${finalPrice.toFixed(2)}.`}
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
    </div>
  );
}
