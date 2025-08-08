
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: "How does the AI measurement work?",
        answer: "Our AI uses advanced computer vision algorithms to analyze the full-body photo you provide. It identifies key points on your body to estimate measurements like chest, waist, and inseam with high accuracy. For best results, wear form-fitting clothing and stand in a well-lit area. The process is quick, secure, and eliminates the need for a physical measuring tape."
    },
    {
        question: "Is my photo and data secure?",
        answer: "Absolutely. We prioritize your privacy. Your photos are used only for the measurement extraction process and are not stored on our servers unless you explicitly choose to save them to your profile. All data is encrypted both in transit and at rest, and we adhere to strict data protection regulations."
    },
    {
        question: "What is the difference between buying and renting?",
        answer: "Buying a garment means you own it. It's brand new and tailored to your size. Renting allows you to wear a garment for a specific period (e.g., a weekend event). It's a cost-effective and sustainable way to access a wide variety of styles without committing to a purchase. All rented items are professionally cleaned and inspected before being sent to you."
    },
    {
        question: "How accurate are the AI measurements?",
        answer: "Our AI model is highly accurate, typically within half an inch of professional tailor measurements. The accuracy can be affected by the quality of the photo, lighting, and clothing worn. If you feel the measurements are off, you can request a remeasurement or contact support for a free alteration on your first purchased item."
    },
    {
        question: "How long does it take to receive my order?",
        answer: "For purchased items, which are made-to-order, production takes approximately 7-10 business days, followed by shipping. For rented items, you can select your delivery date at checkout. We recommend choosing a date 1-2 days before your event. Delivery times vary based on your location and selected shipping method."
    },
    {
        question: "How do I return a rented item?",
        answer: "Returning a rental is easy. We include a prepaid return label and packaging with your order. After you've worn the garment, simply place it in the provided return bag, attach the label, and drop it off at the designated courier. Make sure to return it by the specified due date to avoid late fees."
    },
    {
        question: "Do you offer alterations?",
        answer: "Yes! For purchased items, we offer a 'Perfect Fit Guarantee' which includes one free alteration to ensure your garment fits exactly as it should. For rented items, minor alterations are not available, but our AI-powered sizing aims to get you the best fit possible from our existing inventory."
    },
    {
        question: "What are subscription credits?",
        answer: "Our 'Pro' and 'Ultimate' subscription plans come with rental credits. One credit typically allows you to rent one garment, like a suit or a dress. These credits are added to your account monthly and can be used anytime as long as your subscription is active. It's the most flexible way to refresh your wardrobe."
    },
    {
        question: "What if I damage a rented item?",
        answer: "We understand that minor wear and tear can happen. Minor stains or small repairs are covered by our optional insurance fee, included at checkout. For significant damage or loss of an item, you may be responsible for the repair or replacement cost up to the retail value of the garment."
    },
];

export default function FAQPage() {
  return (
    <Card className="shadow-lg animate-fade-in-up">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4">
          <HelpCircle className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">Frequently Asked Questions</CardTitle>
        <CardDescription>
          Find answers to common questions about our service, measurements, and more.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
