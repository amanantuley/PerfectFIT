'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';

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

  const subscriberEmail = parsed.data.email;

  try {
    // ✅ Create transporter (replace with your real credentials or environment variables)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER, // example: your Gmail
        pass: process.env.SMTP_PASS, // app password, not Gmail password
      },
    });

    // ✅ Send the confirmation email
    await transporter.sendMail({
      from: `"PerfectFit Newsletter" <${process.env.SMTP_USER}>`,
      to: subscriberEmail,
      subject: 'Welcome to PerfectFit Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Welcome to PerfectFit 👗✨</h2>
          <p>Thank you for subscribing to our newsletter!</p>
          <p>We’re excited to keep you updated on the latest styles, offers, and features from PerfectFit.</p>
          <br/>
          <p>Warm regards,<br/><strong>The PerfectFit Team</strong></p>
        </div>
      `,
    });

    console.log(`✅ Confirmation email sent to: ${subscriberEmail}`);

    return { message: 'Thanks for subscribing! Check your inbox for a confirmation email.', error: false };

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return { message: 'Subscription succeeded, but failed to send confirmation email.', error: true };
  }
}
