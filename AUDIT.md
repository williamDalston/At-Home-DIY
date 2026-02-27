# AUDIT.md — FixIt Finder (At Home DIY)

**Generated:** 2026-02-25
**Last updated:** 2026-02-27

---

## 1. PROJECT IDENTITY & PURPOSE

**What this site IS:** FixIt Finder is a home services directory and DIY guidance portal built with Next.js 16. It connects homeowners with local contractors across 6 service categories (plumbing, electrical, roofing, HVAC, painting, landscaping) in 10 major U.S. cities, while providing DIY blog guides, interactive cost calculators, and project planning tools. The site earns trust through educational content and converts visitors via "Get a Free Quote" contact forms.

**Target audience:**
- Homeowners aged 28-55, skewing slightly male for DIY content and mixed for contractor referrals
- Middle-income households ($50K-$150K) dealing with home maintenance and improvement needs
- Tech-savvy enough to use online tools but prefer straightforward, no-nonsense interfaces
- High intent visitors: either researching a DIY fix or actively looking for a contractor
- **Device split estimate:** 65% mobile / 35% desktop (home repair searches are heavily mobile)

**Core value proposition:** Free, detailed DIY guides paired with instant cost calculators and local contractor matching — all in one place. Most competitors separate DIY content from contractor referral. FixIt Finder combines both, letting users decide whether to DIY or hire.

**Competitive landscape:**
1. **HomeAdvisor/Angi** — Contractor marketplace with reviews. FixIt Finder differentiates with richer DIY content and free cost tools (no login wall).
2. **The Family Handyman** — DIY content site. FixIt Finder differentiates with interactive calculators and local contractor matching.
3. **Thumbtack** — Service marketplace. FixIt Finder differentiates with educational content that builds trust before the conversion ask.

---

## 2. ARCHITECTURE OVERVIEW

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.1.6 (App Router, React 19.2.3) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + @tailwindcss/typography |
| Animation | Framer Motion 12.34.3 |
| Email | Resend SDK 6.9.2 |
| Rate Limiting | Upstash Redis (with in-memory fallback) |
| Validation | Zod 4.3.6 |
| Markdown | unified + remark + rehype pipeline |
| Icons | Lucide React 0.575.0 |
| Hosting | Vercel (project ID: prj_qN1LrkMexjwgP76zMwVOWnd4QDu9) |
| Database | None — file-based content (markdown + JSON) |
| Auth | None — no user accounts |

### File/Folder Structure

```
At Home DYI/
├── content/                      # All site content (markdown + JSON)
│   ├── blog/                     # 14 blog articles (.md with frontmatter)
│   ├── data/                     # Calculator configs, quiz data, checklists, testimonials (.json)
│   ├── locations/                # 10 cities (locations.json) + 10 city-specific overrides
│   └── services/                 # 6 service category pages (.md with frontmatter)
├── public/                       # Static assets
│   ├── images/blog/              # 14 JPGs (68-180KB each, compressed) + 1 SVG
│   ├── images/hero/              # 1 SVG hero illustration
│   ├── images/services/          # 6 SVG service icons
│   ├── favicon.svg, logo.png     # Brand assets (logo compressed to 369KB)
│   └── *.svg                     # Default Next.js SVGs (unused)
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── api/                  # 4 API routes + OG image + search + RSS feed
│   │   ├── blog/                 # Blog index, [slug], category/[category]
│   │   ├── services/             # Services index, [service], [service]/[location]
│   │   ├── tools/                # 5 interactive tool pages
│   │   ├── about/, contact/, search/, privacy-policy/, terms/
│   │   ├── layout.tsx            # Root layout (fonts, header, footer, GA, cookie consent)
│   │   ├── page.tsx              # Homepage
│   │   ├── globals.css           # Tailwind v4 theme + animations + print styles
│   │   ├── sitemap.ts, robots.ts, manifest.ts, feed.xml/route.ts
│   │   ├── error.tsx, not-found.tsx
│   │   └── opengraph-image.tsx   # Default OG image generator
│   ├── components/
│   │   ├── content/              # ArticleLayout, FAQ, TOC, ShareButtons, RelatedPosts (8 files)
│   │   ├── engagement/           # Newsletter, AskExpert, CookieConsent, BackToTop, Testimonials (7 files)
│   │   ├── forms/                # ContactForm (1 file)
│   │   ├── layout/               # Header, Footer, MobileNav, Breadcrumbs (4 files)
│   │   ├── motion/               # FadeInOnScroll, StaggeredCards, AnimatedCounter (3 files)
│   │   ├── search/               # SearchClient, SearchKeyboardShortcut (2 files)
│   │   ├── seo/                  # JsonLd, SchemaArticle, SchemaFAQ, SchemaHowTo, etc. (7 files)
│   │   ├── tools/                # CostCalculator, PaintingCalculator, HvacCalculator, EnergyQuiz, ProjectPlanner (5 files)
│   │   └── ui/                   # Badge, Button, Card, Container, SectionDivider (5 files)
│   └── lib/                      # Shared utilities (16 files)
│       ├── calculator.ts         # Roofing cost logic
│       ├── content.ts            # Markdown content loader (blog + services)
│       ├── email.ts              # Resend email templates + fallback
│       ├── energy-quiz.ts        # Quiz scoring engine
│       ├── hvac-calculator.ts    # HVAC sizing logic
│       ├── painting-calculator.ts # Painting cost logic
│       ├── project-checklist.ts  # Checklist data loader
│       ├── constants.ts          # Site name, URL, categories, nav links
│       ├── icons.ts              # Lucide icon mappings
│       ├── locations.ts          # Location data + override content loader
│       ├── markdown.ts           # Markdown-to-HTML pipeline (sanitized)
│       ├── metadata.ts           # SEO metadata generators
│       ├── rate-limit.ts         # Upstash/in-memory rate limiter
│       ├── reading-time.ts       # Word count -> reading time
│       ├── testimonials.ts       # Testimonial data loader
│       └── validators.ts         # Zod schemas (contact, newsletter, ask-expert)
├── vercel.json                   # Security headers (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy)
├── next.config.ts                # Image optimization (AVIF + WebP)
├── package.json                  # Dependencies
└── .env.example                  # Environment variable template
```

