
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';
import { useTranslation } from '@/context/translation-provider';

const conversation = [
    {
        role: 'user',
        name: 'Rohan Sharma',
        content: "Hi John! I just placed order #T307. For the casual shirt, could you make the sleeves a bit longer than standard? Maybe by an inch?",
        avatar: "https://placehold.co/100x100.png",
    },
    {
        role: 'tailor',
        name: 'You',
        content: "Hello Rohan, thank you for your order! Absolutely, I can add an inch to the sleeve length. I'll make a note of that right now. Great choice on the fabric, by the way.",
        avatar: "https://placehold.co/100x100.png",
    },
];

export default function TailorMessagesPage() {
    const { t } = useTranslation();

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col animate-fade-in-up">
            <Card className="flex-1 flex flex-col shadow-lg">
                <CardHeader className="border-b">
                     <CardTitle className="flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
                        <MessageCircle />
                        {t('Messages' as any)}
                    </CardTitle>
                    <CardDescription>{t('Conversation with' as any)} Rohan Sharma - {t('Order' as any)} #T307</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                    <ScrollArea className="h-full p-6">
                        <div className="space-y-6">
                            {conversation.map((message, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "flex items-start gap-4",
                                        message.role === 'tailor' ? 'justify-end' : 'justify-start'
                                    )}
                                >
                                    {message.role === 'user' && (
                                        <Avatar className="h-10 w-10 border">
                                            <AvatarImage src={message.avatar} alt={message.name} data-ai-hint="person face" />
                                            <AvatarFallback>C</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={cn(
                                        "max-w-md space-y-2",
                                        message.role === 'tailor' && 'text-right'
                                    )}>
                                        <p className="font-bold text-sm">{message.name}</p>
                                        <div
                                            className={cn(
                                                "rounded-lg px-4 py-3 text-sm",
                                                message.role === 'tailor'
                                                    ? 'bg-primary text-primary-foreground rounded-br-none'
                                                    : 'bg-muted rounded-bl-none'
                                            )}
                                        >
                                            <p className="whitespace-pre-wrap">{message.content}</p>
                                        </div>
                                    </div>
                                    {message.role === 'tailor' && (
                                        <Avatar className="h-10 w-10 border">
                                            <AvatarImage src={message.avatar} alt={message.name} data-ai-hint="person avatar" />
                                            <AvatarFallback>T</AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-4 border-t bg-background">
                    <form className="flex items-center gap-4">
                        <Input placeholder={t('Type your message...' as any)} className="flex-1" />
                        <Button type="submit">
                            <Send className="mr-2 h-4 w-4" />
                            {t('Send' as any)}
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
}
