'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Truck, Home, Scissors, Info, AlertTriangle } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useApp, Order } from '@/context/app-context';
import { useEffect, useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { addDays, format } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion } from 'framer-motion';

const MapPlaceholder = ({ status }: { status: Order['status'] }) => {
  const progressPercentage = useMemo(() => {
    switch (status) {
      case 'Shipped': return 50;
      case 'Out for Delivery': return 80;
      case 'Delivered': return 100;
      default: return 0;
    }
  }, [status]);

  const pathLength = 530;
  const strokeDashoffset = pathLength - (pathLength * progressPercentage) / 100;
  const routePath = "M 50 150 C 150 50, 350 50, 450 150";

  return (
    <div className="relative w-full h-64 md:h-96 bg-muted rounded-lg overflow-hidden border border-muted/30 backdrop-blur-sm">
      <svg width="100%" height="100%" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
        {/* Grid */}
        <defs>
          <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="hsl(var(--border))" strokeWidth="0.4" />
          </pattern>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <rect width="50" height="50" fill="url(#smallGrid)" />
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Route Path */}
        <path
          d={routePath}
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6 6"
          className="opacity-30"
        />
        {/* Progress Path */}
        <path
          d={routePath}
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          fill="none"
          strokeDasharray={pathLength}
          style={{
            strokeDashoffset,
            transition: 'stroke-dashoffset 1.5s ease-in-out',
          }}
        />
        {/* Truck (animated along path) */}
        {progressPercentage > 0 && (
          <motion.g
            initial={{ offsetDistance: '0%' }}
            animate={{ offsetDistance: `${progressPercentage}%` }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{ offsetPath: `path('${routePath}')` }}
          >
            <Truck
              className="text-primary drop-shadow-lg"
              width="24"
              height="24"
              transform="translate(-12, -12)"
            />
          </motion.g>
        )}

        {/* Start */}
        <g transform="translate(50, 150)">
          <circle r="10" fill="hsl(var(--primary))" opacity="0.15" />
          <circle r="5" fill="hsl(var(--primary))" />
          <Package x="-8" y="-22" width="16" height="16" className="text-primary" />
        </g>
        {/* End */}
        <g transform="translate(450, 150)">
          <circle r="10" fill="hsl(var(--primary))" opacity="0.15" />
          <circle r="5" fill="hsl(var(--primary))" />
          <Home x="-8" y="-22" width="16" height="16" className="text-primary" />
        </g>
      </svg>
    </div>
  );
};

// ✅ Step Definitions
const trackingSteps = [
  { status: 'Confirmed', description: 'Your order has been confirmed and sent to the tailor.', icon: CheckCircle },
  { status: 'Processing', description: 'Your tailor is crafting your custom fit.', icon: Scissors },
  { status: 'Shipped', description: 'Your outfit has left our warehouse.', icon: Truck },
  { status: 'Out for Delivery', description: 'Your parcel is on its way to you.', icon: Home },
  { status: 'Delivered', description: 'Delivered successfully. Enjoy your fit!', icon: Package },
];

const getStepIndex = (status: Order['status']): number => {
  switch (status) {
    case 'Processing': return 1;
    case 'Shipped': return 2;
    case 'Out for Delivery': return 3;
    case 'Delivered': return 4;
    default: return 0;
  }
};

export default function TrackOrderPage() {
  const params = useParams();
  const { orders } = useApp();
  const orderId = params.orderId as string;
  const [order, setOrder] = useState<Order | undefined>();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const foundOrder = orders.find(o => o.id === orderId);
    setOrder(foundOrder);
    if (foundOrder) setCurrentStep(getStepIndex(foundOrder.status));
  }, [orderId, orders]);

  const getStepDate = (orderDate: string, stepIndex: number): string => {
    const baseDate = new Date(orderDate);
    if (isNaN(baseDate.getTime())) return 'Pending';
    return format(addDays(baseDate, stepIndex * 2), 'PPP, p');
  };

  if (!order)
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <Card className="p-8 w-full max-w-md text-center shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Order Not Found</CardTitle>
            <CardDescription>
              We couldn’t find your order. It may have been canceled or not yet created.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="mt-4">
              <Link href="/orders">Go to My Orders</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );

  // 🚫 Handle Returned/Canceled Orders
  if (['Returned', 'Canceled'].includes(order.status))
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-text-rainbow">
              Order Status
            </CardTitle>
            <CardDescription>Order ID: {order.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant={order.status === 'Canceled' ? 'destructive' : 'default'}>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Order {order.status}</AlertTitle>
              <AlertDescription>
                This order has been {order.status.toLowerCase()} and is no longer being tracked.
              </AlertDescription>
            </Alert>
            <Button asChild className="mt-6">
              <Link href="/orders">Back to My Orders</Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8 animate-fade-in-up"
    >
      <Card className="shadow-xl border border-muted/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
            Track Your Order
          </CardTitle>
          <CardDescription>
            Order ID: {order.id} | Estimated Delivery:{' '}
            {format(addDays(new Date(order.date), 10), 'PPP')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-10">
          <MapPlaceholder status={order.status} />
          <Separator />
          <div>
            <h3 className="text-xl font-bold mb-6">Delivery Status</h3>
            <div className="relative space-y-10">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border" />
              {trackingSteps.map((step, index) => (
                <div key={step.status} className="flex items-start gap-4 pl-12 relative">
                  <div
                    className={cn(
                      'absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 shadow-sm',
                      index <= currentStep
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p
                      className={cn(
                        'font-semibold',
                        index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {step.status}
                    </p>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    {index <= currentStep && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {getStepDate(order.date, index)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
