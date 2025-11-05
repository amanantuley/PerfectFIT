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
import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How does the AI measurement work?",
    answer:
      "Our AI uses advanced computer vision algorithms to analyze your full-body photo. It detects anatomical keypoints to calculate measurements such as chest, waist, and inseam with remarkable accuracy — all without manual measuring. For best results, wear fitted clothing and stand in a well-lit area.",
  },
  {
    question: "Is my photo and data secure?",
    answer:
      "Absolutely. Your privacy is our top priority. Images are processed securely and never stored unless you choose to save them. All data is encrypted in transit and at rest, ensuring full GDPR compliance and user confidentiality.",
  },
  {
    question: "What is the difference between buying and renting?",
    answer:
      "Buying means owning a brand-new, made-to-measure garment. Renting lets you enjoy designer-quality outfits for a specific event — affordable, sustainable, and zero wardrobe clutter. Each rental piece is professionally cleaned and quality-checked before shipping.",
  },
  {
    question: "How accurate are the AI measurements?",
    answer:
      "Our AI model achieves over 95% accuracy, typically within 1.5 cm of professional tailor measurements. Results depend on photo clarity, lighting, and posture. We also offer a free first adjustment to guarantee your Perfect Fit.",
  },
  {
    question: "How long does it take to receive my order?",
    answer:
      "Tailored orders take 7–10 business days for production plus shipping. Rentals can arrive within 2–3 days. You can track progress in real time from your PerfectFit dashboard.",
  },
  {
    question: "How do I return a rented item?",
    answer:
      "Each rental includes prepaid packaging and a return label. After your event, place the item in the provided bag, attach the label, and drop it off at any courier point before the return date — it’s that easy.",
  },
  {
    question: "Do you offer alterations?",
    answer:
      "Yes! We offer a ‘Perfect Fit Guarantee’ with one free alteration for custom purchases. Rentals aren’t eligible for alterations, but our AI sizing ensures a reliable fit from our curated inventory.",
  },
  {
    question: "What are subscription credits?",
    answer:
      "Our Pro and Ultimate plans include monthly rental credits. One credit equals one rental item — a suit, dress, or outfit. Unused credits roll over, so you can redeem them anytime for fresh styles.",
  },
  {
    question: "What if I damage a rented item?",
    answer:
      "Minor wear and tear is covered by our rental insurance. For significant damage or loss, charges are capped at the garment’s retail value. We handle repairs sustainably to extend every item’s life cycle.",
  },
];

export default function FAQPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex justify-center items-start p-4 sm:p-8"
    >
      <Card className="w-full max-w-4xl shadow-xl border border-muted/50">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
            <HelpCircle className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 bg-size-200 animate-text-rainbow">
            Frequently Asked Questions
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Everything you need to know about AI measurements, rentals, and
            subscriptions — all in one place.
          </CardDescription>
        </CardHeader>

        <CardContent className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="border border-muted/40 rounded-lg px-4 py-2 hover:border-primary/40 transition-all duration-300 bg-background/60 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </motion.div>
  );
}
