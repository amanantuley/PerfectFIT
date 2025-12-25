'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Undo, PackageCheck, AlertTriangle, RefreshCcw, PhoneCall,
  Truck, CreditCard, Store, ShieldCheck, Clock, Calendar,
  MapPin, HelpCircle, ChevronRight, CheckCircle2, ArrowLeft, Info
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';

const highlights = [
  { icon: RefreshCcw, title: 'Hassle‑free Returns', desc: 'Simple process in minutes' },
  { icon: Clock, title: '30‑Day Window', desc: 'From delivery date' },
  { icon: CreditCard, title: 'Fast Refunds', desc: '5–7 business days' },
  { icon: PackageCheck, title: 'Free Exchanges', desc: 'On eligible items' },
];

const steps = [
  { icon: Store, title: 'Start Request', desc: 'Go to Orders → Start a return' },
  { icon: PackageCheck, title: 'Pack Item', desc: 'Use original or secure packaging' },
  { icon: Truck, title: 'Ship/Drop‑off', desc: 'Use prepaid label or drop location' },
  { icon: CreditCard, title: 'Get Refund', desc: 'Processed after inspection' },
];

const eligibility = [
  'Unworn, unwashed, and undamaged items',
  'All tags and accessories attached',
  'Return started within 30 days of delivery',
  'Proof of purchase available',
];

const nonReturnable = [
  'Custom‑made or altered garments after use',
  'Final‑sale or clearance items',
  'Gift cards and store credit top‑ups',
  'Hygiene‑sensitive items (e.g., undergarments)',
];

const faqs = [
  { q: 'How long do refunds take?', a: 'Refunds are issued 5–7 business days after the returned item passes inspection. Your bank may take additional time to post the funds.' },
  { q: 'Are shipping fees refunded?', a: 'Original shipping fees are non‑refundable unless the return is due to an error on our part (e.g., damaged or incorrect item).' },
  { q: 'Can I exchange sizes?', a: 'Yes. Eligible items can be exchanged for a different size or color at no extra cost within the 30‑day window.' },
  { q: 'What about rentals?', a: 'Rental items must be returned by the due date using the prepaid label provided. Late returns may incur additional fees.' },
];

