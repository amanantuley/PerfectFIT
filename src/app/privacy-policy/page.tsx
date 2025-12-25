'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { 
  ShieldCheck, Lock, ScrollText, Eye, Database, Users, 
  FileText, Bell, Trash2, Download, Settings, ChevronRight,
  CheckCircle2, Shield, Info, ArrowLeft, Globe
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';

const policyHighlights = [
  { icon: Shield, title: "Bank-Grade Security", description: "Industry-leading encryption" },
  { icon: Eye, title: "Full Transparency", description: "Clear data usage" },
  { icon: Users, title: "Your Rights", description: "Complete control" },
  { icon: Lock, title: "GDPR Compliant", description: "International standards" },
];

const dataCategories = [
  {
    title: "Personal Information",
    icon: Users,
    items: ["Name and contact details", "Email address", "Phone number", "Shipping address", "Payment information"]
  },
  {
    title: "Measurement Data",
    icon: Database,
    items: ["Body measurements", "Uploaded images (auto-deleted)", "Size preferences", "Fit history"]
  },
  {
    title: "Usage Information",
    icon: Eye,
    items: ["Device and browser type", "IP address", "App usage patterns", "Feature interactions"]
  },
  {
    title: "Communication",
    icon: Bell,
    items: ["Email preferences", "Notification settings", "Support history", "Feedback"]
  },
];

const yourRights = [
  { icon: Eye, title: "Access Your Data", description: "Request a copy of all personal data we hold" },
  { icon: Settings, title: "Update Information", description: "Correct or modify your information anytime" },
  { icon: Trash2, title: "Delete Account", description: "Complete deletion from our systems" },
  { icon: Download, title: "Data Portability", description: "Export in machine-readable format" },
  { icon: Bell, title: "Communication Control", description: "Opt-out of marketing emails" },
  { icon: ShieldCheck, title: "Object to Processing", description: "Challenge data usage" },
];

