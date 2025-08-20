
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Truck, Home, Hourglass } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useApp, Order } from '@/context/app-context';
import { useEffect, useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const MapPlaceholder = ({ animationState }: { animationState: 'pending' | 'in-progress' | 'complete' }) => (
    <div className="relative w-full h-64 md:h-96 bg-muted rounded-lg overflow-hidden border">
        <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
        >
            <defs>
                <pattern
                    id="smallGrid"
                    width="8"
                    height="8"
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d="M 8 0 L 0 0 0 8"
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="0.5"
                    />
                </pattern>
                <pattern
                    id="grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                >
                    <rect width="40" height="40" fill="url(#smallGrid)" />
                    <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="1"
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <path
                id="routePath"
                d="M 20 250 C 150 100, 250 100, 380 220"
                stroke="hsl(var(--primary))"
                strokeWidth="4"
                fill="none"
                strokeDasharray="10 5"
                className="opacity-50"
            />
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-muted-foreground">
             <p className="font-bold">Map View Unavailable</p>
             <p className="text-xs">This is a visual simulation of your order's journey.</p>
        </div>

        {/* Start and End Points */}
        <div className="absolute top-[240px] left-[10px] text-center">
            <Package className="h-8 w-8 text-primary mx-auto" />
            <span className="text-xs font-semibold">Workshop</span>
        </div>
        <div className="absolute top-[210px] right-[10px] text-center">
            <Home className="h-8 w-8 text-primary mx-auto" />
            <span className="text-xs font-semibold">Your Address</span>
        </div>
        
        {/* Animated truck icon */}
        <div className="absolute top-0 left-0 w-full h-full">
            <Truck className={cn("h-6 w-6 text-primary drop-shadow-lg truck-icon", animationState)} />
        </div>
    </div>
);

const trackingSteps = [
    { status: 'Processing', description: 'Your order has been confirmed and is being prepared by the tailor.', icon: Hourglass },
    { status: 'Shipped', description: 'Your order has been shipped and is on its way to you.', icon: Truck },
    { status: 'Delivered', description: 'Your order has been successfully delivered.', icon: Home },
    { status: 'Returned', description: 'Your order has been returned.', icon: CheckCircle },
    { status: 'Canceled', description: 'Your order has been canceled.', icon: CheckCircle },
];

const getStepIndex = (status: Order['status']): number => {
    switch (status) {
        case 'Processing':
            return 0;
        case 'Shipped':
            return 1;
        case 'Delivered':
            return 2;
        case 'Returned':
            return 3;
        case 'Canceled':
            return 4;
        default:
            return -1;
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

    const animationState = useMemo(() => {
        if (!order) return 'pending';
        if (order.status === 'Shipped') return 'in-progress';
        if (order.status === 'Delivered') return 'complete';
        return 'pending';
    }, [order]);


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

    return (
        <div className="animate-fade-in-up space-y-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">Track Your Order</CardTitle>
                    <CardDescription>Order ID: {order.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <MapPlaceholder animationState={animationState} />
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

