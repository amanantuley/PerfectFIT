'use server';

import { z } from 'zod';
import { sendContactMail } from '@/lib/mailer';

export async function submitContact(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string().min(2, { message: 'Please enter a valid name.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    message: z.string().min(5, { message: 'Message should be at least 5 characters.' }),
  });

  const parsed = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    const error = parsed.error.issues.map(i => i.message).join(', ');
    return { message: error, error: true };
  }

  try {
    const { name, email, message } = parsed.data;
    console.log(`📧 [Contact Form] Message received at ${new Date().toISOString()}`, {
      name,
      email,
      message,
    });

    // Send email (handled via mailer)
    await sendContactMail(parsed.data);

    return { message: 'Your message has been sent successfully!', error: false };
  } catch (err: any) {
    console.error('❌ Email sending failed:', err);
    return { message: 'Failed to send message. Please try again later.', error: true };
  }
}
