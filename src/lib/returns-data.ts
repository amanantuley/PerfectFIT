
export const returnsHistory = [
  {
    id: 'RET004',
    item: 'Casual Checkered Shirt',
    image: 'https://placehold.co/40x40.png',
    dataAiHint: 'checkered shirt',
    status: 'Returned',
    date: '2025-06-15',
    reason: 'The color was not as expected.',
    refundDetails: {
      originalPrice: 95.00,
      returnFee: 5.00,
      netRefund: 90.00,
      refundStatus: 'Completed',
      transactionId: 'REF-789XYZ'
    }
  },
  {
    id: 'RET003',
    item: 'Classic White Shirt',
    image: 'https://placehold.co/40x40.png',
    dataAiHint: 'white shirt',
    status: 'Replaced',
    date: '2025-05-25',
    reason: 'Received the wrong size.',
    refundDetails: {
      originalPrice: 80.00,
      returnFee: 0.00,
      netRefund: 0.00,
      refundStatus: 'Not Applicable (Replaced)',
      transactionId: 'N/A'
    }
  },
   {
    id: 'RET002',
    item: 'Navy Blue Suit',
    image: 'https://placehold.co/40x40.png',
    dataAiHint: 'blue suit',
    status: 'Returned',
    date: '2025-04-10',
    reason: 'Fit was not perfect around the shoulders.',
    refundDetails: {
      originalPrice: 450.00,
      returnFee: 15.00,
      netRefund: 435.00,
      refundStatus: 'Completed',
      transactionId: 'REF-123ABC'
    }
  },
];

export type ReturnEntry = (typeof returnsHistory)[0];
