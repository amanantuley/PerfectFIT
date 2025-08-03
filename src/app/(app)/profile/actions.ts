
'use server';

import { z } from 'zod';

export async function submitProfile(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
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
    // If new password is provided, current password must also be provided.
    if (data.newPassword && !data.currentPassword) {
      return false;
    }
    return true;
  }, {
    message: "Current password is required to set a new password.",
    path: ["currentPassword"], // You can specify the path of the error
  });

  const parsed = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
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
  
  // In a real app, you would:
  // 1. Verify the current password if a new password is set.
  // 2. Hash the new password.
  // 3. Update the user record in the database.
  // 4. Handle avatar upload (e.g., to cloud storage).
  console.log('Profile update received:', parsed.data);

  return { message: 'Your profile has been updated successfully!', error: false };
}
