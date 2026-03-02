"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

interface ConsentScriptsProps {
  gaId?: string;
  adsenseId?: string;
}

export function ConsentScripts({ gaId, adsenseId }: ConsentScriptsProps) {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const check = () => {
      setConsented(localStorage.getItem("cookie-consent") === "accepted");
    };

    check();

    // Re-check when localStorage changes (e.g. user clicks Accept)
    const onStorage = (e: StorageEvent) => {
      if (e.key === "cookie-consent") check();
    };
    window.addEventListener("storage", onStorage);

    // Also poll briefly to catch same-tab changes
    const interval = setInterval(check, 1000);

    return () => {
      window.removeEventListener("storage", onStorage);
      clearInterval(interval);
    };
  }, []);

  if (!consented) return null;

  return (
    <>
      {/* AdSense Auto Ads — loads only after cookie consent. Manual ad slots are disabled in AdSlots.tsx. */}
      {adsenseId && (
        <Script
          id="google-adsense"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      )}

      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}
    </>
  );
}
