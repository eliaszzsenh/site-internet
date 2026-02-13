import { LegalLayout } from "@/components/layout/LegalLayout";

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="February 13, 2026">
      <section>
        <h2>1. Introduction</h2>
        <p>
          ILNAJ ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website crackito.uk and use our AI automation services.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p><strong>Personal Data:</strong> We collect email addresses, business names, and contact information when you fill out our lead forms or request a preview.</p>
        <p><strong>Usage Data:</strong> We collect information on how the Service is accessed and used, including IP addresses, browser types, and interaction data with our AI widgets.</p>
        <p><strong>AI Training Data:</strong> Conversations processed through our widgets may be used to improve the accuracy of our models, unless a user explicitly opts out.</p>
      </section>

      <section>
        <h2>3. GDPR Compliance</h2>
        <p>For users in the European Union, we process personal data in accordance with the General Data Protection Regulation (GDPR):</p>
        <ul>
          <li><strong>Right to Access:</strong> You can request a copy of your personal data.</li>
          <li><strong>Right to Rectification:</strong> You can request that we correct inaccurate data.</li>
          <li><strong>Right to Erasure:</strong> You can request that we delete your data ("Right to be Forgotten").</li>
          <li><strong>Data Portability:</strong> You can request a transfer of your data to another service.</li>
        </ul>
      </section>

      <section>
        <h2>4. Use of Cookies</h2>
        <p>
          We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </p>
      </section>

      <section>
        <h2>5. Data Security</h2>
        <p>
          The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. We use industry-standard encryption and security protocols to protect your information.
        </p>
      </section>

      <section>
        <h2>6. Third-Party Service Providers</h2>
        <p>
          We may employ third party companies and individuals to facilitate our Service, such as database hosting and analytics. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
        </p>
      </section>

      <section>
        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at: <strong>privacy@crackito.uk</strong>
        </p>
      </section>
    </LegalLayout>
  );
}
