'use server';

import { z } from 'zod';

export async function submitContact(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    message: z.string().min(1, { message: "Message is required." }),
  });

  const parsed = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    const error = parsed.error.issues[0].message;
    return { message: error, error: true };
  }
  
  // In a real app, you would send an email or save to a DB
  console.log('New contact message received:', parsed.data);

  return { message: 'Message sent successfully!', error: false };
}
