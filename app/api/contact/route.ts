import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (name.length < 2 || message.length < 10) {
      return NextResponse.json(
        { error: "Name or message too short" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL || "danjefff1001@gmail.com"],
      replyTo: email,
      subject: `New message from ${name} — Portfolio Contact`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
          <div style="background: #fff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h2 style="color: #98141f; margin-top: 0;">📬 New Contact Message</h2>
            <p style="color: #666; font-size: 14px;">Someone reached out via your portfolio!</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <div style="margin: 15px 0;">
              <strong style="color: #333;">Name:</strong>
              <p style="margin: 5px 0; color: #555;">${name}</p>
            </div>
            <div style="margin: 15px 0;">
              <strong style="color: #333;">Email:</strong>
              <p style="margin: 5px 0;"><a href="mailto:${email}" style="color: #98141f;">${email}</a></p>
            </div>
            <div style="margin: 15px 0;">
              <strong style="color: #333;">Message:</strong>
              <p style="margin: 5px 0; color: #555; line-height: 1.6; white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 6px; border-left: 3px solid #98141f;">${message}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #999; font-size: 12px; text-align: center;">
              Sent from your portfolio contact form • anjef.com.np
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, id: data?.id },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}