// lib/sendPasswordReset.ts
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebase';

export async function sendPasswordReset(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset email sent!');
  } catch (error: any) {
    alert(error.message);
  }
}
