'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, DollarSign, Clock, Edit, Upload, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from '@/context/translation-provider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

// ✅ Sample fallback designs
const defaultDesigns = [
  {
    name: 'Classic Suit',
    price: 3499,
    timeToCreate: '5 days',
    image: 'https://placehold.co/600x400?text=Classic+Suit',
    dataAiHint: 'formal design',
  },
  {
    name: 'Wedding Sherwani',
    price: 6999,
    timeToCreate: '8 days',
    image: 'https://placehold.co/600x400?text=Wedding+Sherwani',
    dataAiHint: 'ethnic design',
  },
];

export default function TailorDesignsPage() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [designs, setDesigns] = useState(defaultDesigns);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDesign, setCurrentDesign] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // ✅ Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tailor_designs');
    if (saved) setDesigns(JSON.parse(saved));
  }, []);

  // ✅ Save to localStorage whenever designs change
  useEffect(() => {
    localStorage.setItem('tailor_designs', JSON.stringify(designs));
  }, [designs]);

  const handleOpenDialog = (design?: any) => {
    if (design) {
      setIsEditing(true);
      setCurrentDesign(design);
      setPreviewImage(design.image);
    } else {
      setIsEditing(false);
      setCurrentDesign({
        name: '',
        price: '',
        timeToCreate: '',
        image: 'https://placehold.co/600x400?text=New+Design',
        dataAiHint: 'custom design',
      });
      setPreviewImage('https://placehold.co/600x400?text=New+Design');
    }
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setPreviewImage(null);
    setCurrentDesign(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const newDesign = {
      name: formData.get('design-name') as string,
      price: parseFloat(formData.get('design-price') as string),
      timeToCreate: formData.get('design-time') as string,
      image: previewImage || 'https://placehold.co/600x400?text=Design',
      dataAiHint: 'custom design',
    };

    setTimeout(() => {
      if (isEditing && currentDesign) {
        setDesigns((prev) =>
          prev.map((d) => (d.name === currentDesign.name ? newDesign : d))
        );
        toast({
          title: t('Design Updated!'),
          description: `${newDesign.name} ${t('has been updated in your portfolio.')}`,
        });
      } else {
        setDesigns((prev) => [newDesign, ...prev]);
        toast({
          title: t('Design Added!'),
          description: `${newDesign.name} ${t('has been added to your portfolio.')}`,
        });
      }

      setIsLoading(false);
      handleDialogClose();
    }, 1200);
  };

  return (
    <>
      <div className="space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-size-200 animate-text-rainbow">
              {t('My Designs')}
            </h1>
            <CardDescription>
              {t('Showcase your design portfolio to attract new clients.')}
            </CardDescription>
          </div>
          <Button className="w-full sm:w-auto" onClick={() => handleOpenDialog()}>
            <Plus className="mr-2 h-4 w-4" />
            {t('Add New Design')}
          </Button>
        </div>

        {/* Design Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {designs.map((design, index) => (
            <Card
              key={index}
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
                    <span>₹{design.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{t(design.timeToCreate as any)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleOpenDialog(design)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  {t('Edit')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? t('Edit Design') : t('Add New Design')}
            </DialogTitle>
            <DialogDescription>
              {t('Fill in the details below to showcase your work.')}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="design-image">{t('Design Image')}</Label>
              <div className="relative flex aspect-video w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed bg-muted/50 hover:border-primary">
                {previewImage && (
                  <Image
                    src={previewImage}
                    alt="Preview"
                    fill
                    className="rounded-md object-contain p-2"
                  />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <Input
                  id="design-image"
                  type="file"
                  className="absolute h-full w-full opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="design-name">{t('Design Name')}</Label>
              <Input id="design-name" name="design-name" defaultValue={currentDesign?.name} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="design-price">{t('Price')} (₹)</Label>
                <Input id="design-price" name="design-price" type="number" defaultValue={currentDesign?.price} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="design-time">{t('Time to Create')}</Label>
                <Input id="design-time" name="design-time" defaultValue={currentDesign?.timeToCreate} placeholder={t('e.g., 5 days')} required />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="ghost" onClick={handleDialogClose}>
                {t('Cancel')}
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? t('Save Changes') : t('Add Design')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
