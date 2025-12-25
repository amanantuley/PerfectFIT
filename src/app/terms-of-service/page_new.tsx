'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FileText, Scale, ShieldCheck, CheckCircle2, Info, ArrowLeft,
  Users, ShoppingBag, Image as ImageIcon, AlertTriangle,
  Lock, Globe, HelpCircle, ChevronRight, Building
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';

const highlights = [
  { icon: Users, title: 'Fair Usage', desc: 'Clear account rules' },
  { icon: ShieldCheck, title: 'Your Protection', desc: 'Security & privacy' },
  { icon: Scale, title: 'Transparent Terms', desc: 'No hidden clauses' },
  { icon: Globe, title: 'Global Standards', desc: 'International compliance' },
];

const userRights = [
  { icon: CheckCircle2, title: 'Account Access', desc: 'Full control over your profile and data' },
  { icon: Lock, title: 'Privacy Control', desc: 'Manage your preferences anytime' },
  { icon: ShoppingBag, title: 'Fair Transactions', desc: 'Protected under our policies' },
  { icon: AlertTriangle, title: 'Dispute Resolution', desc: 'Contact support for any issues' },
];

const responsibilities = [
  'Provide accurate account information',
  'Keep login credentials secure',
  'Comply with acceptable use policies',
  'Report violations or security concerns',
  'Review updates to these Terms',
];

const restrictions = [
  'Impersonate others or create fake accounts',
  'Upload harmful, offensive, or illegal content',
  'Manipulate pricing, discounts, or AI measurements',
  'Scrape, crawl, or access without authorization',
  'Resell services without written permission',
];

