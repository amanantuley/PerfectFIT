'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, MessageCircle, Clock, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MessagesRedirectPage() {
  const FEATURES = [
    { icon: MessageCircle, label: 'Order-Linked', description: 'All messages attached to specific orders for context' },
    { icon: Clock, label: 'Real-Time Updates', description: 'Get instant notifications on tailor responses' },
    { icon: Zap, label: 'Quick Replies', description: 'Pre-built messages for common questions' },
  ];
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-2xl border border-muted/40 bg-gradient-to-br from-primary/10 via-background to-primary/5 p-6 sm:p-8 lg:p-12"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50" />
        <div className="relative space-y-4 max-w-3xl">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-primary/10 p-3 rounded-full"
            >
              <MessageSquare className="h-6 w-6 text-primary" />
            </motion.div>
            <span className="text-xs sm:text-sm px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-muted-foreground font-medium">Direct Communication</span>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500">Tailor Communication Hub</h1>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl">Stay connected with your tailor throughout the entire custom fitting process. Real-time messaging with order context for seamless collaboration.</p>
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            <span className="text-xs px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-muted-foreground flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Secure Chat</span>
            <span className="text-xs px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> Instant Notifications</span>
            <span className="text-xs px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-muted-foreground flex items-center gap-1"><MessageCircle className="h-3 w-3" /> Order-Linked</span>
          </div>
        </div>
      </motion.section>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {/* Left - Info Card */}
        <Card className="lg:col-span-2 shadow-lg border-muted/40 bg-background/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500">How Messaging Works</CardTitle>
            <CardDescription>Access tailor communication directly from your orders</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Steps */}
            <div className="space-y-4">
              {[
                { step: 1, title: 'View Your Orders', desc: 'Navigate to your orders dashboard to see all active and completed tailoring projects.' },
                { step: 2, title: 'Open Order Details', desc: 'Click on any order to see measurements, progress, and the tailor assigned to your project.' },
                { step: 3, title: 'Start Messaging', desc: 'Use the messaging panel within the order to communicate with your tailor in real-time.' },
                { step: 4, title: 'Track Progress', desc: 'Receive updates on tailoring status, fitting schedules, and final delivery notifications.' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start pb-4 border-b border-muted/30 last:border-0">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{item.step}</div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm sm:text-base text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right - Features Card */}
        <Card className="shadow-lg border-muted/40 bg-background/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Key Features</CardTitle>
            <CardDescription>Everything you need</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="flex gap-3 items-start p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors">
                  <Icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm">{feature.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 via-background to-primary/5 p-6 sm:p-8 lg:p-10"
      >
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Ready to Connect?</h2>
            <p className="mt-2 text-muted-foreground">Access your tailor messages through your orders panel. Quick, secure, and context-aware communication.</p>
          </div>

          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 hover:opacity-90 text-white font-medium h-11 px-8 w-full sm:w-auto"
          >
            <Link href="/orders" className="flex items-center justify-center gap-2">
              Go to My Orders
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
            <span>💡 All messages are saved and organized by order</span>
          </p>
        </div>
      </motion.div>

      {/* Trust Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {[
          { icon: ShieldCheck, title: 'Encrypted', description: 'All conversations are encrypted for privacy' },
          { icon: Clock, title: 'Always Available', description: 'Message anytime, notifications 24/7' },
          { icon: MessageCircle, title: 'Organized', description: 'Messages grouped by order for clarity' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card key={idx} className="shadow-md border-muted/40 bg-background/70 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </motion.div>
    </div>
  );
}
