'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { 
  Check, LogIn, Download, Apple, Smartphone, Sparkles, Star, Shield, Lock, 
  Users, Menu, X, Zap, Ruler, ShoppingBag, CreditCard, Dumbbell, Wallet,
  TrendingUp, Heart, MessageCircle, Gift, Award
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Logo from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';

const appFeatures = [
  { icon: Ruler, title: "AI Measurements", description: "Get precise body measurements using AI technology" },
  { icon: ShoppingBag, title: "Smart Shopping", description: "Buy or rent garments that fit perfectly" },
  { icon: Sparkles, title: "Style Recommendations", description: "Personalized fashion suggestions powered by AI" },
  { icon: CreditCard, title: "PerfectPay Wallet", description: "Secure payments with exclusive cashback rewards" },
  { icon: Dumbbell, title: "Fitness Plans", description: "AI-generated fitness and diet plans" },
  { icon: Gift, title: "Premium Perks", description: "Subscription benefits and special discounts" },
];

const securityFeatures = [
  { icon: Shield, title: "Bank-Grade Security", description: "Your data is protected with industry-leading encryption" },
  { icon: Lock, title: "Privacy First", description: "We never share your personal information with third parties" },
  { icon: Users, title: "Trusted Community", description: "Join 500K+ verified users who trust PerfectFit" },
];

const appScreens = [
  { title: "Dashboard", icon: TrendingUp },
  { title: "Wardrobe", icon: ShoppingBag },
  { title: "Measurements", icon: Ruler },
  { title: "Fitness", icon: Dumbbell },
  { title: "Wallet", icon: Wallet },
  { title: "Messages", icon: MessageCircle },
];

const stats = [
  { value: "500K+", label: "Downloads" },
  { value: "4.8", label: "Rating" },
  { value: "50K+", label: "Active Users" },
  { value: "100+", label: "Tailors" },
];

const testimonials = [
  { name: "Sarah M.", text: "PerfectFit changed how I shop! The measurements are incredibly accurate.", rating: 5 },
  { name: "David K.", text: "Best fashion app ever. The AI recommendations are spot on!", rating: 5 },
  { name: "Priya S.", text: "Love the fitness plans and the wallet cashback feature. Highly recommend!", rating: 5 },
];

const faqs = [
  { q: "Is PerfectFit free to download?", a: "Yes! PerfectFit is completely free to download and use. Premium features are available with our subscription plans." },
  { q: "How accurate are the AI measurements?", a: "Our AI technology provides measurements with 98% accuracy, verified by professional tailors and thousands of satisfied customers." },
  { q: "Can I rent garments through the app?", a: "Absolutely! PerfectFit offers both purchase and rental options for a wide range of garments from verified sellers and tailors." },
  { q: "What payment methods are supported?", a: "We support all major payment methods including credit/debit cards, UPI, net banking, and our exclusive PerfectPay wallet." },
  { q: "Is my data secure?", a: "Yes, we use bank-grade encryption and comply with international data protection standards to keep your information safe." },
];

