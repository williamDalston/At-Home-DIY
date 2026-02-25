import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSection } from "@/components/content/FAQSection";
import { Testimonials } from "@/components/engagement/Testimonials";
import { SchemaService } from "@/components/seo/SchemaService";
import { InternalLinks } from "@/components/content/InternalLinks";
import { getAllContent, getContentBySlug } from "@/lib/content";
import { getAllLocations } from "@/lib/locations";

interface Props {
  params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
  const services = await getAllContent("services");
  return services.map((s) => ({
    service: s.frontmatter.serviceType || s.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  try {
    const svc = await getContentBySlug("services", service);
    return {
      title: svc.frontmatter.title,
      description: svc.frontmatter.description,
      keywords: svc.frontmatter.keywords,
      alternates: {
        canonical: `/services/${service}`,
      },
    };
  } catch {
    return {};
  }
}

export default async function ServiceCategoryPage({ params }: Props) {
  const { service } = await params;

  let svc;
  try {
    svc = await getContentBySlug("services", service);
  } catch {
    notFound();
  }

  const locations = getAllLocations();

  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: svc.frontmatter.title, href: `/services/${service}` },
        ]}
      />

      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900">
          {svc.frontmatter.title}
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          {svc.frontmatter.description}
        </p>

        {svc.frontmatter.benefits && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900">Why Choose Us</h2>
            <ul className="mt-4 space-y-2">
              {svc.frontmatter.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 text-green-500">&#10003;</span>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div
          className="prose prose-lg mt-8 max-w-none prose-headings:text-gray-900 prose-a:text-blue-600"
          dangerouslySetInnerHTML={{ __html: svc.htmlContent }}
        />

        {/* Available Cities */}
        {locations.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Locations
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {locations.map((loc) => (
                <Card
                  key={loc.slug}
                  href={`/services/${service}/${loc.slug}`}
                >
                  <h3 className="font-semibold text-gray-900">
                    {loc.city}, {loc.state}
                  </h3>
                  <p className="mt-1 text-sm text-blue-600">
                    View {svc.frontmatter.title.toLowerCase()} &rarr;
                  </p>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            What Our Customers Say
          </h2>
          <div className="mt-6">
            <Testimonials service={service} limit={3} />
          </div>
        </section>

        {svc.frontmatter.faqs && svc.frontmatter.faqs.length > 0 && (
          <FAQSection faqs={svc.frontmatter.faqs} />
        )}

        <InternalLinks category={service} />

        <div className="mt-12 rounded-xl bg-blue-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Need {svc.frontmatter.title}?
          </h2>
          <p className="mt-2 text-gray-600">
            Get free quotes from licensed professionals in your area.
          </p>
          <div className="mt-4">
            <Button href={`/contact?service=${service}`} size="lg">
              Get a Free Quote
            </Button>
          </div>
        </div>
      </div>
      <SchemaService
        description={svc.frontmatter.description || ""}
        serviceType={service}
      />
    </Container>
  );
}
