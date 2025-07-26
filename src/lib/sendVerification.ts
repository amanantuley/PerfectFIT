// src/lib/sendVerification.ts
import { auth } from '@/lib/firebase';
import { sendEmailVerification } from 'firebase/auth';

export async function sendVerificationEmail() {
  if (auth.currentUser) {
    try {
      await sendEmailVerification(auth.currentUser);
      alert('Verification email sent!');
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  }
}