### Data Flow

1. **Content:** Markdown files in `content/` -> parsed by `gray-matter` (frontmatter) + `unified/remark/rehype` (HTML) -> rendered server-side by Next.js pages
2. **Forms:** User fills form -> Zod validation (client) -> POST to `/api/*` -> rate limit check (Upstash or in-memory) -> Zod validation (server) -> Resend email to admin -> JSON response
3. **Search:** Client loads -> fetches `/api/search` (returns all blog + service items, cached 1hr) -> client-side text filtering
4. **Tools:** Calculator data loaded from `content/data/*.json` server-side -> passed as props to client components -> calculations run client-side
5. **Static generation:** `generateStaticParams()` pre-renders all blog posts, services, and service x location combinations at build time

### Database Schema

**No database.** All data is file-based:
- Blog posts: `content/blog/*.md` (frontmatter: title, date, category, keywords, author, image, description, FAQs)
- Services: `content/services/*.md` (frontmatter: title, description, serviceType, icon, keywords, benefits, FAQs)
- Locations: `content/locations/locations.json` (city, state, slug, population)
- Location overrides: `content/locations/overrides/{service}--{location}.md`
- Calculator data: `content/data/*.json` (materials, costs, multipliers)
- Testimonials: `content/data/testimonials.json` (name, city, state, service, rating, text, date)
- Checklists: `content/data/project-checklists.json` (id, title, items[])

### API Routes/Endpoints

| Route | Method | Purpose | Auth | Rate Limit |
|---|---|---|---|---|
| `/api/contact` | POST | Contact form / quote request | None | 5/10min per IP |
| `/api/ask-expert` | POST | Expert question submission | None | 5/10min per IP |
| `/api/newsletter` | POST | Newsletter signup | None | 3/10min per IP |
| `/api/search` | GET | Returns search index (all posts + services) | None | None (1hr cache) |
| `/api/og` | GET | Dynamic OG image generation (1200x630) | None | None (edge runtime) |
| `/feed.xml` | GET | RSS 2.0 feed | None | None (1hr cache) |

### Third-Party Integrations

| Service | Purpose | Status |
|---|---|---|
| Resend | Transactional email (form submissions -> admin) | Optional (falls back to console.log) |
| Upstash Redis | Distributed rate limiting | Optional (falls back to in-memory) |
| Google Analytics 4 | Traffic analytics | Optional (only loads if GA_MEASUREMENT_ID set) |
| Google Fonts | Geist Sans + Geist Mono (via next/font) | Active |
| Vercel | Hosting + edge functions + image optimization | Active |

### State Management

- **No global state library.** Each client component manages its own state via `useState`.
- Form state: Local to each form component (ContactForm, AskExpertForm, NewsletterSignup)
- Calculator state: Local to each tool component
- UI state: Local (MobileNav open/close, FAQ accordion, BackToTop visibility)
- Cookie consent: `localStorage` for persistence
- Project Planner: `localStorage` for checklist persistence ✅
- No shared context providers, no Redux/Zustand/Jotai

---

## 3. CURRENT STYLING & DESIGN AUDIT

### Color Palette

| Role | Token/Value | Hex |
|---|---|---|
| Background | `--color-background` | `#ffffff` |
| Foreground | `--color-foreground` | `#171717` |
| Brand 50 | `--color-brand-50` | `#eff6ff` |
| Brand 100 | `--color-brand-100` | `#dbeafe` |
| Brand 500 | `--color-brand-500` | `#3b82f6` |
| Brand 600 (Primary) | `--color-brand-600` | `#2563eb` |
| Brand 700 | `--color-brand-700` | `#1d4ed8` |
| Accent 400 | `--color-accent-400` | `#2dd4bf` (teal) |
| Accent 500 | `--color-accent-500` | `#14b8a6` |
| Accent 600 | `--color-accent-600` | `#0d9488` |
| Gray 50 (section bg) | Tailwind `gray-50` | `#f9fafb` |
| Gray 200 (borders) | Tailwind `gray-200` | `#e5e7eb` |
| Gray 600 (body text) | Tailwind `gray-600` | `#4b5563` |
| Gray 900 (headings) | Tailwind `gray-900` | `#111827` |
| Footer bg | Tailwind `gray-900` | `#111827` |
| Success green | `green-50` / `green-600` | `#f0fdf4` / `#16a34a` |
| Error red | `red-50` / `red-600` | `#fef2f2` / `#dc2626` |

### Typography

| Element | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Body | Geist Sans | text-base (16px) | 400 | System font stack fallback |
| h1 (hero) | Geist Sans | text-4xl / sm:text-5xl / lg:text-6xl | 700 (bold) | tracking-tight, gradient text |
| h1 (page) | Geist Sans | text-4xl | 700 | — |
| h2 (section) | Geist Sans | text-3xl | 700 | — |
| h3 (card) | Geist Sans | text-lg to text-xl | 600 (semibold) | — |
| Body text | Geist Sans | text-sm to text-base | 400 | — |
| Small/meta | Geist Sans | text-xs to text-sm | 400-500 | — |
| Prose (articles) | Geist Sans | prose-lg (18px base) | — | Tailwind typography defaults |
| Monospace | Geist Mono | — | — | Barely used |

