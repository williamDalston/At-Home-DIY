import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE_NAME}. Learn how we collect, use, and protect your personal information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: "/privacy-policy" },
        ]}
      />

      <article className="prose prose-lg mx-auto max-w-3xl prose-headings:text-gray-900">
        <h1>Privacy Policy</h1>
        <p>
          <strong>Last updated:</strong> February 1, 2026
        </p>
        <p>
          {SITE_NAME} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
          respects your privacy. This Privacy Policy explains how we collect,
          use, and protect your personal information when you visit our website.
        </p>

        <h2>Information We Collect</h2>
        <h3>Information You Provide</h3>
        <ul>
          <li>
            <strong>Contact forms:</strong> When you submit a contact form or
            request a quote, we collect your name, email address, phone number
            (optional), and message content.
          </li>
          <li>
            <strong>Newsletter:</strong> When you subscribe to our newsletter,
            we collect your email address.
          </li>
          <li>
            <strong>Ask an Expert:</strong> When you submit a question, we
            collect your name, email, and question content.
          </li>
        </ul>

        <h3>Information Collected Automatically</h3>
        <ul>
          <li>
            <strong>Cookies:</strong> We use cookies to remember your
            preferences (such as cookie consent) and analyze site traffic.
          </li>
          <li>
            <strong>Analytics:</strong> We use Google Analytics to understand how
            visitors interact with our site. This collects anonymized data
            including pages visited, time on site, browser type, and approximate
            location. Google Analytics uses cookies to collect this data.
          </li>
          <li>
            <strong>Advertising:</strong> We use Google AdSense to display
            advertisements. Google may use cookies and web beacons to serve ads
            based on your prior visits to this or other websites. You can opt
            out of personalized advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>.
          </li>
        </ul>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>To respond to your inquiries and provide requested services</li>
          <li>To connect you with local service professionals</li>
          <li>To send newsletter content you subscribed to</li>
          <li>To improve our website content and user experience</li>
          <li>To analyze site traffic and usage patterns</li>
        </ul>

        <h2>Information Sharing</h2>
        <p>
          We do not sell your personal information. We may share your contact
          information with local service professionals when you request a quote
          or consultation. We use third-party services (Google Analytics) that
          process anonymized data as described above.
        </p>

        <h2>Cookies</h2>
        <p>
          Our site uses the following types of cookies:
        </p>
        <ul>
          <li>
            <strong>Essential cookies:</strong> Store your cookie consent
            preference.
          </li>
          <li>
            <strong>Analytics cookies:</strong> Google Analytics cookies that
            help us understand site usage (can be declined via the cookie
            banner).
          </li>
          <li>
            <strong>Advertising cookies:</strong> Google AdSense cookies used to
            display relevant advertisements and measure ad performance.
          </li>
        </ul>
        <p>
          You can control cookies through your browser settings. Disabling
          cookies may affect some site functionality.
        </p>

        <h2>Data Retention</h2>
        <p>
          We retain contact form submissions and newsletter subscriptions
          for as long as needed to provide our services. You can request
          deletion of your data at any time by contacting us.
        </p>

        <h2>Your Rights</h2>
        <p>
          Depending on your location, you may have the right to access, correct,
          delete, or port your personal data. California residents have
          additional rights under the CCPA. To exercise any of these rights,
          contact us at the email below.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, contact us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </article>
    </Container>
  );
}
