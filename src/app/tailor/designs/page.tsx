
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Scissors } from 'lucide-react';

export default function TailorDesignsPage() {
    return (
        <div className="flex justify-center items-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
            <Card className="shadow-lg text-center w-full max-w-md animate-fade-in-up">
                <CardHeader>
                    <div className="mx-auto bg-pink-100 p-4 rounded-full mb-4">
                        <Scissors className="h-12 w-12 text-pink-500" />
                    </div>
                    <CardTitle className="text-3xl font-headline animate-text-rainbow bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">Designs</CardTitle>
                    <CardDescription className="text-lg">
                        Coming Soon!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Here you will be able to upload and manage your design portfolio, showcasing your unique styles and custom creations to attract new clients.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
