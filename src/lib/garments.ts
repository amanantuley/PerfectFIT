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
  { name: 'Classic White Oxford Shirt', type: 'shirt', image: '/CWOS.webp', dataAiHint: 'white shirt', price: 450, rentPrice: 90 },
  { name: 'Blue Striped Poplin Shirt', type: 'shirt', image: '/BSPS.webp', dataAiHint: 'striped shirt', price: 470, rentPrice: 95 },
  { name: 'Casual Black Linen Shirt', type: 'shirt', image: '/CBLS.webp', dataAiHint: 'black shirt', price: 400, rentPrice: 80 },
  { name: 'Maroon Checkered Flannel', type: 'shirt', image: '/MCF.webp', dataAiHint: 'checkered shirt', price: 480, rentPrice: 98 },
  { name: 'Olive Green Corduroy Shirt', type: 'shirt', image: '/MGCS.jpg', dataAiHint: 'green shirt', price: 490, rentPrice: 100 },

  // T-Shirts (300-500 range)
  { name: 'Basic Crew Neck T-Shirt', type: 't-shirt', image: '/BCNT.png', dataAiHint: 'crewneck t-shirt', price: 300, rentPrice: 60 },
  { name: 'V-Neck Pima Cotton T-Shirt', type: 't-shirt', image: '/VPCT.png', dataAiHint: 'v-neck t-shirt', price: 350, rentPrice: 70 },
  { name: 'Henley Neck Full Sleeve Tee', type: 't-shirt', image: '/HNFS.png', dataAiHint: 'henley shirt', price: 420, rentPrice: 85 },
  { name: 'Polo T-Shirt', type: 't-shirt', image: '/PTS.jpg', dataAiHint: 'polo shirt', price: 480, rentPrice: 95 },
  { name: 'Graphic Print T-Shirt', type: 't-shirt', image: '/GPT.png', dataAiHint: 'graphic t-shirt', price: 400, rentPrice: 80 },

  // Jeans (300-500 for basic, more for premium but we'll stick to the user's price for now)
  { name: 'Classic Blue Straight-Fit Jeans', type: 'jeans', image: '/CBSJ.png', dataAiHint: 'blue jeans', price: 490, rentPrice: 100 },
  { name: 'Black Slim-Fit Denim', type: 'jeans', image: '/BSFD.png', dataAiHint: 'black jeans', price: 480, rentPrice: 98 },
  { name: 'Light Wash Relaxed Jeans', type: 'jeans', image: '/LWRJ.png', dataAiHint: 'light jeans', price: 450, rentPrice: 90 },
  { name: 'Grey Skinny Jeans', type: 'jeans', image: '/GSJ.png', dataAiHint: 'grey jeans', price: 470, rentPrice: 95 },
  { name: 'Dark Indigo Bootcut Jeans', type: 'jeans', image: '/DIBJ.png', dataAiHint: 'dark jeans', price: 500, rentPrice: 100 },

  // Suits & Blazers (More Expensive)
  { name: 'Navy Blue Two-Piece Suit', type: 'suit', image: '/NTTP.png', dataAiHint: 'blue suit', price: 4500, rentPrice: 900 },
  { name: 'Charcoal Grey Three-Piece Suit', type: 'suit', image: '/CGTP.png', dataAiHint: 'gray suit', price: 5800, rentPrice: 1160 },
  { name: 'Black Peak Lapel Tuxedo', type: 'suit', image: '/BPLT.png', dataAiHint: 'tuxedo suit', price: 7500, rentPrice: 1500 },
  { name: 'Beige Linen Blazer', type: 'blazer', image: '/BLB.png', dataAiHint: 'beige blazer', price: 2800, rentPrice: 560 },
  { name: 'Houndstooth Sports Coat', type: 'blazer', image: '/HSC.png', dataAiHint: 'sports coat', price: 3200, rentPrice: 640 },
  { name: 'Double-Breasted Pinstripe Suit', type: 'suit', image: '/DBPS.png', dataAiHint: 'pinstripe suit', price: 6200, rentPrice: 1240 },
  { name: 'Burgundy Velvet Blazer', type: 'blazer', image: '/BVB.png', dataAiHint: 'velvet blazer', price: 4100, rentPrice: 820 },
  
  // Festive/Wedding Wear (More Expensive)
  { name: 'Embroidered Silk Sherwani', type: 'sherwani', image: '/ESS.png', dataAiHint: 'silk sherwani', price: 12500, rentPrice: 2500 },
  { name: 'Golden Brocade Kurta Set', type: 'kurta', image: '/GBKS.png', dataAiHint: 'brocade kurta', price: 3500, rentPrice: 700 },
  { name: 'Royal Blue Jodhpuri Suit', type: 'suit', image: '/RBJS.png', dataAiHint: 'jodhpuri suit', price: 9800, rentPrice: 1960 },
  { name: 'Pastel Floral Kurta', type: 'kurta', image: '/PFK.png', dataAiHint: 'floral kurta', price: 2800, rentPrice: 560 },
  { name: 'Ivory Chikankari Sherwani', type: 'sherwani', image: '/ICS.png', dataAiHint: 'chikankari sherwani', price: 18000, rentPrice: 3600 },
  { name: 'Black Bandhgala Jacket', type: 'blazer', image: '/BBJ.png', dataAiHint: 'bandhgala jacket', price: 6500, rentPrice: 1300 },
  
  // Trousers & Chinos (Higher than basic tees, lower than suits)
  { name: 'Khaki Cotton Chinos', type: 'trousers', image: '/KCC.png', dataAiHint: 'khaki chinos', price: 1200, rentPrice: 240 },
  { name: 'Grey Wool Formal Trousers', type: 'trousers', image: '/GWFT.png', dataAiHint: 'wool trousers', price: 1800, rentPrice: 360 },
  { name: 'Navy Slim-Fit Trousers', type: 'trousers', image: '/NSFT.png', dataAiHint: 'navy trousers', price: 1500, rentPrice: 300 },
  { name: 'Olive Green Cargo Pants', type: 'trousers', image: '/OGCP.png', dataAiHint: 'cargo pants', price: 1300, rentPrice: 260 },
  { name: 'Cream Linen Trousers', type: 'trousers', image: '/CLT.png', dataAiHint: 'linen trousers', price: 1600, rentPrice: 320 },
  
  // More variety
  { name: 'Denim Jacket', type: 'jacket', image: '/DJ.png', dataAiHint: 'denim jacket', price: 2200, rentPrice: 440 },
  { name: 'Leather Biker Jacket', type: 'jacket', image: '/LBJ.png', dataAiHint: 'leather jacket', price: 8500, rentPrice: 1700 },
  { name: 'Bomber Jacket', type: 'jacket', image: '/BJ.png', dataAiHint: 'bomber jacket', price: 2500, rentPrice: 500 },
  { name: 'Trench Coat', type: 'coat', image: '/TC.png', dataAiHint: 'trench coat', price: 7800, rentPrice: 1560 },
  { name: 'Simple Grey Hoodie', type: 'hoodie', image: '/SGH.png', dataAiHint: 'grey hoodie', price: 900, rentPrice: 180 },
];
