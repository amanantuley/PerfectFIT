
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';

export default function WalletPage() {
    return (
        <div className="flex justify-center items-center animate-fade-in-up" style={{ minHeight: 'calc(100vh - 200px)' }}>
            <Card className="shadow-lg text-center w-full max-w-md">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4">
                        <Wallet className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-headline text-rainbow">PerfectPay Wallet</CardTitle>
                    <CardDescription className="text-lg">
                        Coming Soon!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        We're working hard to bring you a seamless one-click payment experience with exclusive cashback rewards. Stay tuned!
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
