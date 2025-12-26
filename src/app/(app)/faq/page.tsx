"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { HelpCircle, ChevronDown, Search, MessageCircle, Zap, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import React, { useState, useMemo } from "react";
import Link from "next/link";

type FaqCategory = 'sizing' | 'privacy' | 'orders' | 'rental';
type FaqItem = { question: string; answer: string; category: FaqCategory; summary?: string };

const CATEGORY_INFO: Record<FaqCategory, { label: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }> = {
  sizing: { label: 'AI & Sizing', icon: Zap },
  privacy: { label: 'Security & Privacy', icon: ShieldCheck },
  orders: { label: 'Orders & Delivery', icon: Truck },
  rental: { label: 'Rentals', icon: MessageCircle },
};

const faqs: FaqItem[] = [
  {
    category: 'sizing',
    question: "How does the AI measurement work?",
    summary: "Computer vision + anatomical mapping for millimeter-level precision",
    answer:
      "Our AI uses computer vision to analyze your full-body photo. It identifies anatomical points to calculate measurements like chest, waist, and inseam with precision. For best results, wear fitted clothing and stand in bright, even lighting.",
  },
  {
    category: 'privacy',
    question: "Is my photo and data secure?",
    summary: "GDPR-compliant encryption; no photo storage without consent",
    answer:
      "Yes — all your data is encrypted and processed securely. Photos are never stored unless you choose to save them. We comply fully with GDPR and prioritize user privacy at every step.",
  },
  {
    category: 'rental',
    question: "What's the difference between buying and renting?",
    summary: "Buy = made-to-order luxury; Rent = designer access for events",
    answer:
      "Buying gives you a brand-new, made-to-measure outfit. Renting offers designer-quality attire for one-time events — sustainable, affordable, and hassle-free. Every rental is cleaned and quality-checked before delivery.",
  },
  {
    category: 'sizing',
    question: "How accurate are the AI measurements?",
    summary: "95%+ accuracy (±1.5cm) with free alterations if needed",
    answer:
      "Our AI achieves over 95% accuracy — typically within 1.5 cm of professional tailor results. Accuracy depends on lighting and posture, but our PerfectFit Guarantee covers free adjustments if needed.",
  },
  {
    category: 'orders',
    question: "How long will my order take?",
    summary: "Custom 7–10 days | Rental 2–3 days | Real-time dashboard tracking",
    answer:
      "Custom orders take 7–10 business days plus shipping. Rental orders arrive within 2–3 days, and you can track everything in your PerfectFit dashboard.",
  },
  {
    category: 'rental',
    question: "Can I return a rented item?",
    summary: "Prepaid returns • Drop-off anywhere • Hassle-free process",
    answer:
      "Yes! Each rental includes a prepaid return kit. Simply place the garment in the provided bag and drop it off before your return date.",
  },
  {
    category: 'orders',
    question: "Do you offer alterations?",
    summary: "1 free alteration per purchase | Rentals have guaranteed fit",
    answer:
      "Yes — one free alteration is included for custom purchases. Rentals can’t be altered, but our AI ensures a precise fit every time.",
  },
  {
    category: 'rental',
    question: "What are subscription credits?",
    summary: "Monthly credits roll over | 1 credit = 1 rental | Never expires",
    answer:
      "Pro and Ultimate members receive monthly rental credits. One credit = one rental. Unused credits roll over automatically, so you never lose value.",
  },
  {
    category: 'rental',
    question: "What happens if I damage a rented outfit?",
    summary: "Minor wear covered • Major damage capped at retail value",
    answer:
      "Minor wear and tear is covered by our rental protection. In case of major damage or loss, charges are capped at the garment’s retail value. We handle all repairs responsibly.",
  },
];

