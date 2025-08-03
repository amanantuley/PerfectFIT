
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, Gem, Wallet, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSubscription, type SubscriptionPlan } from '@/context/subscription-provider';
import { Badge } from '@/components/ui/badge';

const plans = [
    {
        name: 'Basic',
        price: '$29',
        period: 'month',
        description: 'Perfect for occasional rentals and trying out our service.',
        features: [
            '1 Rental Credit per Month',
            'Access to Casual Wear',
            'Standard Delivery',
            'Basic Fit Guarantee',
            '10% Discount on Purchases',
        ],
        popular: false,
    },
    {
        name: 'Pro',
        price: '$59',
        period: 'month',
        description: 'For the fashion-forward individual who loves variety.',
        features: [
            '4 Rental Credits per Month',
            'Access to All Collections',
            'Express Delivery',
            'Perfect Fit Guarantee with Free Alterations',
            'Early Access to New Arrivals',
            '25% Discount on Purchases',
        ],
        popular: true,
    },
    {
        name: 'Ultimate',
        price: '$99',
        period: 'month',
        description: 'The ultimate wardrobe solution for any occasion.',
        features: [
            'Unlimited Rental Credits',
            'Access to All Collections, including Premium',
            'Same-Day Delivery (in select cities)',
            'Personal Stylist Consultation',
            'Exclusive Event Invites',
            '40% Discount on Purchases',
        ],
        popular: false,
    }
];

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

export default function SubscriptionPage() {
    const { toast } = useToast();
    const { setActivePlan } = useSubscription();
    const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
    
    const handleChoosePlan = (planName: string) => {
        setSelectedPlan(planName as SubscriptionPlan);
        setIsPaymentDialogOpen(true);
    };

    const handlePaymentConfirmation = (method: string) => {
        if (!selectedPlan) return;
        setIsPaymentDialogOpen(false);
        setSelectedPaymentMethod(null);
        setActivePlan(selectedPlan);
        toast({
            title: 'Subscription Activated!',
            description: method === 'PerfectPay'
              ? `Your ${selectedPlan} plan is now active. You've earned 5% cashback!`
              : `Your ${selectedPlan} plan is now active. Welcome to premium!`,
        });
        setSelectedPlan(null);
    };

    const closeDialog = () => {
        setIsPaymentDialogOpen(false);
        setSelectedPaymentMethod(null);
        setSelectedPlan(null);
    }

  return (
    <>
        <div className="space-y-8 animate-fade-in-up">
        <div className="text-center">
            <h1 className="text-4xl font-bold font-headline text-rainbow bg-size-200 animate-text-rainbow">Our Subscription Plans</h1>
            <p className="text-lg text-muted-foreground">
            Choose a plan to unlock premium perks and elevate your style.
            </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-start">
            {plans.map((plan) => (
            <Card key={plan.name} className={`shadow-lg hover:shadow-xl transition-shadow flex flex-col ${plan.popular ? 'border-primary border-2' : ''}`}>
                {plan.popular && <div className="text-center py-1 bg-primary text-primary-foreground text-sm font-bold">Most Popular</div>}
                <CardHeader className="text-center">
                <CardTitle className="text-3xl flex items-center justify-center gap-2 text-rainbow bg-size-200 animate-text-rainbow">
                    <Gem className="h-7 w-7 text-accent" />
                    {plan.name}
                </CardTitle>
                <p className="text-4xl font-bold">{plan.price}<span className="text-lg font-normal text-muted-foreground">/{plan.period}</span></p>
                <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                <h3 className="font-bold mb-4 text-lg">What's Included:</h3>
                <ul className="space-y-3">
                    {plan.features.map(feature => (
                        <li key={feature} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-primary mt-1 shrink-0"/>
                            <span className="text-left">{feature}</span>
                        </li>
                    ))}
                </ul>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" variant={plan.popular ? 'default' : 'secondary'} onClick={() => handleChoosePlan(plan.name)}>
                        Choose Plan
                    </Button>
                </CardFooter>
            </Card>
            ))}
        </div>
        </div>

        <Dialog open={isPaymentDialogOpen} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl text-rainbow bg-size-200 animate-text-rainbow">
                        <Wallet />
                        {selectedPaymentMethod === 'creditCard' ? 'Enter Card Details' : `Buy ${selectedPlan} Plan`}
                    </DialogTitle>
                     <DialogDescription>
                        {selectedPaymentMethod === 'creditCard'
                            ? 'Please provide your payment information to activate your subscription.'
                            : `Choose your preferred payment method to purchase the ${selectedPlan} plan.`}
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
    </>
  );
}
