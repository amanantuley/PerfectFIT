"use server"; // ensure this only runs on server

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "mail.smtp2go.com",
  port: 2525,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendContactMail(formData: { name: string; email: string; message: string }) {
  await transporter.sendMail({
    from: `"PerfectFit Contact" <23co25@aiktc.ac.in>`, // ✅ verified sender
    to: process.env.CONTACT_TO, // the recipient (your Gmail or any email)
    subject: "New Contact Form Submission",
    text: `You got a new message from ${formData.name} (${formData.email}):\n\n${formData.message}`,
  });
}
