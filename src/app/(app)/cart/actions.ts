
'use server';

import { z } from 'zod';
import { tailors } from '@/lib/tailors';

export async function submitOrder(prevState: any, formData: FormData) {
  const tailorIds = tailors.map(t => t.id) as [string, ...string[]];

  const schema = z.object({
    itemName: z.string(),
    color: z.string().min(1, { message: "Please select a color." }),
    quality: z.string().min(1, { message: "Please select a cloth quality." }),
    fit: z.string().min(1, { message: "Please select a fit style." }),
    lapel: z.string().min(1, { message: "Please select a lapel style." }),
    buttons: z.string().min(1, { message: "Please select a button stance." }),
    tailor: z.enum(tailorIds, { errorMap: () => ({ message: "Please select a tailor." }) }),
    message: z.string().optional(),
  });

  const parsed = schema.safeParse({
    itemName: formData.get('itemName'),
    color: formData.get('color'),
    quality: formData.get('quality'),
    fit: formData.get('fit'),
    lapel: formData.get('lapel'),
    buttons: formData.get('buttons'),
    tailor: formData.get('tailor'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    const error = parsed.error.issues.map(issue => issue.message).join(', ');
    return { message: error, error: true };
  }
  
  // In a real app, you would process the order, save to a DB, and charge the user.
  console.log('New custom order received:', parsed.data);
  console.log('Awarding 100 points for this purchase.'); // Simulating reward points

  return { message: 'Your order has been placed successfully!', error: false };
}
