import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Building2, Target, Users, Gem, Recycle, Handshake } from 'lucide-react';
import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-headline text-rainbow bg-size-200 animate-text-rainbow">About PerfectFit</CardTitle>
          <CardDescription className="text-lg">
            Redefining Tailoring with Artificial Intelligence.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-12">
          <div className="relative h-64 w-full rounded-lg overflow-hidden">
             <Image src="https://placehold.co/1200x400.png" alt="Tailoring workshop" fill className="object-cover" data-ai-hint="tailor workshop" />
          </div>
           <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold font-headline mb-4 text-rainbow bg-size-200 animate-text-rainbow">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded in 2025, PerfectFit was born from a desire to blend the timeless art of tailoring with the precision of modern technology. We saw a world where "off-the-rack" was the norm, leading to inconsistent fits, high return rates, and a disconnect between people and the clothes they wear. We believed there had to be a better way. Our founders, a team of fashion enthusiasts and tech innovators, came together to create a solution that brings the bespoke tailoring experience into the digital age. We believe everyone deserves to wear clothes that feel like they were made just for them, because they are.
              </p>
            </div>
            <Image src="https://placehold.co/600x400.png" alt="Founders" width={600} height={400} className="rounded-lg shadow-md" data-ai-hint="team startup" />
          </div>

           <div className="grid md:grid-cols-2 gap-8 items-center">
             <Image src="https://placehold.co/600x400.png" alt="AI Technology" width={600} height={400} className="rounded-lg shadow-md md:order-2" data-ai-hint="abstract technology" />
            <div className="md:order-1">
              <h2 className="text-3xl font-bold font-headline mb-4 text-rainbow bg-size-200 animate-text-rainbow">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to make custom-fit clothing accessible, convenient, and sustainable for all. By harnessing the power of AI, we eliminate the guesswork and environmental waste associated with traditional retail. We provide you with garments tailored to your unique body shape, fostering a deeper connection to your wardrobe and promoting conscious consumption. We aim to empower you to express your personal style with confidence, knowing that your clothes fit perfectly and are made with care.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline mb-6 text-rainbow bg-size-200 animate-text-rainbow">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <Gem className="h-12 w-12 mx-auto text-primary" />
                <h3 className="text-xl font-bold">Quality & Craftsmanship</h3>
                <p className="text-muted-foreground">
                  We partner with skilled tailors and use only high-quality materials to ensure every garment is a masterpiece of comfort and durability.
                </p>
              </div>
              <div className="space-y-2">
                <Recycle className="h-12 w-12 mx-auto text-primary" />
                <h3 className="text-xl font-bold">Sustainability</h3>
                <p className="text-muted-foreground">
                  By creating made-to-order clothing, we minimize waste and promote a more sustainable fashion industry. Our rental service further supports a circular economy.
                </p>
              </div>
              <div className="space-y-2">
                <Handshake className="h-12 w-12 mx-auto text-primary" />
                <h3 className="text-xl font-bold">Customer-Centric</h3>
                <p className="text-muted-foreground">
                  Your satisfaction is our top priority. From AI-powered sizing to our Perfect Fit Guarantee, we are committed to providing an exceptional experience.
                </p>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
