// src/components/VerifyEmailButton.tsx
'use client';

import React from 'react';
import { sendVerificationEmail } from '@/lib/sendVerification';

export default function VerifyEmailButton() {
  return (
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      onClick={sendVerificationEmail}
    >
      Send Verification Email
    </button>
  );
}
