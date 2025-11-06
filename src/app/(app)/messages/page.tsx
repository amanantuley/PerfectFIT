'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MessagesRedirectPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4 sm:px-6 py-10 bg-gradient-to-b from-background via-background/80 to-background/50"
    >
      <Card className="w-full max-w-md shadow-2xl border border-border/40 bg-background/70 backdrop-blur-lg text-center rounded-2xl">
        {/* Header */}
        <CardHeader className="space-y-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto bg-primary/10 p-5 rounded-full w-fit shadow-inner"
          >
            <MessageSquare className="h-12 w-12 text-primary" aria-hidden="true" />
          </motion.div>

          <CardTitle className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow leading-tight">
            Contact Your Tailor
          </CardTitle>

          <CardDescription className="text-base sm:text-lg text-muted-foreground max-w-sm mx-auto">
            Need help or have a question about your custom order?  
            Reach out to your tailor directly from your orders panel.
          </CardDescription>
        </CardHeader>

        {/* Content */}
        <CardContent className="pt-4 pb-8 sm:pb-10 px-6 sm:px-8">
          <p className="text-muted-foreground mb-6 leading-relaxed text-sm sm:text-base">
            Conversations are tied to specific orders for faster assistance and accurate updates.
          </p>

          <Button
            asChild
            size="lg"
            className="font-medium w-full sm:w-auto bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 text-white hover:opacity-90 transition-all rounded-xl shadow-md"
          >
            <Link href="/orders">Go to My Orders</Link>
          </Button>

          <p className="text-xs sm:text-sm text-muted-foreground mt-5">
            💡 Tip: You can also track order status and view tailoring progress there.
          </p>
        </CardContent>
      </Card>
    </motion.section>
  );
}
