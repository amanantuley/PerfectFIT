'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Sparkles, Loader2, Lightbulb, Scissors, Check, RefreshCw } from 'lucide-react';
import { useTranslation } from '@/context/translation-provider';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

// 🔮 Mock AI fabric & design generator
const generateMockSuggestions = ({
  garmentType,
  occasion,
  season,
  customerPreferences,
}: {
  garmentType: string;
  occasion: string;
  season: string;
  customerPreferences: string;
}) => {
  return {
    fabricSuggestions: [
      {
        name: season === 'winter' ? 'Wool Blend' : season === 'summer' ? 'Linen Cotton' : 'All-Season Suiting',
        reasoning: `Perfect for ${season} ${garmentType}s — comfortable and stylish, matching ${customerPreferences.toLowerCase()}.`,
      },
      {
        name: occasion === 'wedding' ? 'Silk Brocade' : 'Premium Twill',
        reasoning: `Ideal for ${occasion} occasions that demand elegance and texture.`,
      },
    ],
    designSuggestions: [
      {
        element: 'Cut & Fit',
        suggestion: customerPreferences.toLowerCase().includes('slim')
          ? 'Opt for a structured slim fit with sharp lines.'
          : 'Choose a modern relaxed fit for effortless confidence.',
      },
      {
        element: 'Color Palette',
        suggestion:
          occasion === 'wedding'
            ? 'Warm tones — maroon, champagne, or ivory.'
            : 'Neutral tones — navy, ash grey, or beige.',
      },
    ],
    customizationIdeas: [
      'Add monogram initials inside collars or cuffs.',
      'Use subtle contrast stitching for character.',
      'Include concealed pockets for minimalist utility.',
      `${garmentType} with seasonal texture detailing.`,
    ],
  };
};

export default function TailorAiAssistantPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState<any | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const input = {
      garmentType: formData.get('garmentType') as string,
      occasion: formData.get('occasion') as string,
      season: formData.get('season') as string,
      customerPreferences: formData.get('customerPreferences') as string,
    };

    startTransition(() => {
      setSuggestions(null);
      setTimeout(() => {
        const result = generateMockSuggestions(input);
        setSuggestions(result);
        toast({
          title: '✨ AI Suggestions Ready!',
          description: 'Tailored recommendations are prepared just for you.',
        });
      }, 1000);
    });
  };

  return (
    <div className="space-y-10 animate-fade-in-up">
      <Card className="shadow-lg border border-border/40">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-primary/10 p-4 rounded-full">
            <Wand2 className="h-12 w-12 text-primary animate-pulse" />
          </div>
          <CardTitle className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
            {t('AI Tailoring Assistant')}
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            {t('Let AI craft the perfect garment ideas for your clients.')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="garmentType">{t('Garment Type')}</Label>
                <Input id="garmentType" name="garmentType" placeholder={t('e.g., Suit, Sherwani')} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="occasion">{t('Occasion')}</Label>
                <Select name="occasion" required>
                  <SelectTrigger>
                    <SelectValue placeholder={t('Select an occasion')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wedding">{t('Wedding')}</SelectItem>
                    <SelectItem value="business">{t('Business')}</SelectItem>
                    <SelectItem value="casual">{t('Casual')}</SelectItem>
                    <SelectItem value="formal-event">{t('Formal Event')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="season">{t('Season')}</Label>
              <Select name="season" required>
                <SelectTrigger>
                  <SelectValue placeholder={t('Select a season')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summer">{t('Summer')}</SelectItem>
                  <SelectItem value="winter">{t('Winter')}</SelectItem>
                  <SelectItem value="monsoon">{t('Monsoon')}</SelectItem>
                  <SelectItem value="all-season">{t('All Season')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerPreferences">{t('Customer Preferences')}</Label>
              <Textarea
                id="customerPreferences"
                name="customerPreferences"
                placeholder={t('e.g., Prefers modern slim fits and light breathable fabrics.')}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('Generating...')}
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  {t('Generate Design Ideas')}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {isPending && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center p-10"
          >
            <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary mb-4" />
            <p className="text-muted-foreground">{t('AI is crafting your perfect ideas...')}</p>
          </motion.div>
        )}

        {suggestions && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* FABRIC SUGGESTIONS */}
            <Card className="hover:shadow-glow transition-transform duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-bold text-gradient">
                  <Lightbulb /> {t('Fabric Suggestions')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {suggestions.fabricSuggestions.map((item: any, i: number) => (
                  <div key={i}>
                    <h4 className="font-semibold">{t(item.name)}</h4>
                    <p className="text-sm text-muted-foreground">{t(item.reasoning)}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* DESIGN ELEMENTS */}
            <Card className="hover:shadow-glow transition-transform duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-bold text-gradient">
                  <Scissors /> {t('Design Elements')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {suggestions.designSuggestions.map((item: any, i: number) => (
                  <div key={i}>
                    <h4 className="font-semibold">{t(item.element)}</h4>
                    <p className="text-sm text-muted-foreground">{t(item.suggestion)}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* CUSTOMIZATION IDEAS */}
            <Card className="hover:shadow-glow transition-transform duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-bold text-gradient">
                  <Check /> {t('Customization Ideas')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  {suggestions.customizationIdeas.map((idea: string, i: number) => (
                    <li key={i}>{t(idea)}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {suggestions && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => setSuggestions(null)} className="mt-4">
            <RefreshCw className="mr-2 h-4 w-4" />
            {t('Try Again')}
          </Button>
        </div>
      )}
    </div>
  );
}