### Border Radius

| Element | Value |
|---|---|
| Cards | `rounded-xl` (0.75rem / 12px) |
| Buttons | `rounded-lg` (0.5rem / 8px) |
| Form inputs | `rounded-lg` (8px) |
| Badges | `rounded-full` (9999px) |
| Icon containers | `rounded-xl` (12px) |
| FAQ items | `rounded-lg` (8px) |
| Progress bars | `rounded-full` (9999px) |

### Spacing System

Consistent Tailwind 4 spacing scale:
- Section padding: `py-16` (4rem) to `py-20` (5rem)
- Container: `max-w-7xl px-4 sm:px-6 lg:px-8`
- Card padding: `p-6` (1.5rem)
- Grid gaps: `gap-4` to `gap-6`
- Element margins: `mt-2` to `mt-10` (0.5rem to 2.5rem)
- Form fields: `space-y-4` to `space-y-5`

### Shadow Usage

| Token | Value | Used On |
|---|---|---|
| `--shadow-card` | `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` | Cards (default) |
| `--shadow-card-hover` | `0 10px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.04)` | Cards (hover) |
| `--shadow-elevated` | `0 20px 40px -12px rgba(0,0,0,0.12)` | Defined but unused |
| `shadow-lg` | Tailwind default | Header (sticky), BackToTop button, CookieConsent banner |
| `shadow-md` | Tailwind default | Primary button, CTA button |

### Button Styles

| Variant | Background | Text | Border | Hover | Sizes |
|---|---|---|---|---|---|
| Primary | Gradient blue-600 -> blue-700 | White | None | blue-700 -> blue-800 + shadow-lg | sm: px-3 py-1.5 / md: px-5 py-2.5 / lg: px-7 py-3 |
| Secondary | gray-100 | gray-900 | gray-200 | gray-200 bg | Same |
| Outline | Transparent | blue-600 | 2px blue-600 | blue-50 bg + blue-700 text | Same |
| All variants | — | — | — | `scale-[1.02]` hover, `scale-[0.98]` active (motion-safe) | `rounded-lg font-semibold` |

### Card/Container Styles

- **Card:** White bg, `border border-gray-200`, `rounded-xl`, `p-6`, card shadow -> hover shadow. On hover: scale 1.02, translate -1px up, gradient bg (white -> blue-50/30), left accent bar appears (blue-500 -> accent-400 gradient).
- **Container:** `max-w-7xl` (80rem), centered, `px-4 sm:px-6 lg:px-8`.

### Navigation Style

- **Header:** Sticky `top-0`, white bg with 80% opacity + backdrop blur, `h-16`, `border-b border-gray-200/80`
- **Desktop nav:** Hidden below `lg` breakpoint. Horizontal links with hover underline animation (scale-x from 0 to 100%). Blue gradient "Free Quote" CTA button.
- **Mobile nav:** Hamburger icon (`lg:hidden`), dropdown below header, full-width, vertical link list with search + CTA.
- **Search shortcut:** Cmd/Ctrl+K navigates to `/search` page.

### Footer Style

- Dark bg (`gray-900`), light text (`gray-300/400`)
- Top gradient accent bar (`blue-500 -> accent-400 -> blue-500`, 4px height)
- 4-column grid (responsive 1/2/4 cols): Brand info | Services links | Resources links | Newsletter signup
- Bottom bar: Copyright (dynamic year) + Privacy Policy + Terms links
- Newsletter input: Dark-themed (gray-800 bg, accent-400 focus border)

### Responsive Breakpoints

| Breakpoint | Tailwind | Layout Changes |
|---|---|---|
| < 640px (mobile) | Default | Single column, hamburger nav, stacked forms, stacked buttons |
| 640px (sm) | `sm:` | 2-column grids, horizontal form layouts, side-by-side buttons |
| 1024px (lg) | `lg:` | 3-column grids, desktop nav, sticky sidebar TOC, side-by-side article+TOC |
| No xl/2xl specific | — | Max-w-7xl container handles large screens |

### Animation/Transitions

| Animation | Type | Duration | Used On |
|---|---|---|---|
| `fade-in-up` | CSS keyframe | 0.5s ease-out | General entrance |
| `float` | CSS keyframe | 3s infinite ease-in-out | Hero/CTA decorative orbs |
| `shimmer` | CSS keyframe | 2s linear infinite | Loading skeleton placeholders |
| `pulse-glow` | CSS keyframe | 2s infinite ease-in-out | CTA glow effect |
| FadeInOnScroll | Framer Motion | 0.6s easeOut | Section headings, content blocks |
| StaggeredCards | Framer Motion | 0.5s per item, 0.1s stagger | Card grids (services, blog, tools) |
| AnimatedCounter | Framer Motion | 2s | Social proof numbers on homepage |
| Card hover | CSS transition | 0.3s | Scale + translate + shadow + accent bar |
| Button hover | CSS transition | 0.2s | Scale up/down |
| FAQ accordion | CSS grid-rows | motion-reduce:0 | Smooth expand/collapse |
| BackToTop | Framer Motion | scale enter/exit | Float button appearance |
| **All animations** | — | — | **Respect `prefers-reduced-motion: reduce`** |

### Dark Mode

**Does not exist.** No dark mode implementation. All colors are hardcoded light theme only.

### Icon System

