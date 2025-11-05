"use server";

import { z } from "zod";
import { sendContactMail } from "@/lib/mailer"; // optional if you want to email feedback

export async function submitFeedback(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    rating: z.coerce.number().min(1).max(5),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  });

  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    rating: formData.get("rating"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const error = parsed.error.issues.map((i) => i.message).join(", ");
    return { message: error, error: true };
  }

  try {
    // ✅ Log or send email
    console.log("📝 New Feedback Received:", parsed.data);

    // Optionally send via nodemailer
    // await sendContactMail({
    //   name: parsed.data.name,
    //   email: parsed.data.email,
    //   message: `⭐ Rating: ${parsed.data.rating}\n\n${parsed.data.message}`,
    // });

    return { message: "Thank you for your valuable feedback!", error: false };
  } catch (err) {
    console.error("❌ Error handling feedback:", err);
    return { message: "Something went wrong. Please try again.", error: true };
  }
}
