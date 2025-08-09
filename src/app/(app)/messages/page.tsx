
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

const conversation = [
    {
        role: 'tailor',
        name: 'John "The Stitch" Doe',
        content: "Hello! I've received your order #ORD015 for the Navy Blue Suit. I'm reviewing your customization notes now. I see you mentioned 'slightly shorter sleeves.' Could you confirm how much shorter you'd like them? About half an inch?",
        avatar: "https://placehold.co/100x100.png",
    },
    {
        role: 'user',
        name: 'You',
        content: "Hi John! Thanks for reaching out. Yes, half an inch shorter on the sleeves would be perfect. Also, for the modern slim fit, please make sure it's not too tight around the shoulders. I prefer a bit of room for movement.",
        avatar: "https://placehold.co/100x100.png",
    },
    {
        role: 'tailor',
        name: 'John "The Stitch" Doe',
        content: "Understood completely. Half an inch off the sleeves and I'll ensure a comfortable fit around the shoulders while maintaining that modern slim silhouette. Is there anything else you'd like to adjust?",
        avatar: "https://placehold.co/100x100.png",
    },
     {
        role: 'user',
        name: 'You',
        content: "That's all! Thank you so much for double-checking. I appreciate it.",
        avatar: "https://placehold.co/100x100.png",
    },
];

export default function MessagesPage() {
    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col animate-fade-in-up">
            <Card className="flex-1 flex flex-col shadow-lg">
                <CardHeader className="border-b">
                     <CardTitle className="flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
                        <MessageCircle />
                        Conversation with your Tailor
                    </CardTitle>
                    <CardDescription>Regarding Order #ORD015 - Navy Blue Suit</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                    <ScrollArea className="h-full p-6">
                        <div className="space-y-6">
                            {conversation.map((message, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "flex items-start gap-4",
                                        message.role === 'user' ? 'justify-end' : 'justify-start'
                                    )}
                                >
                                    {message.role === 'tailor' && (
                                        <Avatar className="h-10 w-10 border">
                                            <AvatarImage src={message.avatar} alt={message.name} data-ai-hint="person face" />
                                            <AvatarFallback>T</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={cn(
                                        "max-w-md space-y-2",
                                        message.role === 'user' && 'text-right'
                                    )}>
                                        <p className="font-bold text-sm">{message.name}</p>
                                        <div
                                            className={cn(
                                                "rounded-lg px-4 py-3 text-sm",
                                                message.role === 'user'
                                                    ? 'bg-primary text-primary-foreground rounded-br-none'
                                                    : 'bg-muted rounded-bl-none'
                                            )}
                                        >
                                            <p className="whitespace-pre-wrap">{message.content}</p>
                                        </div>
                                    </div>
                                    {message.role === 'user' && (
                                        <Avatar className="h-10 w-10 border">
                                            <AvatarImage src={message.avatar} alt={message.name} data-ai-hint="person avatar" />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-4 border-t bg-background">
                    <form className="flex items-center gap-4">
                        <Input placeholder="Type your message..." className="flex-1" />
                        <Button type="submit">
                            <Send className="mr-2 h-4 w-4" />
                            Send
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
}
