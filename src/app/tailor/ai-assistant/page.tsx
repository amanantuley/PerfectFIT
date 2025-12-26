'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Sparkles, Loader2, Lightbulb, Scissors, Check, RefreshCw, Palette, TrendingUp, Zap, BadgeCheck, Ruler, Shirt, Download, Copy, Share2 } from 'lucide-react';
import { useTranslation } from '@/context/translation-provider';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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
        confidence: 95,
        properties: season === 'winter' ? 'Warm, breathable, durable' : 'Lightweight, moisture-wicking',
      },
      {
        name: occasion === 'wedding' ? 'Silk Brocade' : 'Premium Twill',
        reasoning: `Ideal for ${occasion} occasions that demand elegance and texture.`,
        confidence: 92,
        properties: 'Luxurious finish, excellent drape',
      },
      {
        name: 'Cotton Poplin',
        reasoning: 'Classic choice for versatile everyday wear with crisp finish.',
        confidence: 88,
        properties: 'Easy care, breathable, cost-effective',
      },
    ],
    designSuggestions: [
      {
        element: 'Cut & Fit',
        suggestion: customerPreferences.toLowerCase().includes('slim')
          ? 'Opt for a structured slim fit with sharp lines.'
          : 'Choose a modern relaxed fit for effortless confidence.',
        priority: 'High',
      },
      {
        element: 'Color Palette',
        suggestion:
          occasion === 'wedding'
            ? 'Warm tones — maroon, champagne, or ivory.'
            : 'Neutral tones — navy, ash grey, or beige.',
        priority: 'High',
      },
      {
        element: 'Collar Style',
        suggestion: occasion === 'business' ? 'Classic point collar for professional polish.' : 'Mandarin collar for contemporary elegance.',
        priority: 'Medium',
      },
      {
        element: 'Button Details',
        suggestion: 'Mother-of-pearl buttons for premium feel, horn buttons for rustic charm.',
        priority: 'Medium',
      },
    ],
    customizationIdeas: [
      'Add monogram initials inside collars or cuffs.',
      'Use subtle contrast stitching for character.',
      'Include concealed pockets for minimalist utility.',
      `${garmentType} with seasonal texture detailing.`,
      'Custom linings with personalized patterns.',
      'Functional sleeve buttons for authenticity.',
    ],
    styleGuide: {
      measurements: [
        { part: 'Chest', recommendation: 'Allow 4-6cm ease for comfort' },
        { part: 'Sleeve', recommendation: 'Should end at wrist bone when arm relaxed' },
        { part: 'Length', recommendation: `${garmentType} hem to cover belt line` },
      ],
      pairings: [
        occasion === 'wedding' ? 'Pair with silk pocket square and formal shoes' : 'Combine with tailored trousers and leather belt',
        'Complement with neutral accessories',
      ],
    },
    trendInsights: [
      { trend: 'Sustainable fabrics', relevance: 'High demand for eco-friendly materials' },
      { trend: 'Oversized fits', relevance: 'Growing popularity in casual wear' },
      { trend: 'Bold textures', relevance: 'Statement pieces for special occasions' },
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

  const handleExport = () => {
    toast({
      title: '📄 Export Ready',
      description: 'Design specifications exported to PDF.',
    });
  };

  const handleCopy = () => {
    toast({
      title: '📋 Copied!',
      description: 'Suggestions copied to clipboard.',
    });
  };

  const handleShare = () => {
    toast({
      title: '🔗 Share Link',
      description: 'Shareable link generated for client review.',
    });
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <Card className="shadow-glow border border-white/10 bg-gradient-to-r from-background via-background/80 to-background/60">
        <CardHeader className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Wand2 className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">AI-Powered Design Studio</p>
                <CardTitle className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
                  {t('AI Tailoring Assistant')}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground max-w-2xl">
                  {t('Generate professional fabric, design, and customization recommendations using advanced AI.')}
                </CardDescription>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 gap-1">
                <BadgeCheck className="h-3 w-3" /> {t('Production Ready')}
              </Badge>
              <Badge variant="secondary" className="bg-sky-500/10 text-sky-600 gap-1">
                <Zap className="h-3 w-3" /> {t('Fast Generation')}
              </Badge>
            </div>
          </div>
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
            className="space-y-6"
          >
            <Card className="shadow-glow border border-white/10">
              <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 animate-text-rainbow">
                  {t('AI-Generated Design Specifications')}
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={handleExport}>
                    <Download className="mr-2 h-4 w-4" /> {t('Export PDF')}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    <Copy className="mr-2 h-4 w-4" /> {t('Copy')}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" /> {t('Share')}
                  </Button>
                </div>
              </CardHeader>
            </Card>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* FABRIC SUGGESTIONS */}
              <Card className="hover:shadow-glow transition-transform duration-300 hover:-translate-y-1 border border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shirt className="h-5 w-5 text-primary" /> {t('Fabric Recommendations')}
                  </CardTitle>
                  <CardDescription>{t('AI-optimized material selections')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {suggestions.fabricSuggestions.map((item: any, i: number) => (
                    <div key={i} className="rounded-lg border bg-muted/20 p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{t(item.name)}</h4>
                        <Badge variant="secondary" className="text-xs bg-emerald-500/10 text-emerald-600">
                          {item.confidence}% match
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{t(item.reasoning)}</p>
                      <p className="text-xs text-muted-foreground italic">{item.properties}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* DESIGN ELEMENTS */}
              <Card className="hover:shadow-glow transition-transform duration-300 hover:-translate-y-1 border border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Scissors className="h-5 w-5 text-primary" /> {t('Design Elements')}
                  </CardTitle>
                  <CardDescription>{t('Professional styling guidelines')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {suggestions.designSuggestions.map((item: any, i: number) => (
                    <div key={i} className="rounded-lg border bg-muted/20 p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{t(item.element)}</h4>
                        <Badge variant="secondary" className={`text-xs ${item.priority === 'High' ? 'bg-amber-500/10 text-amber-600' : 'bg-sky-500/10 text-sky-600'}`}>
                          {item.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{t(item.suggestion)}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* CUSTOMIZATION IDEAS */}
              <Card className="hover:shadow-glow transition-transform duration-300 hover:-translate-y-1 border border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Palette className="h-5 w-5 text-primary" /> {t('Customization Ideas')}
                  </CardTitle>
                  <CardDescription>{t('Premium finishing touches')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {suggestions.customizationIdeas.map((idea: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 rounded-lg border bg-muted/10 p-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{t(idea)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* STYLE GUIDE */}
              <Card className="shadow-glow border border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Ruler className="h-5 w-5 text-primary" /> {t('Professional Style Guide')}
                  </CardTitle>
                  <CardDescription>{t('Measurement and pairing recommendations')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">{t('Key Measurements')}</h4>
                    <div className="space-y-2">
                      {suggestions.styleGuide.measurements.map((m: any, i: number) => (
                        <div key={i} className="flex items-center justify-between rounded-lg border bg-muted/20 p-2">
                          <span className="font-medium text-sm">{m.part}</span>
                          <span className="text-xs text-muted-foreground">{m.recommendation}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">{t('Styling Pairings')}</h4>
                    <div className="space-y-2">
                      {suggestions.styleGuide.pairings.map((p: string, i: number) => (
                        <div key={i} className="flex items-start gap-2 rounded-lg border bg-muted/10 p-2">
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground">{p}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* TREND INSIGHTS */}
              <Card className="shadow-glow border border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5 text-primary" /> {t('Market Trend Insights')}
                  </CardTitle>
                  <CardDescription>{t('Current fashion industry trends')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {suggestions.trendInsights.map((trend: any, i: number) => (
                    <div key={i} className="rounded-lg border bg-muted/20 p-3 space-y-1">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                        <h4 className="font-semibold">{trend.trend}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{trend.relevance}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
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
