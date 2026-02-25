import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validators";
import { rateLimit, getClientId } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const clientId = getClientId(request);
    const rl = rateLimit(`newsletter:${clientId}`, { limit: 3, windowSeconds: 600 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    // TODO: Replace with email service (Mailchimp, ConvertKit, etc.)
    console.log("[Newsletter] New subscriber:", result.data.email);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
