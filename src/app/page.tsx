'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { 
  Camera, Scissors, Ruler, Bot, Users, Star, Shirt, Award, 
  Facebook, Twitter, Instagram, Linkedin, Sparkles, Wand2, 
  Lightbulb, Quote, LogIn, Download, Loader2, Check, HelpCircle, 
  ChevronRight, RefreshCw, Smartphone, Eye, Scale, Sparkle, ChevronDown, CheckCircle2
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { AuthDialog } from '@/components/auth-dialog';
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
import { motion, AnimatePresence } from 'framer-motion';

// Types & Configuration
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
      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-600 to-purple-700 hover:from-fuchsia-600 hover:to-purple-800 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 font-bold transition-all duration-300 transform hover:scale-[1.03] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-6 group"
    >
      <span className="relative z-10 flex items-center justify-center">
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Subscribing...</span>
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
            <span>Subscribe</span>
          </>
        )}
      </span>
      {/* Gloss effect */}
      <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
    </Button>
  );
}

// Scroll reveal helper component
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

interface Garment {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface ScannerModel {
  id: string;
  name: string;
  baseImage: string;
  gender: string;
  height: string;
  measurements: Record<string, string>;
  recommendedSize: string;
  confidence: string;
  avatar: string;
  garments: Garment[];
}

const scannerModels: ScannerModel[] = [
  {
    id: 'james',
    name: 'James (Bespoke Model)',
    baseImage: 'https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&q=80&w=600',
    gender: 'Male',
    height: '182 cm',
    measurements: {
      Shoulders: '18.2 in',
      Chest: '39.5 in',
      Waist: '31.8 in',
      Hips: '38.6 in',
      Sleeve: '33.4 in',
      Inseam: '32.2 in',
    },
    recommendedSize: 'Medium (Slim Fit)',
    confidence: '99.6%',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    garments: [
      {
        id: 'navy-suit',
        name: 'Midnight Navy Suit',
        image: 'https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&q=80&w=600',
        description: 'Classic double-vent structured tailoring'
      },
      {
        id: 'suede-blazer',
        name: 'Suede Camel Blazer',
        image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=600',
        description: 'Unstructured comfort shoulder cut'
      },
      {
        id: 'utility-trench',
        name: 'Cyberpunk Utility Trench',
        image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600',
        description: 'Waterproof double-breasted shell design'
      }
    ]
  },
  {
    id: 'emma',
    name: 'Emma (Elegant Model)',
    baseImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600',
    gender: 'Female',
    height: '169 cm',
    measurements: {
      Shoulders: '15.2 in',
      Bust: '34.5 in',
      Waist: '26.4 in',
      Hips: '36.8 in',
      Sleeve: '29.5 in',
      Length: '40.8 in',
    },
    recommendedSize: 'Small (Bespoke Cut)',
    confidence: '98.9%',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
    garments: [
      {
        id: 'crimson-gown',
        name: 'Crimson Velvet Gown',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600',
        description: 'Plunging neckline with visual pleat fold'
      },
      {
        id: 'ivory-blazer',
        name: 'Ivory Blazer-Dress',
        image: 'https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?auto=format&fit=crop&q=80&w=600',
        description: 'Drape wrap closure with tailored lapels'
      },
      {
        id: 'chiffon-trench',
        name: 'Chiffon Trench Coat',
        image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&q=80&w=600',
        description: 'Layered overlay belted design'
      }
    ]
  },
  {
    id: 'sophia',
    name: 'Sophia (Athletic Model)',
    baseImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600',
    gender: 'Female',
    height: '164 cm',
    measurements: {
      Shoulders: '14.6 in',
      Bust: '32.8 in',
      Waist: '25.0 in',
      Hips: '34.8 in',
      Sleeve: '28.4 in',
      Inseam: '29.2 in',
    },
    recommendedSize: 'Extra Small (Flex-Fit)',
    confidence: '99.2%',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
    garments: [
      {
        id: 'emerald-athletic',
        name: 'Emerald Athletic Set',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600',
        description: 'Ergonomic compress knit sport profile'
      },
      {
        id: 'yellow-denim',
        name: 'Sunfire Yellow Denim',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600',
        description: 'Relaxed crop cut with rivet stitching'
      },
      {
        id: 'knit-lounge',
        name: 'Oatmeal Knit Lounge',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600',
        description: 'Superfine Merino thread relax drop'
      }
    ]
  }
];

const plans = [
  {
    name: 'Basic',
    monthlyPrice: 1999,
    annualPrice: 1599,
    period: 'month',
    description: 'Perfect for occasional rentals and trying out our service.',
    features: [
      '1 Rental Credit per Month',
      'Access to Casual Wear Collection',
      'Standard 3-Day Delivery',
      'Basic AI Fit Estimate',
      '10% Discount on Purchases',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    monthlyPrice: 3999,
    annualPrice: 3199,
    period: 'month',
    description: 'For the fashion-forward individual who loves premium variety.',
    features: [
      '4 Rental Credits per Month',
      'Access to All Collections (inc. Premium)',
      'Express 1-Day Delivery',
      'Perfect Fit Guarantee with Free Alterations',
      '25% Discount on Purchases',
      'AI Fitness and Body Goals Integration'
    ],
    popular: true,
  },
  {
    name: 'Ultimate',
    monthlyPrice: 6999,
    annualPrice: 5599,
    period: 'month',
    description: 'The ultimate luxury wardrobe rotation solution for all occasions.',
    features: [
      'Unlimited Rental Credits',
      'Access to All Collections + Premium Designer Exclusive',
      'Same-Day Delivery (In major metros)',
      'Personal Stylist Consultations',
      '40% Discount on Purchases',
      'Custom fabric requests'
    ],
    popular: false,
  },
];

const testimonials = [
  {
    quote: "I was highly skeptical about the AI measurements, but the custom business suit I received fits better than anything I've ever owned. Absolute magic!",
    name: "Alex Johnson",
    role: "Marketing Director",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    rating: 5
  },
  {
    quote: "The convenience is unmatched. I rented a gorgeous, perfectly fitting designer dress for a wedding gala and returned it without stepping foot in a shop.",
    name: "Sarah Kothari",
    role: "Creative Producer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    rating: 5
  },
  {
    quote: "Finally, a luxury tailoring app that understands body diversity. The AI calculated my waist, chest, and arms accurately. The fabric feels premium.",
    name: "Michael Patel",
    role: "Tech Entrepreneur",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
    rating: 5
  },
  {
    quote: "The custom fitness plan is an incredible bonus. The app tracked my measurement shifts over 3 months and adapted my styles smoothly.",
    name: "Jessica D'Souza",
    role: "Fitness Coach",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
    rating: 5
  }
];

const faqs = [
  {
    q: "How accurate is the AI measurement technology?",
    a: "Our proprietary AI body measurement engine analyzes visual outlines relative to camera specs. By mapping key skeletal pivots, height constraints, and contours, it extracts over 10+ core dimensions with a 99%+ accuracy rate compared to physical tailoring tapes, and refines them using neural networks."
  },
  {
    q: "Do I need to upload sensitive or undergarment photos?",
    a: "Absolutely not. PerfectFit is trained to estimate body shapes through normal form-fitting clothing. We recommend wearing a slim t-shirt and jeans, or athletic activewear. Your photos are secure, processed locally/securely, and never stored without your explicit choice."
  },
  {
    q: "What happens if a garment does not fit perfectly?",
    a: "We offer a 'Perfect Fit Guarantee'. For our Pro and Ultimate plans, all return alterations and custom refinements are 100% free of charge. Basic plan users can request resizing or swap items within 7 days of receiving their shipment."
  },
  {
    q: "How does the rental rotation and return system work?",
    a: "Depending on your plan, you receive rental credits. Browse and select your outfits, which arrive freshly dry-cleaned and ready to wear. Wear them as long as you want. When you're ready for the next look, drop the old ones into the prepaid return bag, mail it back, and your credits restore instantly."
  },
  {
    q: "What fabric quality and sustainability standards are utilized?",
    a: "We partner with leading sustainable mills and master tailors. Because garments are stitched to your individual AI measurement profile, we reduce fabric scrap and unsold inventory waste by 40% compared to traditional retail brands. High-grade organic cotton, linen, wool blends, and silk are standard."
  }
];

export default function LandingPage() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(submitNewsletter, initialState);
  const autoplayPlugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  // Widget Mode State: 'scan' | 'try-on'
  const [widgetMode, setWidgetMode] = useState<'scan' | 'try-on'>('scan');

  // AI Scanner Simulator States
  const [selectedModel, setSelectedModel] = useState<ScannerModel>(scannerModels[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanPhase, setScanPhase] = useState('');
  const [scanComplete, setScanComplete] = useState(false);
  const [revealedMetrics, setRevealedMetrics] = useState<string[]>([]);

  // Try On States
  const [selectedGarment, setSelectedGarment] = useState<Garment>(scannerModels[0].garments[0]);
  const [currentDisplayImage, setCurrentDisplayImage] = useState(scannerModels[0].baseImage);
  const [isDraping, setIsDraping] = useState(false);
  const [drapeLog, setDrapeLog] = useState('');

  // Features Explorer Tab States
  const [activeTab, setActiveTab] = useState('scan');

  // Pricing Cycle State
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  // FAQs Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Sync displayed image on model change
  useEffect(() => {
    if (widgetMode === 'scan') {
      setCurrentDisplayImage(selectedModel.baseImage);
      setScanComplete(false);
      setRevealedMetrics([]);
    } else {
      const defaultGarment = selectedModel.garments[0];
      setSelectedGarment(defaultGarment);
      setCurrentDisplayImage(defaultGarment.image);
      setIsDraping(false);
    }
  }, [selectedModel, widgetMode]);

  // Handle Newsletter State Triggers
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

  // AI Scanner Simulation Trigger
  const triggerAIScan = () => {
    if (isScanning) return;
    
    setIsScanning(true);
    setScanComplete(false);
    setScanProgress(0);
    setRevealedMetrics([]);
    
    const phases = [
      { progress: 15, text: 'Detecting body contours...' },
      { progress: 40, text: 'Mapping skeletal joints...' },
      { progress: 70, text: 'Extracting 3D volume mesh...' },
      { progress: 90, text: 'Comparing with sizing indices...' },
      { progress: 100, text: 'Bespoke blueprint complete!' }
    ];

    let currentPhaseIdx = 0;
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        const nextProgress = prev + 5;
        if (currentPhaseIdx < phases.length && nextProgress >= phases[currentPhaseIdx].progress) {
          setScanPhase(phases[currentPhaseIdx].text);
          currentPhaseIdx++;
        }
        
        if (nextProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
            setScanComplete(true);
            revealMetricsGradually();
          }, 300);
          return 100;
        }
        return nextProgress;
      });
    }, 70);
  };

  const revealMetricsGradually = () => {
    const keys = Object.keys(selectedModel.measurements);
    keys.forEach((key, idx) => {
      setTimeout(() => {
        setRevealedMetrics(prev => [...prev, key]);
      }, idx * 200);
    });
  };

  // Try-On Synthesis Trigger
  const triggerTryOn = (garment: Garment) => {
    if (isDraping) return;
    setSelectedGarment(garment);
    setIsDraping(true);

    const logs = [
      'Initializing cloth simulation solver...',
      'Deconstructing 3D fabric meshes...',
      'Calculating collision boundaries...',
      'Draping nodes (14,400 vertices)...',
      'Synthesizing shadow & texture maps...',
      'Perfect fit generated!'
    ];

    let step = 0;
    setDrapeLog(logs[0]);

    const logInterval = setInterval(() => {
      step++;
      if (step < logs.length) {
        setDrapeLog(logs[step]);
      } else {
        clearInterval(logInterval);
        setCurrentDisplayImage(garment.image);
        setIsDraping(false);
      }
    }, 400);
  };

  const selectModelHandler = (model: ScannerModel) => {
    if (isScanning || isDraping) return;
    setSelectedModel(model);
    setScanComplete(false);
    setRevealedMetrics([]);
  };

  // Word-by-word reveal for title
  const titleWords = "Crafted to Perfection Guided by AI.".split(" ");

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden relative">
      
      {/* Dynamic Background Floating/Morphing Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 -right-60 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[140px]"
          animate={{
            x: [0, -100, 50, 0],
            y: [0, 80, -70, 0],
            scale: [1, 0.85, 1.15, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 left-1/4 w-[450px] h-[450px] bg-purple-900/10 rounded-full blur-[100px]"
          animate={{
            x: [0, 50, -60, 0],
            y: [0, 60, -40, 0],
            scale: [1, 1.1, 0.85, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header / Sticky Glass Nav */}
      <header className="px-4 lg:px-8 h-20 flex items-center bg-slate-950/60 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-900 shadow-xl shadow-purple-500/[0.01]">
        <div className="container mx-auto flex items-center justify-between w-full relative z-10">
          <Link href="/" className="flex items-center justify-center hover:scale-[1.03] transition-transform duration-300">
            <Logo />
            <span className="sr-only">PerfectFit</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-slate-300">
            <a href="#vision" className="hover:text-purple-400 transition-colors relative group py-1">
              Our Vision
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-purple-500 group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#features" className="hover:text-purple-400 transition-colors relative group py-1">
              Platform Features
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-purple-500 group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#how-it-works" className="hover:text-purple-400 transition-colors relative group py-1">
              Workflow
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-purple-500 group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#pricing" className="hover:text-purple-400 transition-colors relative group py-1">
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-purple-500 group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#testimonials" className="hover:text-purple-400 transition-colors relative group py-1">
              Reviews
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-purple-500 group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#faq" className="hover:text-purple-400 transition-colors relative group py-1">
              FAQ
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-purple-500 group-hover:w-full transition-all duration-300" />
            </a>
          </nav>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <AuthDialog triggerClassName="bg-gradient-to-r from-fuchsia-500 via-purple-600 to-purple-700 hover:from-fuchsia-600 hover:to-purple-800 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transform hover:scale-[1.04] active:scale-95 transition-all duration-300 font-bold px-4 py-2.5 text-sm rounded-xl" />
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        
        {/* Hero Section */}
        <section className="relative w-full py-12 lg:py-24 text-left overflow-hidden bg-transparent">
          <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Hero Call To Action */}
              <div className="lg:col-span-6 space-y-8 flex flex-col justify-center">
                <div className="space-y-4">
                  {/* Floating Glowing Badge */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-xl hover:border-purple-500/50 transition-all duration-300 w-fit cursor-default"
                  >
                    <Sparkles className="h-4 w-4 text-fuchsia-400 animate-pulse" />
                    <span className="text-xs font-semibold tracking-wide bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">AI Spatial Tailoring V2.0</span>
                  </motion.div>
                  
                  {/* Word-by-word staggered reveal heading */}
                  <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-tight lg:leading-[1.1] text-white">
                    <motion.span 
                      initial="hidden" 
                      animate="visible"
                      variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.08 } }
                      }}
                      className="inline-block"
                    >
                      {titleWords.map((word, index) => (
                        <motion.span 
                          key={index} 
                          className="inline-block mr-2"
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                          }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-500 relative inline-block py-1">
                      Perfect Sizing Guarantee.
                      <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 rounded" />
                    </span>
                  </h1>
                </div>
                
                <p className="max-w-xl text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                  Revolutionary computer vision estimates 3D contour landmarks from one photo. Stitch customized luxury attire handcrafted to your exact shape. Rotate, swap, and own your fit.
                </p>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <Link href="/signup">
                    <Button size="lg" className="relative overflow-hidden w-full sm:w-auto bg-gradient-to-r from-fuchsia-500 via-purple-600 to-purple-700 hover:from-fuchsia-600 hover:to-purple-800 text-white shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 transform hover:scale-[1.05] active:scale-95 transition-all duration-300 font-bold px-8 py-7 rounded-2xl text-base group">
                      <span className="relative z-10 flex items-center justify-center">
                        Launch Your Scan
                        <Sparkles className="ml-2 h-5 w-5 animate-pulse" />
                      </span>
                      <span className="absolute inset-0 bg-white/10 translate-y-[-100%] group-hover:translate-y-[0%] transition-transform duration-500" />
                    </Button>
                  </Link>
                  <a href="#how-it-works">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-800 hover:border-purple-500/50 hover:bg-purple-950/20 text-slate-200 transform hover:scale-[1.05] active:scale-95 transition-all duration-300 font-bold px-8 py-7 rounded-2xl text-base backdrop-blur-md">
                      Explore Framework
                      <ChevronRight className="ml-1 h-5 w-5" />
                    </Button>
                  </a>
                </div>

                {/* Trust Proof */}
                <div className="flex items-center gap-6 pt-4 border-t border-slate-900/60 max-w-lg">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(n => (
                      <Avatar key={n} className="border-2 border-slate-950 w-9 h-9">
                        <AvatarImage src={`https://images.unsplash.com/photo-${1500000000000 + n * 100000}?auto=format&fit=crop&q=80&w=100`} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 font-light mt-0.5">Stitched with 99.6% tailoring precision & zero-returns guarantee</p>
                  </div>
                </div>
              </div>

              {/* Interactive Hero AI Widget (Try-On and Scanner) */}
              <div className="lg:col-span-6 flex justify-center items-center">
                <div className="w-full max-w-md bg-slate-900/40 border border-slate-800 p-6 rounded-3xl backdrop-blur-2xl relative shadow-2xl shadow-purple-500/[0.03] group/widget hover:border-slate-700/80 transition-all duration-500">
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white text-[10px] font-bold tracking-wider px-3 py-1 rounded-full shadow-lg">
                    LIVE CORE WIDGET
                  </div>
                  
                  {/* Mode Selector Tabs inside Widget */}
                  <div className="flex bg-slate-950/80 border border-slate-800 p-1 rounded-xl mb-4">
                    <button
                      onClick={() => setWidgetMode('scan')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                        widgetMode === 'scan'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Camera className="w-3.5 h-3.5" />
                      1. AI Body Scan
                    </button>
                    <button
                      onClick={() => setWidgetMode('try-on')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                        widgetMode === 'try-on'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Shirt className="w-3.5 h-3.5" />
                      2. Virtual Try-On
                    </button>
                  </div>



                  {/* Frame Container */}
                  <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/50 group/img">
                    {/* Main visual graphic */}
                    <motion.div
                      key={currentDisplayImage}
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                    >
                      <Image 
                        src={currentDisplayImage} 
                        alt="Display model" 
                        fill 
                        className={`object-cover transition-all duration-700 ${
                          isScanning || isDraping ? 'brightness-[0.3] contrast-[1.2]' : 'brightness-90 hover:scale-105'
                        }`}
                      />
                    </motion.div>
                    
                    {/* Laser Scanner animation effect */}
                    <AnimatePresence>
                      {isScanning && (
                        <motion.div 
                          className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_20px_4px_rgba(168,85,247,0.9)] z-20"
                          initial={{ top: '0%' }}
                          animate={{ top: ['0%', '100%', '0%'] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Matrix overlay when synthesizing Try-On */}
                    <AnimatePresence>
                      {isDraping && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.3 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-[linear-gradient(to_right,#a855f7_1px,transparent_1px),linear-gradient(to_bottom,#a855f7_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] z-20 pointer-events-none"
                        />
                      )}
                    </AnimatePresence>

                    {/* Scanner progress state overlay */}
                    {isScanning && (
                      <div className="absolute inset-0 bg-slate-950/60 z-10 flex flex-col items-center justify-center p-4">
                        <Loader2 className="w-8 h-8 text-purple-400 animate-spin mb-3" />
                        <div className="text-xs font-semibold text-purple-200 mb-1">{scanPhase}</div>
                        <div className="w-2/3 bg-slate-800 h-1 rounded-full overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-fuchsia-500 to-purple-500 h-full rounded-full transition-all duration-100"
                            style={{ width: `${scanProgress}%` }}
                          />
                        </div>
                        <div className="text-[9px] text-slate-500 mt-1 font-mono">{scanProgress}% Computed</div>
                      </div>
                    )}

                    {/* Try-on loading state overlay */}
                    {isDraping && (
                      <div className="absolute inset-0 bg-slate-950/70 z-10 flex flex-col items-center justify-center p-4">
                        <Wand2 className="w-8 h-8 text-fuchsia-400 animate-bounce mb-3" />
                        <div className="text-xs font-semibold text-fuchsia-300 mb-1">Synthesizing Outfit...</div>
                        <div className="text-[10px] text-slate-400 font-mono text-center max-w-[200px] border border-slate-800 p-2 rounded bg-slate-950">
                          {drapeLog}
                        </div>
                      </div>
                    )}

                    {/* Scan complete markers overlay */}
                    {scanComplete && widgetMode === 'scan' && (
                      <div className="absolute inset-0 z-10 pointer-events-none">
                        <div className="absolute inset-0 bg-slate-950/25" />
                        
                        {/* Measuring Points & Horizontal Lines */}
                        {revealedMetrics.includes('Shoulders') && (
                          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 flex items-center justify-between w-[55%] animate-in fade-in duration-300">
                            <span className="w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_#c084fc] animate-ping absolute left-0" />
                            <span className="w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_#c084fc] absolute left-0" />
                            <div className="h-[1px] bg-dashed border-t border-purple-500/50 flex-grow mx-1" />
                            <span className="bg-slate-900/95 border border-purple-500/60 px-1.5 py-0.5 rounded text-[9px] font-bold text-purple-300 shadow">
                              Shoulder: {selectedModel.measurements.Shoulders}
                            </span>
                            <div className="h-[1px] bg-dashed border-t border-purple-500/50 flex-grow mx-1" />
                            <span className="w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_#c084fc] animate-ping absolute right-0" />
                            <span className="w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_#c084fc] absolute right-0" />
                          </div>
                        )}
                        {revealedMetrics.includes('Chest') && (
                          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 flex items-center justify-between w-[65%] animate-in fade-in duration-300">
                            <span className="w-2 h-2 bg-purple-400 rounded-full absolute left-0" />
                            <div className="h-[1px] bg-dashed border-t border-purple-500/50 flex-grow mx-1" />
                            <span className="bg-slate-900/95 border border-purple-500/60 px-1.5 py-0.5 rounded text-[9px] font-bold text-purple-300 shadow">
                              Chest/Bust: {selectedModel.measurements.Chest || selectedModel.measurements.Bust}
                            </span>
                            <div className="h-[1px] bg-dashed border-t border-purple-500/50 flex-grow mx-1" />
                            <span className="w-2 h-2 bg-purple-400 rounded-full absolute right-0" />
                          </div>
                        )}
                        {revealedMetrics.includes('Waist') && (
                          <div className="absolute top-[50%] left-1/2 -translate-x-1/2 flex items-center justify-between w-[50%] animate-in fade-in duration-300">
                            <span className="w-2 h-2 bg-purple-400 rounded-full absolute left-0" />
                            <div className="h-[1px] bg-dashed border-t border-purple-500/50 flex-grow mx-1" />
                            <span className="bg-slate-900/95 border border-purple-500/60 px-1.5 py-0.5 rounded text-[9px] font-bold text-purple-300 shadow">
                              Waist: {selectedModel.measurements.Waist}
                            </span>
                            <div className="h-[1px] bg-dashed border-t border-purple-500/50 flex-grow mx-1" />
                            <span className="w-2 h-2 bg-purple-400 rounded-full absolute right-0" />
                          </div>
                        )}
                        {revealedMetrics.includes('Hips') && (
                          <div className="absolute top-[62%] left-1/2 -translate-x-1/2 flex items-center justify-between w-[60%] animate-in fade-in duration-300">
                            <span className="w-2 h-2 bg-purple-400 rounded-full absolute left-0" />
                            <div className="h-[1px] bg-dashed border-t border-purple-500/50 flex-grow mx-1" />
                            <span className="bg-slate-900/95 border border-purple-500/60 px-1.5 py-0.5 rounded text-[9px] font-bold text-purple-300 shadow">
                              Hips: {selectedModel.measurements.Hips}
                            </span>
                            <div className="h-[1px] bg-dashed border-t border-purple-500/50 flex-grow mx-1" />
                            <span className="w-2 h-2 bg-purple-400 rounded-full absolute right-0" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions / Output Metrics Details */}
                  <div className="mt-4 space-y-3">
                    
                    {widgetMode === 'scan' ? (
                      <>
                        {!scanComplete && !isScanning && (
                          <Button 
                            onClick={triggerAIScan} 
                            className="w-full bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-purple-600 hover:to-fuchsia-700 text-white font-bold rounded-xl py-5 transition-transform active:scale-95"
                          >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Synthesize Scan Blueprint
                          </Button>
                        )}
                        {(isScanning || scanComplete) && (
                          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 space-y-2.5">
                            <div className="flex items-center justify-between text-xs border-b border-slate-900 pb-1.5">
                              <span className="text-slate-400">Target Profile:</span>
                              <span className="font-semibold text-slate-200">{selectedModel.name}</span>
                            </div>
                            
                            {scanComplete && (
                              <>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                                  {Object.entries(selectedModel.measurements).map(([key, val]) => (
                                    <div key={key} className="flex justify-between py-0.5">
                                      <span className="text-slate-400">{key}:</span>
                                      <span className="font-bold text-purple-300">{val}</span>
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-2 pt-2 border-t border-slate-900 grid grid-cols-2 gap-2">
                                  <div className="bg-purple-950/20 border border-purple-500/30 rounded p-1.5 text-center">
                                    <div className="text-[9px] text-slate-400">Mesh Match</div>
                                    <div className="text-xs font-black text-green-400">{selectedModel.confidence}</div>
                                  </div>
                                  <div className="bg-fuchsia-950/20 border border-fuchsia-500/30 rounded p-1.5 text-center">
                                    <div className="text-[9px] text-slate-400">Rec. Fit Size</div>
                                    <div className="text-xs font-black text-fuchsia-300">{selectedModel.recommendedSize.split(' ')[0]}</div>
                                  </div>
                                </div>
                              </>
                            )}
                            
                            {isScanning && (
                              <div className="text-center py-6 text-xs text-slate-400 italic">
                                Isolating postural variables...
                              </div>
                            )}
                          </div>
                        )}
                        {scanComplete && (
                          <Button 
                            onClick={triggerAIScan}
                            variant="outline" 
                            className="w-full border-slate-800 hover:bg-slate-950 text-xs py-3"
                          >
                            <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                            Recalibrate Scanner
                          </Button>
                        )}
                      </>
                    ) : (
                      /* Virtual Try-On Controls */
                      <div className="space-y-3">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Select Garment Cut:</span>
                        <div className="grid grid-cols-3 gap-2">
                          {selectedModel.garments.map((garment) => (
                            <button
                              key={garment.id}
                              onClick={() => triggerTryOn(garment)}
                              disabled={isDraping}
                              className={`p-2 rounded-xl text-left border transition-all duration-300 ${
                                selectedGarment.id === garment.id
                                  ? 'bg-fuchsia-500/10 border-fuchsia-500/50 text-fuchsia-300'
                                  : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700'
                              }`}
                            >
                              <div className="text-[10px] font-bold truncate text-slate-200">{garment.name.split(' ')[1] || garment.name}</div>
                              <div className="text-[8px] text-slate-500 truncate leading-normal">{garment.name.split(' ')[0]}</div>
                            </button>
                          ))}
                        </div>
                        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-[11px] text-slate-300 leading-relaxed">
                          <span className="font-semibold text-slate-100">{selectedGarment.name}:</span> {selectedGarment.description}
                        </div>
                      </div>
                    )}
                    
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* Brand Social Proof Strip */}
        <section className="py-10 bg-slate-950/60 border-y border-slate-900/60 relative">
          <div className="container mx-auto px-4 text-center max-w-6xl">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-6">Featured inside premier digital spaces</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center opacity-30 grayscale contrast-200">
              <span className="text-lg font-serif font-black tracking-tighter hover:opacity-100 hover:grayscale-0 hover:text-white transition-all cursor-default">VOGUE</span>
              <span className="text-xl font-sans font-extrabold tracking-tight hover:opacity-100 hover:grayscale-0 hover:text-white transition-all cursor-default">GQ</span>
              <span className="text-base font-mono font-bold hover:opacity-100 hover:grayscale-0 hover:text-green-400 transition-all cursor-default">TechCrunch</span>
              <span className="text-lg font-sans font-black tracking-widest hover:opacity-100 hover:grayscale-0 hover:text-red-500 transition-all cursor-default">WIRED</span>
              <span className="text-lg font-serif font-semibold hover:opacity-100 hover:grayscale-0 hover:text-white transition-all cursor-default">Forbes</span>
            </div>
          </div>
        </section>

        {/* Our Vision Section */}
        <section id="vision" className="w-full py-24 sm:py-32 relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900/20">
          <div className="container px-4 sm:px-6 relative mx-auto max-w-5xl text-center">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="inline-flex rounded-full bg-purple-500/10 px-4 py-1.5 border border-purple-500/20 backdrop-blur-xl items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-purple-400 animate-bounce" />
                  <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest">Our Vision</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Sustainable Luxury. Perfect Sizing.
                </h2>
                <p className="max-w-3xl text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-light">
                  We believe clothing should adjust to your posture, not the other way around. By merging heritage tailoring precision with spatial AI modeling, we are building a zero-waste, personalized wardrobe rotation that guarantees ultimate body confidence.
                </p>
              </div>
            </ScrollReveal>
            
            {/* Vision Grid details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
              {[
                { icon: Smartphone, title: "Zero Hassle Scan", desc: "No physical measuring tapes or trial rooms. Take one picture, computed securely in 3 seconds." },
                { icon: Scale, title: "Zero Fabric Waste", desc: "Crafted strictly on-demand to your exact dimensions, removing warehouse overstock waste." },
                { icon: Sparkle, title: "Monogram Customs", desc: "Select designer collars, premium cuffs, and custom monogram initials in our catalog." }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={idx} delay={idx * 0.1}>
                    <div className="group/visioncard bg-slate-900/30 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-sm hover:border-purple-500/30 hover:bg-slate-900/50 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-purple-500/[0.02] rounded-full group-hover/visioncard:bg-purple-500/[0.05] transition-colors duration-500" />
                      <div className="w-10 h-10 rounded-lg bg-purple-950/50 border border-purple-500/30 flex items-center justify-center mb-4 text-purple-400 group-hover/visioncard:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-bold text-slate-200 mb-2 group-hover/visioncard:text-white transition-colors">{item.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Feature Explorer (Interactive Tabs Section) */}
        <section id="features" className="w-full py-24 sm:py-32 relative overflow-hidden bg-slate-950">
          <div className="container px-4 lg:px-8 mx-auto max-w-7xl">
            
            <ScrollReveal>
              <div className="text-center space-y-4 mb-16">
                <div className="inline-flex rounded-full bg-purple-500/10 px-4 py-1.5 border border-purple-500/20 backdrop-blur-xl items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-400" />
                  <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest">Platform Capabilities</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                  Engineered for Custom Wardrobes
                </h2>
                <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base leading-relaxed font-light">
                  Discover the deep technology layers that transform simple pictures into custom wardrobe items.
                </p>
              </div>
            </ScrollReveal>

            {/* Custom Tab buttons */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-3xl mx-auto mb-10 bg-slate-900/60 p-2 rounded-2xl border border-slate-800 relative z-20">
              {[
                { id: 'scan', label: 'AI Scan Engine', icon: Camera },
                { id: 'tailor', label: 'Bespoke Blueprint', icon: Scissors },
                { id: 'closet', label: 'Subscription Vault', icon: Shirt },
                { id: 'fitness', label: 'Fit Metrics Track', icon: Ruler }
              ].map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className="relative flex items-center gap-2 px-4 py-3 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 overflow-hidden"
                  >
                    {activeTab === t.id && (
                      <motion.span 
                        layoutId="activeFeatureTab"
                        className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/15 to-purple-600/15 border-purple-500/60 border rounded-xl"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${activeTab === t.id ? 'text-purple-300' : 'text-slate-400 hover:text-slate-200'}`}>
                      <Icon className="w-4 h-4" />
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tab contents panel */}
            <div className="bg-slate-900/30 border border-slate-800 p-6 md:p-10 rounded-3xl backdrop-blur-md max-w-5xl mx-auto relative z-10">
              <AnimatePresence mode="wait">
                {activeTab === 'scan' && (
                  <motion.div 
                    key="scan"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                  >
                    <div className="lg:col-span-7 space-y-4">
                      <div className="text-xs font-semibold text-purple-400 uppercase tracking-widest">3D Shape Recognition</div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">Advanced Computer Vision Mesh</h3>
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
                        Our scanner uses neural processing pipelines to build a spatial representation of your proportions. By locating anthropometric landmarks (hips, clavicle, kneecap) relative to camera focal planes, it derives a personalized scale.
                      </p>
                      <ul className="space-y-2 text-xs md:text-sm text-slate-400 font-light">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4.5 h-4.5 text-purple-400" />
                          <span>10+ core structural measurements derived in under 3 seconds</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4.5 h-4.5 text-purple-400" />
                          <span>Automatic garment thickness offset calculation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4.5 h-4.5 text-purple-400" />
                          <span>GDPR-compliant locally anonymized processing</span>
                        </li>
                      </ul>
                    </div>
                    <div className="lg:col-span-5 bg-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between aspect-video relative overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-35" />
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono z-10">
                        <span>SYS_SCAN_V2: RUNNING</span>
                        <span>ERRORS: 0</span>
                      </div>
                      <div className="h-1 bg-purple-500/50 w-full rounded my-auto relative animate-pulse">
                        <div className="absolute -top-3 left-[40%] bg-purple-500 text-white text-[8px] px-1.5 rounded font-mono">CONTOUR_LOCATED</div>
                      </div>
                      <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono z-10">
                        <span>VERTICES: 12,800</span>
                        <span>MATCH_RATE: 99.42%</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'tailor' && (
                  <motion.div 
                    key="tailor"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                  >
                    <div className="lg:col-span-7 space-y-4">
                      <div className="text-xs font-semibold text-purple-400 uppercase tracking-widest">Heritage Craftsmanship</div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">Handcrafted Tailoring Blueprint</h3>
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
                        Once measurements are confirmed, our digital blueprint layout optimizes panel cuts directly on your selected fabric. Master tailors assemble each piece using traditional sewing patterns and durable, top-grade interlinings.
                      </p>
                      <ul className="space-y-2 text-xs md:text-sm text-slate-400 font-light">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4.5 h-4.5 text-purple-400" />
                          <span>Customized collar stiffness, cuff styles, and pocket placements</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4.5 h-4.5 text-purple-400" />
                          <span>120+ stitches per inch for unmatched seam durability</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4.5 h-4.5 text-purple-400" />
                          <span>Premium cotton, cashmere, wool, and structured linen blends</span>
                        </li>
                      </ul>
                    </div>
                    <div className="lg:col-span-5 bg-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between aspect-video relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/20 to-transparent pointer-events-none" />
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                        <span>FABRIC: MERINO_WOOL</span>
                        <span>SHADE: NAVY</span>
                      </div>
                      <div className="border border-dashed border-slate-700/60 p-4 rounded-lg flex items-center justify-center my-auto">
                        <Scissors className="w-8 h-8 text-fuchsia-400 animate-bounce" />
                        <span className="text-xs text-slate-400 ml-3 font-mono">OPTIMIZING CUT LINES...</span>
                      </div>
                      <div className="text-[9px] text-slate-500 text-right font-mono">
                        STITCHES: DOUBLE_LOCK_SEAM
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'closet' && (
                  <motion.div 
                    key="closet"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                  >
                    <div className="lg:col-span-7 space-y-4">
                      <div className="text-xs font-semibold text-purple-400 uppercase tracking-widest">SaaS Wardrobe Rotation</div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">Smart Rotational Closet Subscription</h3>
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
                        Elevate your everyday styles without cluttered closets. Access designer pieces on rotation. Receive clean items, keep them as long as you want, and swap whenever you seek a refresh.
                      </p>
                      <ul className="space-y-2 text-xs md:text-sm text-slate-400 font-light">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4.5 h-4.5 text-purple-400" />
                          <span>Includes eco-friendly professional dry cleaning</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4.5 h-4.5 text-purple-400" />
                          <span>Prepaid return garment bags shipped with every order</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4.5 h-4.5 text-purple-400" />
                          <span>No lock-in contracts: pause or adjust credits at any time</span>
                        </li>
                      </ul>
                    </div>
                    <div className="lg:col-span-5 bg-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between aspect-video relative overflow-hidden">
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                        <span>ROTATION_CREDITS</span>
                        <span>USED: 2 / 4</span>
                      </div>
                      <div className="flex justify-around items-center my-auto gap-2">
                        <div className="bg-slate-900 border border-slate-800 p-2 rounded text-center w-20">
                          <Shirt className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                          <div className="text-[8px] text-slate-400">Blazer</div>
                          <div className="text-[9px] text-green-400 font-bold">Active</div>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 p-2 rounded text-center w-20">
                          <Shirt className="w-5 h-5 text-fuchsia-400 mx-auto mb-1" />
                          <div className="text-[8px] text-slate-400">Dress</div>
                          <div className="text-[9px] text-green-400 font-bold">Active</div>
                        </div>
                        <div className="bg-slate-900 border border-dashed border-slate-800 p-2 rounded text-center w-20 opacity-40">
                          <PlusCircle className="w-5 h-5 text-slate-500 mx-auto mb-1" />
                          <div className="text-[8px] text-slate-400">Available</div>
                          <div className="text-[9px] text-purple-400">Select</div>
                        </div>
                      </div>
                      <div className="text-[9px] text-slate-500 font-mono">
                        NEXT_CLEANING_RECOVERY: 12_JUNE
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'fitness' && (
                  <motion.div 
                    key="fitness"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                  >
                    <div className="lg:col-span-7 space-y-4">
                      <div className="text-xs font-semibold text-purple-400 uppercase tracking-widest">Wellness and Metrics</div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">AI-Powered Body Fitness Tracker</h3>
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
                        Body shapes change over time. Our system tracks shifts in your waist, chest, and arms, adjusting tailoring files automatically. Receive nutritional tips and workouts designed around your structural body goals.
                      </p>
                      <ul className="space-y-2 text-xs md:text-sm text-slate-400 font-light">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4.5 h-4.5 text-purple-400" />
                          <span>Historical measurement graphs showing contour shifts</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4.5 h-4.5 text-purple-400" />
                          <span>Fit adjustment alerts prior to bespoke garment sewing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4.5 h-4.5 text-purple-400" />
                          <span>Dynamic workouts adjusted to target posture optimization</span>
                        </li>
                      </ul>
                    </div>
                    <div className="lg:col-span-5 bg-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between aspect-video relative overflow-hidden">
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                        <span>WAIST_TRACKER: 3_MONTHS</span>
                        <span>SHIFT: -1.2 IN</span>
                      </div>
                      <div className="flex items-end justify-between h-20 px-4 mt-2">
                        <div className="bg-purple-900/60 w-6 h-12 rounded-t" />
                        <div className="bg-purple-700/60 w-6 h-10 rounded-t" />
                        <div className="bg-fuchsia-500/80 w-6 h-8 rounded-t relative">
                          <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] text-fuchsia-300 font-bold">31.0&quot;</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-[8px] text-slate-500 font-mono px-2">
                        <span>MARCH</span>
                        <span>APRIL</span>
                        <span>MAY (CURRENT)</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-24 sm:py-32 relative overflow-hidden bg-slate-950/60 border-y border-slate-900/60">
          <div className="container px-4 sm:px-6 relative mx-auto max-w-6xl">
            
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-20">
                <div className="inline-flex rounded-full bg-purple-500/10 px-4 py-1.5 border border-purple-500/20 backdrop-blur-xl items-center gap-2">
                  <Wand2 className="h-4 w-4 text-purple-400" />
                  <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest">Our Flow</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Three Steps to Tailored Elegance
                </h2>
                <p className="max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed font-light">
                  Getting custom clothing crafted has never been simpler. Follow our modern digital workflow.
                </p>
              </div>
            </ScrollReveal>

            <div className="mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl">
              {/* Connecting glowing line for desktops */}
              <div className="absolute top-[40%] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-purple-500/10 via-fuchsia-500/40 to-purple-500/10 hidden md:block -z-10" />
              
              {[
                { 
                  num: '01', 
                  title: 'Visual Scan', 
                  desc: 'Capture a single front-facing photo on your phone. Our AI automatically handles the rest.' 
                },
                { 
                  num: '02', 
                  title: 'Browse & Adapt', 
                  desc: 'Select premium tailoring configurations (lapel width, monogram tags) tailored for you.' 
                },
                { 
                  num: '03', 
                  title: 'Receive & Rotate', 
                  desc: 'Receive your custom-tailored garment at your door, ready for rotation and swaps.' 
                },
              ].map((step, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.15}>
                  <div 
                    className="group/stepcard relative flex flex-col items-center space-y-4 p-6 rounded-2xl bg-slate-900/30 border border-slate-900 hover:border-purple-500/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-slate-900/50"
                  >
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-purple-500/10 group-hover/stepcard:bg-purple-500/20 border border-purple-500/30 group-hover/stepcard:border-purple-500/60 transition-all duration-300"></div>
                      <div className="relative text-lg font-black bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-full w-12 h-12 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover/stepcard:scale-105 transition-transform duration-300">
                        {step.num}
                      </div>
                    </div>
                    
                    <h3 className="text-base sm:text-lg font-bold text-slate-200 group-hover/stepcard:text-white transition-colors">{step.title}</h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed text-center font-light">{step.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-24 sm:py-32 relative overflow-hidden bg-slate-950">
          <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
            
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                <div className="inline-flex rounded-full bg-purple-500/10 px-4 py-1.5 border border-purple-500/20 backdrop-blur-xl items-center gap-2">
                  <Award className="h-4 w-4 text-purple-400 animate-spin" />
                  <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest">Subscription Models</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Choose Your Style Rotation
                </h2>
                <p className="max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed font-light">
                  Upgrade your wardrobe rotations with our tailored plans. Save 20% on annual commitments.
                </p>

                {/* Billing Cycle Toggle with sliding indicator */}
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl mt-8 relative">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className="relative px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 overflow-hidden"
                  >
                    {billingCycle === 'monthly' && (
                      <motion.span 
                        layoutId="activeBillingIndicator"
                        className="absolute inset-0 bg-slate-950 border border-slate-800 shadow rounded-xl"
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    )}
                    <span className={`relative z-10 ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}>
                      Monthly Billing
                    </span>
                  </button>
                  
                  <button
                    onClick={() => setBillingCycle('yearly')}
                    className="relative px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all duration-300 overflow-hidden"
                  >
                    {billingCycle === 'yearly' && (
                      <motion.span 
                        layoutId="activeBillingIndicator"
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/15 to-fuchsia-500/15 border-purple-500/30 border rounded-xl"
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    )}
                    <span className={`relative z-10 flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'text-purple-300' : 'text-slate-400 hover:text-slate-200'}`}>
                      Annual Billing
                      <span className="bg-fuchsia-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">Save 20%</span>
                    </span>
                  </button>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
              {plans.map((plan, idx) => {
                const currentPrice = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
                return (
                  <ScrollReveal key={plan.name} delay={idx * 0.1}>
                    <div 
                      className={`group/pricecard relative rounded-3xl overflow-hidden backdrop-blur-xl border transition-all duration-300 flex flex-col ${
                        plan.popular 
                          ? 'border-purple-500/80 shadow-2xl shadow-purple-500/[0.04] lg:scale-[1.03] bg-gradient-to-b from-slate-900/60 to-purple-950/15' 
                          : 'border-slate-800/80 hover:border-purple-500/40 bg-slate-900/30 hover:bg-slate-900/40'
                      }`}
                    >
                      {plan.popular && (
                        <div className="relative text-center py-2.5 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white text-xs font-extrabold uppercase tracking-wider shadow">
                          <span className="inline-flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                            Most Popular Cut
                          </span>
                        </div>
                      )}
                      
                      <div className="p-6 md:p-8 text-left">
                        <h3 className="text-xl font-bold text-slate-100 mb-1">{plan.name}</h3>
                        <p className="text-xs text-slate-400 font-light mb-6 min-h-[32px]">{plan.description}</p>
                        
                        <div className="mb-6 flex items-baseline">
                          <span className="text-4xl font-black text-white">₹{currentPrice.toLocaleString()}</span>
                          <span className="text-xs text-slate-400 font-normal ml-2">/ month</span>
                        </div>
                        
                        {billingCycle === 'yearly' && (
                          <div className="text-[10px] text-green-400 font-semibold bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-md w-fit mb-4">
                            Billed annually (Save ₹{( (plan.monthlyPrice - plan.annualPrice) * 12 ).toLocaleString()}/yr)
                          </div>
                        )}
                      </div>
                      
                      <div className="px-6 md:px-8 pb-8 flex-grow border-t border-slate-900/80 pt-6">
                        <ul className="space-y-4">
                          {plan.features.map(feature => (
                            <li key={feature} className="flex items-start gap-3">
                              <Check className="h-4.5 w-4.5 text-fuchsia-400 flex-shrink-0 mt-0.5" />
                              <span className="text-slate-300 text-xs md:text-sm font-light leading-snug">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="px-6 md:px-8 pb-8">
                        <Button className={`w-full rounded-xl font-bold text-sm py-4 transition-all duration-300 ${
                          plan.popular 
                            ? 'bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/35 hover:scale-[1.02]' 
                            : 'bg-slate-950 border border-slate-800 hover:bg-slate-900 text-slate-200 hover:text-white'
                        }`} asChild>
                          <Link href="/signup">Choose {plan.name}</Link>
                        </Button>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-24 sm:py-32 relative overflow-hidden bg-slate-950/60 border-y border-slate-900/60">
          <div className="container px-4 sm:px-6 mx-auto max-w-6xl">
            
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                <div className="inline-flex rounded-full bg-purple-500/10 px-4 py-1.5 border border-purple-500/20 backdrop-blur-xl items-center gap-2">
                  <Quote className="h-4 w-4 text-purple-400 animate-bounce" />
                  <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest">Customer Praise</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Verified Sizing Success
                </h2>
                <p className="max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed font-light">
                  Discover how our technology eliminates fitting stress for busy professionals.
                </p>
              </div>
            </ScrollReveal>

            <Carousel
              plugins={[autoplayPlugin.current]}
              className="w-full max-w-4xl mx-auto"
              onMouseEnter={() => autoplayPlugin.current.stop()}
              onMouseLeave={() => autoplayPlugin.current.play()}
            >
              <CarouselContent>
                {testimonials.map((t, idx) => (
                  <CarouselItem key={idx}>
                    <div className="p-2">
                      <Card className="bg-slate-900/20 border border-slate-800 rounded-2xl backdrop-blur-md p-6 md:p-10 relative overflow-hidden group/testcard">
                        <div className="absolute top-4 right-6 text-slate-800 pointer-events-none transition-transform duration-500 group-hover/testcard:scale-105">
                          <Quote className="w-20 h-20 opacity-20" />
                        </div>
                        
                        <CardContent className="p-0 space-y-6">
                          <div className="flex items-center gap-1">
                            {[...Array(t.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-fuchsia-400 text-fuchsia-400" />
                            ))}
                          </div>
                          
                          <p className="text-slate-200 text-sm sm:text-lg leading-relaxed font-light italic relative z-10">
                            &ldquo;{t.quote}&rdquo;
                          </p>
                          
                          <div className="flex items-center gap-3 pt-2">
                            <Avatar className="w-10 h-10 border border-slate-800">
                              <AvatarImage src={t.avatar} />
                              <AvatarFallback>{t.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-bold text-white">{t.name}</div>
                              <div className="text-xs text-purple-400 font-medium">{t.role}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-900 hidden sm:flex" />
              <CarouselNext className="border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-900 hidden sm:flex" />
            </Carousel>

          </div>
        </section>

        {/* FAQs Section */}
        <section id="faq" className="w-full py-24 sm:py-32 relative overflow-hidden bg-slate-950">
          <div className="container px-4 sm:px-6 mx-auto max-w-4xl">
            
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                <div className="inline-flex rounded-full bg-purple-500/10 px-4 py-1.5 border border-purple-500/20 backdrop-blur-xl items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-purple-400" />
                  <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest">Inquiries</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Frequently Answered Questions
                </h2>
                <p className="max-w-xl text-slate-400 text-sm sm:text-base leading-relaxed font-light">
                  Have questions about scanning safety, sizing guidelines, or shipping?
                </p>
              </div>
            </ScrollReveal>

            {/* Accordion list */}
            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <ScrollReveal key={idx} delay={idx * 0.05}>
                    <div className="bg-slate-900/30 border border-slate-900 rounded-xl overflow-hidden transition-all duration-300">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-200 hover:text-white transition-colors"
                      >
                        <span className="text-xs sm:text-sm md:text-base">{faq.q}</span>
                        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-purple-400' : ''}`} />
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="border-t border-slate-950"
                          >
                            <div className="p-5 text-xs sm:text-sm text-slate-400 leading-relaxed font-light bg-slate-950/20">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="w-full py-24 sm:py-32 relative overflow-hidden bg-slate-950/60 border-t border-slate-900/60">
          <div className="container px-4 sm:px-6 relative mx-auto max-w-6xl">
            
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                <div className="inline-flex rounded-full bg-purple-500/10 px-4 py-1.5 border border-purple-500/20 backdrop-blur-xl items-center gap-2">
                  <Users className="h-4 w-4 text-purple-400" />
                  <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest">Our Team</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Minds Behind PerfectFit
                </h2>
                <p className="max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed font-light italic">
                  &ldquo;Great things in business are never done by one person. They&apos;re done by a team of people.&rdquo; — Steve Jobs
                </p>
              </div>
            </ScrollReveal>

            <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
              {[
                { name: 'Aman Antuley', role: 'Software Architect', desc: 'Designs our robust cloud operations, API systems, and Next.js interfaces.', img: '/aman-image.png' },
                { name: 'Alamin Mondal', role: 'AI & Vision Engineer', desc: 'Engineers the computer vision core and custom measurement datasets.', img: '/alamin.jpg' },
                { name: 'Iqra Shaikh', role: 'Mobile App Developer', desc: 'Crafts our iOS/Android capturing flows and virtual fitting room views.', img: '/iqra.jpg' },
              ].map((member, idx) => (
                <ScrollReveal key={member.name} delay={idx * 0.15}>
                  <div 
                    className="group/teamcard relative flex flex-col items-center text-center p-6 rounded-2xl bg-slate-900/30 border border-slate-900 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-1 hover:bg-slate-900/40"
                  >
                    <Avatar className="w-24 h-24 sm:w-28 sm:h-28 mb-4 border-2 border-purple-500/30 group-hover/teamcard:border-purple-500 transition-colors duration-500">
                      <AvatarImage src={member.img} alt={member.name} />
                      <AvatarFallback className="bg-purple-950 text-purple-300 text-lg font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h3 className="text-base sm:text-lg font-bold text-slate-200 mb-1">{member.name}</h3>
                    <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">{member.role}</p>
                    <p className="text-slate-400 text-xs leading-relaxed font-light">{member.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </section>

        {/* Newsletter / Stay in the Loop Section */}
        <section id="newsletter" className="w-full py-24 sm:py-32 relative overflow-hidden bg-slate-950">
          <div className="container relative z-10 mx-auto max-w-4xl text-center px-4 sm:px-6">
            <ScrollReveal>
              <div className="space-y-6 max-w-2xl mx-auto flex flex-col items-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Stay in the Loop
                </h2>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
                  Join our newsletter list to receive seasonal sizing trends, styling guides, and first access to new collections.
                </p>
                
                <div className="w-full max-w-md pt-4">
                  <form ref={formRef} action={formAction} className="flex flex-col sm:flex-row gap-3">
                    <Input 
                      name="email" 
                      type="email" 
                      required 
                      placeholder="Enter your professional email..."
                      className="flex-1 bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-xl px-4 py-6 text-sm focus:border-purple-500 focus:ring-purple-500/20"
                    />
                    <SubmitButton />
                  </form>
                  <p className="text-[10px] text-slate-500 font-light mt-2.5">
                    We respect your data privacy. Unsubscribe easily at any time.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>

      {/* Footer Section */}
      <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-16 relative z-10">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8">
          
          {/* Col 1: Brand details */}
          <div className="space-y-4">
            <Logo />
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Bespoke luxury styling synthesized through computer vision. Redefining modern apparel delivery pipelines.
            </p>
            <div className="flex gap-4">
              <Link href="https://www.facebook.com/profile.php?id=61579391364648" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800/80 hover:text-white hover:bg-slate-900/60 transition-colors">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="https://www.instagram.com/perfectfit_ai?igsh=ZmYzeXlsYXp0bW04" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800/80 hover:text-white hover:bg-slate-900/60 transition-colors">
                <Instagram className="h-4 w-4" />
              </Link>
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800/80 hover:text-white hover:bg-slate-900/60 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <Link href="https://www.linkedin.com/company/perfectfit-ai/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800/80 hover:text-white hover:bg-slate-900/60 transition-colors">
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Col 2: Company links */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-200 text-sm">Company</h4>
            <ul className="space-y-2 text-xs font-light">
              <li><Link href="/about" className="hover:text-purple-400 transition-colors">About Our Tailors</Link></li>
              <li><a href="#newsletter" className="hover:text-purple-400 transition-colors">Contact Support</a></li>
              <li><a href="#testimonials" className="hover:text-purple-400 transition-colors">Client Testimonials</a></li>
              <li><a href="#vision" className="hover:text-purple-400 transition-colors">Brand Mission</a></li>
            </ul>
          </div>

          {/* Col 3: Services links */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-200 text-sm">Core Platform</h4>
            <ul className="space-y-2 text-xs font-light">
              <li><a href="#features" className="hover:text-purple-400 transition-colors">AI Spatial Scan</a></li>
              <li><a href="#pricing" className="hover:text-purple-400 transition-colors">Subscription Vaults</a></li>
              <li><a href="#features" className="hover:text-purple-400 transition-colors">Measurement Analytics</a></li>
              <li><Link href="/download" className="hover:text-purple-400 transition-colors">Download Capturing App</Link></li>
            </ul>
          </div>

          {/* Col 4: Legal policy options */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-200 text-sm">Legal Terms</h4>
            <ul className="space-y-2 text-xs font-light">
              <li><Link href="/terms-of-service" className="hover:text-purple-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-purple-400 transition-colors">Data Privacy Policy</Link></li>
              <li><Link href="/return-policy" className="hover:text-purple-400 transition-colors">Fit Alteration Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="container mx-auto px-4 lg:px-8 mt-12 pt-8 border-t border-slate-900 text-center text-[10px] text-slate-600 font-light max-w-7xl">
          <p>&copy; 2026 PerfectFit Inc. All rights reserved. Precision tailoring crafted with AI and premium craftsmanship.</p>
        </div>
      </footer>
    </div>
  );
}

// Subcomponent helper icons
const PlusCircle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8" />
    <path d="M12 8v8" />
  </svg>
);