- **Library:** Lucide React (0.575.0)
- **Service icons:** Wrench (plumbing), Zap (electrical), Home (roofing), Thermometer (HVAC), Paintbrush (painting), TreeDeciduous (landscaping)
- **Tool icons:** Calculator (roofing), PaintBucket (painting), Thermometer (HVAC), Lightbulb (energy), ClipboardCheck (planner)
- **Consistent sizing:** Service icons `h-7 w-7` in `h-14 w-14` containers. Tool icons `h-6 w-6` in `h-12 w-12` containers.
- **Color pattern:** gray/blue default -> blue-600/white bg on hover
- **Centralized mapping:** `src/lib/icons.ts` maps slug -> icon for services and tools

### Image Handling

- **Blog images:** 14 JPGs, **compressed to 68-180KB each** (total ~1.4MB). ~~Previously 944KB-1.5MB each.~~ ✅ FIXED
- **Service illustrations:** SVG placeholders (4KB each) — functional but generic
- **Hero illustration:** SVG (4KB)
- **Logo:** `logo.png` **compressed to 369KB** (down from 872KB). ✅ FIXED
- **Next.js Image config:** AVIF + WebP output formats configured in `next.config.ts`
- **Blog images are NOT using Next.js `<Image>` component** — they're referenced via frontmatter `image` and `imageAlt` fields, used in OG tags/meta, but the actual blog article rendering uses markdown HTML
- **No lazy loading attributes** explicitly set (relies on browser defaults)
- **No aspect ratio enforcement** on blog images
- **Dynamic OG images:** Generated via Edge runtime, 1200x630, branded blue gradient

---

## 4. TARGET AUDIENCE PSYCHOLOGY & STYLING RECOMMENDATIONS

### What visual language does this audience expect?

Homeowners searching for repair help expect: **trustworthy, clean, professional, but not corporate.** Think "helpful neighbor who happens to be a contractor" — warm blues, practical layouts, real photography, clear pricing. The current blue+teal palette is appropriate. The design is clean and professional.

### Trust signals needed

- **Currently present:** Testimonials (8), social proof counters (real verifiable numbers ✅), FAQ sections, detailed cost information, professional-looking branded emails, privacy policy, terms of service, trust badges below hero ✅, risk reversal text near CTAs ✅
- **Missing:** No real contractor photos/logos, no BBB/licensing badges, no "verified" indicators, no real business phone number (placeholder `+1-555-FIX-HOME`), no real Google reviews integration, no case studies or before/after galleries

### Specific styling changes to make

1. ~~**Compress all blog images**~~ ✅ DONE — All 14 JPGs compressed to 68-180KB each (1200px wide, quality 60). Total reduced from ~10.8MB to ~1.4MB.
2. ~~**Compress logo.png**~~ ✅ DONE — Compressed from 872KB to 369KB (resized to 800px).
3. **Add real testimonial photos** — Avatar initials work but real headshots build significantly more trust.
4. ~~**Increase touch targets on mobile**~~ ✅ DONE — All buttons have min-h-[44px]. Mobile search/hamburger icons are h-11 w-11 (44x44px).
5. ~~**Add a visible search icon to the header on mobile**~~ ✅ DONE — Search icon is visible in mobile header alongside hamburger.
6. ~~**Add trust badges row below the hero**~~ ✅ DONE — "Free Quotes," "No Obligation," "Licensed Pros," "Available 24/7" badges with icons.
7. ~~**Footer newsletter needs a benefit statement**~~ ✅ DONE — "Weekly DIY tips and cost-saving guides. No spam, unsubscribe anytime."

### Mobile-first priorities

- ~~Touch targets: Ensure all buttons/links are minimum 44x44px~~ ✅ DONE
- Form inputs: Already reasonable (`py-2.5` to `py-3`), maintain this
- ~~Navigation: Mobile hamburger works but needs Escape key support and keyboard nav~~ ✅ DONE — Escape key closes menu, focus returns to button, backdrop overlay closes on click
- Calculator tools: Already responsive, work well at mobile widths
- Hero CTA buttons: Already stack vertically on mobile (good)

### Conversion psychology

- **CTA placement:** Good — hero CTA, mid-page tools, bottom CTA, service page CTA, article CTA
- **Color contrast:** Primary button (white on blue gradient) has strong contrast. ~~Header CTA was same blue as nav.~~ ✅ FIXED — CTA now uses accent (teal) gradient.
- **Missing urgency cues:** No "limited time" or seasonal messaging
- ~~**Missing risk reversal:**~~ ✅ FIXED — "100% free · No obligation · Licensed professionals only" added below contact form CTA
- **Missing social proof near CTAs:** No "X homeowners got quotes this month"

### Page load perception

- **Loading skeletons:** Implemented for all major page types (blog, services, tools, blog posts) with `loading.tsx` files. Uses `animate-pulse` with gray-200 blocks.
- **Missing:** No skeleton for the homepage itself. No image placeholder/blur-up for blog images.

---

## 5. DOMAIN NAME RECOMMENDATIONS

| Rank | Domain | Why It Works | TLD | Availability | SEO Alignment |
|---|---|---|---|---|---|
| 1 | **fixitfinder.com** | Already branded throughout codebase (constants, emails, OG images), memorable, action-oriented | .com (universal trust) | Likely already owned or available (configured as SITE_URL) | "fix it" + "finder" are strong home repair search terms |
| 2 | **fixithome.com** | Short, clear purpose, easy to type, broad enough for expansion | .com | Medium (common words, may be taken) | "fix" + "home" are top search terms |
| 3 | **homerepairguide.com** | Descriptive, SEO-heavy, exactly what the site offers | .com | Low (likely parked/taken) | Exact match for "home repair guide" searches |
| 4 | **mydiyfix.com** | Short, personal ("my"), action-oriented, appeals to DIY crowd | .com | High (creative combination) | "DIY fix" has search volume |
| 5 | **athomediyhub.com** | Matches project directory name, "hub" implies resource center | .com | High (multi-word, likely available) | "at home DIY" has moderate search volume |

