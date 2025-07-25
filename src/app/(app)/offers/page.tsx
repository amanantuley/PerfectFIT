import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tag, Percent } from 'lucide-react';

const offers = [
  {
    title: 'First-Time Renter Discount',
    description: 'Get 25% off your first rental order. Perfect for trying out our service!',
    code: 'RENT25',
    icon: Percent,
  },
  {
    title: 'Suit Up for Less',
    description: 'Buy any two suits and get the third one at 50% off. Offer valid on our entire suit collection.',
    code: 'SUITS50',
    icon: Tag,
  },
  {
    title: 'Free Alterations',
    description: 'All purchased garments come with one free alteration to ensure the perfect fit, always.',
    code: 'No code needed',
    icon: Tag,
  },
];

export default function OffersPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">Exclusive Offers</h1>
        <p className="text-lg text-muted-foreground">
          Take advantage of our special deals for a limited time.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {offers.map((offer) => (
          <Card key={offer.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex-row gap-4 items-center">
                <offer.icon className="h-10 w-10 text-primary"/>
                <div>
                    <CardTitle>{offer.title}</CardTitle>
                    <CardDescription>{offer.description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
                <div className="w-full text-center p-4 border-2 border-dashed rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">Use Code</p>
                    <p className="text-2xl font-bold tracking-widest">{offer.code}</p>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
