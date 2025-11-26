import { Footer } from "@/components/footer";

export default function TermsOfService() {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 pb-10">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="mb-2 text-4xl text-foreground">
            Terms and conditions
          </h1>
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
              By using Mail Boiler you confirm your acceptance of, and agree to
              be bound by, these terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">
              Agreement to Terms and Conditions
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              This Agreement takes effect on the date on which you first use the
              Mail Boiler application.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">
              Unlimited Access Software License with Termination Rights
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              The Mail Boiler Software License facilitates the acquisition of
              Mail Boiler software, either for free in a limited feature plan,
              or by a metered pricing model billed on a monthly basis. The
              licensor retains the right to terminate the license without
              conditions or prerequisites. This termination provision enables
              the licensor to exercise control over software distribution and
              utilization. Opting for the Mail Boiler Software License enables
              users to enjoy the benefits of the software while recognizing the
              licensor's unrestricted termination rights, which provide
              adaptability and address potential unforeseen circumstances.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">Refunds</h2>
            <p className="text-foreground/80 leading-relaxed">
              Due to the nature of digital products, Mail Boiler cannot be
              refunded or exchanged once access is granted. While we
              consistently monitor for potential misuse and suspicious activity
              to prevent unexpected charges to the end user, we can not and will
              not guarantee a refund where a metered charge is on par with
              registered and provable usage of the service.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">Disclaimer</h2>
            <p className="text-foreground/80 leading-relaxed">
              It is not warranted that Mail Boiler will meet your requirements
              or that its operation will be uninterrupted or error free. All
              express and implied warranties or conditions not stated in this
              Agreement (including without limitation, loss of profits, loss or
              corruption of data, business interruption or loss of contracts),
              so far as such exclusion or disclaimer is permitted under the
              applicable law are excluded and expressly disclaimed. This
              Agreement does not affect your statutory rights.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">
              Warranties and Limitation of Liability
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              Mail Boiler does not give any warranty, guarantee or other term as
              to the quality, fitness for purpose or otherwise of the software.
              Mail Boiler shall not be liable to you by reason of any
              representation (unless fraudulent), or any implied warranty,
              condition or other term, or any duty at common law, for any loss
              of profit or any indirect, special or consequential loss, damage,
              costs, expenses or other claims (whether caused by Mail Boiler's
              negligence or the negligence of its servants or agents or
              otherwise) which arise out of or in connection with the provision
              of any goods or services by Mail Boiler. Mail Boiler shall not be
              liable or deemed to be in breach of contract by reason of any
              delay in performing, or failure to perform, any of its obligations
              if the delay or failure was due to any cause beyond its reasonable
              control. Notwithstanding contrary clauses in this Agreement, in
              the event that Mail Boiler are deemed liable to you for breach of
              this Agreement, you agree that Mail Boiler's liability is limited
              to the amount actually paid by you for your services or software,
              which amount calculated in reliance upon this clause. You hereby
              release Mail Boiler from any and all obligations, liabilities and
              claims in excess of this limitation.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">Responsibilities</h2>
            <p className="text-foreground/80 leading-relaxed">
              Mail Boiler is not responsible for what the user does with the
              user-generated content.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">Price Adjustments</h2>
            <p className="text-foreground/80 leading-relaxed">
              As we continue to improve Mail Boiler and expand the services
              available to users, the price may increase. The discount is
              provided to help customers secure the current price without being
              surprised by future increases.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">
              General Terms and Law
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              This Agreement is governed by the laws of the United States. You
              acknowledge that no joint venture, partnership, employment, or
              agency relationship exists between you and Mail Boiler as a result
              of your use of these services. You agree not to hold yourself out
              as a representative, agent or employee of Mail Boiler. You agree
              that Mail Boiler will not be liable by reason of any
              representation, act or omission to act by you.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl text-foreground">
              Contact Information
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              If you have any questions about these Terms and Conditions, please
              contact us at support@mailboiler.com.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
