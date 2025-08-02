'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Loader2, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { chatWithPerfectAI } from '@/ai/flows/chat-with-perfect-ai';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';

const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <circle cx="12" cy="4" r="2" />
      <path d="M12 7c-2.484 0-4.5 2.016-4.5 4.5V14h9v-2.5C16.5 9.016 14.484 7 12 7z" />
      <path d="M11 15h2v5h3v2H8v-2h3v-5z" />
    </svg>
);

interface Message {
    role: 'user' | 'model';
    content: string;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', content: "Hello! I'm PerfectAI. How can I help you with your style and fit questions today?" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            const history = [...messages];
            const result = await chatWithPerfectAI({ history, message: currentInput });
            const aiMessage: Message = { role: 'model', content: result.response };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error calling AI flow:", error);
            const errorMessage: Message = { role: 'model', content: "Sorry, I'm having trouble connecting. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="default"
                    size="icon"
                    className="fixed bottom-6 right-6 rounded-full h-16 w-16 shadow-lg z-50 flex items-center justify-center"
                    aria-label="Open chat"
                >
                    <MessageSquare className="h-8 w-8" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                side="top"
                align="end"
                className="w-[22rem] h-[32rem] p-0 mr-2 flex flex-col shadow-2xl rounded-xl"
            >
                <div className="flex items-center p-3 gap-3 bg-card border-b">
                     <div className="bg-primary rounded-full p-2">
                        <LogoIcon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                        <p className="text-lg font-bold">PerfectAI</p>
                        <p className="text-xs text-muted-foreground">Your Personal Style Assistant</p>
                    </div>
                </div>
                <ScrollArea className="flex-1 p-4 bg-background/50">
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "flex items-end gap-2",
                                    message.role === 'user' ? 'justify-end' : 'justify-start'
                                )}
                            >
                                {message.role === 'model' && (
                                    <Avatar className="h-8 w-8">
                                         <div className="flex h-full w-full items-center justify-center rounded-full bg-primary">
                                            <LogoIcon className="h-4 w-4 text-primary-foreground" />
                                        </div>
                                    </Avatar>
                                )}
                                <div
                                    className={cn(
                                        "rounded-lg px-3 py-2 text-sm max-w-[80%] whitespace-pre-wrap",
                                        message.role === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-br-none'
                                            : 'bg-muted text-foreground rounded-bl-none'
                                    )}
                                >
                                    {message.content}
                                </div>
                                {message.role === 'user' && (
                                     <Avatar className="h-8 w-8">
                                        <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="person avatar"/>
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex items-end gap-2 justify-start">
                                <Avatar className="h-8 w-8">
                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-primary">
                                        <LogoIcon className="h-4 w-4 text-primary-foreground" />
                                    </div>
                                </Avatar>
                                <div className="rounded-lg px-3 py-2 text-sm bg-muted text-foreground rounded-bl-none flex items-center">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>
                <Separator />
                <form onSubmit={handleSubmit} className="p-3 bg-card flex items-center gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask anything..."
                        disabled={isLoading}
                        autoComplete="off"
                        className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send message</span>
                    </Button>
                </form>
            </PopoverContent>
        </Popover>
    );
}
