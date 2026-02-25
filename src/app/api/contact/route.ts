import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators";
import { rateLimit, getClientId } from "@/lib/rate-limit";
import { sendEmail, formatContactEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const clientId = getClientId(request);
    const rl = await rateLimit(`contact:${clientId}`, { limit: 5, windowSeconds: 600 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const sent = await sendEmail(formatContactEmail(result.data));
    if (!sent) {
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! We will contact you shortly.",
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
