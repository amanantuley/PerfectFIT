'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';

export async function submitNewsletter(prevState: any, formData: FormData) {
  // ✅ Validation schema
  const schema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
  });

  const parsed = schema.safeParse({
    email: formData.get('email'),
  });

  if (!parsed.success) {
    return { message: parsed.error.issues[0].message, error: true };
  }

  const subscriberEmail = parsed.data.email;

  try {
    // ✅ Configure transporter securely
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ✅ Verify connection before sending
    await transporter.verify();
    console.log('✅ SMTP connection established successfully');

    // ✅ Send confirmation email
    await transporter.sendMail({
      from: `"PerfectFit Newsletter" <${process.env.SMTP_USER}>`,
      to: subscriberEmail,
      subject: 'Welcome to PerfectFit Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f8f9fa; border-radius: 8px;">
          <h2 style="color: #6d28d9;">Welcome to PerfectFit 👗✨</h2>
          <p>Hi there! Thank you for subscribing to our newsletter.</p>
          <p>You're now part of our growing community! We’ll keep you updated with:</p>
          <ul>
            <li>💎 New fashion drops</li>
            <li>💡 AI styling tips</li>
            <li>🎁 Exclusive offers and rewards</li>
          </ul>
          <p style="margin-top: 20px;">Stay tuned and look your best, always 💜</p>
          <p style="font-size: 14px; color: #555;">— The PerfectFit Team</p>
        </div>
      `,
    });

    console.log(`📩 Confirmation email sent to: ${subscriberEmail}`);

    return { message: 'Thanks for subscribing! Check your inbox for a confirmation email.', error: false };

  } catch (error: any) {
    console.error('❌ Email sending failed:', error.message);
    return { message: 'Subscription succeeded, but failed to send confirmation email.', error: true };
  }
}
