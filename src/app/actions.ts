
'use server';

import { z } from 'zod';

export async function submitNewsletter(prevState: any, formData: FormData) {
  const schema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
  });

  const parsed = schema.safeParse({
    email: formData.get('email'),
  });

  if (!parsed.success) {
    return { message: parsed.error.issues[0].message, error: true };
  }
  
  // In a real app, you would add this email to your mailing list (e.g., Mailchimp, ConvertKit)
  console.log(`New newsletter subscription from: ${parsed.data.email}`);

  return { message: 'Thanks for subscribing! Check your inbox for a confirmation.', error: false };
}
