import { Footer } from "@/components/footer";

export default function PrivacyPolicy() {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 pb-10">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="mb-2 text-4xl text-foreground">Privacy policy</h1>
          <p className="text-sm text-muted-foreground">
            Last reviewed:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          <section>
            <h2 className="mb-4 text-xl text-foreground">Introduction</h2>
            <p className="text-foreground/80 leading-relaxed">
              Welcome to Mail Boiler ("we," "our," or "us"). We are committed to
              protecting your personal information and your right to privacy.
              This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our email verification
              service.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">
              Information We Collect
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Account information (name, email address, username)</li>
              <li>
                Payment information (processed securely through third-party
                payment providers)
              </li>
              <li>Email addresses submitted for verification</li>
              <li>Communication preferences</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mt-6 mb-4">
              We also automatically collect certain information when you use our
              service:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Usage data (features used, verification statistics)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">
              How We Use Your Information
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>
                Provide, maintain, and improve our email verification services
              </li>
              <li>Process your transactions and manage your credits</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>
                Respond to your comments, questions, and customer service
                requests
              </li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>
                Detect, prevent, and address technical issues and fraudulent
                activity
              </li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">
              Data Storage and Security
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              We implement appropriate technical and organizational security
              measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction. However, no method
              of transmission over the Internet or electronic storage is 100%
              secure, and we cannot guarantee absolute security.
            </p>
            <p className="text-foreground/80 leading-relaxed mt-4">
              Email addresses submitted for verification are stored for up to 30
              days to provide verification history and reporting features. After
              this period, they are automatically deleted from our systems.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">
              Data Sharing and Disclosure
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information in the following
              circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>
                With service providers who assist us in operating our service
                (e.g., payment processors, hosting providers)
              </li>
              <li>
                To comply with legal obligations, court orders, or government
                requests
              </li>
              <li>
                To protect our rights, property, or safety, or that of our users
                or others
              </li>
              <li>
                In connection with a business transaction (e.g., merger,
                acquisition, or sale of assets)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">
              Your Rights and Choices
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding
              your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>
                Access: Request a copy of the personal information we hold about
                you
              </li>
              <li>
                Correction: Request correction of inaccurate or incomplete
                information
              </li>
              <li>Deletion: Request deletion of your personal information</li>
              <li>Objection: Object to the processing of your information</li>
              <li>
                Portability: Request transfer of your information to another
                service
              </li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mt-4">
              To exercise these rights, please contact us at
              privacy@mailboiler.com.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">
              Cookies and Tracking Technologies
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              We use cookies and similar tracking technologies to track activity
              on our service and hold certain information. Cookies are files
              with a small amount of data that are sent to your browser from a
              website and stored on your device. You can instruct your browser
              to refuse all cookies or to indicate when a cookie is being sent.
              However, if you do not accept cookies, you may not be able to use
              some portions of our service.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">Children's Privacy</h2>
            <p className="text-foreground/80 leading-relaxed">
              Our service is not intended for individuals under the age of 18.
              We do not knowingly collect personal information from children
              under 18. If we become aware that we have collected personal
              information from a child under 18, we will take steps to delete
              such information.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">
              International Data Transfers
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              Your information may be transferred to and maintained on computers
              located outside of your state, province, country, or other
              governmental jurisdiction where the data protection laws may
              differ. By using our service, you consent to the transfer of your
              information to the United States and other countries.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">
              Changes to This Privacy Policy
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last reviewed" date. You are advised to review
              this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">Contact Us</h2>
            <p className="text-foreground/80 leading-relaxed">
              If you have any questions about this Privacy Policy, please
              contact us at privacy@mailboiler.com.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
