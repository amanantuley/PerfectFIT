
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleDollarSign } from 'lucide-react';

export default function TailorChargesPage() {
    return (
        <div className="flex justify-center items-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
            <Card className="shadow-lg text-center w-full max-w-md animate-fade-in-up">
                <CardHeader>
                    <div className="mx-auto bg-pink-100 p-4 rounded-full mb-4">
                        <CircleDollarSign className="h-12 w-12 text-pink-500" />
                    </div>
                    <CardTitle className="text-3xl font-headline">Charges</CardTitle>
                    <CardDescription className="text-lg">
                        Coming Soon!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Manage your service charges, set pricing for different garments, and view transaction history all in one place.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
