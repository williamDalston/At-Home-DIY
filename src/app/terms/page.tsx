import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${SITE_NAME}. Please read these terms carefully before using our website.`,
};

export default function TermsPage() {
  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Terms of Service", href: "/terms" },
        ]}
      />

      <article className="prose prose-lg mx-auto max-w-3xl prose-headings:text-gray-900">
        <h1>Terms of Service</h1>
        <p>
          <strong>Last updated:</strong> February 1, 2026
        </p>
        <p>
          By using {SITE_NAME} (&quot;the Site&quot;), you agree to these Terms
          of Service. If you do not agree, please do not use the Site.
        </p>

        <h2>Use of the Site</h2>
        <p>
          {SITE_NAME} provides informational content about home improvement,
          DIY guides, cost calculators, and connections to local service
          professionals. You may use the Site for personal, non-commercial
          purposes.
        </p>

        <h2>No Professional Advice</h2>
        <p>
          The content on this Site, including DIY guides, cost estimates, and
          calculators, is provided for informational purposes only. It does not
          constitute professional advice. Always consult a licensed professional
          before undertaking home improvement projects, especially those
          involving electrical, plumbing, structural, or HVAC work.
        </p>
        <p>
          Cost estimates from our calculators are approximations based on
          national averages and may not reflect actual costs in your area.
          Always obtain multiple quotes from licensed professionals for
          accurate pricing.
        </p>

        <h2>Contractor Relationships</h2>
        <p>
          {SITE_NAME} connects homeowners with local service professionals but
          is not a party to any agreement between you and a contractor. We do
          not employ, endorse, or guarantee the work of any service
          professional. You are responsible for verifying credentials, licenses,
          insurance, and the quality of work of any contractor you hire.
        </p>

        <h2>User Submissions</h2>
        <p>
          When you submit information through our forms (contact requests,
          newsletter signups, questions), you represent that the information is
          accurate and that you have the right to submit it. You grant us
          permission to use your submissions to provide our services.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          All content on the Site, including text, images, tools, and design, is
          owned by {SITE_NAME} or its licensors and is protected by copyright
          law. You may not reproduce, distribute, or create derivative works
          without our written permission.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, {SITE_NAME} is not liable for
          any direct, indirect, incidental, or consequential damages arising
          from your use of the Site or reliance on its content. This includes
          damages from DIY projects undertaken based on our guides or from
          services provided by contractors found through our platform.
        </p>

        <h2>Changes to These Terms</h2>
        <p>
          We may update these Terms at any time. Continued use of the Site after
          changes constitutes acceptance of the updated Terms.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about these Terms, contact us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </article>
    </Container>
  );
}
