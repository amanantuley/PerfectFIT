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
import { HelpCircle, ChevronDown, Search } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState, useMemo } from "react";
import Link from "next/link";

const faqs = [
  {
    question: "How does the AI measurement work?",
    answer:
      "Our AI uses computer vision to analyze your full-body photo. It identifies anatomical points to calculate measurements like chest, waist, and inseam with precision. For best results, wear fitted clothing and stand in bright, even lighting.",
  },
  {
    question: "Is my photo and data secure?",
    answer:
      "Yes — all your data is encrypted and processed securely. Photos are never stored unless you choose to save them. We comply fully with GDPR and prioritize user privacy at every step.",
  },
  {
    question: "What’s the difference between buying and renting?",
    answer:
      "Buying gives you a brand-new, made-to-measure outfit. Renting offers designer-quality attire for one-time events — sustainable, affordable, and hassle-free. Every rental is cleaned and quality-checked before delivery.",
  },
  {
    question: "How accurate are the AI measurements?",
    answer:
      "Our AI achieves over 95% accuracy — typically within 1.5 cm of professional tailor results. Accuracy depends on lighting and posture, but our PerfectFit Guarantee covers free adjustments if needed.",
  },
  {
    question: "How long will my order take?",
    answer:
      "Custom orders take 7–10 business days plus shipping. Rental orders arrive within 2–3 days, and you can track everything in your PerfectFit dashboard.",
  },
  {
    question: "Can I return a rented item?",
    answer:
      "Yes! Each rental includes a prepaid return kit. Simply place the garment in the provided bag and drop it off before your return date.",
  },
  {
    question: "Do you offer alterations?",
    answer:
      "Yes — one free alteration is included for custom purchases. Rentals can’t be altered, but our AI ensures a precise fit every time.",
  },
  {
    question: "What are subscription credits?",
    answer:
      "Pro and Ultimate members receive monthly rental credits. One credit = one rental. Unused credits roll over automatically, so you never lose value.",
  },
  {
    question: "What happens if I damage a rented outfit?",
    answer:
      "Minor wear and tear is covered by our rental protection. In case of major damage or loss, charges are capped at the garment’s retail value. We handle all repairs responsibly.",
  },
];

export default function FAQPage() {
  const [query, setQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) =>
      faq.question.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

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

        {/* Search Bar */}
        <div className="relative px-6 sm:px-12 mt-4 mb-6">
          <Search className="absolute left-8 top-3 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search for a question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 text-sm sm:text-base focus-visible:ring-primary"
            aria-label="Search FAQs"
          />
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
                    <AccordionTrigger className="flex justify-between items-center text-left font-semibold text-foreground hover:text-primary px-4 py-4 sm:px-6 sm:py-5 text-base sm:text-lg transition-colors focus:outline-none">
                      <span>{faq.question}</span>
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
        <div className="border-t border-border/40 py-8 text-center bg-background/40">
          <p className="text-sm sm:text-base text-muted-foreground">
            Still need help?{" "}
            <Link
              href="/contact"
              className="text-primary hover:underline font-semibold"
            >
              Contact our support team
            </Link>
            .
          </p>
        </div>
      </Card>
    </motion.section>
  );
}