export default function FAQPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory | 'all'>('all');

  const filteredFaqs = useMemo(() => {
    let results = faqs;
    if (selectedCategory !== 'all') {
      results = results.filter(faq => faq.category === selectedCategory);
    }
    if (query) {
      results = results.filter((faq) =>
        faq.question.toLowerCase().includes(query.toLowerCase()) ||
        faq.answer.toLowerCase().includes(query.toLowerCase())
      );
    }
    return results;
  }, [query, selectedCategory]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex justify-center items-start p-4 sm:p-6 lg:p-10 bg-gradient-to-b from-background via-background/70 to-background/40"
    >
      <Card className="w-full max-w-5xl shadow-2xl border border-border/40 bg-background/70 backdrop-blur-lg rounded-2xl overflow-hidden">
        {/* Header */}
        <CardHeader className="text-center space-y-4 pt-10 px-6 sm:px-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto bg-primary/10 p-4 rounded-full w-fit shadow-inner"
          >
            <HelpCircle className="h-10 w-10 text-primary" />
          </motion.div>

          <CardTitle className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow leading-tight">
            Frequently Asked Questions
          </CardTitle>

          <CardDescription className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Find quick answers to your most common questions — from AI sizing
            to sustainability and shipping.
          </CardDescription>
        </CardHeader>

        {/* Category Tabs */}
        <div className="px-6 sm:px-12 mt-6 mb-4">
          <Tabs defaultValue="all" value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as FaqCategory | 'all')} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 bg-background/40">
              <TabsTrigger value="all" className="text-xs sm:text-sm">All Topics</TabsTrigger>
              {Object.entries(CATEGORY_INFO).map(([key, { label, icon: Icon }]) => (
                <TabsTrigger key={key} value={key} className="text-xs sm:text-sm flex items-center gap-1">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Search Bar */}
        <div className="relative px-6 sm:px-12 mt-4 mb-6">
          <Search className="absolute left-8 top-3 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search questions and answers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 text-sm sm:text-base focus-visible:ring-primary"
            aria-label="Search FAQs"
          />
          {query && <p className="text-xs text-muted-foreground mt-2">Found {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''}</p>}
        </div>

        {/* Accordion Section */}
        <CardContent className="max-w-3xl mx-auto w-full px-4 sm:px-8 pb-12">
          {filteredFaqs.length > 0 ? (
            <Accordion
              type="single"
              collapsible
              className="space-y-3 sm:space-y-5"
            >
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <AccordionItem
                    value={`item-${index + 1}`}
                    className="group border border-border/40 rounded-xl hover:border-primary/40 transition-all duration-300 hover:shadow-md bg-background/60 backdrop-blur-sm"
                  >
                    <AccordionTrigger className="flex justify-between items-start text-left font-semibold text-foreground hover:text-primary px-4 py-4 sm:px-6 sm:py-5 transition-colors focus:outline-none">
                      <div className="flex-1 space-y-1">
                        <p className="text-base sm:text-lg">{faq.question}</p>
                        {faq.summary && <p className="text-xs sm:text-sm text-muted-foreground font-normal">{faq.summary}</p>}
                      </div>
                      <ChevronDown
                        className="w-5 h-5 shrink-0 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform duration-300"
                        aria-hidden="true"
                      />
                    </AccordionTrigger>

                    <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed px-4 sm:px-6 pb-4 sm:pb-6 border-t border-border/30">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground py-10 text-base sm:text-lg"
            >
              No questions found for “{query}”.
            </motion.p>
          )}
        </CardContent>

        {/* Footer */}
        <div className="border-t border-border/40 py-8 px-6 sm:px-12 bg-background/40 space-y-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm sm:text-base text-muted-foreground mb-4">
              Didn't find what you're looking for?
            </p>
            <Button asChild variant="default" size="lg" className="gap-2">
              <Link href="/contact">
                <MessageCircle className="h-4 w-4" />
                Chat with our experts
              </Link>
            </Button>
          </div>
          <div className="text-center text-xs text-muted-foreground space-y-1">
            <p>📞 Response time: 2-4 hours on weekdays | 💬 24/7 AI support available</p>
            <p>We typically answer complex fit & styling questions within 1 business day.</p>
          </div>
        </div>
      </Card>
    </motion.section>
  );
}
