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
import { CircleDollarSign, Save, Loader2, CloudUpload, RefreshCw } from 'lucide-react';
import { useTranslation } from '@/context/translation-provider';
import { useToast } from '@/hooks/use-toast';
import { chargesData } from '@/lib/charges-data';
import { useEffect, useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TailorChargesPage() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [prices, setPrices] = useState<Record<string, number>>({});
  const [isPending, startTransition] = useTransition();
  const [loaded, setLoaded] = useState(false);

  // ✅ Load existing charges
  useEffect(() => {
    const stored = localStorage.getItem('tailorPrices');
    if (stored) {
      setPrices(JSON.parse(stored));
    } else {
      const defaults: Record<string, number> = {};
      chargesData.forEach((cat) =>
        cat.services.forEach((s) => (defaults[s.id] = s.price))
      );
      setPrices(defaults);
    }
    setLoaded(true);
  }, []);

  // ✅ Handle change
  const handlePriceChange = (id: string, value: string) => {
    const num = Number(value);
    if (!isNaN(num) && num >= 0) {
      setPrices((prev) => ({ ...prev, [id]: num }));
    }
  };

  // ✅ Save locally (simulate cloud sync)
  const handleSaveChanges = () => {
    startTransition(() => {
      localStorage.setItem('tailorPrices', JSON.stringify(prices));

      // 💡 Future-ready cloud sync (Firebase / API)
      // await fetch('/api/tailor/prices', { method: 'POST', body: JSON.stringify(prices) });

      toast({
        title: t('✅ Charges Saved!'),
        description: t('Your latest service prices are stored securely.'),
      });
    });
  };

  const handleReset = () => {
    startTransition(() => {
      localStorage.removeItem('tailorPrices');
      const defaults: Record<string, number> = {};
      chargesData.forEach((cat) =>
        cat.services.forEach((s) => (defaults[s.id] = s.price))
      );
      setPrices(defaults);
      toast({
        title: t('🔄 Reset Successful'),
        description: t('All prices have been restored to default values.'),
      });
    });
  };

  if (!loaded) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin mb-3 text-primary" />
        <p className="text-sm text-muted-foreground">{t('Loading your charges...')}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-8 animate-fade-in-up"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="shadow-xl border border-border/60 bg-background/70 backdrop-blur-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
                <CircleDollarSign className="h-5 w-5 text-teal-500" />
                {t('Tailor Service Charges')}
              </CardTitle>
              <CardDescription>
                {t('Set, customize, and manage your tailoring prices.')}
              </CardDescription>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleSaveChanges} disabled={isPending} className="flex items-center">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('Saving...')}
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {t('Save Changes')}
                  </>
                )}
              </Button>

              <Button variant="outline" onClick={handleReset} disabled={isPending}>
                <RefreshCw className="mr-2 h-4 w-4" />
                {t('Reset')}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Accordion
            type="multiple"
            defaultValue={[chargesData[0].id]}
            className="w-full space-y-2"
          >
            {chargesData.map((category) => (
              <AccordionItem key={category.id} value={category.id}>
                <AccordionTrigger className="text-lg font-semibold">
                  {t(category.name as any)}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-5 pt-3">
                    {category.services.map((service) => (
                      <motion.div
                        key={service.id}
                        className="grid grid-cols-1 md:grid-cols-3 items-end gap-4 rounded-lg border border-border p-4 transition-all hover:bg-muted/30 hover:shadow-glow"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {/* Service Info */}
                        <div className="space-y-1">
                          <h4 className="font-semibold text-foreground">
                            {t(service.name as any)}
                          </h4>
                          <p className="text-sm text-muted-foreground">
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
                              value={prices[service.id] ?? ''}
                              onChange={(e) => handlePriceChange(service.id, e.target.value)}
                              className="mt-1 pl-6"
                            />
                          </div>
                        </div>

                        {/* Market Range */}
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {t('Market Range')}:{' '}
                            <span className="font-medium text-foreground">
                              ₹{service.marketRange.min} - ₹{service.marketRange.max}
                            </span>
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <AnimatePresence>
        {isPending && (
          <motion.div
            key="saving"
            className="text-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CloudUpload className="mx-auto mb-3 h-8 w-8 animate-pulse text-primary" />
            <p className="text-muted-foreground">{t('Syncing changes...')}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
