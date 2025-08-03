
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, DollarSign, Clock, Edit } from 'lucide-react';
import Image from 'next/image';
import { designs } from '@/lib/designs-data';
import { useTranslation } from '@/context/translation-provider';

export default function TailorDesignsPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle className="text-rainbow">{t('My Designs')}</CardTitle>
          <CardDescription>
            {t('Showcase your design portfolio to attract new clients.')}
          </CardDescription>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          {t('Add New Design')}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {designs.map((design) => (
          <Card
            key={design.name}
            className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <CardHeader className="p-0">
              <div className="relative aspect-video w-full">
                <Image
                  src={design.image}
                  alt={design.name}
                  fill
                  className="object-cover"
                  data-ai-hint={design.dataAiHint}
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <h3 className="font-bold text-lg truncate">{t(design.name as any)}</h3>
              <div className="flex items-center justify-between text-muted-foreground text-sm">
                <div className="flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4" />
                  <span>{design.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{t(design.timeToCreate as any)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button variant="outline" className="w-full">
                <Edit className="mr-2 h-4 w-4" />
                {t('Edit')}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
