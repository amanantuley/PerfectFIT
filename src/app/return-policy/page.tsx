'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Undo, PackageCheck, AlertTriangle, RefreshCcw, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function ReturnPolicyPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6 },
    }),
  };

  return (
    <motion.div
      className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-6 bg-gradient-to-b from-background via-background/95 to-background/70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="w-full max-w-4xl shadow-2xl border border-muted/40 backdrop-blur-md animate-fade-in-up">
        <CardHeader className="space-y-2 border-b border-muted/30 pb-4">
          <div className="flex items-center gap-4">
            <motion.div
              className="bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 p-[3px] rounded-lg"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
            >
              <div className="bg-background rounded-md p-3">
                <Undo className="h-7 w-7 text-primary" />
              </div>
            </motion.div>
            <div>
              <CardTitle className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text-rainbow">
                Return & Refund Policy
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Last updated: July 29, 2024
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-10 mt-4 prose prose-stone dark:prose-invert max-w-none text-muted-foreground">
          {/* 🪙 Quick Summary */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0}
            className="bg-muted/30 p-5 rounded-lg border border-muted/30 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <RefreshCcw className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">At a Glance</h3>
            </div>
            <p className="text-sm">
              We want you to be fully satisfied with your PerfectFit experience. Below is an overview of what’s covered:
            </p>
            <ul className="text-sm list-disc pl-5 mt-2 space-y-1">
              <li>✅ Returns accepted within <strong>30 days</strong> of delivery</li>
              <li>🚚 Free prepaid label for rental returns</li>
              <li>💸 Full refunds for eligible items within <strong>5–7 business days</strong></li>
              <li>🧵 One free alteration for tailored items</li>
            </ul>
          </motion.div>

          {/* Section 1 */}
          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={1}>
            <h3 className="font-bold text-foreground text-xl mb-2">1. Initiating a Return</h3>
            <p>
              To start a return, log into your account and visit the <strong>"My Orders"</strong> page. Select the item you wish to return and follow the on-screen steps.  
              For guest checkouts, please contact our customer support team and provide your order number.
            </p>
          </motion.section>

          {/* Section 2 */}
          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={2}>
            <h3 className="font-bold text-foreground text-xl mb-2">2. Rental Returns</h3>
            <p>
              All rental items must be returned on or before the return date.  
              A <strong>prepaid shipping label</strong> will be included with your order.  
              Simply repack your garment and drop it off at the nearest courier center.  
              Late returns may incur additional fees.
            </p>
          </motion.section>

          {/* Section 3 */}
          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={3}>
            <h3 className="font-bold text-foreground text-xl mb-2">3. Damaged or Incorrect Items</h3>
            <p>
              If you receive a damaged or incorrect product, please contact support within <strong>48 hours</strong> of delivery.  
              Attach a photo of the issue, and our team will assist with a replacement or a full refund, including shipping.
            </p>
          </motion.section>

          {/* Section 4 */}
          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={4}>
            <h3 className="font-bold text-foreground text-xl mb-2">4. Refund Process</h3>
            <p>
              Once your item has been received and inspected, your refund will be issued to your original payment method within <strong>5–7 business days</strong>.  
              You’ll receive a confirmation email when your refund is processed. Please note that original shipping fees are <strong>non-refundable</strong>.
            </p>
          </motion.section>

          {/* Section 5 */}
          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={5}>
            <h3 className="font-bold text-foreground text-xl mb-2">5. Non-Returnable Items</h3>
            <p>
              Custom-made garments tailored specifically for you are <strong>non-returnable</strong>.  
              However, we offer <strong>one free alteration</strong> if there is a fitting issue within 7 days of delivery.
            </p>
          </motion.section>

          {/* Help Section */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={6}
            className="rounded-lg border border-muted/40 bg-muted/20 p-5 text-sm flex items-start gap-3"
          >
            <PhoneCall className="h-5 w-5 text-primary mt-0.5" />
            <p>
              Need help with a return or refund? Contact our friendly support team at{' '}
              <Link
                href="mailto:support@perfectfit.com"
                className="text-primary hover:underline"
              >
                support@perfectfit.com
              </Link>{' '}
              or reach out via the in-app chat.
            </p>
          </motion.div>

          {/* Return Button */}
          <div className="mt-10 text-center">
            <Button
              asChild
              className="bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 text-white shadow-md hover:opacity-90 transition-all"
            >
              <Link href="/">Return to Homepage</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
