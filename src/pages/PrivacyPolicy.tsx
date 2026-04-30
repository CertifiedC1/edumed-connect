import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Shield, Heart, Cookie, Baby, Mail, Phone, MapPin } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5 },
  }),
};

export default function PrivacyPolicy() {
  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy — Edumed Trust</title>
        <meta name="description" content="Learn how Edumed Trust collects, uses, and protects your personal information. Read our privacy, donation, child protection, and cookie policies." />
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
            Privacy Policy
          </motion.h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            How we collect, use, and protect your personal information.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight max-w-4xl mx-auto space-y-16">
          {/* ===== PRIVACY POLICY ===== */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Privacy Policy</h2>
                <p className="text-sm text-muted-foreground">Effective Date: April 2026 · Last Updated: April 2026</p>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
              <PolicySection index={0} title="1. Introduction">
                <p>
                  Edumed Trust ("we", "our", "us") is committed to protecting your personal data and ensuring
                  transparency in how it is handled. We process personal data in accordance with applicable data
                  protection laws, including the <strong>Kenya Data Protection Act, 2019</strong>.
                </p>
              </PolicySection>

              <PolicySection index={1} title="2. Information We Collect">
                <p>We collect personal information that you voluntarily provide when you:</p>
                <ul>
                  <li>Submit a contact form (name, email, subject, message)</li>
                  <li>Apply for a scholarship (student and guardian details)</li>
                  <li>Make a donation or pledge (name, email, phone, amount)</li>
                  <li>Apply as a partner (name, organization, email, phone)</li>
                </ul>
              </PolicySection>

              <PolicySection index={2} title="3. How We Use Your Information">
                <p>We use your information to:</p>
                <ul>
                  <li>Process scholarship applications and donations</li>
                  <li>Communicate with applicants, donors, and partners</li>
                  <li>Send reminders or updates where applicable</li>
                  <li>Improve our programs and website</li>
                  <li>Meet legal and reporting requirements</li>
                </ul>
              </PolicySection>

              <PolicySection index={3} title="4. Data Protection & Security">
                <p>We implement appropriate security measures, including:</p>
                <ul>
                  <li>Encrypted connections (HTTPS/TLS)</li>
                  <li>Controlled access to sensitive data</li>
                  <li>Secure authentication systems</li>
                  <li>Protection against unauthorized access</li>
                </ul>
              </PolicySection>

              <PolicySection index={4} title="5. Data Sharing">
                <p>We do <strong>not</strong> sell or trade personal information. We may share data with:</p>
                <ul>
                  <li>Authorized Edumed Trust personnel</li>
                  <li>Trusted service providers (hosting, email systems)</li>
                  <li>Authorities when required by law</li>
                </ul>
              </PolicySection>

              <PolicySection index={5} title="6. Data Retention">
                <p>
                  We retain personal data only as long as necessary for operational, legal, and reporting purposes.
                </p>
              </PolicySection>

              <PolicySection index={6} title="7. Your Rights">
                <p>You have the right to:</p>
                <ul>
                  <li>Access your data</li>
                  <li>Request corrections</li>
                  <li>Request deletion (where applicable)</li>
                  <li>Withdraw consent</li>
                </ul>
              </PolicySection>

              <PolicySection index={7} title="8. Cookies">
                <p>
                  We use cookies to improve user experience and website functionality. See our Cookie Policy below
                  for details.
                </p>
              </PolicySection>

              <PolicySection index={8} title="9. Children's Privacy">
                <p>
                  Our programs involve minors. All data is collected with parental or guardian consent and handled
                  with strict confidentiality. See our Child Protection Policy below for more details.
                </p>
              </PolicySection>

              <PolicySection index={9} title="10. Data Controller">
                <p>Edumed Trust is responsible for your personal data.</p>
              </PolicySection>

              <PolicySection index={10} title="11. Contact">
                <ContactBlock />
              </PolicySection>
            </div>
          </div>

          <Separator />

          {/* ===== DONATION POLICY ===== */}
          <div id="donation-policy">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Donation Policy</h2>
                <p className="text-sm text-muted-foreground">Transparency and accountability in all donations</p>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
              <PolicySection index={0} title="1. Use of Donations">
                <p>All donations are used to support:</p>
                <ul>
                  <li>Student scholarships</li>
                  <li>Mentorship programs</li>
                  <li>Community support initiatives</li>
                </ul>
                <p>Funds are allocated based on organizational priorities and needs.</p>
              </PolicySection>

              <PolicySection index={1} title="2. Voluntary Contributions">
                <p>
                  All donations are voluntary. Donors are not obligated to continue contributions unless they
                  choose to.
                </p>
              </PolicySection>

              <PolicySection index={2} title="3. Refund Policy">
                <p>Donations are generally non-refundable. However, refund requests may be considered in exceptional cases, such as:</p>
                <ul>
                  <li>Duplicate transactions</li>
                  <li>Technical errors</li>
                </ul>
                <p>Requests must be made within a reasonable time.</p>
              </PolicySection>

              <PolicySection index={3} title="4. Donor Information">
                <p>
                  We respect donor privacy and do not share personal information without consent, except where
                  required by law.
                </p>
              </PolicySection>

              <PolicySection index={4} title="5. Transparency">
                <p>
                  Edumed Trust maintains proper records of donations and ensures funds are used responsibly and
                  ethically.
                </p>
              </PolicySection>
            </div>
          </div>

          <Separator />

          {/* ===== CHILD PROTECTION POLICY ===== */}
          <div id="child-protection">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Baby className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Child Protection Policy</h2>
                <p className="text-sm text-muted-foreground">Safeguarding the welfare of all children in our programs</p>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
              <PolicySection index={0} title="1. Commitment">
                <p>We ensure that all children are:</p>
                <ul>
                  <li>Treated with dignity and respect</li>
                  <li>Protected from abuse, exploitation, and harm</li>
                  <li>Supported in a safe and secure environment</li>
                </ul>
              </PolicySection>

              <PolicySection index={1} title="2. Data Protection for Minors">
                <ul>
                  <li>All student data is collected with parent/guardian consent</li>
                  <li>Information is stored securely</li>
                  <li>Access is restricted to authorized personnel only</li>
                </ul>
              </PolicySection>

              <PolicySection index={2} title="3. Safe Engagement">
                <p>All staff, volunteers, and partners must:</p>
                <ul>
                  <li>Act in the best interest of the child</li>
                  <li>Avoid inappropriate behavior or communication</li>
                  <li>Maintain professional boundaries</li>
                </ul>
              </PolicySection>

              <PolicySection index={3} title="4. Reporting Concerns">
                <p>
                  Any concerns regarding child safety must be reported immediately to Edumed Trust management.
                </p>
              </PolicySection>

              <PolicySection index={4} title="5. Media & Photography">
                <ul>
                  <li>Photos/videos of children are used only with consent</li>
                  <li>Content is used respectfully and responsibly</li>
                </ul>
              </PolicySection>

              <PolicySection index={5} title="6. Compliance">
                <p>We comply with relevant child protection and safeguarding laws and standards.</p>
              </PolicySection>
            </div>
          </div>

          <Separator />

          {/* ===== COOKIE POLICY ===== */}
          <div id="cookie-policy">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Cookie className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Cookie Policy</h2>
                <p className="text-sm text-muted-foreground">How we use cookies on our website</p>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
              <PolicySection index={0} title="What Are Cookies?">
                <p>
                  Cookies are small text files stored on your device when you visit a website. They help us
                  improve your browsing experience.
                </p>
              </PolicySection>

              <PolicySection index={1} title="Cookies We Use">
                <ul>
                  <li><strong>Essential cookies:</strong> Required for authentication and session management</li>
                  <li><strong>Functional cookies:</strong> Remember your preferences (e.g., cookie consent)</li>
                </ul>
                <p>We do <strong>not</strong> use third-party tracking or advertising cookies.</p>
              </PolicySection>

              <PolicySection index={2} title="Managing Cookies">
                <p>
                  You can manage or disable cookies through your browser settings. Note that disabling essential
                  cookies may affect website functionality.
                </p>
              </PolicySection>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function PolicySection({ title, children, index }: { title: string; children: React.ReactNode; index: number }) {
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

function ContactBlock() {
  return (
    <div className="space-y-3">
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
  );
}
