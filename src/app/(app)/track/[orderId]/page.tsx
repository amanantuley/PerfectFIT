
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/app-context';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const MapPlaceholder = () => (
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
        <div className="absolute top-[240px] left-[10px]">
            <Package className="h-8 w-8 text-primary" />
            <span className="text-xs font-semibold">Workshop</span>
        </div>
        <div className="absolute top-[210px] right-[10px]">
            <Home className="h-8 w-8 text-primary" />
            <span className="text-xs font-semibold">Your Address</span>
        </div>
        
        {/* Animated truck icon */}
        <div className="absolute top-0 left-0 w-full h-full truck-path">
            <Truck className="h-6 w-6 text-primary drop-shadow-lg" />
        </div>
    </div>
);

const trackingSteps = [
    { status: 'Order Confirmed', description: 'Your order has been confirmed by the tailor.', icon: CheckCircle },
    { status: 'In Progress', description: 'The tailor has started working on your garment.', icon: Package },
    { status: 'Shipped', description: 'Your order is on its way to you.', icon: Truck },
    { status: 'Delivered', description: 'Your order has arrived!', icon: Home },
];

export default function TrackOrderPage() {
    const params = useParams();
    const router = useRouter();
    const { orders } = useApp();
    const orderId = params.orderId as string;
    
    const [currentStep, setCurrentStep] = useState(0);

    const order = orders.find(o => o.id === orderId);

    useEffect(() => {
        if (!order) return;
        
        const initialStep = 2; // Starts at "Shipped"
        setCurrentStep(initialStep);

        const timer = setTimeout(() => {
            if (initialStep < trackingSteps.length -1) {
                setCurrentStep(initialStep + 1);
            }
        }, 4000); // Simulate delivery after 4 seconds

        return () => clearTimeout(timer);

    }, [order]);


    if (!order) {
        return (
             <div className="flex flex-col items-center justify-center text-center h-[calc(100vh-8rem)]">
                <Card className="w-full max-w-md p-8">
                    <CardTitle>Order Not Found</CardTitle>
                    <CardDescription>The order you are looking for does not exist.</CardDescription>
                    <Button asChild className="mt-4">
                        <Link href="/orders">Go to My Orders</Link>
                    </Button>
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
                    <MapPlaceholder />
                    
                    <div>
                        <h3 className="text-xl font-bold mb-4">Delivery Status</h3>
                        <div className="relative space-y-8">
                             <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border" />
                             {trackingSteps.map((step, index) => (
                                <div key={step.status} className="flex items-start gap-4 pl-10 relative">
                                    <div className={cn(
                                        "absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full",
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

