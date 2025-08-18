
import { Gift, Ticket, Star, Truck, Zap, Percent, Shirt, Scissors } from 'lucide-react';

export const rewards = [
  {
    title: '5% Off Coupon',
    description: 'Get 5% off your next purchase.',
    points: 100,
    icon: Ticket,
  },
  {
    title: 'Free Standard Shipping',
    description: 'Get free standard shipping on your next order.',
    points: 200,
    icon: Truck,
  },
  {
    title: '10% Off Any Shirt',
    description: 'Get a special 10% discount on any shirt purchase.',
    points: 300,
    icon: Shirt,
  },
  {
    title: 'Free Minor Alteration',
    description: 'One free minor alteration (e.g., sleeve or trouser length).',
    points: 400,
    icon: Scissors,
  },
  {
    title: '₹500 Off Coupon',
    description: 'Get ₹500 off your next purchase of ₹2500 or more.',
    points: 500,
    icon: Ticket,
  },
  {
    title: 'Free Express Shipping',
    description: 'Upgrade your next order to express shipping for free.',
    points: 600,
    icon: Truck,
  },
  {
    title: 'Early Access Pass',
    description: 'Get exclusive 24-hour early access to our next collection.',
    points: 700,
    icon: Zap,
  },
  {
    title: '20% Off Your Next Suit',
    description: 'Get a special 20% discount on any suit purchase.',
    points: 800,
    icon: Percent,
  },
  {
    title: 'Free Rental Credit',
    description: 'Enjoy one free rental on us (up to ₹5000 value).',
    points: 900,
    icon: Gift,
  },
  {
    title: 'Personal Stylist Session',
    description: 'A 30-minute virtual consultation with a personal stylist.',
    points: 1000,
    icon: Star,
  },
];
