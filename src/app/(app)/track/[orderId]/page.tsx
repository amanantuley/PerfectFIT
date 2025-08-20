
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Truck, Home, Hourglass, Scissors, Info } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useApp, Order } from '@/context/app-context';
import { useEffect, useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { addDays, format } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const MapPlaceholder = ({ status }: { status: Order['status'] }) => {
    const routePath = "M 100 300 C 250 100, 550 100, 700 300";

    const animationClass = useMemo(() => {
        switch (status) {
            case 'Shipped':
                return 'animate-route-shipped';
            case 'Out for Delivery':
                return 'animate-route-out-for-delivery';
            case 'Delivered':
                return 'animate-route-delivered';
            default:
                return 'hidden';
        }
    }, [status]);


    return (
    <div className="relative w-full h-64 md:h-96 bg-muted rounded-lg overflow-hidden border">
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 400"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
        >
            <defs>
                <pattern
                    id="smallGrid"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d="M 10 0 L 0 0 0 10"
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="0.5"
                    />
                </pattern>
                <pattern
                    id="grid"
                    width="50"
                    height="50"
                    patternUnits="userSpaceOnUse"
                >
                    <rect width="50" height="50" fill="url(#smallGrid)" />
                    <path
                        d="M 50 0 L 0 0 0 50"
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="1"
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            <path
                id="routePath"
                d={routePath}
                stroke="hsl(var(--primary))"
                strokeWidth="6"
                fill="none"
                strokeDasharray="15 8"
                className="opacity-50"
            />
            
            {/* Start and End Points */}
            <g transform="translate(100, 300)">
                <circle cx="0" cy="0" r="15" fill="hsl(var(--primary))" opacity="0.3" />
                <circle cx="0" cy="0" r="8" fill="hsl(var(--primary))" />
            </g>
             <g transform="translate(700, 300)">
                <circle cx="0" cy="0" r="15" fill="hsl(var(--primary))" opacity="0.3" />
                <circle cx="0" cy="0" r="8" fill="hsl(var(--primary))" />
            </g>
        </svg>

        {/* Truck animation */}
         <div 
            className={cn(
                "absolute",
                animationClass
            )}
            style={{
                offsetPath: `path('${routePath}')`,
            } as React.CSSProperties}
         >
            <Truck
                className="text-primary drop-shadow-lg -translate-x-1/2 -translate-y-1/2"
                width="40"
                height="40"
            />
        </div>


        {/* Start and End Point Icons, placed with divs for easier responsive text */}
        <div className="absolute top-[calc(75%-28px)] left-[12.5%] -translate-x-1/2 text-center">
            <Package className="h-8 w-8 text-primary mx-auto" />
            <span className="text-xs font-semibold">Workshop</span>
        </div>
        <div className="absolute top-[calc(75%-28px)] left-[87.5%] -translate-x-1/2 text-center">
            <Home className="h-8 w-8 text-primary mx-auto" />
            <span className="text-xs font-semibold">Your Address</span>
        </div>
        
    </div>
)};


const trackingSteps = [
    { status: 'Confirmed', description: 'Your order has been confirmed and sent to the tailor.', icon: CheckCircle },
    { status: 'Processing', description: 'The tailor is meticulously crafting your garment.', icon: Scissors },
    { status: 'Shipped', description: 'Your order has been dispatched from our workshop.', icon: Truck },
    { status: 'Out for Delivery', description: 'The package is on its final journey to your doorstep.', icon: Home },
    { status: 'Delivered', description: 'Your order has been successfully delivered. Enjoy!', icon: Package },
];

const getStepIndex = (status: Order['status']): number => {
    switch (status) {
        case 'Processing': return 1;
        case 'Shipped': return 2;
        case 'Out for Delivery': return 3; // Added this step for better granularity
        case 'Delivered': return 4;
        default: return 0; // Confirmed is the default starting point
    }
};

export default function TrackOrderPage() {
    const params = useParams();
    const { orders } = useApp();
    const orderId = params.orderId as string;
    
    const [order, setOrder] = useState<Order | undefined>(undefined);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const foundOrder = orders.find(o => o.id === orderId);
        setOrder(foundOrder);
        if (foundOrder) {
            setCurrentStep(getStepIndex(foundOrder.status));
        }
    }, [orderId, orders]);

    const getStepDate = (orderDate: string, stepIndex: number): string => {
        const baseDate = new Date(orderDate);
        if (isNaN(baseDate.getTime())) return 'Pending';
        // Simulate progress: each step takes 1-2 days.
        return format(addDays(baseDate, stepIndex * 2), 'PPP, p');
    };

    if (!order) {
        return (
             <div className="flex flex-col items-center justify-center text-center h-[calc(100vh-8rem)]">
                <Card className="w-full max-w-md p-8 shadow-lg">
                    <CardHeader>
                        <CardTitle>Order Not Found</CardTitle>
                        <CardDescription>The order you are looking for does not exist or is still loading.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="mt-4">
                            <Link href="/orders">Go to My Orders</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Special handling for non-trackable statuses
    if (order.status === 'Returned' || order.status === 'Canceled') {
        return (
            <Card className="shadow-lg animate-fade-in-up">
                 <CardHeader>
                    <CardTitle className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-size-200 animate-text-rainbow">Order Status</CardTitle>
                    <CardDescription>Order ID: {order.id}</CardDescription>
                </CardHeader>
                 <CardContent>
                     <Alert variant={order.status === 'Canceled' ? 'destructive' : 'default'}>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Order {order.status}</AlertTitle>
                        <AlertDescription>
                            This order has been {order.status.toLowerCase()} and is no longer being tracked for delivery.
                        </AlertDescription>
                    </Alert>
                     <Button asChild className="mt-6">
                        <Link href="/orders">Back to My Orders</Link>
                    </Button>
                 </CardContent>
            </Card>
        )
    }

    return (
        <div className="animate-fade-in-up space-y-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-size-200 animate-text-rainbow">Track Your Order</CardTitle>
                    <CardDescription>Order ID: {order.id} | Estimated Delivery: {format(addDays(new Date(order.date), 10), 'PPP')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <MapPlaceholder status={order.status} />
                    <Separator />
                    <div>
                        <h3 className="text-xl font-bold mb-6">Delivery Status</h3>
                        <div className="relative space-y-10">
                             <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border" />
                             {trackingSteps.map((step, index) => (
                                <div key={step.status} className="flex items-start gap-4 pl-12 relative">
                                    <div className={cn(
                                        "absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300",
                                        index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                    )}>
                                        <step.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className={cn("font-bold", index <= currentStep ? "text-foreground" : "text-muted-foreground")}>{step.status}</p>
                                        <p className="text-sm text-muted-foreground">{step.description}</p>
                                        {index <= currentStep && (
                                            <p className="text-xs text-muted-foreground mt-1">{getStepDate(order.date, index)}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
