import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "FixIt Finder";
  const subtitle = searchParams.get("subtitle") || "Expert DIY Guides & Home Services";
  const category = searchParams.get("category") || "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #1e3a5f 0%, #0f172a 50%, #134e4a 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo / brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #2563eb, #14b8a6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            F
          </div>
          <span
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.8)",
              letterSpacing: "-0.5px",
            }}
          >
            FixIt Finder
          </span>
        </div>

        {/* Category badge */}
        {category && (
          <div
            style={{
              display: "flex",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                padding: "6px 16px",
                borderRadius: "20px",
                background: "rgba(45, 212, 191, 0.2)",
                color: "#5eead4",
                fontSize: "16px",
                fontWeight: 600,
                textTransform: "capitalize",
              }}
            >
              {category}
            </span>
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 40 ? "48px" : "56px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.15,
            letterSpacing: "-1.5px",
            marginBottom: "16px",
            maxWidth: "900px",
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "22px",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.4,
            maxWidth: "700px",
          }}
        >
          {subtitle}
        </div>

        {/* Accent line at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "6px",
            background: "linear-gradient(to right, #2563eb, #14b8a6, #2563eb)",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
