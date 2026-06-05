"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SearchX, Home, LayoutDashboard, ShoppingBag, Mail, ArrowLeft, Sparkles, Map, User } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const quickLinks = [
  { icon: Home, label: "Homepage", href: "/", desc: "Return to main page" },
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", desc: "View your account" },
  { icon: ShoppingBag, label: "Shop", href: "/dashboard", desc: "Browse products" },
  { icon: Mail, label: "Contact", href: "/contact", desc: "Get help" },
];

const suggestions = [
  "The page may have been moved or deleted",
  "Check the URL for typos",
  "Try searching from the homepage",
  "Browse our popular sections below"
];

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="relative container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        {/* Back navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-5xl mb-6"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Main 404 Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl"
        >
          <Card className="border-border/50 shadow-2xl backdrop-blur-md overflow-hidden">
            <CardContent className="p-8 sm:p-12 lg:p-16">
              <div className="text-center space-y-8">
                {/* Animated Icon */}
                <motion.div
                  animate={floatingAnimation as any}
                  className="relative inline-block"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 rounded-full blur-2xl opacity-30"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />
                  <div className="relative bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 p-1 rounded-full">
                    <div className="bg-background rounded-full p-6 sm:p-8">
                      <SearchX className="h-16 w-16 sm:h-20 sm:w-20 text-primary" />
                    </div>
                  </div>
                </motion.div>

                {/* 404 Text */}
                <div className="space-y-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-7xl sm:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500"
                  >
                    404
                  </motion.h1>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold"
                  >
                    Page Not Found
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
                  >
                    Oops! The page you&apos;re looking for seems to have been stitched out of existence. Don&apos;t worry, we&apos;ll help you find your way back.
                  </motion.p>
                </div>

                {/* Suggestions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-muted/30 rounded-xl p-6 max-w-2xl mx-auto"
                >
                  <div className="flex items-center gap-2 mb-4 justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">What might have happened?</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground text-left max-w-lg mx-auto">
                    {suggestions.map((suggestion, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-primary mt-0.5">•</span>
                        <span>{suggestion}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Quick Links Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="pt-4"
                >
                  <div className="flex items-center gap-2 mb-6 justify-center">
                    <Map className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Quick Navigation</h3>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
                    {quickLinks.map((link, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + i * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <Link href={link.href}>
                          <Card className="h-full p-4 sm:p-5 text-center hover:shadow-lg transition-all border-border/50 cursor-pointer group">
                            <link.icon className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                            <h4 className="font-semibold text-sm mb-1">{link.label}</h4>
                            <p className="text-xs text-muted-foreground hidden sm:block">{link.desc}</p>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Main CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-6 max-w-md mx-auto"
                >
                  <Button asChild size="lg" className="bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 hover:opacity-90 w-full sm:w-auto">
                    <Link href="/" className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      Return to Homepage
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Go to Dashboard
                    </Link>
                  </Button>
                </motion.div>

                {/* Help text */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="text-xs text-muted-foreground pt-4"
                >
                  Need assistance? <Link href="/contact" className="text-primary hover:underline">Contact our support team</Link>
                </motion.p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Error Code */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-muted-foreground">
            Error Code: 404 • Not Found • PerfectFit
          </p>
        </motion.div>
      </div>
    </div>
  );
}
