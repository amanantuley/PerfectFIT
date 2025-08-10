
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function MessagesRedirectPage() {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
            <Card className="w-full max-w-md text-center shadow-lg animate-fade-in-up">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4">
                        <MessageSquare className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
                        Contact Your Tailor
                    </CardTitle>
                     <CardDescription>
                        You can message your tailor directly from your order details.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">
                        Please go to your "My Orders" page to start a conversation about a specific order.
                    </p>
                     <Button asChild>
                        <Link href="/orders">Go to My Orders</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