export default function TermsOfServicePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <main className="container mx-auto px-4 py-6 sm:py-10 lg:py-14 max-w-6xl">
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
                <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              </div>
            </motion.div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500">
                Terms of Service
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="text-xs">
                  <Scale className="h-3 w-3 mr-1" />
                  Legally Binding
                </Badge>
                <p className="text-xs sm:text-sm text-muted-foreground">Last updated: December 25, 2025</p>
              </div>
            </div>
          </div>
        </motion.div>

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
                  <TabsTrigger value="user" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                    <Users className="h-4 w-4 mr-1.5" />
                    <span className="hidden sm:inline">User Agreement</span>
                    <span className="sm:hidden">Users</span>
                  </TabsTrigger>
                  <TabsTrigger value="service" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                    <ShoppingBag className="h-4 w-4 mr-1.5" />
                    <span className="hidden sm:inline">Service Terms</span>
                    <span className="sm:hidden">Service</span>
                  </TabsTrigger>
                  <TabsTrigger value="legal" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                    <Scale className="h-4 w-4 mr-1.5" />
                    <span className="hidden sm:inline">Legal</span>
                    <span className="sm:hidden">Legal</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="p-4 sm:p-6 lg:p-8 space-y-6">
                <div className="bg-gradient-to-br from-teal-500/10 via-purple-500/10 to-orange-500/10 p-4 sm:p-6 rounded-xl border border-border/50">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg mb-2">At a Glance</h3>
                      <p className="text-sm text-muted-foreground mb-4">These Terms define your legal relationship with PerfectFit. By using our services, you agree to:</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /><span>Provide accurate account information</span></li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /><span>Understand AI measurements are estimates</span></li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /><span>Follow our acceptable use policies</span></li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /><span>Respect intellectual property rights</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {userRights.map((r, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                      <Card className="p-4 h-full hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0"><r.icon className="h-4 w-4 text-primary" /></div>
                          <div>
                            <h4 className="font-semibold text-sm mb-1">{r.title}</h4>
                            <p className="text-xs text-muted-foreground">{r.desc}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="user" className="p-4 sm:p-6 lg:p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-4 sm:p-5">
                    <h4 className="font-semibold mb-3 text-sm flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" />Your Responsibilities</h4>
                    <ul className="space-y-2 text-xs">
                      {responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2"><ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /><span className="text-muted-foreground">{r}</span></li>
                      ))}
                    </ul>
                  </Card>
                  <Card className="p-4 sm:p-5">
                    <h4 className="font-semibold mb-3 text-sm flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-primary" />Prohibited Activities</h4>
                    <ul className="space-y-2 text-xs">
                      {restrictions.map((r, i) => (
                        <li key={i} className="flex items-start gap-2"><ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /><span className="text-muted-foreground">{r}</span></li>
                      ))}
                    </ul>
                  </Card>
                </div>

                <Card className="p-4 sm:p-5 bg-muted/30 border-border/50">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm"><Lock className="h-5 w-5 text-primary" />Account Security</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">You are responsible for keeping your login credentials secure. Never share your password, and notify us immediately if you suspect unauthorized access.</p>
                </Card>
              </TabsContent>

              <TabsContent value="service" className="p-4 sm:p-6 lg:p-8">
                <Accordion type="single" collapsible className="space-y-3">
                  <AccordionItem value="item-1" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left font-semibold hover:text-primary text-sm">1. AI Measurement Service</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-xs sm:text-sm">
                      <p>Our AI processes uploaded images to estimate body measurements. Accuracy depends on image quality, lighting, and positioning. By uploading images, you grant PerfectFit a non-exclusive license to use them solely for sizing and recommendations. Images are auto-deleted within 30 days.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left font-semibold hover:text-primary text-sm">2. Purchases and Rentals</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-xs sm:text-sm">
                      <p>All transactions are subject to our Return & Refund Policy. Prices and promotions may change without notice. We reserve the right to cancel or decline orders for business or security reasons.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left font-semibold hover:text-primary text-sm">3. Tailoring Services</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-xs sm:text-sm">
                      <p>Tailors operate independently and are responsible for the quality of their work. PerfectFit facilitates connections but does not guarantee workmanship. We offer one free alteration on custom items within 7 days.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left font-semibold hover:text-primary text-sm">4. Service Availability</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-xs sm:text-sm">
                      <p>We strive for 24/7 availability but do not guarantee uninterrupted service. Maintenance, updates, or technical issues may cause temporary downtime.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              <TabsContent value="legal" className="p-4 sm:p-6 lg:p-8 space-y-6">
                <Card className="p-4 sm:p-5 border-l-4 border-l-teal-500">
                  <h4 className="font-semibold mb-2 text-sm">Intellectual Property</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">All content, logos, and trademarks are owned by PerfectFit or its licensors. You may not reproduce, distribute, or create derivative works without written permission.</p>
                </Card>
                <Card className="p-4 sm:p-5 border-l-4 border-l-purple-500">
                  <h4 className="font-semibold mb-2 text-sm">Limitation of Liability</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">PerfectFit is not liable for indirect, incidental, or consequential damages arising from your use of our services. Our total liability is limited to the amount you paid in the past 12 months.</p>
                </Card>
                <Card className="p-4 sm:p-5 border-l-4 border-l-orange-500">
                  <h4 className="font-semibold mb-2 text-sm">Termination</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">We may suspend or terminate your account for violations of these Terms. Upon termination, your right to use our services ceases immediately.</p>
                </Card>
                <Card className="p-4 sm:p-5 border-l-4 border-l-blue-500">
                  <h4 className="font-semibold mb-2 text-sm">Changes to Terms</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">We may update these Terms to reflect legal or business changes. Updates take effect upon posting. Continued use indicates acceptance of new Terms.</p>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 sm:mt-12">
          <Card className="p-6 sm:p-8 bg-gradient-to-br from-teal-500/5 via-purple-500/5 to-orange-500/5 border-border/50">
            <div className="text-center space-y-6">
              <div className="inline-flex p-3 bg-primary/10 rounded-full"><Building className="h-6 w-6 sm:h-8 sm:w-8 text-primary" /></div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold">Questions About These Terms?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">Our legal team is available to clarify any terms or conditions. We're committed to transparency and compliance.</p>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4">
                <Card className="p-4 text-center hover:shadow-lg transition-shadow"><h4 className="font-semibold mb-1 text-xs">Legal Team</h4><a href="mailto:legal@perfectfit.com" className="text-xs text-primary hover:underline break-all">legal@perfectfit.com</a></Card>
                <Card className="p-4 text-center hover:shadow-lg transition-shadow"><h4 className="font-semibold mb-1 text-xs">Support</h4><Link href="/contact" className="text-xs text-primary hover:underline">Help Center</Link></Card>
                <Card className="p-4 text-center hover:shadow-lg transition-shadow"><h4 className="font-semibold mb-1 text-xs">Privacy</h4><Link href="/privacy-policy" className="text-xs text-primary hover:underline">View Policy</Link></Card>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Button asChild size="lg" className="bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 hover:opacity-90"><Link href="/">Return to Homepage</Link></Button>
                <Button asChild variant="outline" size="lg"><Link href="/return-policy">View Return Policy</Link></Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
