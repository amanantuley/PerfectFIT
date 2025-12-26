'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Gem,
  Recycle,
  Handshake,
  Rocket,
  Brain,
  Globe,
  Sparkles,
  Shield,
  BarChart3,
  Compass,
  Factory,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type WhyItem = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  desc: string;
};

type TimelineItem = { year: string; text: string };

type ValueItem = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
};

type StatItem = {
  label: string;
  value: string;
  detail: string;
};

type Differentiator = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
};

const WHY_ITEMS: WhyItem[] = [
  {
    icon: Brain,
    label: 'AI Precision',
    desc: 'Smart body measurement algorithms ensure perfect accuracy.',
  },
  {
    icon: Shield,
    label: 'Fit Guarantee',
    desc: 'Every order comes with our 100% Perfect Fit Promise.',
  },
  {
    icon: Recycle,
    label: 'Eco Conscious',
    desc: 'Made-to-order production reduces waste and returns.',
  },
  {
    icon: Sparkles,
    label: 'Premium Quality',
    desc: 'Luxury fabrics and master craftsmanship, now digital.',
  },
];

const STATS: StatItem[] = [
  { label: 'Delivery accuracy', value: '99.2%', detail: 'On-time, first-fit deliveries across 25+ countries.' },
  { label: 'Return reduction', value: '−38%', detail: 'Materialized through AI sizing and digital fitting.' },
  { label: 'Sustainability', value: '40% less', detail: 'Fabric waste versus conventional production.' },
  { label: 'Customer delight', value: '4.9 / 5', detail: 'Average satisfaction across enterprise partners.' },
];

const TIMELINE: TimelineItem[] = [
  { year: '2025', text: 'Founded PerfectFit to redefine how digital tailoring meets human craft.' },
  { year: '2026', text: 'Released computer-vision sizing with millimeter-level accuracy.' },
  { year: '2027', text: 'Secured global eco-fabric supply chain with traceability by design.' },
  { year: '2028', text: 'Scaled virtual try-ons to 25+ countries with localized fit models.' },
];

const VALUES: ValueItem[] = [
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
];

const DIFFERENTIATORS: Differentiator[] = [
  {
    icon: BarChart3,
    title: 'Data-backed sizing ops',
    desc: 'Dynamic fit models tuned per geography, fabric behavior, and brand standards.',
  },
  {
    icon: Compass,
    title: 'Ethical supply orchestration',
    desc: 'Transparent partner network with audited, low-waste production pipelines.',
  },
  {
    icon: Factory,
    title: 'Zero-overproduction',
    desc: 'Made-to-order manufacturing that eliminates idle inventory and markdowns.',
  },
  {
    icon: Users,
    title: 'Human-in-the-loop QA',
    desc: 'Master tailors review AI outputs for couture-level finish on every order.',
  },
];

