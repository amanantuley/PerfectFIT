"use server"; // ensures this only runs server-side in Next.js

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "mail.smtp2go.com", // SMTP2GO host
  port: 2525,               // secure port for STARTTLS
  secure: false,            // false = STARTTLS, true = SSL (465)
  auth: {
    user: process.env.SMTP_USER!, // SMTP2GO username
    pass: process.env.SMTP_PASS!, // SMTP2GO password
  },
});

/**
 * Sends a contact form email
 */
export async function sendContactMail(formData: { name: string; email: string; message: string }) {
  try {
    const info = await transporter.sendMail({
      from: `"PerfectFit Contact" <23co25@aiktc.ac.in>`, // must be a verified sender in SMTP2GO
      to: process.env.CONTACT_TO, // recipient (your Gmail or work email)
      replyTo: formData.email, // user’s email → allows direct reply
      subject: "New Contact Form Submission",
      text: `You got a new message from ${formData.name} (${formData.email}):\n\n${formData.message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
      `,
    });

    console.log("✅ Mail sent:", info.messageId);
    return { success: true };
  } catch (error) {
    console.error("❌ Error sending mail:", error);
    return { success: false, error };
  }
}
