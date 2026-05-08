
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { Camera, Scissors, Ruler, Bot, Users, Star, Shirt, Award, Facebook, Twitter, Instagram, Linkedin, Sparkles, Wand2, Lightbulb, Quote, LogIn, Download, Loader2, Check } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import React, { useEffect, useState, useRef } from 'react';
import { useActionState } from 'react';
import { submitNewsletter } from './actions';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useFormStatus } from 'react-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";



const initialState: { message: string | null; error: boolean } = {
  message: null,
  error: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Subscribing...</span>
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          <span>Subscribe</span>
        </>
      )}
    </Button>
  );
}

const plans = [
    {
        name: 'Basic',
        price: '₹1999',
        period: 'month',
        description: 'Perfect for occasional rentals and trying out our service.',
        features: [
            '1 Rental Credit per Month',
            'Access to Casual Wear',
            'Standard Delivery',
            'Basic Fit Guarantee',
            '10% Discount on Purchases',
        ],
        popular: false,
    },
    {
        name: 'Pro',
        price: '₹3999',
        period: 'month',
        description: 'For the fashion-forward individual who loves variety.',
        features: [
            '4 Rental Credits per Month',
            'Access to All Collections',
            'Express Delivery',
            'Perfect Fit Guarantee with Free Alterations',
            '25% Discount on Purchases',
        ],
        popular: true,
    },
    {
        name: 'Ultimate',
        price: '₹6999',
        period: 'month',
        description: 'The ultimate wardrobe solution for any occasion.',
        features: [
            'Unlimited Rental Credits',
            'Access to All Collections, including Premium',
            'Same-Day Delivery (in select cities)',
            '40% Discount on Purchases',
        ],
        popular: false,
    }
];

const testimonials = [
  {
    quote: "I was skeptical about the AI measurements, but the suit I received fits better than anything I've ever owned. Magic!",
    name: "Alex J.",
  },
  {
    quote: "The convenience is a game-changer. I rented a perfect-fitting dress for a wedding without ever leaving my house.",
    name: "Sarah K.",
  },
  {
    quote: "Finally, a service that understands that one size does not fit all. The quality of the fabric and tailoring is top-notch.",
    name: "Michael P.",
  },
  {
    quote: "The AI fitness plan was a great bonus! It's amazing how it's tailored to my measurements. Highly recommend.",
    name: "Jessica D.",
  },
  {
    quote: "Customer service is fantastic. They helped me with a return and made the process so easy and stress-free.",
    name: "David L.",
  },
];

