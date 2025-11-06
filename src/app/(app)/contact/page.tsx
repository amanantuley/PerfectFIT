'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Mail,
  Phone,
  MapPin,
  Loader2,
  MessageCircle,
  Smile,
  Users,
  Send,
  Instagram,
  Linkedin,
  Twitter,
  Globe,
} from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitContact } from './actions';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const initialState = { message: '', error: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full font-medium"
      size="lg"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" /> Send Message
        </>
      )}
    </Button>
  );
}

export default function ContactUsPage() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(submitContact, initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (state.message) {
      if (state.error) {
        toast({
          variant: 'destructive',
          title: 'Submission Error',
          description: state.message,
        });
      } else {
        toast({
          title: '✅ Message Sent Successfully!',
          description: "Thanks for reaching out. We'll get back to you shortly.",
        });
        formRef.current?.reset();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
      }
    }
  }, [state, toast]);

  return (
    <div className="space-y-20 animate-fade-in-up">
      {/* 🏠 Contact Header */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-3"
      >
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
          Get in Touch
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Have questions about PerfectFit? Our team is always ready to help you
          look and feel your best — every stitch of the way.
        </p>
      </motion.section>

      {/* 💡 Why Contact Us Section */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid sm:grid-cols-3 gap-6 text-center"
      >
        {[
          {
            icon: MessageCircle,
            title: 'Personal Assistance',
            desc: 'Speak directly with our experts for measurements, fittings, and design advice.',
          },
          {
            icon: Smile,
            title: 'Customer Happiness',
            desc: 'We pride ourselves on quick responses and a 98% satisfaction rate.',
          },
          {
            icon: Users,
            title: 'Partnership Inquiries',
            desc: 'Join hands with us to bring AI-powered fashion to your customers.',
          },
        ].map(({ icon: Icon, title, desc }) => (
          <Card
            key={title}
            className="p-6 shadow-md bg-background/40 backdrop-blur-sm border hover:border-primary/40 transition-all hover:scale-105"
          >
            <Icon className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{desc}</p>
          </Card>
        ))}
      </motion.section>

      {/* 📩 Contact Info + Form */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left: Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="shadow-xl border bg-background/50 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
                Contact Information
              </CardTitle>
              <CardDescription>We’d love to hear from you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-base">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 mt-1 text-primary" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">
                    support@perfectfit.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 mt-1 text-primary" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-muted-foreground">+91 9867408609</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 mt-1 text-primary" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-muted-foreground">
                    Navi Mumbai, Maharashtra, India
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex justify-center gap-4 pt-2">
                <Link
                  href="https://www.linkedin.com/company/perfectfit"
                  target="_blank"
                  className="p-2 rounded-full hover:bg-primary/10 transition"
                >
                  <Linkedin className="h-5 w-5 text-primary" />
                </Link>
                <Link
                  href="https://www.instagram.com/perfectfit"
                  target="_blank"
                  className="p-2 rounded-full hover:bg-primary/10 transition"
                >
                  <Instagram className="h-5 w-5 text-primary" />
                </Link>
                <Link
                  href="https://twitter.com/perfectfit"
                  target="_blank"
                  className="p-2 rounded-full hover:bg-primary/10 transition"
                >
                  <Twitter className="h-5 w-5 text-primary" />
                </Link>
                <Link
                  href="https://perfectfit.com"
                  target="_blank"
                  className="p-2 rounded-full hover:bg-primary/10 transition"
                >
                  <Globe className="h-5 w-5 text-primary" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* 🌍 Embedded Map */}
          <div className="mt-6 rounded-xl overflow-hidden border shadow-md">
            <iframe
              title="PerfectFit Location"
              src="https://www.google.com/maps?q=Navi+Mumbai,+India&output=embed"
              width="100%"
              height="250"
              loading="lazy"
              className="border-0 w-full"
            ></iframe>
          </div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Card className="shadow-xl border bg-background/50 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 animate-text-rainbow">
                Send us a Message
              </CardTitle>
              <CardDescription>
                Have a question or feedback? Let us know below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                ref={formRef}
                action={formAction}
                className="space-y-4"
                noValidate
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message..."
                    required
                  />
                </div>
                {isSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center text-green-600 font-medium"
                  >
                    🎉 Thank you! Your message has been received.
                  </motion.div>
                ) : (
                  <SubmitButton />
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
