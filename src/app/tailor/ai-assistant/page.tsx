
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Sparkles, Loader2, Lightbulb, Scissors, Check } from 'lucide-react';
import { useTranslation } from '@/context/translation-provider';
import { useState } from 'react';
import { tailorAssistant, type TailorAssistantOutput } from '@/ai/flows/tailor-assistant-flow';
import { useToast } from '@/hooks/use-toast';

export default function TailorAiAssistantPage() {
    const { t } = useTranslation();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<TailorAssistantOutput | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setSuggestions(null);

        const formData = new FormData(event.currentTarget);
        const input = {
            garmentType: formData.get('garmentType') as string,
            occasion: formData.get('occasion') as string,
            season: formData.get('season') as string,
            customerPreferences: formData.get('customerPreferences') as string,
        };

        try {
            const result = await tailorAssistant(input);
            setSuggestions(result);
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to generate suggestions. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            <Card className="shadow-lg">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-pink-100 p-4 rounded-full mb-4">
                        <Wand2 className="h-12 w-12 text-pink-500" />
                    </div>
                    <CardTitle className="text-3xl font-headline animate-text-rainbow bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent bg-size-200">{t('AI Assistant')}</CardTitle>
                    <CardDescription className="text-lg">
                        {t('Get creative suggestions for your next masterpiece.')}
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
                                    <SelectTrigger id="occasion">
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
                                <SelectTrigger id="season">
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
                            <Textarea id="customerPreferences" name="customerPreferences" placeholder={t('e.g., Prefers modern, slim fits and breathable fabrics.')} required />
                        </div>
                        <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            {t('Generate Ideas')}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {isLoading && (
                 <div className="text-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-pink-500 mb-4" />
                    <p className="text-muted-foreground">{t('Your AI assistant is thinking...')}</p>
                </div>
            )}

            {suggestions && (
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl"><Lightbulb className="text-pink-500"/>{t('Fabric Suggestions')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {suggestions.fabricSuggestions.map((item, index) => (
                                <div key={index}>
                                    <h4 className="font-bold">{t(item.name)}</h4>
                                    <p className="text-sm text-muted-foreground">{t(item.reasoning)}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl"><Scissors className="text-pink-500"/>{t('Design Elements')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             {suggestions.designSuggestions.map((item, index) => (
                                <div key={index}>
                                    <h4 className="font-bold">{t(item.element)}</h4>
                                    <p className="text-sm text-muted-foreground">{t(item.suggestion)}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl"><Check className="text-pink-500"/>{t('Customization Ideas')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                           <ul className="list-disc pl-5 text-muted-foreground">
                             {suggestions.customizationIdeas.map((idea, index) => (
                                <li key={index}>{t(idea)}</li>
                            ))}
                           </ul>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
