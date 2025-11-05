'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Gem, Recycle, Handshake, Sparkles, Users, Rocket } from 'lucide-react';
import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <div className="space-y-16 animate-fade-in-up">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] rounded-xl overflow-hidden shadow-lg">
        <Image
          src="/about.webp"
          alt="Tailoring workshop"
          fill
          className="object-cover brightness-[0.4]"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow drop-shadow-md">
            About PerfectFit
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-200 max-w-2xl">
            Revolutionizing tailoring through Artificial Intelligence — because perfect fit should be for everyone.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <Card className="shadow-lg overflow-hidden">
        <CardContent className="space-y-12 p-6 sm:p-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
                Our Story
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Founded in <strong>2025</strong>, PerfectFit was born from a passion for blending the timeless craft of tailoring with the precision of AI-driven innovation. 
                We envisioned a world where every individual could wear clothing that fits perfectly — without guesswork, endless returns, or compromise.
                <br /><br />
                Our team of <strong>fashion experts, data scientists, and designers</strong> joined forces to create an intelligent platform that understands body shapes as well as human tailors — bringing bespoke craftsmanship into the digital era.
              </p>
            </div>
            <Image
              src="https://picsum.photos/seed/perfectfit-story/700/500"
              alt="PerfectFit founders and team"
              width={700}
              height={500}
              className="rounded-lg shadow-lg transition-transform duration-500 hover:scale-105"
            />
          </div>
        </CardContent>
      </Card>

      {/* Mission Section */}
      <Card className="shadow-lg overflow-hidden">
        <CardContent className="space-y-12 p-6 sm:p-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <Image
              src="https://picsum.photos/seed/ai-innovation/700/500"
              alt="AI Technology and Tailoring"
              width={700}
              height={500}
              className="rounded-lg shadow-lg md:order-2 transition-transform duration-500 hover:scale-105"
            />
            <div className="md:order-1">
              <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                At PerfectFit, our mission is to make <strong>custom-fit fashion accessible, sustainable, and empowering</strong> for everyone. 
                We leverage AI body measurement and virtual try-on technology to reduce waste, improve confidence, and redefine comfort.
                <br /><br />
                By eliminating ill-fitting garments, we’re shaping a more sustainable future — one perfect fit at a time.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

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
              desc: 'Every garment is crafted with precision using premium materials and expert tailoring partners.',
            },
            {
              icon: Recycle,
              title: 'Sustainability',
              desc: 'We embrace made-to-order efficiency, minimizing fabric waste and supporting eco-conscious production.',
            },
            {
              icon: Handshake,
              title: 'Customer-Centric Approach',
              desc: 'Our Perfect Fit Guarantee ensures satisfaction through AI precision and human care.',
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
      <Card className="shadow-lg overflow-hidden">
        <CardContent className="space-y-8 p-6 sm:p-10 text-center">
          <div className="flex flex-col items-center justify-center space-y-6">
            <Rocket className="h-14 w-14 text-primary" />
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
              Our Vision for the Future
            </h2>
            <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
              PerfectFit is building the future of fashion — a world where algorithms and artisans collaborate to produce
              <strong> zero-waste, AI-tailored fashion experiences</strong>. Our goal is to make “perfect fit” the global standard.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Team Section */}
      <Card className="shadow-lg overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
            Meet Our Team
          </CardTitle>
          <CardDescription>
            The passionate innovators behind the future of personalized fashion.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap justify-center gap-6 p-8">
          {[
            { name: 'Aman Antuley', role: 'Founder & CEO', img: './aman-image.png' },
            { name: 'Alamin Mondal', role: 'AI Engineer', img: './alamin.png' },
            { name: 'Shaikh Iqra', role: 'Lead Designer', img: './iqra.jpg' },
          ].map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center space-y-3 bg-background/40 backdrop-blur-sm rounded-xl p-4 border hover:border-primary/40 transition-all duration-300 hover:scale-105 w-[200px] shadow-sm"
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
