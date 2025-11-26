import { Footer } from "@/components/footer";

export default function Contact() {
  return (
    <>
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 pb-10
        min-h-[60vh]"
      >
        <div className="max-w-2xl">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="mb-2 text-4xl text-foreground">Contact us</h1>
            <p className="text-sm text-muted-foreground">
              Get in touch with our team
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Contact Information */}
            <section>
              <h2 className="mb-3 text-xl text-foreground">Get in Touch</h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  <strong>Email:</strong> support@mailboiler.com
                </p>
                <p>
                  <strong>General Inquiries:</strong> info@mailboiler.com
                </p>
                <p>
                  <strong>Business Hours:</strong> Monday - Friday, 9:00 AM -
                  5:00 PM EST
                </p>
                <p>
                  <strong>Response Time:</strong> We typically respond within
                  24-48 hours
                </p>
              </div>
            </section>

            {/* FAQ Link */}
            <section>
              <h2 className="mb-3 text-xl text-foreground">Need Help?</h2>
              <p className="text-foreground/80 leading-relaxed">
                Before reaching out, you might find answers to common questions
                in our documentation or FAQs. Many issues can be resolved
                quickly by checking these resources first.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
