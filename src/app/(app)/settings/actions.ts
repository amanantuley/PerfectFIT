'use server';

import { z } from 'zod';

export async function submitSettings(prevState: any, formData: FormData) {
  const schema = z.object({
    emailNotifications: z.boolean(),
    pushNotifications: z.boolean(),
    offersNotifications: z.boolean(),
    theme: z.enum(['light', 'dark', 'system']),
    language: z.string(),
  });

  const parsed = schema.safeParse({
    emailNotifications: formData.get('emailNotifications') === 'on',
    pushNotifications: formData.get('pushNotifications') === 'on',
    offersNotifications: formData.get('offersNotifications') === 'on',
    theme: formData.get('theme'),
    language: formData.get('language'),
  });

  if (!parsed.success) {
    const error = parsed.error.issues.map(issue => issue.message).join(', ');
    return { message: error, error: true };
  }
  
  // In a real app, you would save these settings to the user's profile in the DB.
  console.log('Settings updated:', parsed.data);

  return { message: 'Your settings have been updated successfully!', error: false };
}
