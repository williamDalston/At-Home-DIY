import { NextResponse } from "next/server";
import { askExpertSchema } from "@/lib/validators";
import { rateLimit, getClientId } from "@/lib/rate-limit";
import { sendEmail, formatExpertQuestionEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const clientId = getClientId(request);
    const rl = await rateLimit(`ask-expert:${clientId}`, { limit: 5, windowSeconds: 600 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = askExpertSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const sent = await sendEmail(formatExpertQuestionEmail(result.data));
    if (!sent) {
      return NextResponse.json(
        { error: "Failed to send question. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
