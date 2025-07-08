import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Building2, Target, Users } from 'lucide-react';
import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-headline">About PerfectFit</CardTitle>
          <CardDescription className="text-lg">
            Redefining Tailoring with Artificial Intelligence.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative h-64 w-full rounded-lg overflow-hidden">
             <Image src="https://placehold.co/1200x400.png" alt="Tailoring workshop" fill className="object-cover" data-ai-hint="tailor workshop" />
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center pt-6">
            <div className="space-y-2">
              <Building2 className="h-12 w-12 mx-auto text-primary" />
              <h3 className="text-xl font-bold">Our Story</h3>
              <p className="text-muted-foreground">
                Founded in 2024, PerfectFit was born from a desire to blend the timeless art of tailoring with the precision of modern technology. We believe everyone deserves to wear clothes that fit them perfectly.
              </p>
            </div>
            <div className="space-y-2">
              <Target className="h-12 w-12 mx-auto text-primary" />
              <h3 className="text-xl font-bold">Our Mission</h3>
              <p className="text-muted-foreground">
                Our mission is to make custom-fit clothing accessible and convenient for all. By harnessing AI, we eliminate the guesswork and provide you with garments tailored to your unique body shape.
              </p>
            </div>
            <div className="space-y-2">
              <Users className="h-12 w-12 mx-auto text-primary" />
              <h3 className="text-xl font-bold">Our Team</h3>
              <p className="text-muted-foreground">
                We are a passionate team of designers, engineers, and data scientists dedicated to revolutionizing the fashion industry. We're committed to quality, innovation, and customer satisfaction.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
