'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ShieldCheck, Lock, ScrollText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
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
      className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-6 bg-gradient-to-b from-background via-background/90 to-background/60"
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
              transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
            >
              <div className="bg-background rounded-md p-3">
                <ShieldCheck className="h-7 w-7 text-primary" />
              </div>
            </motion.div>

            <div>
              <CardTitle className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text-rainbow">
                Privacy Policy
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Last updated: July 29, 2024
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-10 mt-4 prose prose-stone dark:prose-invert max-w-none text-muted-foreground">
          {/* 📜 Quick Summary Section */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0}
            className="bg-muted/30 p-4 rounded-lg border border-muted/30 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <ScrollText className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">At a Glance</h3>
            </div>
            <p className="text-sm">
              PerfectFit values your privacy and ensures your data is secure,
              transparent, and used responsibly. Here’s a summary of what you’ll
              learn below:
            </p>
            <ul className="text-sm list-disc pl-5 mt-2 space-y-1">
              <li>What data we collect and why</li>
              <li>How your data is stored and protected</li>
              <li>Your rights under data protection laws</li>
            </ul>
          </motion.div>

          {/* Section 1 */}
          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={1}>
            <h3 className="font-bold text-foreground text-xl mb-2">1. Information We Collect</h3>
            <p>
              We may collect personal information such as your name, email,
              shipping address, and payment details. We also collect images you
              upload for our <strong>AI Measurement Service</strong>. Additionally,
              non-personal information such as browser type and device data may
              be collected for analytics.
            </p>
          </motion.section>

          {/* Section 2 */}
          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={2}>
            <h3 className="font-bold text-foreground text-xl mb-2">2. How We Use Your Information</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>To provide and enhance our tailoring and delivery services.</li>
              <li>To process transactions securely and manage your orders.</li>
              <li>To improve personalization and customer experience.</li>
              <li>To communicate important updates and promotional offers.</li>
              <li>To train our AI systems to improve measurement accuracy.</li>
            </ul>
          </motion.section>

          {/* Section 3 */}
          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={3}>
            <h3 className="font-bold text-foreground text-xl mb-2">3. Data Security</h3>
            <p>
              We employ administrative, technical, and physical security measures
              to safeguard your information. Although we take reasonable precautions,
              please note that no online platform can guarantee absolute protection
              against breaches or misuse.
            </p>
          </motion.section>

          {/* Section 4 */}
          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={4}>
            <h3 className="font-bold text-foreground text-xl mb-2">4. Data Retention</h3>
            <p>
              We retain your data only as long as necessary to provide our services.
              Images used for measurements are automatically deleted within a
              reasonable timeframe unless you save them explicitly to your profile.
            </p>
          </motion.section>

          {/* Section 5 */}
          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={5}>
            <h3 className="font-bold text-foreground text-xl mb-2">5. Your Privacy Rights</h3>
            <p>
              Depending on your region, you may have the right to request access,
              correction, or deletion of your personal data. You can manage this
              through your account settings or by contacting our support team.
            </p>
          </motion.section>

          {/* Section 6 */}
          <motion.section variants={fadeIn} initial="hidden" animate="visible" custom={6}>
            <h3 className="font-bold text-foreground text-xl mb-2">6. Policy Updates</h3>
            <p>
              We may occasionally update this policy to reflect legal, technical,
              or business changes. Updated policies will be posted on this page with
              the latest revision date.
            </p>
          </motion.section>

          {/* GDPR Footer */}
          <motion.div
            className="rounded-lg border border-muted/40 bg-muted/20 p-4 text-sm flex items-start gap-3"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={7}
          >
            <Lock className="h-5 w-5 text-primary mt-0.5" />
            <p>
              In compliance with <strong>GDPR</strong> and global data laws, we
              uphold your rights to privacy, transparency, and control over your
              data. For deletion or data export requests, contact us at{' '}
              <Link
                href="mailto:support@perfectfit.com"
                className="text-primary hover:underline"
              >
                support@perfectfit.com
              </Link>.
            </p>
          </motion.div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <Button asChild className="bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 text-white shadow-md hover:opacity-90 transition-all">
              <Link href="/">Return to Homepage</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
