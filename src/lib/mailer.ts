"use server";

import nodemailer from "nodemailer";

// ✅ Configure SMTP2GO Transport
const transporter = nodemailer.createTransport({
  host: "mail.smtp2go.com",
  port: 2525,
  secure: false,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

/**
 * Send contact form email + confirmation
 */
export async function sendContactMail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    // ✅ 1. Send message to your business inbox
    const supportMail = await transporter.sendMail({
      from: `"PerfectFit Contact" <23co25@aiktc.ac.in>`, // must be verified sender in SMTP2GO
      to: process.env.CONTACT_TO, // your internal email (e.g. support@perfectfit.com)
      replyTo: email,
      subject: `📩 New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family:Arial, sans-serif; background:#f9f9f9; padding:20px; border-radius:8px;">
          <h2 style="color:#6C63FF;">New Message Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background:#fff; border-left:4px solid #6C63FF; padding:10px 15px; margin-top:10px; border-radius:4px;">
            ${message.replace(/\n/g, "<br>")}
          </div>
          <p style="font-size:12px; color:#999;">Sent on ${new Date().toLocaleString()}</p>
        </div>
      `,
    });

    // ✅ 2. Send auto-reply confirmation to the user
    const userReply = await transporter.sendMail({
      from: `"PerfectFit Support" <23co25@aiktc.ac.in>`,
      to: email,
      subject: `👗 Thanks for contacting PerfectFit, ${name}!`,
      html: `
        <div style="font-family:Arial, sans-serif; background:#f8fafc; padding:20px; border-radius:8px;">
          <h2 style="color:#6C63FF;">Hey ${name},</h2>
          <p>Thank you for reaching out to <strong>PerfectFit</strong>! We’ve received your message and our team will get back to you within <strong>24–48 hours</strong>.</p>
          <p><em>Your message:</em></p>
          <blockquote style="border-left:3px solid #6C63FF; padding-left:10px; color:#555; background:#fff; border-radius:4px;">
            ${message.replace(/\n/g, "<br>")}
          </blockquote>
          <p>Warm regards,<br><strong>The PerfectFit Team</strong></p>
          <hr/>
          <p style="font-size:12px; color:#777;">This is an automated confirmation. Please don’t reply to this email.</p>
        </div>
      `,
    });

    console.log("✅ Contact mail sent:", supportMail.messageId);
    console.log("✅ Confirmation mail sent:", userReply.messageId);

    return { success: true, message: "Emails sent successfully." };
  } catch (error: any) {
    console.error("❌ Mail send error:", error);

    // Optional fallback: Log failed messages (to prevent message loss)
    console.log(`⚠️ Message from ${email}:`, message);

    return { success: false, message: "Failed to send email. Please try again later." };
  }
}
