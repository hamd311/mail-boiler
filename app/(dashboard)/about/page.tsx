import { Footer } from "@/components/footer";

export default function AboutUs() {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 pb-10">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl text-foreground">About us</h1>
          <p className="text-sm text-muted-foreground">
            Learn more about Mail Boiler and our mission
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10">
          <section>
            <h2 className="mb-4 text-xl text-foreground">Who We Are</h2>
            <p className="text-foreground/80 leading-relaxed">
              Mail Boiler is a modern email verification service designed to
              help businesses maintain clean, accurate email lists. We provide
              fast, reliable email verification through an intuitive
              credit-based system that scales with your needs.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">Our Mission</h2>
            <p className="text-foreground/80 leading-relaxed">
              Our mission is to empower businesses with the tools they need to
              verify email addresses quickly and accurately. We believe that
              maintaining a clean email list shouldn't be complicated or
              expensive, which is why we've built a simple, transparent, and
              affordable solution that anyone can use.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">What We Do</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Mail Boiler offers comprehensive email verification services
              through multiple channels:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Single email verification for quick checks</li>
              <li>Bulk verification via CSV or TXT file upload</li>
              <li>Bulk text verification for pasting multiple emails</li>
              <li>
                Real-time verification results with detailed status information
              </li>
              <li>Verification history and reporting</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">How It Works</h2>
            <p className="text-foreground/80 leading-relaxed">
              Our credit-based system is straightforward: purchase credits, then
              use them to verify email addresses. One credit equals one email
              verification. There are no hidden fees, no subscriptions, and
              credits never expire. You only pay for what you use, making it
              perfect for businesses of all sizes.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">
              Why Choose Mail Boiler
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We built Mail Boiler with several key principles in mind:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>
                <strong>Simplicity:</strong> Our interface is clean and
                intuitive, making email verification accessible to everyone
              </li>
              <li>
                <strong>Speed:</strong> Fast verification results without
                compromising accuracy
              </li>
              <li>
                <strong>Transparency:</strong> Clear pricing with no hidden
                costs or surprise charges
              </li>
              <li>
                <strong>Flexibility:</strong> Multiple verification methods to
                suit your workflow
              </li>
              <li>
                <strong>Reliability:</strong> Built on robust infrastructure
                with high availability
              </li>
              <li>
                <strong>Security:</strong> Your data is protected with
                industry-standard security measures
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">Our Technology</h2>
            <p className="text-foreground/80 leading-relaxed">
              Mail Boiler uses advanced verification algorithms to check email
              addresses for validity, deliverability, and quality. Our system
              performs multiple checks including syntax validation, domain
              verification, MX record lookup, and mailbox existence verification
              to ensure the highest accuracy rates.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">Our Commitment</h2>
            <p className="text-foreground/80 leading-relaxed">
              We're committed to continuously improving our service and
              providing exceptional support to our users. Whether you're
              verifying a handful of emails or processing large lists, we're
              here to help you succeed. Your feedback helps us build a better
              product, and we're always listening.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">Get in Touch</h2>
            <p className="text-foreground/80 leading-relaxed">
              Have questions or feedback? We'd love to hear from you. Contact us
              at support@mailboiler.com or visit our Contact page for more ways
              to get in touch.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
