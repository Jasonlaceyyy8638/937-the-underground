import type { Metadata } from "next";
import type { ReactNode } from "react";
import LegalDocumentLayout from "@/components/LegalDocumentLayout";
import {
  LEGAL_CONTACT_EMAIL,
  LEGAL_LAST_UPDATED,
  STATION_LOCATION,
  STATION_NAME,
  STATION_URL,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | 937 The Underground",
  description: `Privacy Policy for ${STATION_NAME}, describing how we collect and use information when you use our stream and website.`,
};

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-wide text-fuchsia-200 sm:text-xl">
        {title}
      </h2>
      <div className="mt-3 space-y-3 font-[family-name:var(--font-body)] text-sm leading-relaxed text-zinc-300 sm:text-base">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <LegalDocumentLayout title="Privacy Policy">
      <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-zinc-400 sm:text-base">
        {LEGAL_LAST_UPDATED}
      </p>

      <Section title="1. Introduction">
        <p>
          {STATION_NAME} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects
          your privacy. This Privacy Policy explains how we collect, use, disclose,
          and safeguard information when you visit{" "}
          <a href={STATION_URL} className="text-fuchsia-300 hover:text-fuchsia-200">
            {STATION_URL}
          </a>
          , listen to our live stream, submit music, sign up for our newsletter, or
          enter giveaways and promotions (collectively, the &quot;Service&quot;).
        </p>
        <p>
          By using the Service, you agree to the collection and use of information in
          accordance with this Privacy Policy.
        </p>
      </Section>

      <Section title="2. Information We Collect">
        <p>
          <strong>Information you provide directly</strong>
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Newsletter signups:</strong> name and email address when you
            subscribe to station updates;
          </li>
          <li>
            <strong>Giveaways and contests:</strong> name, email address, and other
            details required to administer a Promotion;
          </li>
          <li>
            <strong>Artist submissions:</strong> artist or band name, contact email,
            genre, uploaded audio files, and related metadata you provide through our
            upload console;
          </li>
          <li>
            <strong>Communications:</strong> information you send when contacting us
            at {LEGAL_CONTACT_EMAIL}.
          </li>
        </ul>
        <p>
          <strong>Information collected automatically</strong>
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>IP addresses</strong> and related network data when you access
            our live stream or website, used to deliver audio, maintain security,
            diagnose technical issues, and understand general usage patterns;
          </li>
          <li>
            Device type, browser type, operating system, referring URLs, and similar
            technical data;
          </li>
          <li>
            Cookies and similar technologies as described in Section 6 below.
          </li>
        </ul>
      </Section>

      <Section title="3. How We Use Your Information">
        <p>We use collected information to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Deliver and maintain our 24/7 live stream and website;</li>
          <li>Process artist submissions and station communications;</li>
          <li>
            Send newsletters, station updates, and promotional messages you have
            requested or consented to receive;
          </li>
          <li>Administer giveaways, verify winner eligibility, and award prizes;</li>
          <li>
            Protect the security and integrity of the Service, including fraud
            prevention and abuse detection;
          </li>
          <li>Comply with legal obligations and enforce our Terms of Service;</li>
          <li>
            Improve programming, user experience, and station operations through
            aggregated or de-identified analytics where permitted.
          </li>
        </ul>
      </Section>

      <Section title="4. How We Share Information">
        <p>
          We do not sell your personal information. We may share information with:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Service providers</strong> that help us operate the Service—such
            as streaming hosts, cloud storage providers, form and email processors,
            and website infrastructure partners—solely to perform services on our
            behalf;
          </li>
          <li>
            <strong>Promotion partners</strong> when necessary to fulfill a giveaway
            or contest prize, subject to applicable rules and consent where required;
          </li>
          <li>
            <strong>Legal and safety recipients</strong> when required by law, court
            order, or governmental request, or when we believe disclosure is necessary
            to protect rights, property, or safety;
          </li>
          <li>
            <strong>Business transfers</strong> in connection with a merger,
            acquisition, or sale of assets, subject to continued protection consistent
            with this Policy.
          </li>
        </ul>
      </Section>

      <Section title="5. Streaming Data and IP Addresses">
        <p>
          When you listen to our stream, our streaming infrastructure and related
          service providers may log your IP address and connection details to route
          audio, enforce licensing or geographic restrictions where applicable,
          prevent abuse, and maintain service reliability. We retain this information
          only as long as reasonably necessary for these purposes unless a longer
          retention period is required by law.
        </p>
      </Section>

      <Section title="6. Cookies and Similar Technologies">
        <p>
          We and our third-party partners may use cookies, pixels, local storage, and
          similar technologies to remember preferences, analyze traffic, and support
          embedded features such as players and forms. You can control cookies through
          your browser settings. Disabling cookies may affect certain features of the
          Service.
        </p>
      </Section>

      <Section title="7. Data Retention">
        <p>
          We retain personal information for as long as needed to provide the Service,
          fulfill the purposes described in this Policy, comply with legal obligations,
          resolve disputes, and enforce our agreements. Newsletter and contest data
          are retained according to operational needs and applicable law. Uploaded
          artist materials may be retained for broadcast, archival, and licensing
          purposes consistent with our Terms of Service.
        </p>
      </Section>

      <Section title="8. Security">
        <p>
          We implement reasonable administrative, technical, and organizational
          measures designed to protect your information. However, no method of
          transmission over the Internet or electronic storage is completely secure,
          and we cannot guarantee absolute security.
        </p>
      </Section>

      <Section title="9. Children&apos;s Privacy">
        <p>
          The Service is not directed to children under 13, and we do not knowingly
          collect personal information from children under 13. If you believe we have
          collected information from a child under 13, please contact us and we will
          take steps to delete it.
        </p>
      </Section>

      <Section title="10. Your Choices and Rights">
        <p>Depending on where you live, you may have the right to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Access, correct, or delete personal information we hold about you;</li>
          <li>Opt out of marketing emails using the unsubscribe link in any message;</li>
          <li>Object to or restrict certain processing where applicable law provides;</li>
          <li>Withdraw consent where processing is based on consent.</li>
        </ul>
        <p>
          To exercise these rights, contact us at{" "}
          <a
            href={`mailto:${LEGAL_CONTACT_EMAIL}`}
            className="text-fuchsia-300 hover:text-fuchsia-200"
          >
            {LEGAL_CONTACT_EMAIL}
          </a>
          . We may need to verify your identity before responding.
        </p>
      </Section>

      <Section title="11. U.S. State Privacy Notice">
        <p>
          Residents of certain U.S. states may have additional privacy rights under
          applicable state law. We will honor valid requests in accordance with
          applicable requirements. {STATION_NAME} is operated from {STATION_LOCATION}.
        </p>
      </Section>

      <Section title="12. Third-Party Links">
        <p>
          The Service may contain links to third-party websites or social platforms.
          We are not responsible for the privacy practices of those third parties. We
          encourage you to review their privacy policies before providing personal
          information.
        </p>
      </Section>

      <Section title="13. Changes to This Privacy Policy">
        <p>
          We may update this Privacy Policy from time to time. When we do, we will
          revise the &quot;Last Updated&quot; date at the top of this page. Material
          changes may also be communicated through the website or other reasonable
          means.
        </p>
      </Section>

      <Section title="14. Contact Us">
        <p>
          Questions or concerns regarding this Privacy Policy or our data practices
          should be directed to:
        </p>
        <p>
          <a
            href={`mailto:${LEGAL_CONTACT_EMAIL}`}
            className="text-fuchsia-300 hover:text-fuchsia-200"
          >
            {LEGAL_CONTACT_EMAIL}
          </a>
        </p>
      </Section>
    </LegalDocumentLayout>
  );
}