**Recommendation:** Stick with `fixitfinder.com` — it's already embedded in the codebase (`SITE_URL`, email templates, OG images, constants). Rebranding would require touching dozens of files.

---

## 6. MONETIZATION PLAN

### Current monetization

**None.** No ads, no affiliate links, no payments, no premium features. The site is a pure lead generation funnel with "Get a Free Quote" forms that email submissions to an admin inbox.

### Primary revenue model recommendation: Lead Generation / Contractor Referral Fees

The site is already structured for this. Charge contractors a monthly listing fee or per-lead fee for being included in the directory. This is the HomeAdvisor/Angi model.

- **Per-lead pricing:** $15-$75 per qualified lead (varies by service type; roofing/HVAC leads are highest value)
- **Subscription tier:** $99-$299/month for premium placement + unlimited leads

### Secondary revenue streams

1. **Google AdSense** on blog articles — Non-intrusive sidebar/in-content ads on the 9 blog posts. Estimated $5-$15 RPM on home improvement content.
2. **Affiliate links** — Tool recommendations in blog articles (Amazon Associates for power tools, Home Depot affiliate program). Add "Recommended Tools" sections to DIY guides.

### AdSense readiness

- **Content quality:** Good (14 detailed articles, 1,800-2,500 words each)
- **Content volume:** Improved — 14 blog posts + 6 service pages = 20 content pages. ✅
- **Ad placement locations:** In-article (between blog sections), sidebar on desktop (below TOC), before/after calculator results, footer banner
- **Policy concerns:** None — content is informational, no prohibited categories
- **Recommendation:** Write 10+ more blog articles before applying for AdSense

### Pricing strategy (contractor leads)

| Service | Price per Lead | Rationale |
|---|---|---|
| Plumbing | $20-40 | Moderate ticket, frequent need |
| Electrical | $25-50 | Higher skill, safety concerns drive pro hiring |
| Roofing | $40-75 | Highest ticket ($8K-$15K+ projects) |
| HVAC | $35-65 | High ticket ($3.5K-$12K projects) |
| Painting | $15-30 | Lower ticket, more DIY competition |
| Landscaping | $15-25 | Lower ticket, seasonal |

### Monetization implementation steps

1. Build a contractor registration system (requires database — Supabase or Planetscale)
2. Add contractor profiles to service + location pages
3. Route form submissions to matched contractors (not just admin email)
4. Add Stripe for contractor billing
5. For AdSense: Add `<Script>` tag in layout.tsx, create ad slot components, place in ArticleLayout sidebar and between blog sections
6. For affiliates: Add product recommendation sections to blog articles with tracking links

---

## 7. FEATURES — CURRENT STATE

| Feature | Status | What Works | What Doesn't | What's Missing |
|---|---|---|---|---|
| **Homepage** | Complete | Hero with gradient, services grid, blog preview (3 recent), tools showcase, testimonials, dual CTA sections, trust badges ✅ | — | ~~Social proof numbers were fabricated~~ ✅ FIXED — now shows real counts (6 categories, 14 guides, 5 tools, 10 cities) |
| **Blog (14 articles)** | Complete | Full articles with TOC (mobile+sticky desktop), FAQ accordion, share buttons (Twitter/FB/LinkedIn/copy), related posts, reading time, progress bar, SchemaArticle + SchemaHowTo markup, imageAlt in frontmatter ✅ | — | No blog images in article body (only in meta/OG), no comment system |
| **Blog categories** | Complete | Category filtering with icon + nav bar, badge color-coding per category | — | "general" category exists in content (home-maintenance-checklist) but not in SERVICE_CATEGORIES constant |
| **Blog pagination** | Complete | 6 posts per page, numbered page buttons, prev/next navigation | — | — |
| **Services (6 categories)** | Complete | Service pages with benefits list, markdown content, locations grid, testimonials, FAQs, InternalLinks, SchemaService markup | — | No actual contractor listings — just "find professionals" messaging |
| **City pages (60 combos)** | Complete | 10 cities x 6 services = 60 pages generated. **10 have custom overrides** (HVAC Houston, Plumbing NYC, Roofing LA, Electrical Chicago, Painting Phoenix, Landscaping San Antonio, Plumbing Philadelphia, Roofing Dallas, HVAC Phoenix, Electrical Jacksonville). ✅ LocalBusiness JSON-LD. | 50 of 60 pages use generic template with city name injected | Unique local content for remaining 50 city pages |
| **Contact form** | Complete | Zod validation (client+server), rate limiting (5/10min), Resend email, service/city pre-fill from URL params | Email goes to admin only | No auto-response to user, no CRM, no lead routing to contractors |
| **Ask Expert form** | Complete | Zod validation, rate limiting (5/10min), Resend email to admin | No public Q&A display | Questions just email admin — no response workflow, no FAQ generation |
| **Newsletter signup** | Partially Working | 3 variants (inline/banner/footer), Zod validation, rate limiting (3/10min), admin notification email | **No actual mailing list** — signup sends notification but doesn't subscribe anyone | Mailchimp/ConvertKit/Resend Audiences integration |
| **Roofing calculator** | Complete | Material, pitch, stories, region inputs. Quick-select area buttons. Low/avg/high estimates + cost breakdown table. | — | No save/share/email results |
| **Painting calculator** | Complete | Paint type, surface condition, coats, primer toggle, labor toggle. Detailed cost breakdown. | — | No save/share results |
| **HVAC calculator** | Complete | Climate zone, insulation, system type. BTU + tonnage + cost estimates. | — | No save/share results |
| **Energy quiz** | Complete | 7 questions, scoring engine, 3 recommendation tiers with savings estimates | ~~InternalLinks bug~~ ✅ FIXED — now uses `category="hvac"` | — |
| **Project planner** | Complete | 5 checklists (kitchen, bathroom, roof, painting, deck), checkbox tracking, progress bar, completion message, **localStorage persistence** ✅ | — | — |
| **Search** | Complete | Client-side text search across all blog posts + services, keyboard shortcut (Cmd/Ctrl+K) | Loads full index on mount, no fuzzy matching | Server-side search, search analytics |
| **SEO** | Complete | Sitemap (dynamic), robots.txt, RSS feed, OG images (dynamic edge), 7 schema types (Article, FAQ, HowTo, Service, Breadcrumb, Organization, LocalBusiness), meta tags per page, canonical URLs | — | Google Search Console verification, Bing Webmaster Tools |
| **Cookie consent** | Complete | Accept/decline, localStorage persistence, links to privacy policy | — | No granular consent (analytics vs essential), no GDPR-compliant banner |
| **Security headers** | Complete | CSP (restricts scripts/frames), X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy (camera/mic/geo disabled) | — | — |
| **Skip-to-content** | Complete | `sr-only` link that becomes visible on focus, links to `#main-content` | — | — |
| **Accessibility** | ~95% Complete | Semantic HTML, aria-labels on icon buttons, focus-visible rings, aria-invalid/aria-describedby on forms, role="alert" on errors, prefers-reduced-motion respected, **Escape key closes mobile nav** ✅, **aria-hidden on decorative SVGs** ✅, **WCAG AA contrast compliant** ✅, **44px touch targets** ✅, **FAQ aria-controls/aria-expanded** ✅, **progress bar ARIA** ✅, **cookie consent dialog role** ✅ | FAQ accordion lacks arrow key nav | Full WCAG 2.1 AA audit |
| **Privacy policy** | Complete | Covers data collection, cookies, CCPA mention, contact info | — | Legal review, GDPR-specific language if targeting EU |
| **Terms of service** | Complete | Covers liability, IP, contractor relationships, submissions | — | Legal review |
| **404 page** | Complete | Decorative "404", service quick links, search/home/blog navigation | — | — |
| **Error page** | Complete | Generic error message, retry + home buttons (client component) | — | No error details or reporting |
| **Print styles** | Complete | Hides nav/footer/buttons, shows URLs for external links, prevents page breaks | — | — |
| **PWA manifest** | Complete | App name, description, start_url, display:standalone, theme_color | Only one icon (favicon.svg) | Multiple icon sizes (192x192, 512x512), service worker |
| **RSS feed** | Complete | RSS 2.0, all blog posts, CDATA content, atom namespace, 1hr cache | — | — |