export default function DownloadAppPage() {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [downloadCount, setDownloadCount] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDownloadCount(prev => (prev < 500000 ? prev + 12500 : 500000));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleDownloadClick = (platform: string) => {
    if (platform === 'apk') {
      const link = document.createElement('a');
      link.href = '/app-debug.apk';
      link.setAttribute('download', 'app-debug.apk');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: '✅ Download Started!',
        description: 'Your PerfectFit APK is downloading now.',
      });
    } else {
      toast({
        title: '🚀 Coming Soon!',
        description: `${platform} version will be available shortly.`,
      });
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden bg-gradient-to-br from-teal-50/50 via-purple-50/30 to-orange-50/40 dark:from-teal-950/50 dark:via-purple-950/30 dark:to-orange-950/40">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-tr from-purple-500/20 to-teal-500/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-orange-500/15 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
      
      <motion.header 
        style={{ opacity, scale }}
        className="px-3 sm:px-4 lg:px-6 h-14 sm:h-16 flex items-center bg-background/70 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-border/50"
      >
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity">
          <Logo />
          <span className="font-semibold text-base sm:text-lg">PerfectFit</span>
        </Link>
        <nav className="ml-auto flex items-center gap-1.5 sm:gap-2 md:gap-4">
          <div className="hidden md:flex items-center gap-3 mr-2">
            <Link href="#features" className="text-sm hover:text-primary transition-colors">Features</Link>
            <Link href="#testimonials" className="text-sm hover:text-primary transition-colors">Reviews</Link>
            <Link href="#faq" className="text-sm hover:text-primary transition-colors">FAQ</Link>
          </div>
          <ThemeToggle />
          <Link href="/signup">
            <Button variant="default" size="sm" className="group">
              <LogIn className="mr-0 sm:mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline text-sm">Sign In</span>
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/50 sticky top-14 sm:top-16 z-40"
          >
            <nav className="flex flex-col gap-2 p-4">
              <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="text-sm py-2 hover:text-primary transition-colors">Features</Link>
              <Link href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-sm py-2 hover:text-primary transition-colors">Reviews</Link>
              <Link href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-sm py-2 hover:text-primary transition-colors">FAQ</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-10">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 lg:space-y-20">
          
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 sm:space-y-6 py-4 sm:py-6 lg:py-8"
          >
            <Badge variant="secondary" className="px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 inline" />
              Now Available for Download
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 leading-tight px-2">
              Experience Fashion <br className="hidden sm:block" />
              Perfected by AI
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
              Download PerfectFit today and revolutionize your wardrobe with AI-powered personalization, 
              perfect measurements, and exclusive style recommendations.
            </p>

            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto pt-6 sm:pt-8 px-4"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-3 sm:p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-purple-500">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6"
            id="features"
          >
            <div className="text-center space-y-2 px-4">
              <h2 className="text-2xl sm:text-3xl font-bold">Powerful Features</h2>
              <p className="text-sm sm:text-base text-muted-foreground">Everything you need in one app</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4">
              {appFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="p-4 sm:p-6 hover:shadow-xl transition-all border-border/50 h-full">
                    <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 mb-3 sm:mb-4 text-primary" />
                    <h3 className="font-semibold text-base sm:text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="px-4"
          >
            <Card className="shadow-2xl border border-border/50 bg-background/80 backdrop-blur-md overflow-hidden">
              <CardContent className="p-6 sm:p-8 lg:p-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6 order-2 lg:order-1"
                  >
                    <div className="space-y-3">
                      <Badge className="bg-gradient-to-r from-teal-500 to-purple-500">
                        <Zap className="w-3 h-3 mr-1" />
                        Premium Experience
                      </Badge>
                      <h2 className="text-3xl sm:text-4xl font-bold">
                        Your Complete Fashion & Fitness Companion
                      </h2>
                      <p className="text-muted-foreground text-lg">
                        All-in-one platform designed to revolutionize how you shop, style, and stay fit.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {appScreens.map((screen, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-background/50 to-muted/30 border border-border/50 hover:border-primary/50 transition-all"
                        >
                          <screen.icon className="h-5 w-5 text-primary" />
                          <span className="text-sm font-medium">{screen.title}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 border-2 border-background" />
                        ))}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Join {downloadCount > 0 ? downloadCount.toLocaleString() : '500,000'}+ Users</p>
                        <p className="text-xs text-muted-foreground">Downloaded this month</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative order-1 lg:order-2"
                  >
                    <div className="relative mx-auto max-w-xs">
                      <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
                      <div className="relative aspect-[9/19] rounded-3xl overflow-hidden border-8 border-background shadow-2xl">
                        <img
                          src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=800&fit=crop"
                          alt="PerfectFit App"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -right-4 top-1/4 bg-background/95 backdrop-blur-sm border border-border/50 rounded-xl p-3 shadow-xl"
                      >
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold">4.8 Rating</span>
                        </div>
                      </motion.div>
                      <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -left-4 bottom-1/4 bg-background/95 backdrop-blur-sm border border-border/50 rounded-xl p-3 shadow-xl"
                      >
                        <div className="flex items-center gap-2">
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                          <span className="text-sm font-semibold">500K+ Loves</span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-6 px-4"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold">Secure & Trusted Platform</h2>
              <p className="text-sm sm:text-base text-muted-foreground">Your privacy and security are our top priorities</p>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                >
                  <Card className="p-6 text-center hover:shadow-2xl transition-all border-border/50 h-full bg-gradient-to-br from-background to-muted/20">
                    <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <Card className="shadow-2xl border border-border/50 bg-background/80 backdrop-blur-md overflow-hidden" id="testimonials">
            <CardContent className="p-6 sm:p-8 lg:p-12">
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold">What Our Users Say</h2>
                <p className="text-sm sm:text-base text-muted-foreground">Trusted by thousands worldwide</p>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-2xl mx-auto text-center space-y-4"
                >
                  <div className="flex justify-center gap-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg sm:text-xl italic text-muted-foreground">"{testimonials[currentTestimonial].text}"</p>
                  <p className="font-semibold">- {testimonials[currentTestimonial].name}</p>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-2 rounded-full transition-all ${index === currentTestimonial ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6 px-4"
            id="faq"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold">Frequently Asked Questions</h2>
              <p className="text-sm sm:text-base text-muted-foreground">Everything you need to know</p>
            </div>
            
            <Accordion type="single" collapsible className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-sm sm:text-base">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden text-center space-y-6 sm:space-y-8 bg-gradient-to-br from-teal-500/10 via-purple-500/10 to-orange-500/10 rounded-3xl p-8 sm:p-10 lg:p-16 mx-4 border border-border/50"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-teal-500/10 to-transparent rounded-full blur-3xl" />
            
            <div className="relative space-y-4">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Badge className="mb-2 bg-gradient-to-r from-teal-500 to-purple-500 border-0">
                  <Award className="w-3 h-3 mr-1 inline" />
                  Rated #1 Fashion App
                </Badge>
              </motion.div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-purple-600 to-orange-600">
                Ready to Transform Your Style?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Join <span className="font-bold text-foreground">{downloadCount > 0 ? downloadCount.toLocaleString() : '500,000'}+</span> users who have already discovered their perfect fit
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto group shadow-xl hover:shadow-2xl transition-all"
                onClick={() => handleDownloadClick('apk')}
              >
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Download APK
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto group hover:bg-background/80"
                onClick={() => handleDownloadClick('Google Play')}
              >
                <Smartphone className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Google Play
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto group hover:bg-background/80"
                onClick={() => handleDownloadClick('App Store')}
              >
                <Apple className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                App Store
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-6 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>Secure & Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                <span>Privacy Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span>500K+ Trusted Users</span>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-border/50 bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PerfectFit. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </footer>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 sm:hidden z-50"
      >
        <Button
          size="lg"
          className="rounded-full w-14 h-14 shadow-2xl"
          onClick={() => handleDownloadClick('apk')}
        >
          <Download className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  );
}
