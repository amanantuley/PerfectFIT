'use client';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

// ✅ Lazy-load Firestore client only in the browser
let firestore: any = null;
if (typeof window !== 'undefined') {
  import('@/lib/firebase').then((mod) => {
    firestore = mod.db;
  });
}

export default function TailorChargesPage() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [isFetching, setIsFetching] = useState(true);

  const tailorId = 'tailor_demo_1'; // 🔹 Replace with logged-in user ID later

  // ✅ Default prices (fallback)
  const getDefaultPrices = () => {
    const defaults: Record<string, number> = {};
    chargesData.forEach((cat) =>
      cat.services.forEach((s) => (defaults[s.id] = s.price))
    );
    return defaults;
  };

  // ✅ Fetch Firestore Data Safely
  useEffect(() => {
    if (!firestore) return;

    const { doc, onSnapshot, setDoc } = require('firebase/firestore');
    const ref = doc(firestore, 'tailorCharges', tailorId);

    const unsubscribe = onSnapshot(
      ref,
      (snap: any) => {
        if (snap.exists()) {
          setPrices(snap.data().prices || getDefaultPrices());
        } else {
          setPrices(getDefaultPrices());
        }
        setIsFetching(false);
      },
      (err: any) => {
        console.error('❌ Firestore listener error:', err);
        setPrices(getDefaultPrices());
        setIsFetching(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // ✅ Update price field
  const handlePriceChange = (id: string, value: string) => {
    const newPrice = Number(value);
    if (!isNaN(newPrice) && newPrice >= 0) {
      setPrices((prev) => ({ ...prev, [id]: newPrice }));
    }
  };

  // ✅ Save changes safely
  const handleSaveChanges = async () => {
    if (!firestore) return;

    setIsLoading(true);
    try {
      const { doc, setDoc } = require('firebase/firestore');
      const ref = doc(firestore, 'tailorCharges', tailorId);
      await setDoc(ref, { prices }, { merge: true });

      toast({
        title: t('Changes Saved!'),
        description: t('Your service charges have been synced to Firestore.'),
      });
    } catch (err) {
      console.error('❌ Error saving prices:', err);
      toast({
        title: t('Error'),
        description: t('Something went wrong while saving your charges.'),
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
                        <div className="space-y-1">
                          <h4 className="font-semibold">{t(service.name as any)}</h4>
                          <p className="text-sm text-muted-foreground leading-snug">
                            {t(service.description as any)}
                          </p>
                        </div>

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