---

## 8. SEO & DISCOVERABILITY

### Current Meta Tags (per page)

| Page | Title | Description | OG Tags | Keywords |
|---|---|---|---|---|
| Home | "FixIt Finder - Home Services & DIY Guides" | Full site description | Yes (website type, siteName) | — |
| Blog index | "Blog & DIY Guides" | "Expert home repair guides..." | Yes (via template) | — |
| Blog posts | Dynamic (post title) | Post description | Yes (article type, publishedTime, image) | Yes (from frontmatter) |
| Blog categories | "{Category} Guides & Tips" | "Expert {category} guides..." | Yes (via template) | — |
| Services index | "Home Services" | "Find trusted local professionals..." | Yes (via template) | — |
| Service pages | Service title from frontmatter | Service description | Yes (with generated OG image) | Yes (from frontmatter) |
| City pages | "{Service} in {City}, {State}" | "Find trusted {service}..." | Yes (title, description) | Yes (generated: "{service} {city}", "{service} near me", "{service} {state}") |
| Tool pages | Per-tool title | Per-tool description | Yes (via template) | Yes (4-5 keywords each) |
| About | "About Us" | "Learn about FixIt Finder..." | Yes (via template) | — |
| Contact | "Contact Us" | "Get a free quote..." | Yes (via template) | — |
| Search | "Search" | "Search our blog guides..." | Yes (via template) | — |
| Privacy | "Privacy Policy" | "Privacy policy for FixIt Finder..." | Yes (via template) | — |
| Terms | "Terms of Service" | "Terms of service for FixIt Finder..." | Yes (via template) | — |

### Implemented SEO Elements

- Dynamic XML sitemap (includes all static pages, blog posts, services, 60 city pages, category pages)
- robots.txt (allow all, disallow /api/)
- RSS feed (/feed.xml) with proper RSS 2.0 structure
- Canonical URLs via metadata alternates
- 7 Schema.org structured data types: Organization, Article, FAQ, HowTo, Service, BreadcrumbList, LocalBusiness
- Dynamic OG image generation (1200x630, branded, edge runtime)
- Title template: "%s | FixIt Finder"
- Twitter card: summary_large_image
- OpenGraph type per page (website, article)
- RSS alternate link in HTML head

### Missing SEO Elements

1. **No Google Search Console verification** — Need to add verification meta tag or DNS record
2. **No Bing Webmaster Tools** — Missing secondary search engine coverage
3. **No `dateModified` in blog frontmatter** — Only `datePublished` is set; search engines value freshness signals
4. ~~**No `imageAlt` field in blog frontmatter**~~ ✅ FIXED — All 14 blog posts have `imageAlt` in frontmatter, wired to OG tags
5. **No preconnect hints** — `<link rel="preconnect">` for Google Analytics domain would speed up analytics loading
6. **Privacy policy doesn't mention ads** — Needs updating before AdSense application
7. **No ads.txt** — Required for AdSense

