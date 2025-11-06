'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Gem, Recycle, Handshake, Rocket, Brain, Globe, Sparkles, Shield, Users } from 'lucide-react';
import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <div className="space-y-20 animate-fade-in-up pb-20">
      {/* Hero Section */}
      <section className="relative w-full h-[65vh] rounded-2xl overflow-hidden shadow-xl">
        <Image
          src="/about.webp"
          alt="Tailoring workshop"
          fill
          className="object-cover brightness-[0.35]"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow drop-shadow-lg">
            About PerfectFit
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-gray-200 max-w-3xl leading-relaxed">
            Blending the artistry of traditional tailoring with AI precision —
            redefining the way the world experiences fashion.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <Card className="shadow-xl border border-gray-100/20 overflow-hidden backdrop-blur-sm">
        <CardContent className="grid md:grid-cols-2 gap-12 items-center p-8 sm:p-12">
          <div>
            <h2 className="text-4xl font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
              Our Story
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Founded in <strong>2025</strong>, PerfectFit emerged with one goal — to make custom-fit
              clothing accessible to everyone. We saw the frustration in ill-fitting clothes
              and knew technology could solve it.
              <br /><br />
              Our founders — a team of fashion enthusiasts and AI engineers —
              came together to build a bridge between <strong>style and science</strong>.
              Today, we’re empowering individuals and brands to achieve personalized,
              waste-free fashion experiences.
            </p>
          </div>
          <Image
            src="https://picsum.photos/seed/perfectfit-story/700/500"
            alt="PerfectFit team"
            width={700}
            height={500}
            className="rounded-xl shadow-lg transition-transform duration-500 hover:scale-105"
          />
        </CardContent>
      </Card>

      {/* Why Choose Us Section */}
      <section className="text-center space-y-10">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
          Why Choose PerfectFit?
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Brain, label: 'AI Precision', desc: 'Smart body measurement algorithms ensure perfect accuracy.' },
            { icon: Shield, label: 'Fit Guarantee', desc: 'Every order comes with our 100% Perfect Fit Promise.' },
            { icon: Recycle, label: 'Eco Conscious', desc: 'Made-to-order production reduces waste and returns.' },
            { icon: Sparkles, label: 'Premium Quality', desc: 'Luxury fabrics and master craftsmanship, now digital.' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="p-6 rounded-xl bg-background/40 border backdrop-blur-sm hover:border-primary/40 hover:scale-105 transition-all shadow-md">
              <Icon className="w-10 h-10 mx-auto text-primary mb-3" />
              <h3 className="text-xl font-semibold">{label}</h3>
              <p className="text-muted-foreground text-sm mt-2">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <Card className="shadow-xl overflow-hidden">
        <CardContent className="grid md:grid-cols-2 gap-12 items-center p-8 sm:p-12">
          <Image
            src="https://picsum.photos/seed/ai-innovation/700/500"
            alt="AI Tailoring Innovation"
            width={700}
            height={500}
            className="rounded-xl shadow-lg md:order-2 transition-transform duration-500 hover:scale-105"
          />
          <div className="md:order-1">
            <h2 className="text-4xl font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
              Our Mission
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our mission is to make <strong>AI-powered personalization</strong> the new normal.
              By reducing fabric waste, returns, and sizing frustration, PerfectFit is paving
              the way toward sustainable, inclusive fashion for all.
              <br /><br />
              Every stitch we create reflects our belief that
              <strong> the future of fashion is smart, sustainable, and personal.</strong>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Innovation Timeline */}
      <section className="text-center space-y-10">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
          Our Journey of Innovation
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 text-muted-foreground">
          {[
            { year: '2025', text: 'Founded PerfectFit — redefining online tailoring.' },
            { year: '2026', text: 'Launched AI body measurement tool.' },
            { year: '2027', text: 'Partnered with global eco-fabric suppliers.' },
            { year: '2028', text: 'Expanded to 25+ countries, powering virtual try-ons.' },
          ].map(({ year, text }) => (
            <div key={year} className="relative p-6 rounded-xl bg-background/40 border hover:border-primary/40 transition-all shadow-md w-64">
              <h3 className="text-2xl font-semibold text-primary">{year}</h3>
              <p className="mt-2 text-sm">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="text-center space-y-8">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
          Our Core Values
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              icon: Gem,
              title: 'Quality & Craftsmanship',
              desc: 'Each garment is perfected by both machine intelligence and human artistry.',
            },
            {
              icon: Recycle,
              title: 'Sustainability',
              desc: 'Made-to-order efficiency that reduces textile waste dramatically.',
            },
            {
              icon: Handshake,
              title: 'Customer First',
              desc: 'We thrive when you feel confident — satisfaction drives every innovation.',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="space-y-3 p-6 rounded-lg bg-background/40 backdrop-blur-sm border hover:border-primary/40 transition-all duration-300 hover:scale-105 shadow-md"
            >
              <Icon className="h-12 w-12 mx-auto text-primary" />
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-muted-foreground text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <Card className="shadow-xl overflow-hidden">
        <CardContent className="space-y-8 p-8 sm:p-12 text-center">
          <Rocket className="h-14 w-14 mx-auto text-primary" />
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
            Our Vision for the Future
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            We envision a fashion ecosystem where <strong>AI, sustainability, and inclusivity</strong>
            coexist seamlessly. PerfectFit will continue to push the boundaries of personalization
            — creating fashion that celebrates individuality and protects our planet.
          </p>
        </CardContent>
      </Card>

      {/* Global Impact Section */}
      <section className="text-center space-y-10">
        <Globe className="w-14 h-14 text-primary mx-auto" />
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
          Our Global Impact
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
          PerfectFit collaborates with eco-conscious manufacturers and AI research labs across the
          globe to bring sustainable fashion to life. From India to Europe, our platform
          reduces waste by 40% and supports local tailors with AI-powered precision.
        </p>
      </section>

      {/* Team Section */}
      <Card className="shadow-xl overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
            Meet Our Team
          </CardTitle>
          <CardDescription>
            The innovators shaping the future of personalized fashion.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap justify-center gap-6 p-8">
          {[
            { name: 'Aman Antuley', role: 'Founder & CEO', img: '/aman-image.png' },
            { name: 'Alamin Mondal', role: 'AI Engineer', img: '/alamin.jpg' },
            { name: 'Shaikh Iqra', role: 'Lead Designer', img: '/iqra.jpg' },
          ].map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center space-y-3 bg-background/40 backdrop-blur-sm rounded-xl p-4 border hover:border-primary/40 transition-all duration-300 hover:scale-105 w-[200px] shadow-md"
            >
              <Image
                src={member.img}
                alt={member.name}
                width={100}
                height={100}
                className="rounded-full object-cover"
              />
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
