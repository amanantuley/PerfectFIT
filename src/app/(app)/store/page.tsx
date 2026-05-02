'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/lib/db';
import { useApp } from '@/context/app-context';
import { Search, ShoppingCart, Tag, Filter, Loader2, Star, TrendingUp, ChevronRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function StorePage() {
  const { toast } = useToast();
  const { addToCart } = useApp();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([10000]); // Max price filter
  
  useEffect(() => {
    fetchProducts();
  }, [category, search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category !== 'All') params.append('category', category);
      if (search) params.append('search', search);
      
      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product, purchaseType: 'Buy' | 'Rent', e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to details page
    // Using a simplified garment structure for the context to maintain compatibility
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

  const categories = ['All', 'shirt', 't-shirt', 'jeans', 'suit', 'blazer', 'trousers', 'sherwani', 'kurta'];
  const filteredProducts = products.filter(p => p.price <= priceRange[0]);

  return (
    <div className="space-y-8 animate-fade-in-up pb-10">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-glow bg-black">
        <div className="absolute inset-0 z-0">
           <Image src="https://placehold.co/1600x400.png" alt="Store banner" fill className="object-cover opacity-50" data-ai-hint="luxury fashion banner"/>
           <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
        </div>
        <div className="relative z-10 p-8 sm:p-12 flex flex-col justify-center min-h-[250px]">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400 mb-4">
            The Premium Catalog
          </h1>
          <p className="max-w-xl text-muted-foreground text-sm sm:text-base">
            Discover pieces precision-crafted for your measurements. Our AI guarantees a perfect fit, so you can shop with absolute confidence.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 flex-shrink-0 space-y-6">
          <Card className="border border-white/10 shadow-glow sticky top-20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Filter className="h-4 w-4 text-primary" /> Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Find items..." 
                    className="pl-9 bg-muted/50"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full bg-muted/50">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(c => (
                      <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Max Price</Label>
                  <span className="text-sm font-semibold">₹{priceRange[0]}</span>
                </div>
                <Slider 
                  defaultValue={[10000]} 
                  max={20000} 
                  step={500}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Grid */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Showing <span className="font-bold text-foreground">{filteredProducts.length}</span> results</p>
            <div className="flex items-center gap-2">
               <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-full"><Check className="h-3 w-3"/> AI Sizing Active</span>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <Card className="border border-dashed border-white/20 bg-transparent shadow-none">
              <CardContent className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                <Search className="h-12 w-12 text-muted-foreground opacity-50" />
                <p className="text-lg font-semibold">No products found</p>
                <p className="text-muted-foreground text-sm max-w-sm">Try adjusting your filters or search terms to find what you're looking for.</p>
                <Button variant="outline" onClick={() => { setSearch(''); setCategory('All'); setPriceRange([10000]); }}>Reset Filters</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/store/${product.id}`} className="group outline-none">
                  <Card className="overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-glow hover:-translate-y-1 bg-gradient-to-br from-secondary/50 to-secondary/20 h-full flex flex-col cursor-pointer">
                    <CardContent className="p-0 relative">
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted/20">
                        <Image 
                          src={product.image} 
                          alt={product.name} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110" 
                          data-ai-hint={product.dataAiHint}
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                           <span className="bg-background/80 backdrop-blur-md px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                             View Details <ChevronRight className="h-4 w-4"/>
                           </span>
                        </div>
                      </div>
                      {product.rating >= 4.5 && (
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                           <TrendingUp className="h-3 w-3" /> Top Rated
                        </div>
                      )}
                    </CardContent>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start gap-2">
                         <CardTitle className="text-base line-clamp-2 leading-tight group-hover:text-purple-400 transition-colors">{product.name}</CardTitle>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <div className="flex items-center">
                           <Star className="h-3 w-3 fill-amber-500 text-amber-500 mr-1" />
                           <span className="font-medium text-foreground">{product.rating}</span>
                        </div>
                        <span>({product.reviewCount})</span>
                        <span className="mx-1">•</span>
                        <span className="capitalize">{product.type}</span>
                      </div>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 mt-auto flex flex-col gap-2">
                      <div className="w-full flex justify-between items-end mb-2">
                         <div>
                            <p className="text-[10px] uppercase text-muted-foreground tracking-wider">Buy New</p>
                            <p className="font-bold text-lg leading-none">₹{product.price.toFixed(2)}</p>
                         </div>
                         <div className="text-right">
                            <p className="text-[10px] uppercase text-muted-foreground tracking-wider">Rent</p>
                            <p className="font-semibold text-purple-400 leading-none">₹{product.rentPrice.toFixed(2)}/day</p>
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 w-full">
                        <Button 
                          size="sm" 
                          variant="default" 
                          className="w-full text-xs font-semibold"
                          onClick={(e) => handleAddToCart(product, 'Buy', e)}
                        >
                          <ShoppingCart className="mr-1.5 h-3.5 w-3.5" /> Buy
                        </Button>
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          className="w-full text-xs font-semibold"
                          onClick={(e) => handleAddToCart(product, 'Rent', e)}
                        >
                          <Tag className="mr-1.5 h-3.5 w-3.5" /> Rent
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