export default function PrivacyPolicyPage() {
  const [activeTab, setActiveTab] = useState("overview");
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
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="bg-background rounded-lg p-3 sm:p-4">
                <ShieldCheck className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              </div>
            </motion.div>
            
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500">
                Privacy Policy
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="text-xs">
                  <Globe className="h-3 w-3 mr-1" />
                  GDPR Compliant
                </Badge>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Last updated: December 25, 2024
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6 sm:mb-10">
          {policyHighlights.map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.05 }}>
              <Card className="p-3 sm:p-4 text-center hover:shadow-lg transition-all border-border/50 h-full">
                <item.icon className="h-6 w-6 sm:h-7 sm:w-7 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold text-xs mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground hidden sm:block">{item.description}</p>
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
                    <ScrollText className="h-4 w-4 mr-1.5" />
                    <span className="hidden sm:inline">Overview</span>
                    <span className="sm:hidden">Info</span>
                  </TabsTrigger>
                  <TabsTrigger value="data" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                    <Database className="h-4 w-4 mr-1.5" />
                    <span className="hidden sm:inline">Data</span>
                    <span className="sm:hidden">Data</span>
                  </TabsTrigger>
                  <TabsTrigger value="rights" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                    <Users className="h-4 w-4 mr-1.5" />
                    <span className="hidden sm:inline">Rights</span>
                    <span className="sm:hidden">Rights</span>
                  </TabsTrigger>
                  <TabsTrigger value="details" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-3 py-3 text-xs sm:text-sm whitespace-nowrap">
                    <FileText className="h-4 w-4 mr-1.5" />
                    <span className="hidden sm:inline">Full</span>
                    <span className="sm:hidden">Full</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="p-4 sm:p-6 lg:p-8 space-y-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="bg-gradient-to-br from-teal-500/10 via-purple-500/10 to-orange-500/10 p-4 sm:p-6 rounded-xl border border-border/50">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg mb-2">At a Glance</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          PerfectFit is committed to protecting your privacy and ensuring transparency in how we collect, use, and safeguard your personal information.
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>We collect only necessary data to provide our services</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>Your data is encrypted and stored securely</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>You have full control over your personal information</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>We comply with GDPR and international privacy laws</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold">Key Points</h3>
                    <div className="grid gap-4">
                      <Card className="p-4 border-l-4 border-l-teal-500 hover:shadow-md transition-shadow">
                        <h4 className="font-semibold mb-2 text-sm">Data Collection</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          We collect personal information, measurement data, and usage analytics to provide tailored fashion recommendations.
                        </p>
                      </Card>
                      <Card className="p-4 border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
                        <h4 className="font-semibold mb-2 text-sm">Data Usage</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Your information helps us process orders, personalize recommendations, and improve AI accuracy.
                        </p>
                      </Card>
                      <Card className="p-4 border-l-4 border-l-orange-500 hover:shadow-md transition-shadow">
                        <h4 className="font-semibold mb-2 text-sm">Data Security</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          We implement bank-grade encryption and regular security audits to protect your data.
                        </p>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="data" className="p-4 sm:p-6 lg:p-8 space-y-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2">What Data We Collect</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      We collect different types of information to provide and improve our services:
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {dataCategories.map((category, index) => (
                      <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                        <Card className="p-4 sm:p-5 h-full hover:shadow-lg transition-shadow">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <category.icon className="h-5 w-5 text-primary" />
                            </div>
                            <h4 className="font-semibold text-sm sm:text-base">{category.title}</h4>
                          </div>
                          <ul className="space-y-2">
                            {category.items.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs">
                                <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <Card className="p-4 sm:p-5 bg-muted/30 border-border/50">
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                      <Lock className="h-5 w-5 text-primary" />
                      Automatic Data Deletion
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Images uploaded for AI measurements are automatically deleted within 30 days unless you choose to save them.
                    </p>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="rights" className="p-4 sm:p-6 lg:p-8 space-y-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2">Your Privacy Rights</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      You have complete control over your personal data:
                    </p>
                  </div>

                  <div className="grid gap-3">
                    {yourRights.map((right, index) => (
                      <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                        <Card className="p-4 hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                              <right.icon className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold mb-1 text-sm">{right.title}</h4>
                              <p className="text-xs text-muted-foreground">{right.description}</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 hidden sm:block" />
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <Card className="p-4 sm:p-5 bg-gradient-to-br from-teal-500/5 to-purple-500/5 border-border/50">
                    <h4 className="font-semibold mb-3 text-sm">How to Exercise Your Rights</h4>
                    <ul className="space-y-2 text-xs">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Manage data in <Link href="/settings" className="text-primary hover:underline">Account Settings</Link></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Email <a href="mailto:privacy@perfectfit.com" className="text-primary hover:underline">privacy@perfectfit.com</a></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Use our <Link href="/contact" className="text-primary hover:underline">Contact Form</Link></span>
                      </li>
                    </ul>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="details" className="p-4 sm:p-6 lg:p-8">
                <Accordion type="single" collapsible className="space-y-3">
                  <AccordionItem value="item-1" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left font-semibold hover:text-primary text-sm">1. Information We Collect</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground space-y-2 text-xs sm:text-sm">
                      <p>We collect personal information (name, email, address, payment details), measurement images (auto-deleted after 30 days), and usage data for analytics.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left font-semibold hover:text-primary text-sm">2. How We Use Your Information</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-xs sm:text-sm">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Process orders and manage transactions</li>
                        <li>Provide personalized recommendations</li>
                        <li>Improve AI measurement accuracy</li>
                        <li>Send updates and promotional offers</li>
                        <li>Enhance user experience</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left font-semibold hover:text-primary text-sm">3. Data Security</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-xs sm:text-sm">
                      <p>We use bank-grade encryption (AES-256), SSL/TLS protocols, regular security audits, and strict access controls to protect your data.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left font-semibold hover:text-primary text-sm">4. Data Retention</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-xs sm:text-sm">
                      <p>We retain data only as long as necessary. Account data while active, images auto-deleted in 30 days, transactions for 7 years (legal), analytics anonymized after 2 years.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left font-semibold hover:text-primary text-sm">5. Third-Party Services</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-xs sm:text-sm">
                      <p>We share limited data with payment processors, shipping partners, and analytics providers. We never sell your data.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6" className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left font-semibold hover:text-primary text-sm">6. Policy Updates</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-xs sm:text-sm">
                      <p>We may update this policy and will notify you of significant changes via email or in-app notification.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8 sm:mt-12">
          <Card className="p-6 sm:p-8 bg-gradient-to-br from-teal-500/5 via-purple-500/5 to-orange-500/5 border-border/50">
            <div className="text-center space-y-6">
              <div className="inline-flex p-3 bg-primary/10 rounded-full">
                <Lock className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold">Questions About Your Privacy?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
                  Our privacy team is committed to transparency and protecting your rights under GDPR and international data protection laws.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4">
                <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                  <h4 className="font-semibold mb-1 text-xs">Email Us</h4>
                  <a href="mailto:privacy@perfectfit.com" className="text-xs text-primary hover:underline break-all">
                    privacy@perfectfit.com
                  </a>
                </Card>
                <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                  <h4 className="font-semibold mb-1 text-xs">Support</h4>
                  <Link href="/contact" className="text-xs text-primary hover:underline">Help Center</Link>
                </Card>
                <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                  <h4 className="font-semibold mb-1 text-xs">Manage</h4>
                  <Link href="/settings" className="text-xs text-primary hover:underline">Settings</Link>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 hover:opacity-90">
                  <Link href="/">Return to Homepage</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/terms-of-service">View Terms</Link>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
