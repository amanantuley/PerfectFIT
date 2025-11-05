'use server';

import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import nodemailer from 'nodemailer';

export async function updateTailorProfile(_: any, formData: FormData) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return { success: false, message: 'You must be logged in.' };
  }

  const tailorId = user.uid;
  const data = {
    name: formData.get('name'),
    location: formData.get('location'),
    bio: formData.get('bio'),
    specialties: formData.get('specialties'),
    rushOrders: formData.get('rushOrders') === 'on',
    bankName: formData.get('bankName'),
    routingNumber: formData.get('routingNumber'),
    accountNumber: formData.get('accountNumber'),
    avatarUrl: formData.get('avatarUrl') || user.photoURL || '',
    updatedAt: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, 'tailors', tailorId), data, { merge: true });

    // Optional — Send notification email to admin
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"PerfectFit System" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `Tailor Profile Updated — ${data.name}`,
      html: `
        <h3>Tailor Profile Updated</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Specialties:</strong> ${data.specialties}</p>
      `,
    });

    console.log('✅ Tailor profile saved and email sent');
    return { success: true, message: 'Profile updated successfully!' };
  } catch (err) {
    console.error('❌ Error saving profile:', err);
    return { success: false, message: 'Failed to save profile. Please try again.' };
  }
}
