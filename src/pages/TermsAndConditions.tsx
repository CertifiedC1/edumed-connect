import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FileText, Mail, Phone, MapPin } from "lucide-react";
import Layout from "@/components/layout/Layout";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5 },
  }),
};

export default function TermsAndConditions() {
  return (
    <Layout>
      <Helmet>
        <title>Terms & Conditions — Edumed Trust</title>
        <meta name="description" content="Read the terms and conditions governing your use of the Edumed Trust website, including donations, scholarships, and data handling." />
      </Helmet>

      {/* Hero */}
      <section className="bg-primary section-padding text-center">
        <div className="container-tight">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4"
            style={{ lineHeight: "1.15" }}
          >
            Terms & Conditions
          </motion.h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Please read these terms carefully before using our website.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground">Terms & Conditions</h2>
              <p className="text-sm text-muted-foreground">Effective Date: April 2026 · Last Updated: April 2026</p>
            </div>
          </div>

          <div className="space-y-6">
            <Section index={0} title="1. Acceptance of Terms">
              <p>
                By accessing and using the Edumed Trust website (edumedtrust.org), you agree to be bound by these
                Terms and Conditions. If you do not agree with any part of these Terms, please do not use this
                website.
              </p>
            </Section>

            <Section index={1} title="2. About Edumed Trust">
              <p>
                Edumed Trust is a registered Kenyan Christian charitable trust established in 1996. Our mission is
                to support bright but financially disadvantaged students through:
              </p>
              <ul>
                <li>Education scholarships</li>
                <li>Mentorship programs</li>
                <li>Community empowerment initiatives</li>
              </ul>
            </Section>

            <Section index={2} title="3. Use of the Website">
              <p>You agree to use this website only for lawful purposes and in a manner that does not:</p>
              <ul>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Restrict or interfere with another user's experience</li>
                <li>Attempt to gain unauthorized access to systems or data</li>
                <li>Upload or transmit malicious code, spam, or harmful content</li>
                <li>Misrepresent your identity or affiliation</li>
              </ul>
            </Section>

            <Section index={3} title="4. Donations & Pledges">
              <ul>
                <li>All donations are voluntary</li>
                <li>Donations are generally non-refundable, except in cases of clear error</li>
                <li>Pledges indicate intent to donate and are not legally binding contracts</li>
                <li>Donation amounts are in Kenyan Shillings (KES) unless otherwise stated</li>
                <li>Edumed Trust reserves the right to allocate funds where the need is greatest</li>
                <li>Donation records may be maintained for accountability and reporting</li>
                <li>Tax receipts may be issued in accordance with applicable Kenyan laws</li>
              </ul>
            </Section>

            <Section index={4} title="5. Scholarship Applications">
              <ul>
                <li>All application information must be accurate and truthful</li>
                <li>Submission of false or misleading information may result in disqualification</li>
                <li>Selection is based on Edumed Trust criteria and available funding</li>
                <li>Scholarship decisions are made at the sole discretion of the Trust</li>
                <li>Submission of an application does not guarantee selection</li>
              </ul>
            </Section>

            <Section index={5} title="6. Intellectual Property">
              <p>All content on this website, including text, images, logos, and design elements, is the property of
                Edumed Trust or its licensors and is protected by applicable intellectual property laws.</p>
              <p>You may not reproduce, distribute, or modify any content without prior written permission.</p>
            </Section>

            <Section index={6} title="7. User-Submitted Content">
              <p>By submitting information through this website (including contact forms, applications, or
                partnership requests), you agree that:</p>
              <ul>
                <li>The information provided is accurate</li>
                <li>Edumed Trust may use the data for operational and administrative purposes</li>
                <li>Use of such data is governed by our Privacy Policy</li>
              </ul>
            </Section>

            <Section index={7} title="8. Third-Party Links">
              <p>This website may contain links to third-party websites (e.g., maps or external resources). Edumed Trust:</p>
              <ul>
                <li>Does not control these websites</li>
                <li>Is not responsible for their content or privacy practices</li>
              </ul>
              <p>Users access third-party sites at their own risk.</p>
            </Section>

            <Section index={8} title="9. Limitation of Liability">
              <p>This website is provided on an "as is" and "as available" basis. Edumed Trust does not guarantee:</p>
              <ul>
                <li>Accuracy of information</li>
                <li>Continuous availability</li>
                <li>Error-free operation</li>
              </ul>
              <p>We are not liable for indirect or consequential damages, loss of data or opportunity, or issues
                arising from use of this website.</p>
            </Section>

            <Section index={9} title="10. Safeguarding & Children">
              <p>Edumed Trust is committed to protecting children involved in its programs.</p>
              <ul>
                <li>All student-related data is handled with care</li>
                <li>Parental/guardian consent is required</li>
                <li>Safeguarding practices are applied in line with our Child Protection Policy</li>
              </ul>
            </Section>

            <Section index={10} title="11. Privacy">
              <p>
                Your use of this website is also governed by our{" "}
                <a href="/privacy-policy" className="text-primary hover:underline font-medium">Privacy Policy</a>,
                which explains how we collect, use, and protect your personal data.
              </p>
            </Section>

            <Section index={11} title="12. Modifications to Terms">
              <p>
                Edumed Trust reserves the right to update or modify these Terms at any time. Changes will be posted
                on this page. Continued use of the website means you accept the updated Terms.
              </p>
            </Section>

            <Section index={12} title="13. Governing Law">
              <p>
                These Terms are governed by the laws of the Republic of Kenya. Any disputes shall be resolved under
                the jurisdiction of Kenyan courts.
              </p>
            </Section>

            <Section index={13} title="14. Contact Information">
              <p>For any questions regarding these Terms:</p>
              <div className="space-y-3 mt-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span>info@edumedtrust.org</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <span>+254 710 551119 / +254 788 551119 / +254 20 2300277</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>P.O. Box 1025, 00502 Karen, Nairobi, Kenya</span>
                </div>
              </div>
            </Section>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Section({ title, children, index }: { title: string; children: React.ReactNode; index: number }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={sectionVariants}
      className="bg-card rounded-xl border border-border p-6 md:p-8"
    >
      <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{title}</h3>
      <div className="text-muted-foreground leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_p]:mb-3 last:[&_p]:mb-0 [&_li]:text-muted-foreground">
        {children}
      </div>
    </motion.div>
  );
}
