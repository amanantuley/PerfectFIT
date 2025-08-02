
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';

export default function TailorAiAssistantPage() {
    return (
        <div className="flex justify-center items-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
            <Card className="shadow-lg text-center w-full max-w-md animate-fade-in-up">
                <CardHeader>
                    <div className="mx-auto bg-pink-100 p-4 rounded-full mb-4">
                        <Wand2 className="h-12 w-12 text-pink-500" />
                    </div>
                    <CardTitle className="text-3xl font-headline animate-text-rainbow bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">AI Assistant</CardTitle>
                    <CardDescription className="text-lg">
                        Coming Soon!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Your AI-powered assistant will help you with pattern suggestions, material calculations, and optimizing your workflow for maximum efficiency.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
