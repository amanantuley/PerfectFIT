'use server';

import { z } from 'zod';
import { auth } from '@/lib/firebase';
import {
  updatePassword,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from 'firebase/auth';

export async function submitProfile(prevState: any, formData: FormData) {
  const schema = z.object({
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
    school: z.string().optional(),
    degree: z.string().optional(),
    fieldOfStudy: z.string().optional(),
  }).refine(data => {
    if (data.newPassword && !data.currentPassword) {
      return false;
    }
    return true;
  }, {
    message: "Current password is required to set a new password.",
    path: ["currentPassword"],
  });

  const parsed = schema.safeParse({
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword'),
    street: formData.get('street'),
    city: formData.get('city'),
    state: formData.get('state'),
    zip: formData.get('zip'),
    school: formData.get('school'),
    degree: formData.get('degree'),
    fieldOfStudy: formData.get('fieldOfStudy'),
  });

  if (!parsed.success) {
    const error = parsed.error.issues.map(issue => issue.message).join(', ');
    return { message: error, error: true };
  }

  try {
    const user = auth.currentUser;
    if (!user) return { message: 'User not logged in.', error: true };

    const { currentPassword, newPassword } = parsed.data;

    // ✅ If password change requested
    if (newPassword && currentPassword && user.email) {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      console.log('Password updated successfully!');
    }

    // ✅ (Optional) Update Firebase display name / custom fields
    await updateProfile(user, {
      displayName: user.displayName || 'User', // Or future name input
    });

    // ✅ Here you could also update user metadata to Firestore (address, school, etc.)
    console.log('Profile update received:', parsed.data);

    return { message: 'Profile updated successfully!', error: false };
  } catch (err: any) {
    console.error('Profile update failed:', err);
    return { message: err.message || 'Failed to update profile.', error: true };
  }
}

export async function deleteAccount() {
  try {
    const user = auth.currentUser;
    if (!user) return { message: 'No active user found.', error: true };

    await deleteUser(user);
    console.log('Firebase account deleted');
    return { message: 'Your account has been deleted successfully.', error: false };
  } catch (err: any) {
    console.error('Account deletion error:', err);
    return { message: err.message || 'Failed to delete account.', error: true };
  }
}
