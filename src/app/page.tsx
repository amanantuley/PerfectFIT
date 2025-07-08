'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { Camera, Scissors, Ruler, Bot, Users, Star } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm">
        <Logo />
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 text-center bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:gap-8">
              <div className="flex flex-col justify-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  The Future of Tailoring is Here.
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto">
                  PerfectFit uses cutting-edge AI to take your precise body measurements from a single photo. Get custom-fit clothing delivered to your door.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                  <Link href="/signup">
                    <Button size="lg">Get Started for Free</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Why Choose PerfectFit?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We combine the art of traditional tailoring with the precision of artificial intelligence.
              </p>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-2 text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full mb-2">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold">AI-Powered Measurements</h3>
                <p className="text-sm text-muted-foreground">
                  Our advanced AI analyzes a photo to extract over 10 key body measurements with incredible accuracy. No measuring tape needed.
                </p>
              </div>
              <div className="grid gap-2 text-center">
                 <div className="mx-auto bg-primary/10 p-3 rounded-full mb-2">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Personalized Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Based on your unique measurements, our style engine recommends garments that will fit you perfectly from our collection.
                </p>
              </div>
              <div className="grid gap-2 text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full mb-2">
                  <Scissors className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Expert Tailoring</h3>
                <p className="text-sm text-muted-foreground">
                  Choose to buy or rent. Each purchased item is custom-made by expert tailors to your exact dimensions for a flawless fit.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Three Simple Steps to a Perfect Fit</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Getting custom-tailored clothing has never been easier.
              </p>
            </div>
            <div className="mx-auto w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-primary rounded-full text-primary-foreground font-bold text-2xl w-16 h-16 flex items-center justify-center">1</div>
                <h3 className="text-xl font-bold">Scan</h3>
                <p className="text-muted-foreground">Take a full-body photo using your smartphone. Our AI does the rest.</p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                 <div className="p-4 bg-primary rounded-full text-primary-foreground font-bold text-2xl w-16 h-16 flex items-center justify-center">2</div>
                <h3 className="text-xl font-bold">Shop</h3>
                <p className="text-muted-foreground">Browse styles and receive personalized recommendations that are guaranteed to fit.</p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                 <div className="p-4 bg-primary rounded-full text-primary-foreground font-bold text-2xl w-16 h-16 flex items-center justify-center">3</div>
                <h3 className="text-xl font-bold">Wear</h3>
                <p className="text-muted-foreground">Receive your custom-made garments and enjoy the confidence of a perfect fit.</p>
              </div>
            </div>
          </div>
        </section>

         {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">What Our Customers Say</h2>
            </div>
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="p-6 rounded-lg border bg-card">
                    <div className="flex items-center gap-2 mb-4">
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                    </div>
                    <p className="text-muted-foreground mb-4">"I was skeptical about the AI measurements, but the suit I received fits better than anything I've ever owned. Magic!"</p>
                    <p className="font-semibold">- Alex J.</p>
                </div>
                <div className="p-6 rounded-lg border bg-card">
                     <div className="flex items-center gap-2 mb-4">
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                    </div>
                    <p className="text-muted-foreground mb-4">"The convenience is a game-changer. I rented a perfect-fitting dress for a wedding without ever leaving my house."</p>
                    <p className="font-semibold">- Sarah K.</p>
                </div>
                <div className="p-6 rounded-lg border bg-card">
                     <div className="flex items-center gap-2 mb-4">
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                    </div>
                    <p className="text-muted-foreground mb-4">"Finally, a service that understands that one size does not fit all. The quality of the fabric and tailoring is top-notch."</p>
                    <p className="font-semibold">- Michael P.</p>
                </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 PerfectFit Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
