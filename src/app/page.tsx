
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { Camera, Scissors, Ruler, Bot, Users, Star, Shirt, Award, Facebook, Twitter, Instagram, Linkedin, Sparkles, Wand2, Lightbulb, Quote, LogIn, Download } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import ChatWidget from '@/components/chat-widget';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center">
          <Logo />
          <span className="sr-only">PerfectFit</span>
        </Link>
        <nav className="ml-auto flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <Link href="/signup">
            <Button>
              <LogIn className="sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Sign In</span>
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 xl:py-48 text-center overflow-x-hidden">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:gap-8">
              <div className="flex flex-col justify-center space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter font-headline animate-fade-in-up text-rainbow bg-size-200 animate-text-rainbow">
                  The Future of Tailoring is Here.
                </h1>
                <p className="max-w-[700px] text-foreground/80 md:text-xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  PerfectFit uses cutting-edge AI to take your precise body measurements from a single photo. Get custom-fit clothing delivered to your door.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <Link href="/signup">
                    <Button size="lg">Get Started for Free</Button>
                  </Link>
                   <Link href="/download">
                    <Button size="lg" variant="outline">
                      <Download className="mr-2 h-5 w-5" />
                      Download the App
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Vision Section */}
        <section id="vision" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/40">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 animate-fade-in-up">
                    <div className="inline-flex rounded-lg bg-muted px-3 py-1 text-sm font-semibold tracking-wide items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Our Vision
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-rainbow bg-size-200 animate-text-rainbow">A New Era of Personal Style</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        We believe that fashion should be personal, sustainable, and empowering. By merging the art of traditional tailoring with the power of artificial intelligence, we're making custom-fit clothing accessible to everyone. Our vision is to eliminate the guesswork, reduce waste, and help you build a wardrobe that is uniquely yours, in every sense of the word.
                    </p>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 animate-fade-in-up">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-semibold tracking-wide flex items-center gap-2">
                <Sparkles className="h-4 w-4"/>
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-rainbow bg-size-200 animate-text-rainbow">Why Choose PerfectFit?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We blend the timeless art of tailoring with the precision of artificial intelligence to deliver an unmatched experience.
              </p>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-2 text-center p-4 rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-card hover:shadow-xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="mx-auto bg-primary/10 p-3 rounded-full mb-2">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold">AI-Powered Measurements</h3>
                <p className="text-sm text-muted-foreground">
                  Our advanced AI analyzes a photo to extract over 10 key body measurements with incredible accuracy. No measuring tape needed.
                </p>
              </div>
              <div className="grid gap-2 text-center p-4 rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-card hover:shadow-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                 <div className="mx-auto bg-primary/10 p-3 rounded-full mb-2">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Personalized Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Based on your unique measurements, our style engine recommends garments that will fit you perfectly from our collection.
                </p>
              </div>
              <div className="grid gap-2 text-center p-4 rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-card hover:shadow-xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="mx-auto bg-primary/10 p-3 rounded-full mb-2">
                  <Scissors className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Expert Tailoring</h3>
                <p className="text-sm text-muted-foreground">
                  Choose to buy or rent. Each purchased item is custom-made by expert tailors to your exact dimensions for a flawless fit.
                </p>
              </div>
              <div className="grid gap-2 text-center p-4 rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-card hover:shadow-xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="mx-auto bg-primary/10 p-3 rounded-full mb-2">
                  <Shirt className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Buy or Rent</h3>
                <p className="text-sm text-muted-foreground">
                  Enjoy the flexibility to either purchase timeless pieces for your wardrobe or rent outfits for special occasions.
                </p>
              </div>
              <div className="grid gap-2 text-center p-4 rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-card hover:shadow-xl animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                 <div className="mx-auto bg-primary/10 p-3 rounded-full mb-2">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Subscription Perks</h3>
                <p className="text-sm text-muted-foreground">
                  Join our subscription plans to unlock exclusive discounts, rental credits, and members-only benefits.
                </p>
              </div>
              <div className="grid gap-2 text-center p-4 rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-card hover:shadow-xl animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <div className="mx-auto bg-primary/10 p-3 rounded-full mb-2">
                  <Ruler className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Fitness & Diet Plans</h3>
                <p className="text-sm text-muted-foreground">
                  Receive AI-generated fitness and diet plans to help you achieve your body goals, in perfect synergy with your style.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/40">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3 flex flex-col items-center animate-fade-in-up">
               <div className="inline-flex rounded-lg bg-muted px-3 py-1 text-sm font-semibold tracking-wide items-center gap-2">
                  <Wand2 className="h-4 w-4" />
                  How It Works
               </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline text-rainbow bg-size-200 animate-text-rainbow">Three Simple Steps to a Perfect Fit</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Getting custom-tailored clothing has never been easier. Our process is designed for your convenience and precision.
              </p>
            </div>
            <div className="mx-auto w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              <div className="flex flex-col items-center space-y-4 p-4 rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-card hover:shadow-xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="p-4 bg-primary rounded-full text-primary-foreground font-bold text-2xl w-16 h-16 flex items-center justify-center">1</div>
                <h3 className="text-xl font-bold">Scan</h3>
                <p className="text-muted-foreground">Take a full-body photo using your smartphone. Our AI does the rest.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-4 rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-card hover:shadow-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                 <div className="p-4 bg-primary rounded-full text-primary-foreground font-bold text-2xl w-16 h-16 flex items-center justify-center">2</div>
                <h3 className="text-xl font-bold">Shop</h3>
                <p className="text-muted-foreground">Browse styles and receive personalized recommendations that are guaranteed to fit.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-4 rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-card hover:shadow-xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                 <div className="p-4 bg-primary rounded-full text-primary-foreground font-bold text-2xl w-16 h-16 flex items-center justify-center">3</div>
                <h3 className="text-xl font-bold">Wear</h3>
                <p className="text-muted-foreground">Receive your custom-made garments and enjoy the confidence of a perfect fit.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 animate-fade-in-up">
                    <div className="inline-flex rounded-lg bg-muted px-3 py-1 text-sm font-semibold tracking-wide items-center gap-2">
                      <Users className="h-4 w-4"/>
                      Our Team
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-rainbow bg-size-200 animate-text-rainbow">The Minds Behind the Fit</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        "Great things in business are never done by one person. They're done by a team of people." - Steve Jobs
                    </p>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center p-4 rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-card hover:shadow-xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <Image className="rounded-full mb-4 object-cover h-36 w-36" src="/aman-image.png" alt="Team member" width={144} height={144} />
                        <h3 className="text-xl font-bold">Aman Antuley</h3>
                        <p className="text-sm text-muted-foreground">Software Developer</p>
                        <p className="mt-2 text-sm text-muted-foreground">The architect of our seamless user experience and robust application logic.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-card hover:shadow-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                         <Image className="rounded-full mb-4 object-cover h-36 w-36" src="/alamin.jpg" alt="Team member" width={144} height={144} />
                        <h3 className="text-xl font-bold">Alamin Mondal</h3>
                        <p className="text-sm text-muted-foreground">AI/ML Engineer</p>
                         <p className="mt-2 text-sm text-muted-foreground">The mastermind behind our powerful AI, ensuring our core technology is always learning and improving.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-card hover:shadow-xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                         <Image className="rounded-full mb-4 object-cover h-36 w-36" src="/iqra.jpg" alt="Team member" width={144} height={144} />
                        <h3 className="text-xl font-bold">Iqra Shaikh</h3>
                        <p className="text-sm text-muted-foreground">App Developer</p>
                         <p className="mt-2 text-sm text-muted-foreground">The creative talent who brings our vision to life with elegant design and intuitive interfaces.</p>
                    </div>
                </div>
            </div>
        </section>

         {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/40">
          <div className="container px-4 md:px-6">
             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 animate-fade-in-up">
              <div className="inline-flex rounded-lg bg-muted px-3 py-1 text-sm font-semibold tracking-wide items-center gap-2">
                <Quote className="h-4 w-4" />
                Testimonials
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-rainbow bg-size-200 animate-text-rainbow">What Our Customers Say</h2>
               <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Don't just take our word for it. Here's what our community is saying about their PerfectFit experience.
              </p>
            </div>
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="p-6 rounded-lg border bg-card text-card-foreground transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="flex items-center gap-2 mb-4">
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                    </div>
                    <p className="text-muted-foreground mb-4">"I was skeptical about the AI measurements, but the suit I received fits better than anything I've ever owned. Magic!"</p>
                    <div className="flex items-center gap-4">
                       <Image className="rounded-full" src="https://placehold.co/40x40.png" alt="User" width={40} height={40} data-ai-hint="person"/>
                       <p className="font-semibold">- Alex J.</p>
                    </div>
                </div>
                <div className="p-6 rounded-lg border bg-card text-card-foreground transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                     <div className="flex items-center gap-2 mb-4">
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                    </div>
                    <p className="text-muted-foreground mb-4">"The convenience is a game-changer. I rented a perfect-fitting dress for a wedding without ever leaving my house."</p>
                     <div className="flex items-center gap-4">
                       <Image className="rounded-full" src="https://placehold.co/40x40.png" alt="User" width={40} height={40} data-ai-hint="person"/>
                       <p className="font-semibold">- Sarah K.</p>
                    </div>
                </div>
                <div className="p-6 rounded-lg border bg-card text-card-foreground transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                     <div className="flex items-center gap-2 mb-4">
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                    </div>
                    <p className="text-muted-foreground mb-4">"Finally, a service that understands that one size does not fit all. The quality of the fabric and tailoring is top-notch."</p>
                     <div className="flex items-center gap-4">
                       <Image className="rounded-full" src="https://placehold.co/40x40.png" alt="User" width={40} height={40} data-ai-hint="person"/>
                       <p className="font-semibold">- Michael P.</p>
                    </div>
                </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section id="newsletter" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-3 flex flex-col items-center animate-fade-in-up">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline text-rainbow bg-size-200 animate-text-rainbow">Stay in the Loop</h2>
                    <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Subscribe to our newsletter for the latest styles, offers, and updates from PerfectFit.
                    </p>
                </div>
                <div className="mx-auto w-full max-w-sm space-y-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <form className="flex space-x-2">
                        <input className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-lg flex-1" placeholder="Enter your email" type="email" />
                        <Button type="submit">Subscribe</Button>
                    </form>
                    <p className="text-xs text-muted-foreground">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary/40 text-muted-foreground py-8">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col gap-4">
                <Logo />
                <p className="text-sm">Redefining Tailoring with Artificial Intelligence.</p>
                <div className="flex gap-4">
                    <Link href="#" className="hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
                    <Link href="#" className="hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></Link>
                    <Link href="#" className="hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></Link>
                    <Link href="#" className="hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></Link>
                </div>
            </div>
            <div>
                <h4 className="font-semibold mb-4 text-foreground">Company</h4>
                <ul className="space-y-2">
                    <li><Link href="#team" className="text-sm hover:text-primary transition-colors">About Us</Link></li>
                    <li><Link href="#newsletter" className="text-sm hover:text-primary transition-colors">Contact</Link></li>
                    <li><Link href="#testimonials" className="text-sm hover:text-primary transition-colors">Testimonials</Link></li>
                </ul>
            </div>
             <div>
                <h4 className="font-semibold mb-4 text-foreground">Services</h4>
                <ul className="space-y-2">
                    <li><Link href="#features" className="text-sm hover:text-primary transition-colors">AI Measurement</Link></li>
                    <li><Link href="#features" className="text-sm hover:text-primary transition-colors">Subscriptions</Link></li>
                    <li><Link href="#features" className="text-sm hover:text-primary transition-colors">Rewards</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
                <ul className="space-y-2">
                    <li><Link href="#" className="text-sm hover:text-primary transition-colors">Terms of Service</Link></li>
                    <li><Link href="#" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link></li>
                    <li><Link href="#" className="text-sm hover:text-primary transition-colors">Return Policy</Link></li>
                </ul>
            </div>
        </div>
        <div className="container mx-auto px-4 md:px-6 mt-8 text-center text-xs">
            <p>&copy; 2025 PerfectFit Inc. All rights reserved.</p>
        </div>
      </footer>
      <ChatWidget />
    </div>
  );
}
