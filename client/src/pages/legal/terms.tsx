import { LegalLayout } from "@/components/layout/LegalLayout";

export default function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="February 13, 2026">
      <section>
        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing or using the ILNAJ platform (the "Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Service.
        </p>
      </section>

      <section>
        <h2>2. Service Description</h2>
        <p>
          ILNAJ provides AI-driven conversational automation tools for businesses. Our service includes chat widgets, lead generation forms, and automated scheduling systems.
        </p>
      </section>

      <section>
        <h2>3. User Responsibilities</h2>
        <p>
          You are responsible for:
        </p>
        <ul>
          <li>Maintaining the security of your account and widget API keys.</li>
          <li>Ensuring all content processed through our AI complies with local laws.</li>
          <li>Providing accurate business information for the "Magic Preview" and production features.</li>
        </ul>
      </section>

      <section>
        <h2>4. Intellectual Property</h2>
        <p>
          The Service and its original content, features, and functionality are and will remain the exclusive property of ILNAJ and its licensors. Our brutalist design, source code, and AI training methodology are protected by copyright and trademark laws.
        </p>
      </section>

      <section>
        <h2>5. Termination</h2>
        <p>
          We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
        </p>
      </section>

      <section>
        <h2>6. Limitation of Liability</h2>
        <p>
          In no event shall ILNAJ be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
        </p>
      </section>

      <section>
        <h2>7. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law provisions.
        </p>
      </section>
    </LegalLayout>
  );
}
