'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

// ✅ Initialize Firebase Admin if not already done
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export async function sendSupportMessage(_: any, formData: FormData) {
  const schema = z.object({
    message: z.string().min(10, { message: 'Message must be at least 10 characters long.' }),
  });

  const parsed = schema.safeParse({
    message: formData.get('message'),
  });

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0].message };
  }

  const message = parsed.data.message;

  try {
    // ✅ Store the message in Firestore
    await addDoc(collection(db, 'supportMessages'), {
      message,
      createdAt: serverTimestamp(),
    });

    // ✅ Send email to admin (support inbox)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER, // e.g., your Gmail
        pass: process.env.SMTP_PASS, // app password
      },
    });

    await transporter.sendMail({
      from: `"PerfectFit Support" <${process.env.SMTP_USER}>`,
      to: process.env.SUPPORT_EMAIL || process.env.SMTP_USER,
      subject: 'New Support Message from PerfectFit Tailor',
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;color:#333;">
          <h3>New Support Message</h3>
          <p>${message}</p>
          <hr/>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
    });

    return { success: true, message: 'Your message has been sent to the support team!' };
  } catch (error) {
    console.error('❌ Error sending support message:', error);
    return { success: false, message: 'Failed to send support message. Please try again later.' };
  }
}
