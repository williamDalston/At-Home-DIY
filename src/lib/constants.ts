export const SITE_NAME = "FixIt Finder";
export const SITE_DESCRIPTION =
  "Expert DIY guides, cost calculators, and home service information for plumbing, electrical, roofing, HVAC, painting, and landscaping.";
export const BASE_URL = process.env.SITE_URL || "https://www.fixitfinder.space";
export const CONTACT_EMAIL =
  process.env.CONTACT_EMAIL || "info@alstonanalytics.com";

export const SERVICE_CATEGORIES = [
  { slug: "plumbing", label: "Plumbing", icon: "wrench" },
  { slug: "electrical", label: "Electrical", icon: "zap" },
  { slug: "roofing", label: "Roofing", icon: "home" },
  { slug: "hvac", label: "HVAC", icon: "thermometer" },
  { slug: "painting", label: "Painting", icon: "paintbrush" },
  { slug: "landscaping", label: "Landscaping", icon: "tree" },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
