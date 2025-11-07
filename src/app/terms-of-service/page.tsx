'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FileText, Scale, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function TermsOfServicePage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5 },
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
                <FileText className="h-7 w-7 text-primary" />
              </div>
            </motion.div>

            <div>
              <CardTitle className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text-rainbow">
                Terms of Service
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Last updated: July 29, 2024
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-10 mt-4 prose prose-stone dark:prose-invert max-w-none text-muted-foreground">
          {/* 🧾 Quick Summary */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0}
            className="bg-muted/30 p-5 rounded-lg border border-muted/30 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <Scale className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">At a Glance</h3>
            </div>
            <p className="text-sm">
              These Terms of Service (“Terms”) define your relationship with PerfectFit.  
              In short:
            </p>
            <ul className="text-sm list-disc pl-5 mt-2 space-y-1">
              <li>✅ Create an account with accurate details.</li>
              <li>📏 Our AI measurements are estimates — always verify before purchase.</li>
              <li>🛍️ Purchases follow our Return & Refund Policy.</li>
              <li>🚫 Misuse or violation may result in account suspension.</li>
              <li>⚙️ Terms may be updated, but we’ll always notify you.</li>
            </ul>
          </motion.div>

          {/* Section 1 */}
          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={1}>
            <h3 className="font-bold text-foreground text-xl mb-2">1. Account Registration</h3>
            <p>
              To access certain features, you must create an account. You agree to provide
              accurate and complete information and update it as necessary. You are responsible
              for maintaining the confidentiality of your login credentials and for any activities
              under your account.
            </p>
          </motion.section>

          {/* Section 2 */}
          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={2}>
            <h3 className="font-bold text-foreground text-xl mb-2">2. AI Measurement Service</h3>
            <p>
              Our AI-powered measurement system processes the images you provide to estimate
              your body measurements. By uploading images, you grant PerfectFit a non-exclusive,
              worldwide license to use them solely for delivering accurate sizing and style
              recommendations. Accuracy depends on image quality, environment, and positioning.
            </p>
          </motion.section>

          {/* Section 3 */}
          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={3}>
            <h3 className="font-bold text-foreground text-xl mb-2">3. User Conduct</h3>
            <p>
              You agree not to use our services for unlawful purposes or upload any harmful,
              offensive, or infringing content. Misuse of the platform or attempts to manipulate
              pricing, discounts, or data will result in account termination.
            </p>
          </motion.section>

          {/* Section 4 */}
          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={4}>
            <h3 className="font-bold text-foreground text-xl mb-2">4. Purchases and Rentals</h3>
            <p>
              All transactions through PerfectFit are subject to our Return and Refund Policy.
              Prices and promotions are subject to change without notice. We reserve the right
              to cancel or decline orders for legitimate business or security reasons.
            </p>
          </motion.section>

          {/* Section 5 */}
          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={5}>
            <h3 className="font-bold text-foreground text-xl mb-2">5. Termination</h3>
            <p>
              PerfectFit reserves the right to suspend or terminate your account without notice
              if you violate these Terms or engage in activities that disrupt our services.
              Upon termination, your right to use the Services ceases immediately.
            </p>
          </motion.section>

          {/* Section 6 */}
          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={6}>
            <h3 className="font-bold text-foreground text-xl mb-2">6. Changes to Terms</h3>
            <p>
              We may revise these Terms to reflect updates in our practices or for legal reasons.
              Changes will take effect upon posting. Continued use after updates means you accept
              the new Terms.
            </p>
          </motion.section>

          {/* 🛡️ Compliance Note */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={7}
            className="rounded-lg border border-muted/40 bg-muted/20 p-5 text-sm flex items-start gap-3"
          >
            <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
            <p>
              PerfectFit complies with global e-commerce and privacy regulations. For legal
              inquiries, contact us at{' '}
              <Link
                href="mailto:legal@perfectfit.com"
                className="text-primary hover:underline"
              >
                legal@perfectfit.com
              </Link>.
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
