'use server';

import { z } from 'zod';

export async function submitFeedback(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    rating: z.coerce.number().min(1).max(5),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  });

  const parsed = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    rating: formData.get('rating'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    const error = parsed.error.issues.map(issue => issue.message).join(', ');
    return { message: error, error: true };
  }
  
  // In a real app, you would save this to a DB
  console.log('New feedback received:', parsed.data);

  return { message: 'Thank you for your feedback!', error: false };
}
