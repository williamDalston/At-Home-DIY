"use client";

import { AdUnit } from "./AdUnit";

/**
 * Ad slot IDs — replace these with real AdSense slot IDs after approval.
 * Each slot corresponds to a placement location in the site.
 */
const SLOTS = {
  inArticle: process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE || "1234567890",
  sidebar: process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR || "1234567891",
  afterCalculator: process.env.NEXT_PUBLIC_AD_SLOT_CALCULATOR || "1234567892",
  homepage: process.env.NEXT_PUBLIC_AD_SLOT_HOMEPAGE || "1234567893",
};

/** In-article ad — placed between blog content sections */
export function InArticleAd() {
  return (
    <AdUnit
      slot={SLOTS.inArticle}
      format="rectangle"
      className="my-8"
    />
  );
}

/** Sidebar ad — below table of contents on desktop */
export function SidebarAd() {
  return (
    <AdUnit
      slot={SLOTS.sidebar}
      format="vertical"
      className="mt-6"
    />
  );
}

/** After calculator results on tool pages */
export function AfterCalculatorAd() {
  return (
    <AdUnit
      slot={SLOTS.afterCalculator}
      format="horizontal"
      className="my-8"
    />
  );
}

/** Homepage section break ad */
export function HomepageAd() {
  return (
    <AdUnit
      slot={SLOTS.homepage}
      format="auto"
      className="my-4"
    />
  );
}
