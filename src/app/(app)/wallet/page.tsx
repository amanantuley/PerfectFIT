'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, Sparkles, Coins, ShieldCheck, LineChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function WalletPage() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] space-y-10 animate-fade-in-up"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* 🪙 Wallet Header Card */}
      <Card className="shadow-2xl border border-muted/40 bg-background/60 backdrop-blur-md text-center w-full max-w-lg">
        <CardHeader>
          <motion.div
            className="mx-auto bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 p-[3px] rounded-full mb-4"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
          >
            <div className="bg-background rounded-full p-4">
              <Wallet className="h-12 w-12 text-primary drop-shadow-md" />
            </div>
          </motion.div>

          <CardTitle className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text-rainbow">
            PerfectPay Wallet
          </CardTitle>

          <CardDescription className="text-lg text-muted-foreground">
            Your intelligent, secure, and rewarding way to pay.
          </CardDescription>
        </CardHeader>

        {/* Wallet Balance Preview */}
        <CardContent className="space-y-6">
          <motion.div
            className="bg-gradient-to-r from-fuchsia-500/10 via-purple-500/10 to-sky-500/10 border border-muted rounded-2xl py-5 px-6 shadow-inner"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-sm text-muted-foreground">Wallet Balance</p>
            <motion.h3
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              ₹0.00
            </motion.h3>
            <p className="text-xs text-muted-foreground mt-1">Cashback & rewards coming soon</p>
          </motion.div>

          {/* Teaser Description */}
          <motion.p
            className="text-muted-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            PerfectPay will redefine how you manage money — a <strong>one-tap payment system</strong> with
            <strong> instant cashback</strong>, <strong>AI-driven insights</strong>, and
            <strong> next-gen security</strong>. A smarter, smoother, and more stylish way to pay.
          </motion.p>

          {/* Feature Highlights */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {[
              {
                icon: Coins,
                title: 'Cashback Rewards',
                desc: 'Earn instant cashback on every transaction.',
              },
              {
                icon: LineChart,
                title: 'Smart Analytics',
                desc: 'AI-powered insights into your spending patterns.',
              },
              {
                icon: ShieldCheck,
                title: 'Secure Payments',
                desc: 'Protected by advanced encryption and tokenization.',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Card className="bg-muted/30 border border-muted/30 hover:border-primary/40 transition-all text-center shadow-md hover:shadow-xl backdrop-blur-sm rounded-xl p-4 space-y-2">
                  <feature.icon className="h-8 w-8 text-primary mx-auto" />
                  <p className="font-semibold">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="flex justify-center mt-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
          >
            <Button
              disabled
              className="flex items-center gap-2 bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 text-white shadow-lg cursor-not-allowed opacity-75 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <Sparkles className="h-4 w-4" />
              Coming Soon
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
