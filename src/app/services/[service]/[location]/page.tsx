import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSection } from "@/components/content/FAQSection";
import { InternalLinks } from "@/components/content/InternalLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { getContentBySlug } from "@/lib/content";
import {
  getLocationBySlug,
  getServiceLocationContent,
  generateCityServiceParams,
} from "@/lib/locations";
import { BASE_URL, CONTACT_EMAIL } from "@/lib/constants";

interface Props {
  params: Promise<{ service: string; location: string }>;
}

export async function generateStaticParams() {
  return generateCityServiceParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service, location } = await params;
  const loc = getLocationBySlug(location);
  if (!loc) return {};

  try {
    const svc = await getContentBySlug("services", service);
    const title = `${svc.frontmatter.title} in ${loc.city}, ${loc.state}`;
    const climateNote = loc.climate ? ` Experts in ${loc.climate} climate challenges.` : "";
    const description = `Find trusted ${service} professionals in ${loc.city}, ${loc.state}.${climateNote} Licensed, insured, free estimates. Get local quotes today.`;

    return {
      title,
      description,
      keywords: [
        `${service} ${loc.city}`,
        `${service} near me`,
        `${service} ${loc.state}`,
        ...(svc.frontmatter.keywords || []),
      ],
      alternates: {
        canonical: `/services/${service}/${location}`,
      },
      openGraph: {
        title,
        description,
        images: [
          {
            url: `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description)}&category=${encodeURIComponent(service)}`,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
    };
  } catch {
    return {};
  }
}

export default async function CityLandingPage({ params }: Props) {
  const { service, location } = await params;

  const loc = getLocationBySlug(location);
  if (!loc) notFound();

  let svc;
  try {
    svc = await getContentBySlug("services", service);
  } catch {
    notFound();
  }

  const override = await getServiceLocationContent(service, location);

  const title = `${svc.frontmatter.title} in ${loc.city}, ${loc.state}`;
  const faqs = override?.frontmatter.faqs ||
    svc.frontmatter.faqs?.map((faq) => ({
      question: faq.question.replace(/\?$/, ` in ${loc.city}?`),
      answer: faq.answer,
    })) ||
    [];

  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: svc.frontmatter.title, href: `/services/${service}` },
          { name: `${loc.city}, ${loc.state}`, href: `/services/${service}/${location}` },
        ]}
      />

      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
        <p className="mt-3 text-lg text-gray-600">
          Find licensed {service} professionals in {loc.city}, {loc.state}. We
          connect you with trusted local contractors for repairs, installations,
          and inspections. Request a free estimate today.
        </p>

        {override ? (
          <div
            className="prose prose-lg mt-8 max-w-none prose-headings:text-gray-900 prose-a:text-blue-600"
            dangerouslySetInnerHTML={{ __html: override.htmlContent }}
          />
        ) : (
          <div className="mt-8 space-y-8">
            {/* City-specific context */}
            {(loc.climate || loc.avgHomeAge) && (
              <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-5">
                <h2 className="text-lg font-bold text-gray-900">
                  {loc.city} at a Glance
                </h2>
                <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-4">
                  {loc.climate && (
                    <div>
                      <dt className="font-medium text-gray-500">Climate</dt>
                      <dd className="mt-0.5 capitalize text-gray-900">{loc.climate}</dd>
                    </div>
                  )}
                  {loc.avgHomeAge && (
                    <div>
                      <dt className="font-medium text-gray-500">Avg. Home Age</dt>
                      <dd className="mt-0.5 text-gray-900">{loc.avgHomeAge}</dd>
                    </div>
                  )}
                  {loc.population && (
                    <div>
                      <dt className="font-medium text-gray-500">Population</dt>
                      <dd className="mt-0.5 text-gray-900">{loc.population.toLocaleString()}</dd>
                    </div>
                  )}
                  {loc.costIndex && (
                    <div>
                      <dt className="font-medium text-gray-500">Cost Index</dt>
                      <dd className="mt-0.5 text-gray-900">
                        {loc.costIndex > 1
                          ? `${Math.round((loc.costIndex - 1) * 100)}% above`
                          : `${Math.round((1 - loc.costIndex) * 100)}% below`}{" "}
                        national avg.
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Why Choose Local {svc.frontmatter.title} in {loc.city}
              </h2>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-accent-600">&#10003;</span>
                  <span className="text-gray-700">
                    Licensed and insured professionals familiar with {loc.city} building codes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-accent-600">&#10003;</span>
                  <span className="text-gray-700">
                    Fast response times from contractors near you
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-accent-600">&#10003;</span>
                  <span className="text-gray-700">
                    Free estimates with no obligation
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-accent-600">&#10003;</span>
                  <span className="text-gray-700">
                    Verified reviews from {loc.city} homeowners
                  </span>
                </li>
              </ul>
            </div>

            {/* Local challenges section — unique per city */}
            {loc.weatherChallenges && loc.weatherChallenges.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {svc.frontmatter.title} Challenges in {loc.city}
                </h2>
                <p className="mt-2 text-gray-600">
                  {loc.city}&rsquo;s {loc.climate} climate creates specific home maintenance demands.
                  Local {service} professionals understand these challenges firsthand:
                </p>
                <ul className="mt-4 space-y-2">
                  {loc.weatherChallenges.map((challenge) => (
                    <li key={challenge} className="flex items-start gap-2">
                      <span className="mt-1 text-amber-500">&#9888;</span>
                      <span className="text-gray-700 capitalize">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Top homeowner concerns — unique per city */}
            {loc.topConcerns && loc.topConcerns.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  What {loc.city} Homeowners Ask About Most
                </h2>
                <ul className="mt-4 space-y-2">
                  {loc.topConcerns.map((concern) => (
                    <li key={concern} className="flex items-start gap-2">
                      <span className="mt-1 text-blue-500">&#8226;</span>
                      <span className="text-gray-700">{concern}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Permit info — unique per city */}
            {loc.permitNote && (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <h3 className="text-lg font-bold text-gray-900">
                  Permits &amp; Regulations in {loc.city}
                </h3>
                <p className="mt-2 text-sm text-gray-700">{loc.permitNote}</p>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Common {svc.frontmatter.title} Services in {loc.city}
              </h2>
              <div
                className="prose prose-lg mt-4 max-w-none prose-headings:text-gray-900 prose-a:text-blue-600"
                dangerouslySetInnerHTML={{ __html: svc.htmlContent }}
              />
            </div>
          </div>
        )}

        {faqs.length > 0 && <FAQSection faqs={faqs} />}

        <InternalLinks category={service} />

        <div className="mt-12 rounded-xl bg-blue-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Get {svc.frontmatter.title} Quotes in {loc.city}
          </h2>
          <p className="mt-2 text-gray-600">
            Connect with top-rated {service} professionals in {loc.city},{" "}
            {loc.state}. Free quotes, no obligation.
          </p>
          <div className="mt-4">
            <Button
              href={`/contact?service=${service}&city=${loc.slug}`}
              size="lg"
            >
              Get a Free Quote
            </Button>
          </div>
        </div>
      </div>

      {/* LocalBusiness Schema */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: `${svc.frontmatter.title} - ${loc.city}, ${loc.state}`,
          url: `${BASE_URL}/services/${service}/${location}`,
          email: CONTACT_EMAIL,
          address: {
            "@type": "PostalAddress",
            addressLocality: loc.city,
            addressRegion: loc.state,
            addressCountry: "US",
          },
        }}
      />
    </Container>
  );
}
