export const returnsHistory = [
  {
    id: 'RET004',
    item: 'Casual Checkered Shirt',
    image: 'https://placehold.co/40x40.png',
    dataAiHint: 'checkered shirt',
    status: 'Returned',
    date: '2024-06-15',
  },
  {
    id: 'RET003',
    item: 'Classic White Shirt',
    image: 'https://placehold.co/40x40.png',
    dataAiHint: 'white shirt',
    status: 'Replaced',
    date: '2024-05-25',
  },
   {
    id: 'RET002',
    item: 'Navy Blue Suit',
    image: 'https://placehold.co/40x40.png',
    dataAiHint: 'blue suit',
    status: 'Returned',
    date: '2024-04-10',
  },
];

export type ReturnEntry = (typeof returnsHistory)[0];
