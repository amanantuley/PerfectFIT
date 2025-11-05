'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MessagesRedirectPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-gradient-to-b from-background via-background/70 to-background/40 p-6"
    >
      <Card className="w-full max-w-md text-center shadow-xl border border-muted/40 backdrop-blur-sm">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-5 rounded-full mb-4 shadow-sm">
            <MessageSquare className="h-12 w-12 text-primary" />
          </div>

          <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
            Contact Your Tailor
          </CardTitle>

          <CardDescription className="text-base text-muted-foreground mt-2">
            Need help or have a question about your custom order?  
            Reach out to your tailor directly from your orders panel.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Conversations are tied to specific orders for faster assistance and accurate updates.
          </p>

          <Button
            asChild
            size="lg"
            className="font-medium bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 text-white hover:opacity-90 transition-all"
          >
            <Link href="/orders">Go to My Orders</Link>
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Tip: You can also track order status and view tailoring progress there.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
