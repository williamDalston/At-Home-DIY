import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators";
import { rateLimit, getClientId } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const clientId = getClientId(request);
    const rl = rateLimit(`contact:${clientId}`, { limit: 5, windowSeconds: 600 });
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

    // TODO: Replace with email service (Resend, SendGrid) or database in production.
    console.log("Lead received:", result.data);

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
