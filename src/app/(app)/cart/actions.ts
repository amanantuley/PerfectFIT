'use server';

import { z } from 'zod';
import { tailors } from '@/lib/tailors';

// Define strong TypeScript types
type OrderResponse = {
  message: string;
  error: boolean;
  data?: {
    items?: any[];
    tailor?: string;
    orderId?: string;
    pointsAwarded?: number;
  } | null;
};

export async function submitOrder(prevState: any, formData: FormData): Promise<OrderResponse> {
  // ✅ Build Zod schema dynamically from tailor list
  const tailorIds = tailors.map((t) => t.id) as [string, ...string[]];

  const schema = z.object({
    items: z.string().min(1, { message: 'Cart is empty.' }),
    tailor: z.enum(tailorIds, {
      errorMap: () => ({ message: 'Please select a valid tailor.' }),
    }),
  });

  // ✅ Parse form data safely
  const data = {
    items: formData.get('items'),
    tailor: formData.get('tailor'),
  };

  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    const error = parsed.error.issues.map((issue) => issue.message).join(', ');
    return { message: error, error: true, data: null };
  }

  try {
    // ✅ Validate and parse cart items JSON
    const items = JSON.parse(parsed.data.items as string);
    if (!Array.isArray(items) || items.length === 0) {
      return { message: 'Invalid or empty items list.', error: true, data: null };
    }

    // ✅ Simulate order creation (DB placeholder)
    const orderId = `ORD-${Date.now()}`;
    const pointsAwarded = 100;

    console.log('🧾 New PerfectFit Order', {
      orderId,
      tailor: parsed.data.tailor,
      items,
      pointsAwarded,
      createdAt: new Date().toISOString(),
    });

    // ✅ Simulate saving to database
    // await db.orders.create({ orderId, tailorId: parsed.data.tailor, items });

    return {
      message: '🎉 Your order has been placed successfully!',
      error: false,
      data: { items, tailor: parsed.data.tailor, orderId, pointsAwarded },
    };
  } catch (error: any) {
    console.error('❌ Order processing error:', error);
    return { message: 'Something went wrong while processing your order.', error: true, data: null };
  }
}
