
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleDollarSign, Save } from 'lucide-react';
import { useTranslation } from '@/context/translation-provider';
import { chargesData } from '@/lib/charges-data';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function TailorChargesPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  // Initialize state with the default charges data
  const [prices, setPrices] = useState(() => {
    const initialPrices: { [key: string]: number } = {};
    chargesData.forEach(category => {
      category.services.forEach(service => {
        initialPrices[service.id] = service.price;
      });
    });
    return initialPrices;
  });

  const handlePriceChange = (id: string, value: string) => {
    const newPrice = Number(value);
    if (!isNaN(newPrice)) {
      setPrices(prev => ({ ...prev, [id]: newPrice }));
    }
  };

  const handleSaveChanges = () => {
    // In a real app, you would save this to a database.
    console.log('Saving new prices:', prices);
    toast({
      title: t('Changes Saved!'),
      description: t('Your new service charges have been updated.'),
    });
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 animate-text-rainbow bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent bg-size-200">
                <CircleDollarSign />
                {t('Service Charges')}
              </CardTitle>
              <CardDescription>
                {t('Manage your stitching charges. Prices are recommendations and can be adjusted.')}
              </CardDescription>
            </div>
            <Button className="w-full sm:w-auto" onClick={handleSaveChanges}>
              <Save className="mr-2 h-4 w-4" />
              {t('Save All Changes')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" defaultValue={['suits-blazers']} className="w-full">
            {chargesData.map((category) => (
              <AccordionItem key={category.id} value={category.id}>
                <AccordionTrigger className="text-lg font-bold">
                  {t(category.name as any)}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6 pt-2">
                    {category.services.map((service) => (
                      <div
                        key={service.id}
                        className="grid grid-cols-1 md:grid-cols-3 items-end gap-4 rounded-md border p-4"
                      >
                        <div className="md:col-span-1 space-y-1">
                          <h4 className="font-semibold">{t(service.name as any)}</h4>
                          <p className="text-sm text-muted-foreground">
                            {t(service.description as any)}
                          </p>
                        </div>
                        <div className="md:col-span-1">
                           <Label htmlFor={service.id}>{t('Your Price')}</Label>
                           <Input
                             id={service.id}
                             type="number"
                             value={prices[service.id]}
                             onChange={(e) => handlePriceChange(service.id, e.target.value)}
                             className="mt-1"
                           />
                        </div>
                        <div className="md:col-span-1">
                          <p className="text-sm text-muted-foreground">
                            {t('Suggested Market Price')}: ₹{service.marketRange.min} - ₹{service.marketRange.max}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
