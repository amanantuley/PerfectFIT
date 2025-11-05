'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, MessageCircle, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/context/translation-provider';
import { useToast } from '@/hooks/use-toast';

type Message = { role: 'user' | 'tailor'; content: string };
type Conversation = {
  name: string;
  order: string;
  avatar: string;
  messages: Message[];
};

type ConversationKey = string;

// ✅ Default sample data
const defaultConversations: Record<ConversationKey, Conversation> = {
  rohan: {
    name: 'Rohan Sharma',
    order: '#T307',
    avatar: 'https://placehold.co/100x100.png',
    messages: [
      { role: 'user', content: 'Hi! For the casual shirt, could you make the sleeves a bit longer?' },
      { role: 'tailor', content: 'Absolutely! I’ll add an inch to the sleeves. Great choice of fabric!' },
    ],
  },
  priya: {
    name: 'Priya Patel',
    order: '#T302',
    avatar: 'https://placehold.co/100x100.png',
    messages: [{ role: 'user', content: 'Hello! Any updates on my Navy Blue Suit?' }],
  },
  sneha: {
    name: 'Sneha Reddy',
    order: '#T304',
    avatar: 'https://placehold.co/100x100.png',
    messages: [
      { role: 'user', content: 'Could you confirm the delivery date for my order?' },
      { role: 'tailor', content: 'It’s scheduled for delivery by November 10th as planned.' },
    ],
  },
  amit: {
    name: 'Amit Singh',
    order: '#T299',
    avatar: 'https://placehold.co/100x100.png',
    messages: [{ role: 'user', content: 'The shirt fits perfectly, thank you so much!' }],
  },
};

export default function TailorMessagesPage() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [conversations, setConversations] = useState(defaultConversations);
  const [activeConversation, setActiveConversation] = useState<ConversationKey | null>('rohan');
  const [mobileActive, setMobileActive] = useState(false);
  const [messageInput, setMessageInput] = useState('');

  // ✅ Load saved chats from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tailor_chats');
    if (saved) setConversations(JSON.parse(saved));
  }, []);

  // ✅ Save to localStorage whenever chats change
  useEffect(() => {
    localStorage.setItem('tailor_chats', JSON.stringify(conversations));
  }, [conversations]);

  const currentConversation = activeConversation ? conversations[activeConversation] : null;

  const handleSelectConversation = (key: ConversationKey) => {
    setActiveConversation(key);
    setMobileActive(true);
  };

  // ✅ Send message handler
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeConversation) return;

    const newMsg: Message = { role: 'tailor', content: messageInput.trim() };

    setConversations((prev) => {
      const updated = { ...prev };
      updated[activeConversation].messages.push(newMsg);
      return updated;
    });

    setMessageInput('');

    toast({
      title: 'Message sent',
      description: 'Your reply has been added to the chat.',
    });

    // 🧠 Optional: Simulate a user auto-reply (fun!)
    setTimeout(() => {
      setConversations((prev) => {
        const updated = { ...prev };
        updated[activeConversation].messages.push({
          role: 'user',
          content: 'Got it! Thanks for the quick response.',
        });
        return updated;
      });
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex animate-fade-in-up gap-6">
      {/* Conversation List */}
      <Card
        className={cn(
          'w-full md:w-1/3 md:flex flex-col shadow-lg',
          mobileActive && 'hidden md:flex'
        )}
      >
        <CardHeader className="border-b">
          <CardTitle className="text-xl">{t('Chats')}</CardTitle>
        </CardHeader>
        <ScrollArea>
          {Object.keys(conversations).map((key) => {
            const convo = conversations[key];
            const lastMessage = convo.messages[convo.messages.length - 1];
            return (
              <div
                key={key}
                className={cn(
                  'flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/50 border-b',
                  activeConversation === key && 'bg-muted'
                )}
                onClick={() => handleSelectConversation(key)}
              >
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src={convo.avatar} alt={convo.name} />
                  <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">
                  <p className="font-semibold truncate">{convo.name}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {lastMessage.content}
                  </p>
                </div>
              </div>
            );
          })}
        </ScrollArea>
      </Card>

      {/* Conversation View */}
      <Card
        className={cn('flex-1 flex-col shadow-lg', mobileActive ? 'flex' : 'hidden md:flex')}
      >
        {currentConversation ? (
          <>
            <CardHeader className="border-b flex-row items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileActive(false)}
              >
                <ArrowLeft />
              </Button>
              <div className="flex-1">
                <CardTitle className="flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
                  {currentConversation.name}
                </CardTitle>
                <CardDescription>
                  {t('Order')} {currentConversation.order}
                </CardDescription>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-full p-6">
                <div className="space-y-6">
                  {currentConversation.messages.map((message, index) => (
                    <div
                      key={index}
                      className={cn(
                        'flex items-start gap-4',
                        message.role === 'tailor' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      {message.role === 'user' && (
                        <Avatar className="h-10 w-10 border">
                          <AvatarImage
                            src={currentConversation.avatar}
                            alt={currentConversation.name}
                          />
                          <AvatarFallback>{currentConversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={cn(
                          'max-w-md space-y-2',
                          message.role === 'tailor' && 'text-right'
                        )}
                      >
                        <p className="font-bold text-sm">
                          {message.role === 'user'
                            ? currentConversation.name
                            : t('You')}
                        </p>
                        <div
                          className={cn(
                            'rounded-lg px-4 py-3 text-sm',
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
                          <AvatarImage
                            src="https://placehold.co/100x100.png"
                            alt="Tailor"
                          />
                          <AvatarFallback>T</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>

            {/* Message Input */}
            <div className="p-4 border-t bg-background">
              <form className="flex items-center gap-4" onSubmit={handleSendMessage}>
                <Input
                  placeholder={t('Type your message...')}
                  className="flex-1"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <Button type="submit">
                  <Send className="mr-2 h-4 w-4" />
                  {t('Send')}
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <MessageCircle className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">{t('Select a conversation')}</h3>
            <p className="text-muted-foreground">
              {t('Choose a chat from the list to start messaging.')}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
