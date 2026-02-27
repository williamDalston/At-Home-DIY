"use client";

// import { AdUnit } from "./AdUnit";

/**
 * Manual ad slots are disabled while using AdSense Auto Ads.
 * 
 * To enable manual placements later:
 * 1. Create ad units in AdSense dashboard
 * 2. Add the slot IDs to your .env.local file
 * 3. Uncomment the AdUnit imports and JSX below
 * 
 * Ad slot IDs — replace these with real AdSense slot IDs after approval.
 */
// const SLOTS = {
//   inArticle: process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE || "1234567890",
//   sidebar: process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR || "1234567891",
//   afterCalculator: process.env.NEXT_PUBLIC_AD_SLOT_CALCULATOR || "1234567892",
//   homepage: process.env.NEXT_PUBLIC_AD_SLOT_HOMEPAGE || "1234567893",
// };

/** In-article ad — placed between blog content sections */
export function InArticleAd() {
  // Using Auto Ads — return null to let Google place ads automatically
  return null;
  // return (
  //   <AdUnit
  //     slot={SLOTS.inArticle}
  //     format="rectangle"
  //     className="my-8"
  //   />
  // );
}

/** Sidebar ad — below table of contents on desktop */
export function SidebarAd() {
  // Using Auto Ads — return null to let Google place ads automatically
  return null;
  // return (
  //   <AdUnit
  //     slot={SLOTS.sidebar}
  //     format="vertical"
  //     className="mt-6"
  //   />
  // );
}

/** After calculator results on tool pages */
export function AfterCalculatorAd() {
  // Using Auto Ads — return null to let Google place ads automatically
  return null;
  // return (
  //   <AdUnit
  //     slot={SLOTS.afterCalculator}
  //     format="horizontal"
  //     className="my-8"
  //   />
  // );
}

/** Homepage section break ad */
export function HomepageAd() {
  // Using Auto Ads — return null to let Google place ads automatically
  return null;
  // return (
  //   <AdUnit
  //     slot={SLOTS.homepage}
  //     format="auto"
  //     className="my-4"
  //   />
  // );
}
