import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/constants";

export const runtime = "edge";
export const alt = `${SITE_NAME} - Home Services & DIY Guides`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #1e293b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
            }}
          >
            🔧
          </div>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.02em",
            }}
          >
            {SITE_NAME}
          </div>
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#bfdbfe",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          Expert Home Repair Guides & Local Service Professionals
        </div>
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            gap: "24px",
          }}
        >
          {["Plumbing", "Electrical", "Roofing", "HVAC", "Painting", "Landscaping"].map(
            (svc) => (
              <div
                key={svc}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  color: "white",
                  fontSize: "18px",
                }}
              >
                {svc}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
