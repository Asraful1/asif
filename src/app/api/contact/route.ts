import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const brevoApiKey = process.env.BREVO_API_KEY;
    const brevoSenderEmail = process.env.BREVO_SENDER_EMAIL;
    const brevoSenderName = process.env.BREVO_SENDER_NAME || "Contact Form";
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL;

    if (!brevoApiKey || !brevoSenderEmail || !recipientEmail) {
      console.error("Missing Brevo environment variables");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Send notification email to the site owner
    const notificationEmail = {
      sender: { name: brevoSenderName, email: brevoSenderEmail },
      to: [{ email: recipientEmail, name: "Site Owner" }],
      subject: `New Contact Form Submission from ${name}`,
      htmlContent: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #C1E08C;">New Contact Form Submission</h2>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Send auto-reply email to the person who submitted the form
    const autoReplyEmail = {
      sender: { name: brevoSenderName, email: brevoSenderEmail },
      to: [{ email: email, name: name }],
      subject: "Thank you for contacting us!",
      htmlContent: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #C1E08C;">Thank you for reaching out, ${name}!</h2>
              <p>We've received your message and appreciate you taking the time to contact us.</p>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <p><strong>Your message:</strong></p>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
              <p>We'll get back to you as soon as possible at ${email}.</p>
              <p>Best regards,<br>The Team</p>
            </div>
          </body>
        </html>
      `,
    };

    // Send both emails using Brevo API
    const brevoApiUrl = "https://api.brevo.com/v3/smtp/email";

    // Send notification to site owner
    const notificationResponse = await fetch(brevoApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify(notificationEmail),
    });

    if (!notificationResponse.ok) {
      const errorData = await notificationResponse.text();
      console.error("Failed to send notification email:", errorData);
      return NextResponse.json(
        { error: "Failed to send notification email" },
        { status: 500 }
      );
    }

    // Send auto-reply to the submitter
    const autoReplyResponse = await fetch(brevoApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify(autoReplyEmail),
    });

    if (!autoReplyResponse.ok) {
      const errorData = await autoReplyResponse.text();
      console.error("Failed to send auto-reply email:", errorData);
      // Still return success since the notification was sent
      return NextResponse.json({
        success: true,
        warning: "Auto-reply could not be sent",
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