export default function LandingPage() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(submitNewsletter, initialState);
  const autoplayPlugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  useEffect(() => {
    if (state.message) {
      if (state.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: state.message,
        });
      } else {
        toast({
          title: 'Subscribed!',
          description: state.message,
        });
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 md:h-20 flex items-center bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-lg sticky top-0 z-50 border-b border-border/50 shadow-lg shadow-primary/10">
        <Link href="/" className="flex items-center justify-center hover:scale-105 transition-transform duration-300">
          <Logo />
          <span className="sr-only">PerfectFit</span>
        </Link>
        <nav className="ml-auto flex items-center gap-3 sm:gap-6">
          <ThemeToggle />
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 text-xs sm:text-sm">
              <LogIn className="mr-0 sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Sign In</span>
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-16 sm:py-24 md:py-32 lg:py-40 text-center overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background">
          <div className="absolute inset-0 z-0 dark:block hidden">
             <Image src="/landbcck.png" alt="Tailoring background" fill className="object-cover" data-ai-hint="fashion studio"/>
             <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>
             <div className="absolute inset-0 backdrop-blur-[1px]"></div>
          </div>
          
          {/* Animated gradient orbs */}
          <div className="absolute top-10 sm:top-16 left-5 sm:left-10 w-48 sm:w-64 h-48 sm:h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse -z-0"></div>
          <div className="absolute bottom-10 sm:bottom-16 right-5 sm:right-10 w-56 sm:w-72 h-56 sm:h-72 bg-fuchsia-500/15 rounded-full blur-3xl animate-pulse animation-delay-2000 -z-0"></div>
          
          <div className="container relative px-4 sm:px-6 md:px-6 z-10 mx-auto max-w-4xl">
            <div className="grid gap-6 sm:gap-8 lg:gap-10">
              <div className="flex flex-col justify-center space-y-4 sm:space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
                <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
                  <div className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-purple-500/10 dark:bg-white/10 border border-purple-500/30 dark:border-white/20 backdrop-blur-xl mb-2 sm:mb-3 mx-auto animate-in fade-in duration-500 hover:border-purple-500/50 dark:hover:border-white/40 transition-all duration-300 group cursor-pointer">
                    <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-fuchsia-500 dark:text-yellow-300 group-hover:animate-spin" />
                    <span className="text-xs sm:text-sm font-semibold text-foreground dark:text-white group-hover:opacity-90 transition-colors">AI-Powered Fashion Revolution</span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-foreground via-purple-600 to-fuchsia-600 dark:from-white dark:via-fuchsia-200 dark:to-sky-200 leading-tight sm:leading-tight md:leading-tight lg:leading-snug">
                    The Future of<br className="hidden sm:block"/>Tailoring is Here
                  </h1>
                </div>
                <p className="max-w-2xl text-muted-foreground dark:text-white/80 text-sm sm:text-base md:text-lg mx-auto leading-relaxed font-light animate-in fade-in duration-700 animation-delay-100 px-2" >
                  Revolutionary AI technology meets timeless craftsmanship. Get perfectly fitted custom clothing from a single photo.
                </p>
                <div className="flex flex-col gap-2 sm:gap-3 min-[400px]:flex-row justify-center pt-2 sm:pt-4 md:pt-6 animate-in fade-in duration-700 animation-delay-200">
                  <Link href="/signup" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white shadow-2xl shadow-fuchsia-500/50 hover:shadow-fuchsia-500/70 transform hover:scale-105 active:scale-95 transition-all duration-300 text-sm sm:text-base font-bold">
                      Get Started for Free
                      <Sparkles className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/download" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-purple-300 dark:border-white/30 text-foreground dark:text-white hover:bg-secondary/50 dark:hover:bg-white/10 backdrop-blur-xl transform hover:scale-105 active:scale-95 transition-all duration-300 text-sm sm:text-base font-bold">
                      <Download className="mr-2 h-4 w-4" />
                      Download App
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Vision Section */}
        <section id="vision" className="w-full py-16 sm:py-20 md:py-32 lg:py-40 bg-gradient-to-b from-background/50 to-secondary/60 backdrop-blur-xl relative overflow-hidden">
            <Image src="/dots.svg" alt="" aria-hidden="true" width={150} height={150} className="absolute -top-12 -left-12 sm:-top-12 sm:-left-24 opacity-10 animate-pulse w-32 sm:w-48" />
            <Image src="/dots.svg" alt="" aria-hidden="true" width={150} height={150} className="absolute -bottom-12 -right-12 sm:-bottom-12 sm:-right-24 opacity-10 animate-pulse animation-delay-2000 w-32 sm:w-48" />
            
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-fuchsia-500/5 -z-10"></div>
            
            <div className="container px-4 sm:px-6 relative mx-auto max-w-5xl">
                <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 text-center mb-12 sm:mb-16 md:mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="inline-flex rounded-full bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 px-3 sm:px-4 py-1.5 sm:py-2 border border-purple-500/30 backdrop-blur-xl items-center gap-2 hover:border-purple-500/60 transition-all duration-300 group cursor-pointer">
                        <Lightbulb className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-fuchsia-400 group-hover:rotate-12 transition-transform" />
                        <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Our Vision</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground via-purple-600 to-fuchsia-600 dark:from-white dark:via-purple-200 dark:to-fuchsia-200 leading-tight">
                        A New Era of Personal Style
                    </h2>
                    <p className="max-w-2xl sm:max-w-3xl text-muted-foreground dark:text-white/70 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-light px-2">
                        We believe fashion should be personal, sustainable, and empowering. By merging the timeless art of tailoring with AI precision, we're revolutionizing how you shop, fit, and feel.
                    </p>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-32 lg:py-40 relative overflow-hidden">
          <Image src="/dots.svg" alt="" aria-hidden="true" width={200} height={200} className="absolute top-0 right-0 opacity-10 animate-pulse" />
          <Image src="/dots.svg" alt="" aria-hidden="true" width={200} height={200} className="absolute bottom-0 left-0 opacity-10 animate-pulse animation-delay-2000" />
          
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-fuchsia-500/5 -z-10"></div>
          
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 text-center mb-12 sm:mb-16 md:mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="inline-flex rounded-full bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 px-3 sm:px-4 py-1.5 sm:py-2 border border-purple-500/30 backdrop-blur-xl items-center gap-2 hover:border-purple-500/60 transition-all duration-300 group cursor-pointer">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-fuchsia-400 group-hover:animate-spin"/>
                <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Key Features</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground via-purple-600 to-fuchsia-600 dark:from-white dark:via-purple-200 dark:to-fuchsia-200 leading-tight">
                Why Choose PerfectFit?
              </h2>
              <p className="max-w-2xl sm:max-w-3xl text-muted-foreground dark:text-white/70 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-light px-2">
                We combine timeless tailoring craftsmanship with cutting-edge AI precision for an unmatched experience.
              </p>
            </div>
            <div className="mx-auto grid items-start gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl">
              {[
                { icon: Camera, title: 'AI-Powered Measurements', desc: 'Advanced AI analyzes a single photo to extract 10+ precise body measurements instantly.' },
                { icon: Bot, title: 'Smart Recommendations', desc: 'Personalized style suggestions based on your unique measurements and preferences.' },
                { icon: Scissors, title: 'Expert Tailoring', desc: 'Custom-made garments by master tailors crafted to your exact dimensions.' },
                { icon: Shirt, title: 'Buy or Rent', desc: 'Flexible options to purchase timeless pieces or rent outfits for special occasions.' },
                { icon: Award, title: 'Exclusive Perks', desc: 'Unlock premium benefits through subscription plans and loyalty rewards.' },
                { icon: Ruler, title: 'Fitness Plans', desc: 'AI-generated fitness and diet plans aligned with your body goals.' },
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={idx} 
                    className="group relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-secondary/50 to-secondary/20 dark:from-white/5 dark:to-white/[0.02] border border-border dark:border-white/10 hover:border-purple-500/50 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-fuchsia-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:via-fuchsia-500/10 group-hover:to-purple-500/0 transition-all duration-500 -z-10"></div>
                    <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 p-3 border border-purple-500/20 group-hover:border-purple-500/60 group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-fuchsia-400 group-hover:text-purple-300 transition-colors" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground dark:text-white mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-fuchsia-500 dark:group-hover:from-purple-300 dark:group-hover:to-fuchsia-300 transition-all duration-300 line-clamp-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground dark:text-white/60 group-hover:text-foreground dark:group-hover:text-white/80 transition-colors text-xs sm:text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-500/0 via-fuchsia-500/50 to-purple-500/0 scale-x-0 group-hover:scale-x-100 rounded-full transition-transform duration-500"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-16 sm:py-20 md:py-32 lg:py-40 bg-gradient-to-b from-secondary/40 to-background/40 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-fuchsia-500/5 -z-10"></div>
          
          <div className="container grid items-center justify-center gap-8 px-4 sm:px-6 text-center relative mx-auto max-w-5xl">
            <div className="space-y-4 sm:space-y-6 flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
               <div className="inline-flex rounded-full bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 px-3 sm:px-4 py-1.5 sm:py-2 border border-purple-500/30 backdrop-blur-xl items-center gap-2 hover:border-purple-500/60 transition-all duration-300 group cursor-pointer">
                  <Wand2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-fuchsia-400 group-hover:rotate-12 transition-transform" />
                  <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">How It Works</span>
               </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground via-purple-600 to-fuchsia-600 dark:from-white dark:via-purple-200 dark:to-fuchsia-200 leading-tight">
                Three Simple Steps to Perfect Fit
              </h2>
              <p className="mx-auto max-w-2xl sm:max-w-3xl text-muted-foreground dark:text-white/70 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-light px-2">
                Getting custom-tailored clothing has never been easier. Our streamlined process is designed for your convenience.
              </p>
            </div>
            <div className="mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-2 sm:pt-4 relative max-w-5xl">
              <Image src="/lines.svg" alt="" aria-hidden="true" width={500} height={100} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full max-w-3xl hidden md:block opacity-30" />
              {[
                { num: '1', title: 'Scan', desc: 'Take a full-body photo. Our AI instantly extracts precise measurements.' },
                { num: '2', title: 'Shop', desc: 'Browse personalized recommendations guaranteed to fit your body perfectly.' },
                { num: '3', title: 'Wear', desc: 'Receive custom-made garments and enjoy ultimate confidence.' },
              ].map((step, idx) => (
                <div 
                  key={idx}
                  className="group relative flex flex-col items-center space-y-3 sm:space-y-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-purple-500/50 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-fuchsia-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:via-fuchsia-500/10 group-hover:to-purple-500/0 transition-all duration-500 -z-10"></div>
                  
                  <div className="relative w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/30 to-fuchsia-500/30 group-hover:from-purple-500/50 group-hover:to-fuchsia-500/50 transition-all duration-500"></div>
                    <div className="relative bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-full font-black text-xl sm:text-2xl w-14 sm:w-16 h-14 sm:h-16 flex items-center justify-center text-white shadow-lg shadow-purple-500/50">
                      {step.num}
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-foreground dark:text-white">{step.title}</h3>
                  <p className="text-muted-foreground dark:text-white/60 group-hover:text-foreground dark:group-hover:text-white/80 transition-colors text-xs sm:text-sm leading-relaxed text-center">{step.desc}</p>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-500/0 via-fuchsia-500/50 to-purple-500/0 scale-x-0 group-hover:scale-x-100 rounded-full transition-transform duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="w-full py-16 sm:py-20 md:py-32 lg:py-40 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-fuchsia-500/5 -z-10"></div>
            
            <div className="container px-4 sm:px-6 mx-auto">
                <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 text-center mb-12 sm:mb-16 md:mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="inline-flex rounded-full bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 px-3 sm:px-4 py-1.5 sm:py-2 border border-purple-500/30 backdrop-blur-xl items-center gap-2 hover:border-purple-500/60 transition-all duration-300 group cursor-pointer">
                        <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-fuchsia-400 group-hover:rotate-12 transition-transform" />
                        <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Pricing Plans</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground via-purple-600 to-fuchsia-600 dark:from-white dark:via-purple-200 dark:to-fuchsia-200 leading-tight">
                        Find the Perfect Plan
                    </h2>
                    <p className="max-w-3xl text-muted-foreground dark:text-white/70 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-light px-2">
                        Choose a subscription that matches your style. Unlock exclusive perks and elevate your wardrobe experience.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start max-w-6xl mx-auto">
                    {plans.map((plan, idx) => (
                        <div 
                          key={plan.name} 
                          className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-500 transform hover:-translate-y-2 sm:hover:-translate-y-3 hover:shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 ${
                            plan.popular 
                              ? 'border-2 border-gradient-to-r from-fuchsia-500 to-purple-500 shadow-2xl shadow-purple-500/30 sm:lg:scale-105' 
                              : 'border border-border dark:border-white/10 hover:border-purple-500/50'
                          } bg-gradient-to-br from-secondary/50 to-secondary/20 dark:from-white/10 dark:to-white/5`}
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-fuchsia-500/0 to-purple-500/0 group-hover:from-purple-500/20 group-hover:via-fuchsia-500/10 group-hover:to-purple-500/0 -z-10"></div>
                            
                            {plan.popular && (
                              <div className="relative text-center py-2 sm:py-3 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white text-xs sm:text-sm font-bold">
                                <span className="inline-flex items-center gap-2">
                                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                  Most Popular
                                </span>
                              </div>
                            )}
                            
                            <div className="p-5 sm:p-8 text-center">
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground dark:text-white mb-3 sm:mb-4">{plan.name}</h3>
                                <div className="mb-4 sm:mb-6">
                                  <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-purple-500 to-fuchsia-500 dark:from-purple-300 dark:to-fuchsia-300 bg-clip-text text-transparent">{plan.price}</span>
                                  <span className="text-sm sm:text-lg font-normal text-muted-foreground dark:text-white/60 ml-2">/{plan.period}</span>
                                </div>
                                <p className="text-muted-foreground dark:text-white/70 text-xs sm:text-sm md:text-base group-hover:text-foreground dark:group-hover:text-white/80 transition-colors leading-relaxed">{plan.description}</p>
                            </div>
                            
                            <div className="p-5 sm:p-8 flex-grow border-t border-border dark:border-white/10">
                                <ul className="space-y-3 sm:space-y-4">
                                    {plan.features.map(feature => (
                                        <li key={feature} className="flex items-start gap-3 sm:gap-4">
                                            <Check className="h-4 sm:h-5 w-4 sm:w-5 text-fuchsia-400 mt-0.5 flex-shrink-0" />
                                            <span className="text-muted-foreground dark:text-white/80 text-xs sm:text-sm font-medium leading-relaxed">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="p-5 sm:p-8 border-t border-border dark:border-white/10">
                                <Button className={`w-full rounded-lg sm:rounded-xl font-bold text-sm sm:text-base py-2.5 sm:py-3 transition-all duration-300 ${
                                  plan.popular 
                                    ? 'bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105' 
                                    : 'bg-secondary/50 hover:bg-secondary dark:bg-white/10 dark:hover:bg-white/20 text-foreground dark:text-white border border-border dark:border-white/20 hover:border-purple-500/50'
                                }`} asChild>
                                    <Link href="/signup">Choose Plan</Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Team Section */}
        <section id="team" className="w-full py-16 sm:py-20 md:py-32 lg:py-40 bg-gradient-to-b from-secondary/40 to-background/40 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-fuchsia-500/5 -z-10"></div>
            
            <div className="container px-4 sm:px-6 relative mx-auto">
                <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 text-center mb-12 sm:mb-16 md:mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="inline-flex rounded-full bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 px-3 sm:px-4 py-1.5 sm:py-2 border border-purple-500/30 backdrop-blur-xl items-center gap-2 hover:border-purple-500/60 transition-all duration-300 group cursor-pointer">
                      <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-fuchsia-400 group-hover:rotate-12 transition-transform"/>
                      <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Our Team</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground via-purple-600 to-fuchsia-600 dark:from-white dark:via-purple-200 dark:to-fuchsia-200 leading-tight">
                        The Minds Behind the Fit
                    </h2>
                    <p className="max-w-3xl text-muted-foreground dark:text-white/70 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-light italic px-2">
                        "Great things in business are never done by one person. They're done by a team of people." - Steve Jobs
                    </p>
                </div>
                <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl">
                    {[
                      { name: 'Aman Antuley', role: 'Software Developer', desc: 'The architect of our seamless user experience and robust application logic.', img: '/aman-image.png' },
                      { name: 'Alamin Mondal', role: 'AI/ML Engineer', desc: 'The mastermind behind our powerful AI, ensuring our core technology learns and improves.', img: '/alamin.jpg' },
                      { name: 'Iqra Shaikh', role: 'App Developer', desc: 'The creative talent who brings our vision to life with elegant design and interfaces.', img: '/iqra.jpg' },
                    ].map((member, idx) => (
                      <div 
                        key={member.name}
                        className="group relative flex flex-col items-center text-center p-5 sm:p-8 rounded-2xl sm:rounded-2xl bg-gradient-to-br from-secondary/50 to-secondary/20 dark:from-white/5 dark:to-white/[0.02] border border-border dark:border-white/10 hover:border-purple-500/50 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-fuchsia-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:via-fuchsia-500/10 group-hover:to-purple-500/0 transition-all duration-500 -z-10"></div>
                        
                        <Avatar className="w-28 sm:w-40 h-28 sm:h-40 mb-4 sm:mb-6 border-3 sm:border-4 border-gradient-to-r from-purple-500/50 to-fuchsia-500/50 ring-2 ring-purple-500/20 dark:ring-white/20 group-hover:ring-purple-500/50 transition-all duration-300">
                            <AvatarImage src={member.img} alt={member.name} />
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white text-lg sm:text-2xl font-bold">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                        
                        <h3 className="text-lg sm:text-2xl font-bold text-foreground dark:text-white mb-1 sm:mb-2">{member.name}</h3>
                        <p className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent mb-3 sm:mb-4">{member.role}</p>
                        <p className="text-muted-foreground dark:text-white/60 group-hover:text-foreground dark:group-hover:text-white/80 transition-colors text-xs sm:text-sm leading-relaxed">{member.desc}</p>
                        
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-500/0 via-fuchsia-500/50 to-purple-500/0 scale-x-0 group-hover:scale-x-100 rounded-full transition-transform duration-500"></div>
                      </div>
                    ))}
                </div>
            </div>
        </section>

         {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-16 sm:py-20 md:py-32 lg:py-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-fuchsia-500/5 -z-10"></div>
          
          <div className="container px-4 sm:px-6 mx-auto">
             <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 text-center mb-12 sm:mb-16 md:mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="inline-flex rounded-full bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 px-3 sm:px-4 py-1.5 sm:py-2 border border-purple-500/30 backdrop-blur-xl items-center gap-2 hover:border-purple-500/60 transition-all duration-300 group cursor-pointer">
                <Quote className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-fuchsia-400 group-hover:rotate-12 transition-transform" />
                <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Testimonials</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground via-purple-600 to-fuchsia-600 dark:from-white dark:via-purple-200 dark:to-fuchsia-200 leading-tight">
                What Our Customers Say
              </h2>
               <p className="max-w-3xl text-muted-foreground dark:text-white/70 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-light px-2">
                Real stories from real customers who transformed their wardrobe with PerfectFit.
              </p>
            </div>
            <Carousel
              plugins={[autoplayPlugin.current]}
              className="w-full max-w-5xl mx-auto"
              onMouseEnter={() => autoplayPlugin.current.stop()}
              onMouseLeave={() => autoplayPlugin.current.play()}
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <div className="p-2 sm:p-4">
                      <Card className="relative p-5 sm:p-8 rounded-xl sm:rounded-2xl border border-border dark:border-white/10 bg-gradient-to-br from-secondary/50 to-secondary/20 dark:from-white/5 dark:to-white/[0.02] backdrop-blur-xl text-card-foreground transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 hover:border-purple-500/50 group">
                        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500/0 via-fuchsia-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:via-fuchsia-500/10 group-hover:to-purple-500/0 transition-all duration-500 -z-10"></div>
                        
                        <CardContent className="p-0 flex flex-col items-center justify-center text-center">
                            <div className="flex items-center gap-1 mb-4 sm:mb-6">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-4 sm:w-5 h-4 sm:h-5 fill-fuchsia-400 text-fuchsia-400 animate-in fade-in duration-300" style={{ animationDelay: `${i * 50}ms` }} />
                                ))}
                            </div>
                            <p className="text-muted-foreground dark:text-white/80 group-hover:text-foreground dark:group-hover:text-white transition-colors mb-4 sm:mb-8 text-sm sm:text-lg leading-relaxed font-light">
                              "{testimonial.quote}"
                            </p>
                            <div className="flex items-center justify-center">
                              <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-fuchsia-500 dark:from-purple-300 dark:to-fuchsia-300 text-sm sm:text-base">
                                — {testimonial.name}
                              </p>
                            </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="border-border dark:border-white/20 hover:border-purple-500/50 hover:bg-secondary/50 dark:hover:bg-white/10 text-foreground dark:text-white hover:text-foreground dark:hover:text-white hidden sm:flex" />
              <CarouselNext className="border-border dark:border-white/20 hover:border-purple-500/50 hover:bg-secondary/50 dark:hover:bg-white/10 text-foreground dark:text-white hover:text-foreground dark:hover:text-white hidden sm:flex" />
            </Carousel>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section id="newsletter" className="w-full py-16 sm:py-20 md:py-32 lg:py-40 bg-gradient-to-b from-background/50 to-secondary/60 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-fuchsia-500/5 -z-10"></div>
            
            {/* Animated gradient orbs */}
            <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse -z-0"></div>
            <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-56 sm:w-96 h-56 sm:h-96 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000 -z-0"></div>
            
            <div className="container grid items-center justify-center gap-6 sm:gap-8 px-4 sm:px-6 text-center relative mx-auto">
                <div className="space-y-4 sm:space-y-6 flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground via-purple-600 to-fuchsia-600 dark:from-white dark:via-purple-200 dark:to-fuchsia-200 leading-tight px-2">
                        Stay in the Loop
                    </h2>
                    <p className="mx-auto max-w-3xl text-muted-foreground dark:text-white/70 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-light px-2">
                        Be the first to know about new collections, exclusive offers, and insider tips straight to your inbox.
                    </p>
                </div>
                <div className="mx-auto w-full max-w-md space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 animation-delay-200 px-2">
                    <form ref={formRef} action={formAction} className="flex flex-col sm:flex-row gap-2 sm:gap-3 group">
                        <Input 
                          name="email" 
                          className="flex-1 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-secondary/50 dark:bg-white/10 border border-border dark:border-white/20 hover:border-purple-500/50 focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/30 text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder-white/40 backdrop-blur-xl transition-all duration-300 group-hover:border-purple-500/40" 
                          placeholder="Enter your email..." 
                          type="email" 
                          required 
                        />
                        <SubmitButton />
                    </form>
                    <p className="text-xs text-white/50 font-light">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-secondary/80 to-background/40 dark:from-black/80 dark:to-background/40 backdrop-blur-xl border-t border-border dark:border-white/10 text-muted-foreground dark:text-white/70 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            <div className="flex flex-col gap-4 sm:gap-6">
                <Logo />
                <p className="text-xs sm:text-sm text-muted-foreground dark:text-white/60 font-light leading-relaxed">Redefining the future of fashion with AI-powered precision and timeless craftsmanship.</p>
                <div className="flex gap-3 sm:gap-4">
                    <Link href="https://www.facebook.com/profile.php?id=61579391364648" target="_blank" rel="noopener noreferrer" style={{display: 'inline-flex', padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(255, 255, 255, 0.05)', transition: 'all 300ms'}} className="hover:bg-white/10">
                        <Facebook className="h-5 w-5" />
                    </Link>
                    <Link href="https://www.instagram.com/perfectfit_ai?igsh=ZmYzeXlsYXp0bW04" target="_blank" rel="noopener noreferrer" style={{display: 'inline-flex', padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(255, 255, 255, 0.05)', transition: 'all 300ms'}} className="hover:bg-white/10">
                        <Instagram className="h-5 w-5" />
                    </Link>
                    <a href="#" style={{display: 'inline-flex', padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(255, 255, 255, 0.05)', transition: 'all 300ms'}} className="hover:bg-white/10">
                        <Twitter className="h-5 w-5" />
                    </a>
                    <Link href="https://www.linkedin.com/company/perfectfit-ai/" target="_blank" rel="noopener noreferrer" style={{display: 'inline-flex', padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(255, 255, 255, 0.05)', transition: 'all 300ms'}} className="hover:bg-white/10">
                        <Linkedin className="h-5 w-5" />
                    </Link>
                </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
                <h4 className="font-bold text-foreground dark:text-white text-sm sm:text-lg">Company</h4>
                <ul className="space-y-2 sm:space-y-3">
                    <li><Link href="/about" className="text-xs sm:text-sm text-muted-foreground dark:text-white/60 hover:text-fuchsia-400 transition-colors duration-300">About Us</Link></li>
                    <li><Link href="#newsletter" className="text-xs sm:text-sm text-muted-foreground dark:text-white/60 hover:text-fuchsia-400 transition-colors duration-300">Contact</Link></li>
                    <li><Link href="#testimonials" className="text-xs sm:text-sm text-muted-foreground dark:text-white/60 hover:text-fuchsia-400 transition-colors duration-300">Testimonials</Link></li>
                </ul>
            </div>
             <div className="space-y-3 sm:space-y-4">
                <h4 className="font-bold text-foreground dark:text-white text-sm sm:text-lg">Services</h4>
                <ul className="space-y-2 sm:space-y-3">
                    <li><Link href="#features" className="text-xs sm:text-sm text-muted-foreground dark:text-white/60 hover:text-fuchsia-400 transition-colors duration-300">AI Measurement</Link></li>
                    <li><Link href="#features" className="text-xs sm:text-sm text-muted-foreground dark:text-white/60 hover:text-fuchsia-400 transition-colors duration-300">Subscriptions</Link></li>
                    <li><Link href="#features" className="text-xs sm:text-sm text-muted-foreground dark:text-white/60 hover:text-fuchsia-400 transition-colors duration-300">Rewards</Link></li>
                </ul>
            </div>
            <div className="space-y-3 sm:space-y-4">
                <h4 className="font-bold text-foreground dark:text-white text-sm sm:text-lg">Legal</h4>
                <ul className="space-y-2 sm:space-y-3">
                    <li><Link href="/terms-of-service" className="text-xs sm:text-sm text-muted-foreground dark:text-white/60 hover:text-fuchsia-400 transition-colors duration-300">Terms of Service</Link></li>
                    <li><Link href="/privacy-policy" className="text-xs sm:text-sm text-muted-foreground dark:text-white/60 hover:text-fuchsia-400 transition-colors duration-300">Privacy Policy</Link></li>
                    <li><Link href="/return-policy" className="text-xs sm:text-sm text-muted-foreground dark:text-white/60 hover:text-fuchsia-400 transition-colors duration-300">Return Policy</Link></li>
                </ul>
            </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border dark:border-white/10 text-center text-xs text-muted-foreground dark:text-white/50 font-light">
            <p>&copy; 2025 PerfectFit Inc. All rights reserved. Crafted with ❤️ and ✨</p>
        </div>
      </footer>
    </div>
  );
}
