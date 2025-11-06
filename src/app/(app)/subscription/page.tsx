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
import { Check, Gem, Wallet, ArrowLeft, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSubscription, type SubscriptionPlan } from '@/context/subscription-provider';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

// ✅ Payment Icons
const PaymentIcons = {
  GooglePay: (
    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Google_Pay_Logo.svg" alt="Google Pay" width={70} />
  ),
  ApplePay: (
    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Pay" width={30} />
  ),
  Paypal: (
    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" width={60} />
  ),
  Razorpay: (
    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Razorpay_logo.svg" alt="Razorpay" width={80} />
  ),
  CreditCard: <Check className="text-primary h-5 w-5" />,
  PerfectPay: <Sparkles className="text-primary h-5 w-5" />,
};

// ✅ Plans Definition
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
  },
];

export default function SubscriptionPage() {
  const { toast } = useToast();
  const { setActivePlan } = useSubscription();
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChoosePlan = (planName: string) => {
    setSelectedPlan(planName as SubscriptionPlan);
    setIsPaymentDialogOpen(true);
  };

  const handlePaymentConfirmation = async (method: string) => {
    if (!selectedPlan) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentDialogOpen(false);
      setActivePlan(selectedPlan);
      toast({
        title: '🎉 Subscription Activated!',
        description:
          method === 'PerfectPay'
            ? `Your ${selectedPlan} plan is now active. You've earned 5% cashback with PerfectPay!`
            : `Your ${selectedPlan} plan is now active. Welcome to premium!`,
      });
      setSelectedPaymentMethod(null);
      setSelectedPlan(null);
    }, 1200);
  };

  const closeDialog = () => {
    setIsPaymentDialogOpen(false);
    setSelectedPaymentMethod(null);
    setSelectedPlan(null);
  };

  return (
    <>
      <motion.div
        className="space-y-10 animate-fade-in-up"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text-rainbow">
            Our Subscription Plans
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock premium features, faster deliveries, and exclusive perks designed for your fashion journey.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="relative"
            >
              <Card
                className={`flex flex-col shadow-xl border backdrop-blur-sm transition-all duration-300 ${
                  plan.popular
                    ? 'border-primary border-2 bg-gradient-to-b from-primary/10 to-background/60'
                    : 'border-muted/40 bg-background/60'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 text-center bg-primary text-primary-foreground text-sm font-semibold py-1 rounded-t-lg">
                    ⭐ Most Popular
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold">
                    <Gem className="text-primary h-6 w-6" />
                    {plan.name}
                  </CardTitle>
                  <p className="text-4xl font-bold mt-2">
                    {plan.price}
                    <span className="text-lg text-muted-foreground font-normal">/{plan.period}</span>
                  </p>
                  <CardDescription className="mt-2 text-muted-foreground">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow px-6">
                  <h3 className="font-semibold mb-3 text-primary">What’s Included</h3>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm">
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="p-6 pt-4">
                  <Button
                    onClick={() => handleChoosePlan(plan.name)}
                    variant={plan.popular ? 'default' : 'secondary'}
                    className="w-full transition-all hover:shadow-md"
                  >
                    Choose Plan
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text-rainbow">
              <Wallet className="h-5 w-5" />
              {selectedPaymentMethod === 'creditCard'
                ? 'Enter Card Details'
                : `Buy ${selectedPlan} Plan`}
            </DialogTitle>
            <DialogDescription>
              {selectedPaymentMethod === 'creditCard'
                ? 'Provide your payment information to activate your subscription.'
                : `Select your preferred payment method for the ${selectedPlan} plan.`}
            </DialogDescription>
          </DialogHeader>

          {/* Payment Options */}
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
              <Button
                className="w-full"
                disabled={isProcessing}
                onClick={() => handlePaymentConfirmation('Credit Card')}
              >
                {isProcessing ? 'Processing...' : 'Pay Now'}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 py-4">
              {Object.entries(PaymentIcons).map(([method, icon]) => (
                <Button
                  key={method}
                  variant="outline"
                  disabled={method === 'PerfectPay'}
                  onClick={
                    method === 'CreditCard'
                      ? () => setSelectedPaymentMethod('creditCard')
                      : () => handlePaymentConfirmation(method)
                  }
                  className="flex flex-col items-center gap-2 py-4 text-sm relative"
                >
                  {icon}
                  <span>{method}</span>
                  {method === 'PerfectPay' && (
                    <Badge
                      variant="secondary"
                      className="absolute top-1 right-1 text-[10px]"
                    >
                      Coming Soon
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          )}

          <DialogFooter>
            {selectedPaymentMethod === 'creditCard' && (
              <Button variant="ghost" onClick={() => setSelectedPaymentMethod(null)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            )}
            <Button variant="ghost" onClick={closeDialog}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
