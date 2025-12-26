'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  Package,
  Truck,
  Home,
  Scissors,
  Info,
  AlertTriangle,
  Calendar,
  Clock,
  Receipt,
  ShieldCheck,
  FileDown,
  MessageCircle,
  MapPin,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useApp, Order } from '@/context/app-context';
import { useEffect, useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { addDays, format } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion } from 'framer-motion';
import Image from 'next/image';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
  const eta = useMemo(() => (order ? addDays(new Date(order.date), 10) : null), [order]);

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
      {/* Hero / Header */}
      <Card className="shadow-xl border border-muted/30 backdrop-blur-md">
        <CardHeader className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
                Track Your Order
              </CardTitle>
              <CardDescription>
                Order ID: {order.id}
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="gap-1 bg-primary/10 border-primary/30 text-primary"><ShieldCheck className="h-4 w-4" /> Insured shipping</Badge>
              <Badge variant="outline" className="gap-1 bg-primary/10 border-primary/30 text-primary"><Clock className="h-4 w-4" /> ETA {eta ? format(eta, 'PPP') : '—'}</Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[{ label: 'Placed', value: format(new Date(order.date), 'PPP'), icon: Calendar }, { label: 'Status', value: order.status, icon: Info }, { label: 'Type', value: order.type, icon: Package }, { label: 'Total', value: `₹${order.price?.toLocaleString('en-IN')}`, icon: Receipt }].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-muted/30 bg-background/70 px-4 py-3 shadow-sm">
                <span className="p-2 rounded-full bg-primary/10"><Icon className="h-4 w-4 text-primary" /></span>
                <div className="leading-tight">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="font-semibold text-foreground text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-10">
          <MapPlaceholder status={order.status} />
          <Separator />

          {/* Delivery Status timeline */}
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
                    <p className="text-xs text-muted-foreground mt-1">{getStepDate(order.date, index)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary and Shipment Details */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Order Summary */}
        <Card className="lg:col-span-2 border border-muted/30 bg-background/70 backdrop-blur-sm shadow-lg">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-xl">Order Summary</CardTitle>
              <CardDescription>Item details and customization notes.</CardDescription>
            </div>
            <Button variant="outline" className="gap-2" onClick={() => {
              const doc = new jsPDF();
              const pageWidth = doc.internal.pageSize.getWidth();
              doc.setFont('helvetica', 'bold');
              doc.setFontSize(18);
              doc.text('PerfectFit - Order Invoice', 14, 18);
              doc.setFontSize(10);
              doc.setFont('helvetica', 'normal');
              doc.text(`Order ID: ${order.id}`, 14, 26);
              doc.text(`Date: ${format(new Date(order.date), 'PPP')}`, 14, 32);
              (doc as any).autoTable({ startY: 42, head: [['Item', 'Type', 'Price']], body: [[order.item, order.type, `₹${order.price?.toLocaleString('en-IN')}`]], headStyles: { fillColor: [143, 88, 240] } });
              const lastY = (doc as any).lastAutoTable.finalY + 8;
              doc.setFont('helvetica', 'bold');
              doc.text('Total', pageWidth - 60, lastY);
              doc.text(`₹${order.price?.toLocaleString('en-IN')}`, pageWidth - 20, lastY, { align: 'right' });
              if (order.customizationNote) {
                doc.setFont('helvetica', 'bold');
                doc.text('Customization Notes', 14, lastY + 12);
                doc.setFont('helvetica', 'normal');
                doc.text(order.customizationNote, 14, lastY + 18, { maxWidth: pageWidth - 28 });
              }
              doc.save(`PerfectFit-Invoice-${order.id}.pdf`);
            }}>
              <FileDown className="h-4 w-4" /> Download invoice
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-md overflow-hidden border bg-muted/20">
                {/* decorative image if available */}
                <Image src={order.image} alt={order.item} width={64} height={64} className="object-cover h-full w-full" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-foreground">{order.item}</p>
                <p className="text-sm text-muted-foreground">{order.type} • Placed {format(new Date(order.date), 'PPP')}</p>
              </div>
            </div>
            {order.customizationNote && (
              <div className="rounded-lg border border-muted/30 p-3 bg-muted/10">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Customization</p>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{order.customizationNote}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Shipment Details */}
        <Card className="border border-muted/30 bg-background/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Shipment details</CardTitle>
            <CardDescription>Courier and delivery information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm"><Truck className="h-4 w-4 text-primary" /> Carrier</div>
              <p className="text-sm font-medium">Perfect Logistics</p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-primary" /> Destination</div>
              <p className="text-sm font-medium">Your saved address</p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-primary" /> ETA</div>
              <p className="text-sm font-medium">{eta ? format(eta, 'PPP') : '—'}</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">Need help with delivery?</p>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="gap-1">
                  <Link href="/messages"><MessageCircle className="h-4 w-4" /> Chat</Link>
                </Button>
                <Button asChild size="sm" className="gap-1 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 text-white">
                  <Link href="/contact">Contact support</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
