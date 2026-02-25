import { NextResponse } from "next/server";
import { askExpertSchema } from "@/lib/validators";
import { rateLimit, getClientId } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const clientId = getClientId(request);
    const rl = rateLimit(`ask-expert:${clientId}`, { limit: 5, windowSeconds: 600 });
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

    // TODO: Replace with email forwarding or helpdesk integration.
    console.log("[Ask Expert] New question from:", result.data.name, result.data.email);
    console.log("[Ask Expert] Question:", result.data.question);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