export default function ReturnPolicyPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <main className="container mx-auto px-4 py-6 sm:py-10 lg:py-14 max-w-6xl">
        {/* Header */}
        <motion.div style={{ opacity, scale }} className="mb-6 sm:mb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <motion.div
              className="bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 p-[3px] rounded-xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div className="bg-background rounded-lg p-3 sm:p-4">
                <Undo className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              </div>
            </motion.div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500">
                Return & Refund Policy
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="text-xs">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  Easy Returns
                </Badge>
                <p className="text-xs sm:text-sm text-muted-foreground">Last updated: December 25, 2025</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6 sm:mb-10">
          {highlights.map((h, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.05 }}>
              <Card className="p-3 sm:p-4 text-center hover:shadow-lg transition-all border-border/50 h-full">
                <h.icon className="h-6 w-6 sm:h-7 sm:w-7 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold text-xs mb-1">{h.title}</h3>
                <p className="text-xs text-muted-foreground hidden sm:block">{h.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Content */}
        <Card className="shadow-2xl border-border/50 backdrop-blur-md">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b border-border/50 px-4 sm:px-6 overflow-x-auto">
                <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-0 gap-2 sm:gap-4 flex-nowrap">
                  <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                    <Info className="h-4 w-4 mr-1.5" />
                    <span className="hidden sm:inline">Overview</span>
                    <span className="sm:hidden">Info</span>
                  </TabsTrigger>
                  <TabsTrigger value="process" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                    <RefreshCcw className="h-4 w-4 mr-1.5" />
                    <span className="hidden sm:inline">How it works</span>
                    <span className="sm:hidden">Process</span>
                  </TabsTrigger>
                  <TabsTrigger value="eligibility" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                    <ShieldCheck className="h-4 w-4 mr-1.5" />
                    <span className="hidden sm:inline">Eligibility</span>
                    <span className="sm:hidden">Rules</span>
                  </TabsTrigger>
                  <TabsTrigger value="faqs" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                    <HelpCircle className="h-4 w-4 mr-1.5" />
                    <span className="hidden sm:inline">FAQs</span>
                    <span className="sm:hidden">FAQs</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Overview */}
              <TabsContent value="overview" className="p-4 sm:p-6 lg:p-8 space-y-6">
                <div className="bg-gradient-to-br from-teal-500/10 via-purple-500/10 to-orange-500/10 p-4 sm:p-6 rounded-xl border border-border/50">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg mb-2">At a Glance</h3>
                      <p className="text-sm text-muted-foreground mb-4">We make returns fast and fair: 30‑day window, free exchanges, quick refunds once items pass inspection.</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /><span>Returns accepted for 30 days from delivery</span></li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /><span>Refunds to original payment method</span></li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /><span>One free alteration on tailored items</span></li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /><span>Prepaid label for rentals</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="p-4 border-l-4 border-l-teal-500 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold mb-2 text-sm">Damaged or Incorrect</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Report within 48 hours of delivery; we’ll replace or refund including shipping.</p>
                  </Card>
                  <Card className="p-4 border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold mb-2 text-sm">Refund Timing</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Most refunds complete within 5–7 business days after inspection.</p>
                  </Card>
                </div>
              </TabsContent>

              {/* Process */}
              <TabsContent value="process" className="p-4 sm:p-6 lg:p-8 space-y-6">
                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                  {steps.map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                      <Card className="p-4 h-full hover:shadow-lg transition-all">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-primary/10 rounded-lg"><s.icon className="h-5 w-5 text-primary" /></div>
                          <h4 className="font-semibold text-sm">{s.title}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">{s.desc}</p>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <Card className="p-4 sm:p-5 bg-muted/30 border-border/50">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm"><Calendar className="h-5 w-5 text-primary" />Return Window</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Returns must be initiated within 30 days of delivery. Rental due dates are shown in your order details.</p>
                </Card>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg" className="bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 hover:opacity-90"><Link href="/orders">Start a Return</Link></Button>
                  <Button asChild variant="outline" size="lg"><Link href="/contact">Contact Support</Link></Button>
                </div>
              </TabsContent>

              {/* Eligibility */}
              <TabsContent value="eligibility" className="p-4 sm:p-6 lg:p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-4 sm:p-5">
                    <h4 className="font-semibold mb-3 text-sm flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" />Eligible for Return</h4>
                    <ul className="space-y-2 text-xs">
                      {eligibility.map((e, i) => (
                        <li key={i} className="flex items-start gap-2"><ChevronRight className="h-4 w-4 text-primary mt-0.5" /><span className="text-muted-foreground">{e}</span></li>
                      ))}
                    </ul>
                  </Card>
                  <Card className="p-4 sm:p-5">
                    <h4 className="font-semibold mb-3 text-sm flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-primary" />Not Eligible</h4>
                    <ul className="space-y-2 text-xs">
                      {nonReturnable.map((e, i) => (
                        <li key={i} className="flex items-start gap-2"><ChevronRight className="h-4 w-4 text-primary mt-0.5" /><span className="text-muted-foreground">{e}</span></li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </TabsContent>

              {/* FAQs */}
              <TabsContent value="faqs" className="p-4 sm:p-6 lg:p-8">
                <Accordion type="single" collapsible className="space-y-3">
                  {faqs.map((f, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left font-semibold hover:text-primary text-sm">{f.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-xs sm:text-sm">{f.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 sm:mt-12">
          <Card className="p-6 sm:p-8 bg-gradient-to-br from-teal-500/5 via-purple-500/5 to-orange-500/5 border-border/50">
            <div className="text-center space-y-6">
              <div className="inline-flex p-3 bg-primary/10 rounded-full"><PhoneCall className="h-6 w-6 sm:h-8 sm:w-8 text-primary" /></div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold">Need help with a return?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">Our support team can assist with labels, timelines, or eligibility. We’re here to help.</p>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4">
                <Card className="p-4 text-center hover:shadow-lg transition-shadow"><h4 className="font-semibold mb-1 text-xs">Email</h4><a href="mailto:support@perfectfit.com" className="text-xs text-primary hover:underline break-all">support@perfectfit.com</a></Card>
                <Card className="p-4 text-center hover:shadow-lg transition-shadow"><h4 className="font-semibold mb-1 text-xs">Support</h4><Link href="/contact" className="text-xs text-primary hover:underline">Help Center</Link></Card>
                <Card className="p-4 text-center hover:shadow-lg transition-shadow"><h4 className="font-semibold mb-1 text-xs">Orders</h4><Link href="/orders" className="text-xs text-primary hover:underline">Track & Manage</Link></Card>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Button asChild size="lg" className="bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 hover:opacity-90"><Link href="/">Return to Homepage</Link></Button>
                <Button asChild variant="outline" size="lg"><Link href="/faq">Read FAQs</Link></Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
