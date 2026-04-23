"use server";

import { sendEmail } from "@/lib/email";

export async function sendContactEmail(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const subject = (formData.get("subject") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();
  const honeypot = formData.get("website") as string;

  // Spam check
  if (honeypot) {
    return { success: true };
  }

  if (!name || !email || !subject || !message) {
    return { error: "All fields are required." };
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Invalid email address." };
  }

  const subjectLabels: Record<string, string> = {
    general: "General Enquiry",
    membership: "Membership / Joining SPARQ",
    project: "Project Collaboration",
    event: "Event Enquiry",
    other: "Other",
  };

  const subjectLine = `${subjectLabels[subject] || subject} — SPARQ Contact Form`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #2563EB; padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">New Contact Form Submission</h1>
      </div>
      <div style="background: #f9fafb; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 80px; vertical-align: top;"><strong>Name</strong></td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; vertical-align: top;"><strong>Email</strong></td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px;"><a href="mailto:${escapeHtml(email)}" style="color: #2563EB;">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; vertical-align: top;"><strong>Subject</strong></td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px;">${escapeHtml(subjectLabels[subject] || subject)}</td>
          </tr>
        </table>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
        <div style="color: #111827; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</div>
      </div>
      <p style="color: #9ca3af; font-size: 12px; margin-top: 16px; text-align: center;">
        Sent via the SPARQ website contact form
      </p>
    </div>
  `;

  try {
    await sendEmail({
      to: "hello@sparq.org.uk",
      subject: subjectLine,
      html,
    });
    return { success: true };
  } catch (err) {
    console.error("Contact form email error:", err);
    return { error: "Failed to send message. Please try again." };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