export default function AboutUsPage() {
  return (
    <div className="space-y-20 sm:space-y-24 lg:space-y-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      {/* Hero Section */}
      <section
        className="relative w-full rounded-2xl overflow-hidden shadow-xl"
        aria-label="About PerfectFit hero"
      >
        <div className="relative h-[60vh] sm:h-[70vh]">
          <Image
            src="/about.webp"
            alt="Tailoring workshop"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
            className="object-cover object-center brightness-[0.4]"
            priority
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow drop-shadow-lg leading-tight">
            About PerfectFit
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-gray-200 max-w-2xl sm:max-w-3xl leading-relaxed">
            Where couture craftsmanship meets AI-grade precision. We build the fit infrastructure brands trust to deliver beautiful, responsible garments at scale.
          </p>
        </div>
      </section>

      {/* Performance Snapshot */}
      <Card className="shadow-xl border border-gray-100/20 overflow-hidden backdrop-blur-sm">
        <CardContent className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 p-6 sm:p-10 lg:p-12">
          {STATS.map(({ label, value, detail }) => (
            <div
              key={label}
              className="rounded-xl bg-gradient-to-b from-background/70 via-background/40 to-background/30 border border-white/10 p-5 sm:p-6 shadow-md"
            >
              <p className="text-sm uppercase tracking-wide text-muted-foreground">{label}</p>
              <p className="text-3xl sm:text-4xl font-bold mt-2 text-primary">{value}</p>
              <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Story Section */}
      <Card className="shadow-xl border border-gray-100/20 overflow-hidden backdrop-blur-sm">
        <CardContent className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center p-6 sm:p-10 lg:p-14">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
              Our Story
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Founded in <strong>2025</strong>, PerfectFit began as a response to a simple tension: bespoke quality rarely scales, and scaled production rarely fits. We believed technology could reconcile both.
              <br />
              <br />
              Our founding team of couture specialists and AI engineers engineered a fit engine that respects heritage craftsmanship while automating the tedious. Today, we power brands and ateliers to deliver personalized, waste-free experiences without compromising margin or design integrity.
            </p>
          </div>

          {/* Image wrapper needs its own relative box with stable height */}
          <div className="relative w-full h-72 sm:h-80 md:h-96">
            <Image
              src="https://picsum.photos/seed/perfectfit-story/700/500"
              alt="PerfectFit team"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-xl shadow-lg object-cover object-center transition-transform duration-500 hover:scale-105"
            />
          </div>
        </CardContent>
      </Card>

      {/* Why Choose Us */}
      <section className="text-center space-y-10 sm:space-y-14">
        <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
          Why Choose PerfectFit?
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {WHY_ITEMS.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="p-5 sm:p-6 rounded-xl bg-background/40 border backdrop-blur-sm hover:border-primary/40 hover:scale-[1.03] transition-all shadow-md"
            >
              <Icon className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-primary mb-3" />
              <h3 className="text-lg sm:text-xl font-semibold">{label}</h3>
              <p className="text-muted-foreground text-sm sm:text-base mt-2 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Differentiators */}
      <Card className="shadow-xl overflow-hidden border border-gray-100/20 backdrop-blur-sm">
        <CardContent className="space-y-8 p-6 sm:p-10 lg:p-14">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
              How We Operate
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
              A disciplined operating model that fuses responsible sourcing, precision data, and human oversight. Every garment ships with confidence, not guesswork.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {DIFFERENTIATORS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-5 sm:p-6 rounded-xl bg-background/40 border backdrop-blur-sm hover:border-primary/40 transition-all shadow-md"
              >
                <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
                <h3 className="text-lg sm:text-xl font-semibold mt-3">{title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base mt-2 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mission Section */}
      <Card className="shadow-xl overflow-hidden border border-gray-100/20 backdrop-blur-sm">
        <CardContent className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center p-6 sm:p-10 lg:p-14">
          <div className="relative w-full h-72 sm:h-80 md:h-96 order-1 md:order-2">
            <Image
              src="https://picsum.photos/seed/ai-innovation/700/500"
              alt="AI Tailoring Innovation"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-xl shadow-lg object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="order-2 md:order-1">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
              Our Mission
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Our mission is to make <strong>AI-powered personalization</strong> the new normal. By reducing fabric waste, returns, and sizing frustration, PerfectFit is paving the way toward sustainable, inclusive fashion for all.
              <br />
              <br />
              Every stitch we create reflects our belief that the future of fashion is <strong>smart, sustainable, and personal.</strong>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Innovation Timeline */}
      <section className="text-center space-y-10 sm:space-y-14">
        <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
          Our Journey of Innovation
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 sm:gap-10 text-muted-foreground flex-wrap">
          {TIMELINE.map(({ year, text }) => (
            <div
              key={year}
              className="p-5 sm:p-6 rounded-xl bg-background/40 border hover:border-primary/40 transition-all shadow-md w-full sm:w-72 md:w-64"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-primary">{year}</h3>
              <p className="mt-2 text-sm sm:text-base">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="text-center space-y-10 sm:space-y-14">
        <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
          Our Core Values
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-5 sm:p-6 rounded-lg bg-background/40 backdrop-blur-sm border hover:border-primary/40 transition-all hover:scale-[1.03] shadow-md"
            >
              <Icon className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-primary" />
              <h3 className="text-lg sm:text-xl font-semibold mt-3">{title}</h3>
              <p className="text-muted-foreground text-sm sm:text-base mt-2 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <Card className="shadow-xl overflow-hidden border border-gray-100/20 backdrop-blur-sm">
        <CardContent className="space-y-8 p-6 sm:p-10 lg:p-14 text-center">
          <Rocket className="h-12 sm:h-14 w-12 sm:w-14 mx-auto text-primary" />
          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
            Our Vision for the Future
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            We envision a fashion ecosystem where <strong>AI, sustainability, and inclusivity</strong> coexist seamlessly. PerfectFit will continue to push the boundaries of personalization — creating fashion that celebrates individuality and protects our planet.
          </p>
        </CardContent>
      </Card>

      {/* Global Impact */}
      <section className="text-center space-y-10 sm:space-y-14">
        <Globe className="w-12 sm:w-14 h-12 sm:h-14 text-primary mx-auto" />
        <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
          Our Global Impact
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          PerfectFit collaborates with eco-conscious manufacturers and AI research labs across the globe to bring sustainable fashion to life. From India to Europe, our platform reduces waste by 40% and supports local tailors with AI-powered precision.
        </p>
      </section>

      {/* Team */}
      <Card className="shadow-xl overflow-hidden border border-gray-100/20 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
            Meet Our Team
          </CardTitle>
          <CardDescription>
            The innovators shaping the future of personalized fashion.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap justify-center gap-6 sm:gap-8 p-6 sm:p-10">
          {[
            { name: 'Aman Antuley', role: 'Founder & CEO', img: '/aman-image.png' },
            { name: 'Alamin Mondal', role: 'AI Engineer', img: '/alamin.jpg' },
            { name: 'Shaikh Iqra', role: 'Lead Designer', img: '/iqra.jpg' },
          ].map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center space-y-3 bg-background/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border hover:border-primary/40 transition-all hover:scale-[1.03] shadow-md w-[160px] sm:w-[200px]"
            >
              <Image
                src={member.img}
                alt={member.name}
                width={120}
                height={120}
                className="rounded-full object-cover w-[90px] sm:w-[100px] h-[90px] sm:h-[100px]"
              />
              <h3 className="font-semibold text-sm sm:text-base">{member.name}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
