# FixIt Finder

Expert DIY guides and local home service professionals. Find trusted contractors, get free quotes, and learn to tackle home projects yourself.

## Features

- **Service Directory** - Find professionals for plumbing, electrical, roofing, HVAC, painting, and landscaping across 10 major US cities
- **DIY Blog** - Step-by-step guides for common home improvement projects
- **Interactive Tools** - Cost calculators for HVAC, painting, and general home projects
- **SEO Optimized** - Dynamic sitemap, OG images, JSON-LD schemas, and RSS feed
- **Contact Forms** - Validated forms with rate limiting and email notifications

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Email**: Resend
- **Rate Limiting**: Upstash Redis (optional)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/williamDalston/At-Home-DIY.git
cd At-Home-DIY

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Variables

See `.env.example` for all available configuration options:

| Variable | Description | Required |
|----------|-------------|----------|
| `SITE_URL` | Production URL | Yes |
| `CONTACT_EMAIL` | Contact form recipient | Yes |
| `CONTACT_PHONE` | Display phone number | Yes |
| `GA_MEASUREMENT_ID` | Google Analytics ID | No |
| `RESEND_API_KEY` | Resend API key for emails | No |
| `UPSTASH_REDIS_REST_URL` | Redis URL for rate limiting | No |
| `UPSTASH_REDIS_REST_TOKEN` | Redis token | No |

## Project Structure

```
├── content/
│   ├── blog/           # Markdown blog posts
│   ├── data/           # JSON data files for tools
│   └── services/       # Service page content
├── public/
│   ├── images/         # Blog and service images
│   └── icons/          # Service category icons
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # React components
│   └── lib/            # Utilities and constants
```

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/williamDalston/At-Home-DIY)

Or deploy manually:

```bash
npm run build
npm start
```

## License

MIT
