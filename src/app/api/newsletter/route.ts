import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validators";
import { rateLimit, getClientId } from "@/lib/rate-limit";
import { sendEmail, formatNewsletterEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const clientId = getClientId(request);
    const rl = await rateLimit(`newsletter:${clientId}`, { limit: 3, windowSeconds: 600 });
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

    await sendEmail(formatNewsletterEmail(result.data.email));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