### Content Strategy — Target Keywords to Add

**High-value content gaps (remaining):**
1. "How much does [service] cost in [city]" — City pages exist but 50/60 lack unique cost data (10 overrides written ✅)
2. ~~"DIY bathroom remodel"~~ ✅ DONE — `diy-bathroom-remodel-budget.md`
3. ~~"How to install a ceiling fan"~~ ✅ DONE — `how-to-install-ceiling-fan.md`
4. "Kitchen remodel cost" — Only a checklist, no cost guide blog post
5. ~~"Water heater replacement cost"~~ ✅ DONE — `water-heater-troubleshooting.md`
6. "Fence installation cost" — No content
7. "Best [service] companies near me" — No comparison/list content
8. "Home improvement tax deductions 2026" — Seasonal, timely content
9. "How to prepare for a home inspection" — High-intent real estate audience
10. "Emergency [service] — what to do before help arrives" — Captures urgent searches
11. ~~"How much does a new roof cost"~~ ✅ DONE — `roof-replacement-cost-guide.md`
12. ~~"How to build a deck"~~ ✅ DONE — `how-to-build-a-deck.md`

### Page Speed Concerns

1. ~~**Blog images are massive:**~~ ✅ FIXED — All 14 JPGs compressed to 68-180KB each (~1.4MB total). Down from ~10.8MB.
2. ~~**Logo is 872KB PNG**~~ ✅ FIXED — Compressed to 369KB (resized to 800px).
3. **Framer Motion bundle:** ~30-50KB gzipped of client JS added to every animated page
4. **Client-side search:** Fetches entire content index on `/search` page load (acceptable at current scale but won't scale)
5. **No `<link rel="preconnect">` for Google Analytics** — Minor optimization
6. **No explicit `loading="lazy"` on images** outside Next.js `<Image>` component

### Accessibility Score Estimate

**Estimated WCAG 2.1 AA compliance: ~95%** (up from ~85%)

**Passing:**
- Skip-to-content link present and functional
- Semantic HTML throughout (header, nav, main, footer, article, aside, section)
- ARIA labels on all icon-only buttons (search, back-to-top, share buttons)
- Focus-visible rings on all interactive elements (`ring-2 ring-blue-500 ring-offset-2`)
- Form error association (`aria-invalid`, `aria-describedby`, `role="alert"`)
- Color contrast appears sufficient for primary text (gray-900 on white, white on blue-600)
- All animations respect `prefers-reduced-motion: reduce`
- Breadcrumbs with proper `<nav aria-label="Breadcrumb">` and schema

**Failing/Incomplete:**
- ~~Mobile nav doesn't close on Escape key press~~ ✅ FIXED — Escape closes menu, focus returns to button, backdrop overlay click-to-close
- FAQ accordion lacks keyboard arrow navigation
- ~~Some decorative SVG dividers missing `aria-hidden="true"`~~ ✅ FIXED — aria-hidden on all decorative SVGs (SectionDivider, ReadingTime, FAQSection, ShareButtons, BackToTopButton, SearchClient, MobileNav)
- ~~No `alt` text field for blog images in frontmatter~~ ✅ FIXED — `imageAlt` field added to all 14 posts + wired to OG metadata
- ~~CookieConsent banner lacks dialog role~~ ✅ FIXED — `role="dialog"` and `aria-label` added
- ~~`gray-400` text on white backgrounds fails WCAG AA~~ ✅ FIXED — All `text-gray-400` on light backgrounds changed to `text-gray-500` (gray-400 on dark footer backgrounds is correct and unchanged)

---

## 9. ENVIRONMENT VARIABLES & SECRETS

| Variable Name | Where Used | What It's For | Set in .env? | How To Get It |
|---|---|---|---|---|
| `SITE_URL` | `lib/constants.ts`, sitemap, robots, emails, OG images | Base URL for all absolute links | **NO** (.env.local does not exist) | Set to your domain (default: `https://www.fixitfinder.com`) |
| `CONTACT_EMAIL` | `lib/constants.ts`, `lib/email.ts` | Admin email for form submissions | **NO** | Set to your business email (default: `info@alstonanalytics.com`) |
| `CONTACT_PHONE` | `lib/constants.ts`, schema markup, contact page | Business phone number | **NO** | Set to your real phone (default: `+1-555-349-4663` — **FAKE 555 number**) |
| `GA_MEASUREMENT_ID` | `app/layout.tsx` | Google Analytics 4 tracking | **NO** | analytics.google.com -> Admin -> Data Streams -> Measurement ID |
| `RESEND_API_KEY` | `lib/email.ts` | Resend API authentication for email sending | **NO** | resend.com -> API Keys -> Create key |
| `RESEND_FROM_EMAIL` | `lib/email.ts` | Sender email address | **NO** | Must verify domain at resend.com first (default: `info@alstonanalytics.com`) |
| `UPSTASH_REDIS_REST_URL` | `lib/rate-limit.ts` | Redis URL for distributed rate limiting | **NO** | upstash.com -> Create Redis DB -> REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | `lib/rate-limit.ts` | Redis auth token | **NO** | Same Upstash dashboard -> REST Token |

**`.env.local` has been created** with TODO markers for services requiring signup. ✅ Current state:
- Emails: logged to console until `RESEND_API_KEY` is set
- Rate limiting: in-memory fallback until `UPSTASH_REDIS_REST_URL` is set
- Analytics: disabled until `GA_MEASUREMENT_ID` is set
- Phone: still uses placeholder `+1-555-FIX-HOME` — **needs real number**

---

## 10. MANUAL SETUP TASKS REMAINING

- [x] **Create `.env.local`** — Created with TODO markers for services requiring signup ✅
- [ ] **Purchase and configure domain** — Buy `fixitfinder.com` (or preferred domain) at Namecheap/Porkbun. In Vercel dashboard: Settings -> Domains -> Add domain. DNS records: `A` record to `76.76.21.21`, `CNAME` for `www` to `cname.vercel-dns.com`
- [ ] **Set up Resend email** — Sign up at resend.com -> Domains -> Add domain -> Add DNS records (SPF, DKIM, DMARC) -> Copy API key to `.env.local`
- [ ] **Set up Upstash Redis** — Sign up at upstash.com -> Create Redis database (free tier works) -> Copy REST URL + Token to `.env.local`
- [ ] **Set up Google Analytics 4** — analytics.google.com -> Create property -> Get Measurement ID (G-XXXXXXX) -> Add to `.env.local`
- [ ] **Set up Google Search Console** — search.google.com/search-console -> Add property -> Verify via DNS -> Submit sitemap URL (`https://yourdomain.com/sitemap.xml`)
- [ ] **Set Vercel environment variables** — Vercel dashboard -> Settings -> Environment Variables -> Add all 8 variables for Production + Preview
- [ ] **Replace placeholder phone number** — `+1-555-FIX-HOME` is fictional. Set `CONTACT_PHONE` to a real business number (Google Voice is fine) or remove phone display entirely
- [x] **Optimize images** — All 14 blog JPGs compressed to 68-180KB (1200px wide). Logo compressed to 369KB. ✅
- [ ] **Set up email list** — Newsletter signup sends admin notification but doesn't subscribe anyone. Integrate Mailchimp, ConvertKit, or Resend Audiences
- [ ] **Test all forms on production** — After deploying with real Resend API key, test contact form, newsletter, and ask-expert form to verify emails arrive
- [x] **Replace hard-coded social proof numbers** — Now shows real verifiable counts (6 categories, 14 guides, 5 tools, 10 cities) ✅
- [ ] **Verify blog image licensing** — Confirm all blog JPGs are original or properly licensed. Replace with royalty-free if uncertain
- [ ] **Cookie consent GDPR compliance** — Current implementation is basic accept/decline. For EU visitors, may need granular consent categories. For California (CCPA), consider adding "Do Not Sell My Info" link
- [ ] **Legal review** — Have a lawyer review privacy policy and terms of service before launch
- [ ] **Generate PWA icons** — Current manifest only references favicon.svg. Generate 192x192 and 512x512 PNG icons

---

## 11. PRIORITY ACTION LIST

### MUST DO BEFORE LAUNCH (blocking) — requires your action

1. ~~**Create `.env.local` and set Vercel env vars**~~ ✅ `.env.local` created. **Still need:** Set real values + add to Vercel dashboard.
2. **Set up Resend with verified domain** — Contact form, newsletter, and ask-expert forms silently fail without email integration. This is the primary conversion mechanism.
3. **Replace placeholder phone number** — `+1-555-FIX-HOME` appears in footer, schema markup, and contact page. A fake phone number destroys trust instantly.
4. **Purchase and configure domain** — Site is only on Vercel's auto-generated URL. Need custom domain for any real traffic or SEO.
5. ~~**Optimize images**~~ ✅ DONE — All images compressed (11.2MB → 1.4MB total).

### SHOULD DO BEFORE LAUNCH (quality)

1. **Set up Google Analytics 4** — Cannot measure what's working without analytics. Set up before launch to capture day-one data.
2. **Submit sitemap to Google Search Console** — Sitemap exists but Google won't discover it without submission. Accelerates indexing of 111 pages.
3. ~~**Add localStorage persistence to Project Planner**~~ ✅ DONE
4. ~~**Fix Energy Quiz InternalLinks category**~~ ✅ DONE — Changed to `category="hvac"`
5. ~~**Add Escape key handler to MobileNav**~~ ✅ DONE — Plus backdrop overlay + focus management
6. ~~**Add `imageAlt` field to blog frontmatter**~~ ✅ DONE — All 14 posts have descriptive alt text, wired to OG
7. ~~**Remove or update hard-coded social proof**~~ ✅ DONE — Real verifiable counts
8. ~~**Write 5-10 more blog articles**~~ ✅ DONE — 14 total articles (was 9)

### DO AFTER LAUNCH (optimization)

1. **Build contractor registration system** — Actual monetization path. Requires database, auth, payment (Stripe).
2. **Integrate real email list management** — Connect newsletter signups to Mailchimp/ConvertKit for drip campaigns.
3. **Write more city-specific content overrides** — 50 of 60 city pages still use generic template. ~~57~~ Now 10 have unique content. ✅
4. **Add Google AdSense** — Now have 20+ content pages (14 blog + 6 service), meeting AdSense threshold. ✅
5. **Implement dark mode** — Not critical but improves UX for evening browsing.
6. **Add affiliate product recommendations** — "Recommended Tools" sections in blog articles.
7. **Implement search analytics** — Track search queries to inform content strategy.
8. **Add calculator result sharing** — "Share your estimate" feature (email or link).
9. **Add blog comment system** — Giscus (GitHub-based) or similar for engagement.
10. **PWA enhancement** — Service worker for offline access, proper icon set, install prompt.
11. **A/B testing** — Test CTA copy, button colors, form layouts.
12. **Blog image blur-up** — Use Next.js `<Image>` with `placeholder="blur"` for perceived performance.

---

## 12. ONE-LINE SITE SUMMARY

"FixIt Finder is a home services directory and DIY guide portal for U.S. homeowners that provides free cost calculators, expert repair guides, and local contractor matching across 6 service categories in 10 major cities, monetized via lead generation and contractor referral fees."
