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
  title: "Terms of Service | 937 The Underground",
  description: `Terms of Service for ${STATION_NAME}, an independent internet radio station based in ${STATION_LOCATION}.`,
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

export default function TermsOfServicePage() {
  return (
    <LegalDocumentLayout title="Terms of Service">
      <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-zinc-400 sm:text-base">
        Last Updated: {LEGAL_LAST_UPDATED}
      </p>

      <Section title="1. Agreement to These Terms">
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of
          the website, live audio stream, mobile experiences, artist submission tools,
          contests, giveaways, and related services (collectively, the
          &quot;Service&quot;) operated by <strong>{STATION_NAME}</strong> (&quot;we,&quot;
          &quot;us,&quot; or &quot;our&quot;) at{" "}
          <a href={STATION_URL} className="text-fuchsia-300 hover:text-fuchsia-200">
            {STATION_URL}
          </a>
          . By accessing or using the Service, you agree to be bound by these Terms.
          If you do not agree, do not use the Service.
        </p>
      </Section>

      <Section title="2. About the Service">
        <p>
          {STATION_NAME} is an independent internet radio station based in{" "}
          {STATION_LOCATION}. We operate a 24/7 streaming service featuring local
          artists, live interviews, community programming, and city-wide giveaways.
          The Service may change over time, including programming, features, and
          availability, without prior notice.
        </p>
      </Section>

      <Section title="3. Eligibility">
        <p>
          You must be at least 13 years of age to use the Service. If you are under
          18, you represent that you have permission from a parent or legal guardian.
          Certain features—including artist submissions, newsletter signups, and
          giveaways—may require you to be 18 or older, or the age of majority in
          your jurisdiction, whichever is greater.
        </p>
      </Section>

      <Section title="4. Acceptable Use">
        <p>You agree not to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Use the Service for any unlawful purpose or in violation of applicable law;</li>
          <li>
            Interfere with or disrupt the stream, servers, networks, or security of
            the Service;
          </li>
          <li>
            Attempt to scrape, reverse engineer, or exploit the Service except as
            permitted by law;
          </li>
          <li>
            Upload, submit, or request content you do not have the right to share;
          </li>
          <li>
            Impersonate any person or entity or misrepresent your affiliation with any
            person or entity.
          </li>
        </ul>
        <p>
          We reserve the right to suspend or terminate access to the Service for
          conduct we reasonably believe violates these Terms or harms the station,
          its listeners, or its partners.
        </p>
      </Section>

      <Section title="5. Artist Submissions and User-Submitted Content">
        <p>
          Artists and rights holders may submit music and related materials through
          our upload console or other designated channels. By submitting content, you
          represent and warrant that:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>You own or control all rights necessary to submit the content;</li>
          <li>
            Your submission does not infringe any copyright, trademark, publicity,
            privacy, or other rights of any third party;
          </li>
          <li>
            Your submission complies with all applicable laws and these Terms.
          </li>
        </ul>
        <p>
          You retain ownership of your submitted music and related intellectual
          property. By submitting content, you grant {STATION_NAME} a{" "}
          <strong>
            non-exclusive, royalty-free, worldwide license
          </strong>{" "}
          to host, store, reproduce, publicly perform, broadcast, stream, display,
          and otherwise use your submitted content solely in connection with operating,
          promoting, and distributing the Service—including on-air broadcast, archival
          playback, promotional clips, and station marketing—without additional
          compensation unless separately agreed in writing.
        </p>
        <p>
          We do not guarantee that any submitted track will be aired, rotated, or
          featured in our request system. Submission does not create a partnership,
          employment, or joint venture relationship.
        </p>
      </Section>

      <Section title="6. Intellectual Property">
        <p>
          The {STATION_NAME} name, logos, website design, stream branding, graphics,
          text, software, and other station-created materials (excluding
          user-submitted music) are owned by or licensed to us and are protected by
          intellectual property laws. You may not copy, modify, distribute, or create
          derivative works from our platform or branding without our prior written
          consent, except for personal, non-commercial listening or sharing links to
          our official channels.
        </p>
        <p>
          All trademarks, service marks, and trade names displayed on the Service
          that are not ours remain the property of their respective owners.
        </p>
      </Section>

      <Section title="7. Live Stream and Service Availability">
        <p>
          We strive to provide continuous 24/7 streaming, but we do{" "}
          <strong>not guarantee uninterrupted, error-free, or secure access</strong>{" "}
          to the Service. The stream may be unavailable due to maintenance, technical
          failures, internet outages, third-party hosting or CDN issues, force
          majeure events, or other circumstances beyond our reasonable control.
        </p>
        <p>
          We disclaim liability for downtime, buffering, audio quality issues, delays,
          or failures of the live stream or website functionality. Your use of the
          Service is at your own risk.
        </p>
      </Section>

      <Section title="8. Giveaways and Promotions">
        <p>
          From time to time, {STATION_NAME} may offer giveaways, contests, or
          promotions (&quot;Promotions&quot;). Unless otherwise stated in official
          Promotion rules:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Promotions are open only to eligible participants as defined in the
            specific Promotion rules;
          </li>
          <li>
            <strong>
              All giveaways are void where prohibited by law
            </strong>
            ;
          </li>
          <li>
            We reserve the right to verify winner eligibility, including age,
            residency, identity, and compliance with Promotion rules;
          </li>
          <li>
            We may substitute prizes of equal or greater value, cancel or modify a
            Promotion, or disqualify entries that are fraudulent, incomplete, or
            non-compliant;
          </li>
          <li>
            Winners may be required to sign releases or provide tax information where
            required by law.
          </li>
        </ul>
        <p>
          Promotion rules posted for a specific event supplement these Terms and
          control in the event of a conflict.
        </p>
      </Section>

      <Section title="9. Third-Party Services and Content">
        <p>
          The Service may integrate or link to third-party platforms—including
          streaming infrastructure, embed players, social media, form providers, and
          cloud storage—operated by parties other than us. We do not control and are
          not responsible for third-party services, their content, policies, or
          availability.
        </p>
        <p>
          User-submitted music and third-party content aired or displayed through the
          Service remain the responsibility of the submitting party or rights holder.
          We do not warrant the accuracy, legality, or quality of third-party or
          user-submitted content.
        </p>
      </Section>

      <Section title="10. Disclaimer of Warranties">
        <p>
          TO THE FULLEST EXTENT PERMITTED BY LAW, THE SERVICE IS PROVIDED ON AN{" "}
          <strong>&quot;AS IS&quot; AND &quot;AS AVAILABLE&quot;</strong> BASIS
          WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY,
          INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
          PURPOSE, TITLE, AND NON-INFRINGEMENT.
        </p>
      </Section>

      <Section title="11. Limitation of Liability">
        <p>
          TO THE FULLEST EXTENT PERMITTED BY LAW, {STATION_NAME} AND ITS OWNERS,
          OPERATORS, AFFILIATES, AND PARTNERS WILL NOT BE LIABLE FOR ANY INDIRECT,
          INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF
          PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR
          RELATED TO YOUR USE OF OR INABILITY TO USE THE SERVICE.
        </p>
        <p>
          TO THE FULLEST EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY FOR ANY CLAIM
          ARISING OUT OF OR RELATING TO THE SERVICE WILL NOT EXCEED THE GREATER OF
          (A) ONE HUNDRED U.S. DOLLARS (US $100) OR (B) THE AMOUNT YOU PAID US, IF
          ANY, IN THE TWELVE (12) MONTHS BEFORE THE EVENT GIVING RISE TO THE CLAIM.
        </p>
        <p>
          Some jurisdictions do not allow certain limitations of liability; in those
          jurisdictions, our liability is limited to the maximum extent permitted by
          law.
        </p>
      </Section>

      <Section title="12. Indemnification">
        <p>
          You agree to defend, indemnify, and hold harmless {STATION_NAME} and its
          owners, operators, affiliates, and partners from any claims, damages,
          losses, liabilities, and expenses (including reasonable attorneys&apos; fees)
          arising out of or related to your use of the Service, your submitted
          content, your violation of these Terms, or your violation of any rights of
          another party.
        </p>
      </Section>

      <Section title="13. Governing Law and Disputes">
        <p>
          These Terms are governed by the laws of the State of Ohio and applicable
          federal law of the United States, without regard to conflict-of-law
          principles. You agree that any dispute arising out of or relating to these
          Terms or the Service will be brought exclusively in the state or federal
          courts located in or serving {STATION_LOCATION}, and you consent to personal
          jurisdiction in those courts.
        </p>
      </Section>

      <Section title="14. Changes to These Terms">
        <p>
          We may update these Terms from time to time. When we do, we will revise the
          &quot;Last Updated&quot; date at the top of this page. Your continued use of
          the Service after changes become effective constitutes acceptance of the
          revised Terms.
        </p>
      </Section>

      <Section title="15. Contact Us">
        <p>
          Questions or concerns regarding these Terms should be directed to:
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
