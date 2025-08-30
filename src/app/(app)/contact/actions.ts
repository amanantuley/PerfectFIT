'use server';

import { z } from 'zod';
import { sendContactMail } from '@/lib/mailer';

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

  try {
    await sendContactMail(parsed.data); // ✅ send email
    return { message: 'Message sent successfully!', error: false };
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    return { message: 'Failed to send message. Try again later.', error: true };
  }
}
