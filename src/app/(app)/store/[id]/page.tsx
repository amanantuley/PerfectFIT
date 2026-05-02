'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/lib/db';
import { useApp } from '@/context/app-context';
import { ShoppingCart, Tag, Loader2, ArrowLeft, Star, ShieldCheck, Ruler, Check, Truck, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { toast } = useToast();
  const { addToCart } = useApp();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
           router.push('/store');
           return;
        }
        const data = await res.json();
        setProduct(data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, router]);

  const handleAddToCart = (purchaseType: 'Buy' | 'Rent') => {
    if (!product) return;
    
    addToCart({
      name: product.name,
      price: product.price,
      rentPrice: product.rentPrice,
      type: product.type,
      image: product.image,
      dataAiHint: product.dataAiHint,
    }, purchaseType);
    
    toast({
      title: `Added to cart!`,
      description: `${product.name} is ready for ${purchaseType.toLowerCase()}.`,
      action: <Button variant="outline" size="sm" asChild><Link href="/cart">View Cart</Link></Button>
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="space-y-8 animate-fade-in-up pb-10 max-w-6xl mx-auto">
      <Button variant="ghost" size="sm" asChild className="mb-2">
         <Link href="/store" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Store
         </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column - Image Gallery (Simplified to single image for now) */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/10 bg-muted/20">
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              className="object-cover"
              priority
              data-ai-hint={product.dataAiHint}
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg border border-white/10">
                    <Ruler className="h-3.5 w-3.5 text-primary" /> Custom Fit Eligible
                </span>
                {product.rating >= 4.5 && (
                   <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg max-w-max">
                      <Star className="h-3.5 w-3.5 fill-current" /> Top Rated
                   </span>
                )}
            </div>
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
               <span className="capitalize hover:text-primary cursor-pointer transition-colors">Men</span>
               <span>/</span>
               <span className="capitalize hover:text-primary cursor-pointer transition-colors">{product.type}s</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                 {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 sm:h-5 sm:w-5 ${i < Math.floor(product.rating) ? 'fill-amber-500 text-amber-500' : 'fill-muted text-muted-foreground'} mr-0.5`} />
                 ))}
                 <span className="font-semibold text-foreground ml-2 text-sm sm:text-base">{product.rating}</span>
              </div>
              <span className="text-muted-foreground text-sm sm:text-base underline cursor-pointer hover:text-foreground">Read {product.reviewCount} Reviews</span>
            </div>

            <div className="bg-gradient-to-br from-secondary/50 to-background rounded-2xl p-6 border border-white/10 mb-8 space-y-4">
               <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Buy New</p>
                    <p className="text-3xl font-bold">₹{product.price.toFixed(2)}</p>
                  </div>
                  <Button size="lg" className="px-8 font-bold text-base" onClick={() => handleAddToCart('Buy')}>
                    <ShoppingCart className="mr-2 h-5 w-5" /> Buy Now
                  </Button>
               </div>
               <div className="flex justify-between items-center pt-2">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Rent Instead</p>
                    <p className="text-xl font-bold text-purple-400">₹{product.rentPrice.toFixed(2)}<span className="text-sm text-muted-foreground font-normal">/day</span></p>
                  </div>
                  <Button size="lg" variant="secondary" className="px-8 font-bold text-base border border-purple-500/30 hover:border-purple-500/60" onClick={() => handleAddToCart('Rent')}>
                    <Tag className="mr-2 h-5 w-5 text-purple-400" /> Rent Now
                  </Button>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2"><Ruler className="h-5 w-5 text-primary" /> PerfectFit™ Guarantee</h3>
              <p className="text-muted-foreground leading-relaxed">
                When you purchase this item, it is meticulously tailored to the AI measurements in your profile. Our master tailors ensure a 1-to-1 match with your body geometry, completely eliminating sizing guesswork.
              </p>
            </div>
            
            <div className="border-t border-white/10 pt-6">
               <h3 className="text-lg font-bold mb-3">Product Description</h3>
               <p className="text-muted-foreground leading-relaxed">
                 {product.description} Crafted from premium materials sourced globally, this {product.type} represents the pinnacle of modern tailoring combined with classic style aesthetics.
               </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-6 mt-6">
               <div className="flex items-start gap-3">
                 <ShieldCheck className="h-5 w-5 text-emerald-500 mt-0.5" />
                 <div>
                    <p className="font-bold text-sm">Secure Transactions</p>
                    <p className="text-xs text-muted-foreground">End-to-end encryption for all payments.</p>
                 </div>
               </div>
               <div className="flex items-start gap-3">
                 <Check className="h-5 w-5 text-emerald-500 mt-0.5" />
                 <div>
                    <p className="font-bold text-sm">Quality Inspected</p>
                    <p className="text-xs text-muted-foreground">12-point manual inspection before dispatch.</p>
                 </div>
               </div>
               <div className="flex items-start gap-3">
                 <Truck className="h-5 w-5 text-primary mt-0.5" />
                 <div>
                    <p className="font-bold text-sm">Express Delivery</p>
                    <p className="text-xs text-muted-foreground">Delivered in 2-4 business days.</p>
                 </div>
               </div>
               <div className="flex items-start gap-3">
                 <RotateCcw className="h-5 w-5 text-primary mt-0.5" />
                 <div>
                    <p className="font-bold text-sm">Free Alterations</p>
                    <p className="text-xs text-muted-foreground">If it doesn't fit perfectly, we fix it free.</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
