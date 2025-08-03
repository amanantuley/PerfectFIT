
export const chargesData = [
  {
    id: 'suits-blazers',
    name: 'Suits & Blazers',
    services: [
      {
        id: 'two-piece-suit',
        name: 'Two-Piece Suit Stitching',
        description: 'Includes jacket and trousers, tailored to measurements.',
        price: 3500,
        marketRange: { min: 3000, max: 5000 },
      },
      {
        id: 'three-piece-suit',
        name: 'Three-Piece Suit Stitching',
        description: 'Jacket, trousers, and waistcoat for a complete look.',
        price: 4800,
        marketRange: { min: 4500, max: 6500 },
      },
      {
        id: 'blazer-jacket',
        name: 'Blazer/Jacket Stitching',
        description: 'A single tailored blazer or sports jacket.',
        price: 2500,
        marketRange: { min: 2000, max: 3500 },
      },
      {
        id: 'sherwani-stitching',
        name: 'Sherwani Stitching',
        description: 'Traditional formal wear with intricate detailing.',
        price: 6000,
        marketRange: { min: 5000, max: 10000 },
      }
    ],
  },
  {
    id: 'shirts-kurtas',
    name: 'Shirts & Kurtas',
    services: [
        {
            id: 'formal-shirt',
            name: 'Formal Shirt Stitching',
            description: 'Classic tailored shirt for business or formal events.',
            price: 800,
            marketRange: { min: 700, max: 1200 },
        },
        {
            id: 'casual-shirt',
            name: 'Casual Shirt Stitching',
            description: 'Comfortable and stylish shirts for everyday wear.',
            price: 750,
            marketRange: { min: 600, max: 1000 },
        },
        {
            id: 'kurta-stitching',
            name: 'Kurta Stitching',
            description: 'Simple and elegant traditional kurta.',
            price: 900,
            marketRange: { min: 800, max: 1500 },
        }
    ]
  },
  {
    id: 'trousers-bottoms',
    name: 'Trousers & Bottoms',
    services: [
        {
            id: 'formal-trousers',
            name: 'Formal Trousers Stitching',
            description: 'Perfectly fitted trousers for a professional look.',
            price: 1200,
            marketRange: { min: 1000, max: 1800 },
        },
        {
            id: 'casual-chinos',
            name: 'Casual Chinos Stitching',
            description: 'Tailored chinos for a smart-casual style.',
            price: 1100,
            marketRange: { min: 900, max: 1500 },
        }
    ]
  },
  {
    id: 'alterations',
    name: 'Alterations & Repairs',
    services: [
        {
            id: 'trouser-length',
            name: 'Trouser Length Adjustment',
            description: 'Shorten or lengthen trousers for the perfect fit.',
            price: 250,
            marketRange: { min: 200, max: 400 },
        },
        {
            id: 'sleeve-adjustment',
            name: 'Sleeve Length Adjustment',
            description: 'Adjust jacket or shirt sleeves.',
            price: 300,
            marketRange: { min: 250, max: 500 },
        },
        {
            id: 'waist-adjustment',
            name: 'Waist Tapering (In/Out)',
            description: 'Adjust the waist of trousers or jackets.',
            price: 400,
            marketRange: { min: 300, max: 600 },
        }
    ]
  }
];
