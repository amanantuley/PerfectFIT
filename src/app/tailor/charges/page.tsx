'use client';

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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleDollarSign, Save, Loader2 } from 'lucide-react';
import { useTranslation } from '@/context/translation-provider';
import { useToast } from '@/hooks/use-toast';
import { chargesData } from '@/lib/charges-data';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';

export default function TailorChargesPage() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [isFetching, setIsFetching] = useState(true);

  const tailorId = 'tailor_demo_1'; // 🔹 Replace with dynamic user ID after auth integration
  const chargesRef = doc(db, 'tailorCharges', tailorId);

  // ✅ Initialize with default data
  const getDefaultPrices = () => {
    const defaults: Record<string, number> = {};
    chargesData.forEach((cat) =>
      cat.services.forEach((s) => (defaults[s.id] = s.price))
    );
    return defaults;
  };

  // ✅ Fetch & Listen to Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(chargesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setPrices(data.prices || getDefaultPrices());
      } else {
        setPrices(getDefaultPrices());
      }
      setIsFetching(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Handle Price Change
  const handlePriceChange = (id: string, value: string) => {
    const newPrice = Number(value);
    if (!isNaN(newPrice) && newPrice >= 0) {
      setPrices((prev) => ({ ...prev, [id]: newPrice }));
    }
  };

  // ✅ Save to Firestore
  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      await setDoc(chargesRef, { prices }, { merge: true });
      toast({
        title: t('Changes Saved!'),
        description: t('Your new service charges have been updated in the cloud.'),
      });
    } catch (err) {
      console.error('❌ Error saving prices:', err);
      toast({
        title: t('Error'),
        description: t('Something went wrong while saving your prices.'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="h-6 w-6 animate-spin mb-2 text-primary" />
        <p className="text-muted-foreground text-sm">{t('Loading your charges...')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <Card className="shadow-lg border border-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
                <CircleDollarSign className="h-5 w-5 text-teal-500" />
                {t('Service Charges')}
              </CardTitle>
              <CardDescription>
                {t('Manage your stitching and tailoring charges. Your updates sync instantly to Firestore.')}
              </CardDescription>
            </div>
            <Button
              className="w-full sm:w-auto"
              onClick={handleSaveChanges}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('Saving...')}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {t('Save All Changes')}
                </>
              )}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Accordion
            type="multiple"
            defaultValue={[chargesData[0].id]}
            className="w-full"
          >
            {chargesData.map((category) => (
              <AccordionItem key={category.id} value={category.id}>
                <AccordionTrigger className="text-lg font-semibold">
                  {t(category.name as any)}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-5 pt-3">
                    {category.services.map((service) => (
                      <div
                        key={service.id}
                        className="grid grid-cols-1 md:grid-cols-3 items-end gap-4 rounded-lg border border-border p-4 transition-all hover:bg-muted/40"
                      >
                        {/* Service Info */}
                        <div className="space-y-1">
                          <h4 className="font-semibold">{t(service.name as any)}</h4>
                          <p className="text-sm text-muted-foreground leading-snug">
                            {t(service.description as any)}
                          </p>
                        </div>

                        {/* Editable Price Input */}
                        <div>
                          <Label htmlFor={service.id} className="text-sm font-medium">
                            {t('Your Price')}
                          </Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                              ₹
                            </span>
                            <Input
                              id={service.id}
                              type="number"
                              min={0}
                              value={prices[service.id] || ''}
                              onChange={(e) =>
                                handlePriceChange(service.id, e.target.value)
                              }
                              className="mt-1 pl-6"
                            />
                          </div>
                        </div>

                        {/* Market Reference */}
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {t('Suggested Market Price')}:{' '}
                            <span className="font-medium text-foreground">
                              ₹{service.marketRange.min} - ₹{service.marketRange.max}
                            </span>
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
