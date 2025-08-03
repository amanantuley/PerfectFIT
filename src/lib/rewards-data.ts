
import { Gift, Ticket, Star, Truck, Zap, Percent } from 'lucide-react';

export const rewards = [
  {
    title: '$10 Off Coupon',
    description: 'Get $10 off your next purchase of $50 or more.',
    points: 500,
    icon: Ticket,
  },
  {
    title: 'Free Express Shipping',
    description: 'Upgrade your next order to express shipping for free.',
    points: 750,
    icon: Truck,
  },
  {
    title: 'Free Rental Credit',
    description: 'Enjoy one free rental on us (up to $100 value).',
    points: 1000,
    icon: Gift,
  },
  {
    title: 'Early Access Pass',
    description: 'Get exclusive 24-hour early access to our next collection.',
    points: 1500,
    icon: Zap,
  },
  {
    title: 'Personal Stylist Session',
    description: 'A 30-minute virtual consultation with a personal stylist.',
    points: 2500,
    icon: Star,
  },
   {
    title: '20% Off Your Next Suit',
    description: 'Get a special 20% discount on any suit purchase.',
    points: 2000,
    icon: Percent,
  },
];
