'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function WalletPage() {
  return (
    <motion.div
      className="flex justify-center items-center min-h-[calc(100vh-180px)] animate-fade-in-up"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-xl border border-muted/40 bg-background/60 backdrop-blur-md text-center w-full max-w-md">
        <CardHeader>
          <motion.div
            className="mx-auto bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 p-[3px] rounded-full mb-4"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
          >
            <div className="bg-background rounded-full p-4">
              <Wallet className="h-12 w-12 text-primary" />
            </div>
          </motion.div>

          <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
            PerfectPay Wallet
          </CardTitle>

          <CardDescription className="text-lg text-muted-foreground">
            Your personalized payment hub — coming soon!
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <motion.p
            className="text-muted-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            We're crafting a <strong>seamless one-click payment experience</strong> 
            with integrated <strong>cashback rewards</strong>, 
            <strong>secure transactions</strong>, and <strong>AI-powered spend insights</strong>.
            Get ready to manage all your payments in one elegant dashboard.
          </motion.p>

          <motion.div
            className="flex justify-center mt-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
          >
            <Button disabled className="flex items-center gap-2 cursor-not-allowed bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 text-white shadow-lg opacity-70">
              <Sparkles className="h-4 w-4" />
              Coming Soon
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
