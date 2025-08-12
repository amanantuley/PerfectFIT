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
        price: '₹1999',
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
        price: '₹3999',
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
        price: '₹6999',
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

    // Utility to get numeric amount from plan price string like '₹3999'
    const getPlanAmount = (planName: string | null) => {
      if (!planName) return 0;
      const plan = plans.find(p => p.name === planName);
      if (!plan) return 0;
      // remove non-digits and parse
      const digits = plan.price.replace(/[^\d]/g, '');
      return Number(digits) || 0;
    };
    
    const handleChoosePlan = (planName: string) => {
        setSelectedPlan(planName as SubscriptionPlan);
        setIsPaymentDialogOpen(true);
    };

    const handlePaymentConfirmation = (method: string) => {
        // This function remains for the in-app "Credit Card" flow.
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

    // Replace these with real links from your gateway dashboards
    const RAZORPAY_LINK_PLACEHOLDER = 'https://rzp.io/i/YOUR_RAZORPAY_LINK'; // replace with your Razorpay payment link
    // UPI deep link: pa = payee vpa, pn = payee name, am = amount, cu = currency
    const buildUpiLink = (amount: number) => {
      const pa = encodeURIComponent('yourupiid@bank'); // replace
      const pn = encodeURIComponent('YourName'); // replace
      const am = encodeURIComponent(String(amount)); // amount in INR without symbol
      const cu = 'INR';
      // optional parameters (tn = transaction note)
      const tn = encodeURIComponent(`${selectedPlan ?? 'Subscription'} plan`);
      return `upi://pay?pa=${pa}&pn=${pn}&am=${am}&cu=${cu}&tn=${tn}`;
    };

  return (
    <>
        <div className="space-y-8 animate-fade-in-up">
        <div className="text-center">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">Our Subscription Plans</h1>
            <p className="text-lg text-muted-foreground">
            Choose a plan to unlock premium perks and elevate your style.
            </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {plans.map((plan) => (
            <Card key={plan.name} className={`shadow-lg hover:shadow-xl transition-shadow flex flex-col ${plan.popular ? 'border-primary border-2' : ''}`}>
                {plan.popular && <div className="text-center py-1 bg-primary text-primary-foreground text-sm font-bold">Most Popular</div>}
                <CardHeader className="text-center">
                <CardTitle className="text-3xl flex items-center justify-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
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
                    <DialogTitle className="flex items-center gap-2 text-2xl text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
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
                       {/* Keep Credit Card option to open in-app form */}
                       <Button variant="outline" className="w-full justify-center gap-3 py-4 text-base" onClick={() => setSelectedPaymentMethod('creditCard')}>
                            <CreditCardIcon />
                            Credit Card
                       </Button>

                       {/* Google Pay (UPI) - opens UPI app on mobile devices */}
                       <Button
                         variant="outline"
                         className="w-full justify-center gap-3 py-4 text-base"
                         onClick={() => {
                           const amount = getPlanAmount(selectedPlan);
                           const upiLink = buildUpiLink(amount);
                           // Try to open UPI scheme; on desktop this will do nothing or show unsupported
                           window.location.href = upiLink;
                         }}
                       >
                            <GooglePayIcon />
                            Google Pay
                       </Button>

                       {/* Razorpay — open hosted payment link in new tab */}
                       <Button
                         variant="outline"
                         className="w-full justify-center gap-3 py-4 text-base"
                         onClick={() => {
                           // If you have a dynamic amount / order id, generate the Razorpay payment link server-side
                           // and insert it here. This is a placeholder link.
                           const amount = getPlanAmount(selectedPlan);
                           // If you have a Razorpay Payment Link that encodes the amount, use it directly.
                           // Here we open the placeholder - replace with your actual payment link.
                           const razorpayLink = RAZORPAY_LINK_PLACEHOLDER;
                           window.open(razorpayLink, '_blank', 'noopener,noreferrer');
                         }}
                       >
                            <RazorpayIcon />
                            Razorpay
                       </Button>

                       {/* PerfectPay - Coming Soon */}
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
