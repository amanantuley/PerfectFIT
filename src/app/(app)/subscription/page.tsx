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
import {
  Check,
  Gem,
  Wallet,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Clock3,
  Zap,
  Gift,
  Crown,
  ArrowRight,
} from 'lucide-react';
import { useMemo, useState } from 'react';
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
    priceMonthly: 1999,
    priceYearly: 1699,
    description: 'Perfect for occasional rentals and trying out our service.',
    features: [
      '1 rental credit / month',
      'Access to casual wear',
      'Standard delivery',
      'Basic fit guarantee',
      '10% discount on purchases',
    ],
    popular: false,
    badge: 'Starter',
  },
  {
    name: 'Pro',
    priceMonthly: 3999,
    priceYearly: 3399,
    description: 'For the fashion-forward individual who loves variety.',
    features: [
      '4 rental credits / month',
      'Access to all collections',
      'Express delivery',
      'Perfect fit guarantee + free alterations',
      'Early access to new arrivals',
      '25% discount on purchases',
    ],
    popular: true,
    badge: 'Most loved',
  },
  {
    name: 'Ultimate',
    priceMonthly: 6999,
    priceYearly: 5999,
    description: 'The ultimate wardrobe solution for any occasion.',
    features: [
      'Unlimited rental credits',
      'Access to all + premium collections',
      'Same-day delivery (select cities)',
      'Personal stylist consultation',
      'Exclusive event invites',
      '40% discount on purchases',
    ],
    popular: false,
    badge: 'Concierge',
  },
];

export default function SubscriptionPage() {
  const { toast } = useToast();
  const { setActivePlan } = useSubscription();
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const formatPrice = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

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

  const heroStats = [
    { label: 'Avg. savings per member', value: '₹4.3k', icon: Wallet },
    { label: 'Fit satisfaction', value: '4.9/5', icon: ShieldCheck },
    { label: 'Delivery SLA', value: '<24h metro', icon: Clock3 },
    { label: 'Exclusive drops', value: 'Weekly', icon: Gift },
  ];

  const faqs = [
    {
      q: 'Can I pause my plan?',
      a: 'Yes, pause up to 2 months per year—credits roll over while paused.',
    },
    {
      q: 'Do credits expire?',
      a: 'Credits roll for 90 days; Pro and Ultimate get auto-extend on unused credits.',
    },
    {
      q: 'What if the fit is off?',
      a: 'Pro/Ultimate include free alterations; Basic gets one complimentary refit per quarter.',
    },
  ];

  const planPricing = useMemo(
    () =>
      plans.map((plan) => {
        const base = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly * 12;
        const perMonth = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;
        const savings = billingCycle === 'yearly'
          ? Math.max(plan.priceMonthly * 12 - plan.priceYearly * 12, 0)
          : 0;
        return { ...plan, totalPrice: base, perMonth, savings };
      }),
    [billingCycle],
  );

  return (
    <>
      <motion.div
        className="space-y-10 animate-fade-in-up"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-fuchsia-500/10 via-background to-sky-500/10 p-6 sm:p-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-60" />
          <div className="relative space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary gap-1">
                <Crown className="h-3.5 w-3.5" /> Memberships built for fit-first fashion
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> Fit guarantee included
              </Badge>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text-rainbow">
                  Tailored Memberships, Real Savings
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
                  Unlock concierge-level fits, rapid deliveries, and exclusive drops—optimized for your wardrobe cadence.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-background/70 border border-muted/40 px-2 py-1 w-fit">
                <Button
                  size="sm"
                  variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
                  className={billingCycle === 'monthly' ? 'bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 text-white' : ''}
                  onClick={() => setBillingCycle('monthly')}
                >
                  Monthly
                </Button>
                <Button
                  size="sm"
                  variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
                  className={billingCycle === 'yearly' ? 'bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 text-white' : ''}
                  onClick={() => setBillingCycle('yearly')}
                >
                  Annual <Badge className="ml-2 bg-emerald-500/90">Save more</Badge>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              {heroStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-xl border border-muted/30 bg-background/70 p-3 flex items-center gap-3 shadow-sm">
                    <span className="p-2 bg-primary/10 rounded-full">
                      <Icon className="h-4 w-4 text-primary" />
                    </span>
                    <div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="text-sm font-semibold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {planPricing.map((plan, i) => (
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
                    ? 'border-primary border-2 bg-gradient-to-b from-primary/10 to-background/60 shadow-primary/20'
                    : 'border-muted/40 bg-background/60'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 text-center bg-primary text-primary-foreground text-sm font-semibold py-1 rounded-t-lg">
                    ⭐ Most Popular
                  </div>
                )}
                {!plan.popular && plan.badge && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary text-[11px]">{plan.badge}</Badge>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold">
                    <Gem className="text-primary h-6 w-6" />
                    {plan.name}
                  </CardTitle>
                  <div className="flex flex-col items-center gap-1 mt-2">
                    <p className="text-4xl font-bold">
                      {formatPrice(plan.perMonth)}
                      <span className="text-lg text-muted-foreground font-normal">/mo</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {billingCycle === 'yearly'
                        ? `Billed ${formatPrice(plan.totalPrice)} / year`
                        : 'Billed monthly, cancel anytime'}
                    </p>
                    {billingCycle === 'yearly' && plan.savings > 0 && (
                      <Badge className="bg-emerald-500/90 text-white">Save {formatPrice(plan.savings)} / yr</Badge>
                    )}
                  </div>
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
                    className="w-full transition-all hover:shadow-md flex items-center justify-center gap-2"
                  >
                    Choose Plan
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Value props */}
        <div className="grid gap-4 md:grid-cols-3">
          {[{ icon: ShieldCheck, title: 'Fit Guarantee', desc: 'Free alterations on Pro/Ultimate; one complimentary refit on Basic per quarter.' }, { icon: Clock3, title: 'Priority Logistics', desc: 'Express and same-day delivery windows where available, plus live tracking.' }, { icon: Zap, title: 'Concierge Styling', desc: 'Ultimate members get stylist sessions; Pro gets curated drop alerts.' }].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="border border-muted/30 bg-background/70 shadow-md">
                <CardContent className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1 border border-primary/20 bg-primary/5">
            <CardContent className="p-6 space-y-3">
              <p className="text-sm font-semibold text-primary">Confidence to subscribe</p>
              <h3 className="text-2xl font-bold text-foreground">Transparent policies</h3>
              <p className="text-sm text-muted-foreground">Pause, swap, or upgrade anytime. Credits carry, fits are guaranteed.</p>
              <div className="flex items-center gap-2 text-sm text-primary">
                <Sparkles className="h-4 w-4" /> Try Pro risk-free for 14 days.
              </div>
            </CardContent>
          </Card>
          <div className="lg:col-span-2 grid gap-3">
            {faqs.map((item) => (
              <Card key={item.q} className="border border-muted/30 bg-background/60">
                <CardContent className="p-4">
                  <p className="font-semibold text-foreground flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> {item.q}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
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
