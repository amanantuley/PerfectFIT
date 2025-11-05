'use server';

import nodemailer from 'nodemailer';

export async function sendSupportMessage(_: any, formData: FormData) {
  const message = formData.get('message') as string;

  if (!message || message.trim().length < 5) {
    return { success: false, message: 'Please enter a detailed message.' };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER, // e.g. your Gmail
        pass: process.env.SMTP_PASS, // app-specific password
      },
    });

    await transporter.sendMail({
      from: `"PerfectFit Tailor Support" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // your inbox
      subject: '🧵 New Tailor Support Message',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>📩 Tailor Support Message</h2>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <hr/>
          <p style="font-size: 12px; color: gray;">Sent from PerfectFit Tailor Settings</p>
        </div>
      `,
    });

    console.log('✅ Tailor support email sent successfully.');
    return { success: true, message: 'Your message was sent successfully! Our support team will reach out soon.' };
  } catch (error) {
    console.error('❌ Failed to send support email:', error);
    return { success: false, message: 'Failed to send your message. Please try again later.' };
  }
}
