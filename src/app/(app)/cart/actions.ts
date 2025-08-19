
'use server';

import { z } from 'zod';
import { tailors } from '@/lib/tailors';

export async function submitOrder(prevState: any, formData: FormData) {
  const tailorIds = tailors.map(t => t.id) as [string, ...string[]];

  const schema = z.object({
    items: z.string().min(1, { message: "Cart is empty." }),
    tailor: z.enum(tailorIds, { errorMap: () => ({ message: "Please select a tailor." }) }),
  });

  const data = {
    items: formData.get('items'),
    tailor: formData.get('tailor'),
  };
  
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    const error = parsed.error.issues.map(issue => issue.message).join(', ');
    return { message: error, error: true, data: null };
  }

  try {
    const items = JSON.parse(parsed.data.items as string);
    // In a real app, you would process the order, save to a DB, and charge the user.
    console.log('New custom order received for multiple items:', {
      items: items,
      tailor: parsed.data.tailor,
    });
    console.log('Awarding 100 points for this purchase.'); // Simulating reward points

    return { message: 'Your order has been placed successfully!', error: false, data: { items: items } };

  } catch (e) {
    return { message: 'Invalid items data.', error: true, data: null };
  }
}
