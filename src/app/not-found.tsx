'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SearchX, ArrowRightCircle } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <motion.div
      className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background via-background/90 to-muted/40 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="relative w-full max-w-md text-center shadow-2xl border border-border/60 backdrop-blur-md bg-background/70 overflow-hidden">
        {/* Animated Gradient Border */}
        <motion.div
          className="absolute inset-0 z-[-1] bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 opacity-20 blur-2xl"
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
        />

        <CardHeader>
          <motion.div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 shadow-inner"
            initial={{ scale: 0.8, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
          >
            <SearchX className="h-12 w-12 text-primary animate-pulse drop-shadow-md" />
          </motion.div>

          <CardTitle className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
            404 — Page Not Found
          </CardTitle>

          <CardDescription className="text-base text-muted-foreground mt-3">
            Oops! The page you’re looking for seems to have been stitched out of existence.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Don’t worry — your PerfectFit experience is still intact.
            Choose where you’d like to go next:
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 150 }}
          >
            <Button
              asChild
              size="lg"
              className="sm:w-auto w-full bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 text-white shadow-lg hover:shadow-xl hover:opacity-90 transition-all"
            >
              <Link href="/">Return to Homepage</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="sm:w-auto w-full transition-all hover:bg-muted/50"
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                Go to Dashboard <ArrowRightCircle className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Suggested Navigation Links */}
          <motion.div
            className="mt-8 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="mb-2 font-semibold text-foreground">Quick Links:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/shop"
                className="hover:text-primary underline underline-offset-4 transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="hover:text-primary underline underline-offset-4 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/support"
                className="hover:text-primary underline underline-offset-4 transition-colors"
              >
                Support
              </Link>
              <Link
                href="/faq"
                className="hover:text-primary underline underline-offset-4 transition-colors"
              >
                FAQs
              </Link>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
