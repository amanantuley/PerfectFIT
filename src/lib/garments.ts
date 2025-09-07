// Garment data - could be replaced with a database call in a real app.

export type Garment = {
  name: string;
  type: string;
  image: string;
  dataAiHint: string;
  price: number;
  rentPrice: number;
};

export const garments: Garment[] = [
  // Shirts (300-500 range)
  { name: 'Classic White Oxford Shirt', type: 'shirt', image: 'https://picsum.photos/seed/picsum/600/400', dataAiHint: 'white shirt', price: 450, rentPrice: 90 },
  { name: 'Blue Striped Poplin Shirt', type: 'shirt', image: 'https://picsum.photos/seed/stripe/600/400', dataAiHint: 'striped shirt', price: 470, rentPrice: 95 },
  { name: 'Casual Black Linen Shirt', type: 'shirt', image: 'https://picsum.photos/seed/black/600/400', dataAiHint: 'black shirt', price: 400, rentPrice: 80 },
  { name: 'Maroon Checkered Flannel', type: 'shirt', image: 'https://picsum.photos/seed/maroon/600/400', dataAiHint: 'checkered shirt', price: 480, rentPrice: 98 },
  { name: 'Olive Green Corduroy Shirt', type: 'shirt', image: 'https://picsum.photos/seed/olive/600/400', dataAiHint: 'green shirt', price: 490, rentPrice: 100 },

  // T-Shirts (300-500 range)
  { name: 'Basic Crew Neck T-Shirt', type: 't-shirt', image: 'https://picsum.photos/seed/crewneck/600/400', dataAiHint: 'crewneck t-shirt', price: 300, rentPrice: 60 },
  { name: 'V-Neck Pima Cotton T-Shirt', type: 't-shirt', image: 'https://picsum.photos/seed/vneck/600/400', dataAiHint: 'v-neck t-shirt', price: 350, rentPrice: 70 },
  { name: 'Henley Neck Full Sleeve Tee', type: 't-shirt', image: 'https://picsum.photos/seed/henley/600/400', dataAiHint: 'henley shirt', price: 420, rentPrice: 85 },
  { name: 'Polo T-Shirt', type: 't-shirt', image: 'https://picsum.photos/seed/polo/600/400', dataAiHint: 'polo shirt', price: 480, rentPrice: 95 },
  { name: 'Graphic Print T-Shirt', type: 't-shirt', image: 'https://picsum.photos/seed/graphic/600/400', dataAiHint: 'graphic t-shirt', price: 400, rentPrice: 80 },

  // Jeans (300-500 for basic, more for premium but we'll stick to the user's price for now)
  { name: 'Classic Blue Straight-Fit Jeans', type: 'jeans', image: 'https://picsum.photos/seed/bluejeans/600/400', dataAiHint: 'blue jeans', price: 490, rentPrice: 100 },
  { name: 'Black Slim-Fit Denim', type: 'jeans', image: 'https://picsum.photos/seed/blackjeans/600/400', dataAiHint: 'black jeans', price: 480, rentPrice: 98 },
  { name: 'Light Wash Relaxed Jeans', type: 'jeans', image: 'https://picsum.photos/seed/lightjeans/600/400', dataAiHint: 'light jeans', price: 450, rentPrice: 90 },
  { name: 'Grey Skinny Jeans', type: 'jeans', image: 'https://picsum.photos/seed/greyjeans/600/400', dataAiHint: 'grey jeans', price: 470, rentPrice: 95 },
  { name: 'Dark Indigo Bootcut Jeans', type: 'jeans', image: 'https://picsum.photos/seed/darkjeans/600/400', dataAiHint: 'dark jeans', price: 500, rentPrice: 100 },

  // Suits & Blazers (More Expensive)
  { name: 'Navy Blue Two-Piece Suit', type: 'suit', image: 'https://picsum.photos/seed/navysuit/600/400', dataAiHint: 'blue suit', price: 4500, rentPrice: 900 },
  { name: 'Charcoal Grey Three-Piece Suit', type: 'suit', image: 'https://picsum.photos/seed/greysuit/600/400', dataAiHint: 'gray suit', price: 5800, rentPrice: 1160 },
  { name: 'Black Peak Lapel Tuxedo', type: 'suit', image: 'https://picsum.photos/seed/tuxedo/600/400', dataAiHint: 'tuxedo suit', price: 7500, rentPrice: 1500 },
  { name: 'Beige Linen Blazer', type: 'blazer', image: 'https://picsum.photos/seed/beigeblazer/600/400', dataAiHint: 'beige blazer', price: 2800, rentPrice: 560 },
  { name: 'Houndstooth Sports Coat', type: 'blazer', image: 'https://picsum.photos/seed/sportscoat/600/400', dataAiHint: 'sports coat', price: 3200, rentPrice: 640 },
  { name: 'Double-Breasted Pinstripe Suit', type: 'suit', image: 'https://picsum.photos/seed/pinstripe/600/400', dataAiHint: 'pinstripe suit', price: 6200, rentPrice: 1240 },
  { name: 'Burgundy Velvet Blazer', type: 'blazer', image: 'https://picsum.photos/seed/velvetblazer/600/400', dataAiHint: 'velvet blazer', price: 4100, rentPrice: 820 },
  
  // Festive/Wedding Wear (More Expensive)
  { name: 'Embroidered Silk Sherwani', type: 'sherwani', image: 'https://picsum.photos/seed/sherwani/600/400', dataAiHint: 'silk sherwani', price: 12500, rentPrice: 2500 },
  { name: 'Golden Brocade Kurta Set', type: 'kurta', image: 'https://picsum.photos/seed/kurta/600/400', dataAiHint: 'brocade kurta', price: 3500, rentPrice: 700 },
  { name: 'Royal Blue Jodhpuri Suit', type: 'suit', image: 'https://picsum.photos/seed/jodhpuri/600/400', dataAiHint: 'jodhpuri suit', price: 9800, rentPrice: 1960 },
  { name: 'Pastel Floral Kurta', type: 'kurta', image: 'https://picsum.photos/seed/floralkurta/600/400', dataAiHint: 'floral kurta', price: 2800, rentPrice: 560 },
  { name: 'Ivory Chikankari Sherwani', type: 'sherwani', image: 'https://picsum.photos/seed/chikankari/600/400', dataAiHint: 'chikankari sherwani', price: 18000, rentPrice: 3600 },
  { name: 'Black Bandhgala Jacket', type: 'blazer', image: 'https://picsum.photos/seed/bandhgala/600/400', dataAiHint: 'bandhgala jacket', price: 6500, rentPrice: 1300 },
  
  // Trousers & Chinos (Higher than basic tees, lower than suits)
  { name: 'Khaki Cotton Chinos', type: 'trousers', image: 'https://picsum.photos/seed/chinos/600/400', dataAiHint: 'khaki chinos', price: 1200, rentPrice: 240 },
  { name: 'Grey Wool Formal Trousers', type: 'trousers', image: 'https://picsum.photos/seed/wooltrousers/600/400', dataAiHint: 'wool trousers', price: 1800, rentPrice: 360 },
  { name: 'Navy Slim-Fit Trousers', type: 'trousers', image: 'https://picsum.photos/seed/navytrousers/600/400', dataAiHint: 'navy trousers', price: 1500, rentPrice: 300 },
  { name: 'Olive Green Cargo Pants', type: 'trousers', image: 'https://picsum.photos/seed/cargopants/600/400', dataAiHint: 'cargo pants', price: 1300, rentPrice: 260 },
  { name: 'Cream Linen Trousers', type: 'trousers', image: 'https://picsum.photos/seed/linentrousers/600/400', dataAiHint: 'linen trousers', price: 1600, rentPrice: 320 },
  
  // More variety
  { name: 'Denim Jacket', type: 'jacket', image: 'https://picsum.photos/seed/denimjacket/600/400', dataAiHint: 'denim jacket', price: 2200, rentPrice: 440 },
  { name: 'Leather Biker Jacket', type: 'jacket', image: 'https://picsum.photos/seed/leatherjacket/600/400', dataAiHint: 'leather jacket', price: 8500, rentPrice: 1700 },
  { name: 'Bomber Jacket', type: 'jacket', image: 'https://picsum.photos/seed/bomberjacket/600/400', dataAiHint: 'bomber jacket', price: 2500, rentPrice: 500 },
  { name: 'Trench Coat', type: 'coat', image: 'https://picsum.photos/seed/trenchcoat/600/400', dataAiHint: 'trench coat', price: 7800, rentPrice: 1560 },
  { name: 'Simple Grey Hoodie', type: 'hoodie', image: 'https://picsum.photos/seed/hoodie/600/400', dataAiHint: 'grey hoodie', price: 900, rentPrice: 180 },
];
