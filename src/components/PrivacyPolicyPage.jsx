import {
  Shield,
  Eye,
  Database,
  Share2,
  Globe,
  Clock,
  Lock,
  Scale,
  Cookie,
  Baby,
  RefreshCw,
  Mail,
} from 'lucide-react'

import Footer from './footer'

const sections = [
  {
    id: 'introduction',
    icon: Shield,
    title: 'Introduction',
    gradient: 'from-blue-500 to-indigo-500',
    content: (
      <>
        <p>
          Kenbright Holdings Limited ("Kenbright", "we",
          "us" or "our") provides actuarial,
          re‑insurance, pension administration, health and life insurance,
          financial consulting and related services in Kenya and the East African
          region. We recognise that the security of our customers&rsquo; personal
          information is critical.
        </p>
        <p>
          The purpose of this Privacy Policy is to explain how we collect, use,
          store and protect personal data when you visit our website at{' '}
          <a
            href="https://kenbright.co.ke"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-light hover:text-brand-mid underline decoration-brand-light/30 underline-offset-2 dark:text-brand-accent dark:hover:text-cyan-300 dark:decoration-brand-accent/30 transition-colors"
          >
            kenbright.co.ke
          </a>{' '}
          or when you interact with us through our online forms, email or
          telephone. The policy also outlines your rights under Kenya&rsquo;s
          Data Protection Act, 2019 and related regulations.
        </p>
        <p>
          This Privacy Policy applies to the personal data that we collect from
          you when you use our website, request a quote or otherwise interact
          with Kenbright online. It does not apply to third‑party websites that
          may be linked from our site, and we encourage you to review the privacy
          notices of those providers separately.
        </p>
      </>
    ),
  },
  {
    id: 'data-collection',
    icon: Database,
    title: 'Personal Data We Collect',
    gradient: 'from-violet-500 to-purple-500',
    content: (
      <>
        <h4 className="mb-3 text-base font-semibold text-brand-dark dark:text-brand-soft">
          Information You Provide Directly
        </h4>
        <p>
          We collect personal data when you voluntarily provide it via forms on
          our website or when contacting us by email or phone. Examples include:
        </p>
        <ul className="mt-3 space-y-2">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
            <span>
              <strong className="text-brand-dark dark:text-white">Identity and contact details:</strong> first and last name,
              email address, phone number and postal address. Our contact form
              asks for your first name, last name, email address, phone number
              and a message explaining your enquiry.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
            <span>
              <strong className="text-brand-dark dark:text-white">Information about requested services:</strong> when you ask
              for an insurance quote (e.g., car, health or travel insurance) or a
              pension administration service, we may ask for details relevant to
              the product, such as vehicle information, age, employment status,
              cover amount or other underwriting information.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
            <span>
              <strong className="text-brand-dark dark:text-white">Other correspondence:</strong> any additional information
              you provide when contacting us, for example feedback or questions.
            </span>
          </li>
        </ul>

        <h4 className="mb-3 mt-6 text-base font-semibold text-brand-dark dark:text-brand-soft">
          Information We Collect Automatically
        </h4>
        <p>
          When you visit our website, we may automatically collect certain
          technical information through cookies and similar technologies. This
          may include your IP address, browser type, operating system, device
          identifiers, the pages you visit and the time spent on them. Under
          Kenya&rsquo;s Data Protection Act (DPA) the use of cookies or similar
          technologies that process personal data requires explicit, informed
          and freely given consent.
        </p>
      </>
    ),
  },
  {
    id: 'data-usage',
    icon: Eye,
    title: 'How We Use Your Personal Data',
    gradient: 'from-cyan-500 to-blue-500',
    content: (
      <>
        <p>We process personal data only for legitimate purposes, including:</p>
        <ol className="mt-4 space-y-4">
          {[
            {
              num: '01',
              heading: 'Responding to inquiries and providing services',
              text: 'We use your contact details and any information you provide to respond to your queries, supply quotes and deliver our insurance, pension or actuarial services.',
            },
            {
              num: '02',
              heading: 'Customer communication and support',
              text: 'We may send you updates about your application or policy, important notices (for example, renewal reminders) or respond to complaints.',
            },
            {
              num: '03',
              heading: 'Marketing',
              text: 'With your consent, we may send you newsletters or information about our products, promotions or events. You can opt out of marketing communications at any time.',
            },
            {
              num: '04',
              heading: 'Compliance with legal obligations',
              text: 'The DPA requires us to process personal data lawfully, fairly and transparently and to observe data subject rights. We may use or disclose your data to meet obligations under insurance, pension, taxation and anti‑money laundering laws, or to comply with a court order or regulatory request.',
            },
            {
              num: '05',
              heading: 'Improving our services and security',
              text: 'We analyse website usage data to improve the user experience and to detect and prevent fraud or cyber‑security threats.',
            },
          ].map((item) => (
            <li key={item.num} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-xs font-bold text-brand-light dark:bg-brand-accent/20 dark:text-brand-accent">
                {item.num}
              </span>
              <div>
                <p className="font-semibold text-brand-dark dark:text-white">
                  {item.heading}
                </p>
                <p className="mt-1 text-slate-600 dark:text-slate-300">
                  {item.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-6 rounded-xl border border-brand-light/20 bg-brand-soft/40 p-4 dark:border-brand-accent/30 dark:bg-brand-light/20">
          <p className="text-sm font-semibold text-brand-dark dark:text-brand-accent">
            Legal Basis for Processing
          </p>
          <p className="mt-1 text-sm text-brand-mid dark:text-brand-soft">
            Kenya&rsquo;s DPA allows processing of personal data where the data
            subject has given consent, where processing is necessary for the
            performance of a contract, to comply with a legal obligation, or
            where the data controller has a legitimate interest. Depending on the
            context, we rely on one or more of these legal grounds when
            processing your data.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'data-sharing',
    icon: Share2,
    title: 'Sharing Your Personal Data',
    gradient: 'from-emerald-500 to-teal-500',
    content: (
      <>
        <p className="mb-4 font-semibold text-emerald-700 dark:text-emerald-400">
          We do not sell your personal information.
        </p>
        <p>We may share data with:</p>
        <ul className="mt-3 space-y-2">
          {[
            'Kenbright group companies and affiliates who require the information to provide the requested service, subject to confidentiality obligations.',
            'Service providers and professional advisers such as IT support, hosting providers, payment processors, actuaries, reinsurers and auditors. These parties act as data processors and must implement appropriate technical and organisational security measures.',
            'Insurance underwriters or brokers and other third parties to obtain insurance quotations or cover.',
            'Regulators and legal authorities where we are legally obliged to disclose data, such as the Insurance Regulatory Authority or the Office of the Data Protection Commissioner (ODPC).',
            'Third parties in connection with corporate transactions, such as mergers or transfers of assets, where the personal data is relevant and transferred subject to confidentiality.',
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          Whenever personal data is shared with third parties, we require them to
          keep it secure and to use it only for the purposes for which it was
          provided.
        </p>
      </>
    ),
  },
  {
    id: 'cross-border',
    icon: Globe,
    title: 'Cross‑Border Transfers',
    gradient: 'from-amber-500 to-orange-500',
    content: (
      <p>
        As a regional organisation, Kenbright may transfer personal data to
        countries outside Kenya — for example, to our reinsurers or service
        providers. Before transferring data internationally, we ensure that
        adequate safeguards are in place, such as standard contractual clauses or
        other mechanisms recognised by the DPA, and that processing remains
        subject to this Privacy Policy.
      </p>
    ),
  },
  {
    id: 'data-retention',
    icon: Clock,
    title: 'Data Retention',
    gradient: 'from-rose-500 to-pink-500',
    content: (
      <p>
        We retain personal data only for as long as necessary to fulfil the
        purpose for which it was collected, to comply with legal or regulatory
        obligations, to resolve disputes and to enforce our agreements. Factors
        determining retention periods include statutory requirements (e.g., seven
        years for insurance records), regulatory guidance and the nature of the
        data. When data is no longer required, we securely delete or anonymise
        it.
      </p>
    ),
  },
  {
    id: 'data-security',
    icon: Lock,
    title: 'Data Security',
    gradient: 'from-indigo-500 to-blue-600',
    content: (
      <p>
        Kenbright implements technical and organisational measures to protect your
        data against loss, misuse, unauthorised access, disclosure or alteration.
        Measures may include encryption, access controls, secure servers and
        regular staff training. However, no method of transmission over the
        internet or electronic storage is completely secure; therefore we cannot
        guarantee absolute security, but we follow recognised industry standards.
      </p>
    ),
  },
  {
    id: 'your-rights',
    icon: Scale,
    title: "Your Rights Under Kenya's Data Protection Act",
    gradient: 'from-fuchsia-500 to-purple-600',
    content: (
      <>
        <p>
          Kenya&rsquo;s Data Protection Act, 2019 gives individuals a range of
          rights over their personal data:
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            {
              right: 'Right of Access',
              desc: 'Request a copy of personal data we hold about you.',
            },
            {
              right: 'Right to Be Informed',
              desc: 'Know how your data is collected and used.',
            },
            {
              right: 'Right to Correction',
              desc: 'Ask us to correct inaccurate or incomplete personal information.',
            },
            {
              right: 'Right to Deletion',
              desc: 'Request deletion of your data when it is no longer needed.',
            },
            {
              right: 'Right to Object',
              desc: 'Object to or restrict the processing of your data, including direct marketing.',
            },
            {
              right: 'Right to Data Portability',
              desc: 'Ask for your data in a structured, commonly used format.',
            },
            {
              right: 'Right re: Automated Decisions',
              desc: 'Request that decisions are not based solely on automated processing.',
            },
            {
              right: 'Right to Withdraw Consent',
              desc: 'Withdraw your consent at any time for specific purposes.',
            },
          ].map((item) => (
            <div
              key={item.right}
              className="rounded-xl border border-brand-soft/50 bg-gradient-to-br from-white to-slate-50 p-4 shadow-sm dark:border-brand-light/30 dark:from-brand-mid/50 dark:to-brand-dark/50"
            >
              <p className="text-sm font-semibold text-brand-dark dark:text-brand-soft">
                {item.right}
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
          You may also lodge a complaint with the Office of the Data Protection
          Commissioner if you believe your rights have been violated, or seek
          judicial redress.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    icon: Cookie,
    title: 'Cookie Use and Tracking Technologies',
    gradient: 'from-yellow-500 to-amber-500',
    content: (
      <>
        <p>
          Kenbright uses cookies and similar technologies to provide a better
          browsing experience, analyse website traffic and personalise content.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            {
              type: 'Necessary',
              desc: 'Required for the website to function — page navigation and secure areas.',
              color: 'bg-emerald-500',
            },
            {
              type: 'Analytical',
              desc: 'Help us understand how visitors interact with the site anonymously.',
              color: 'bg-blue-500',
            },
            {
              type: 'Functional',
              desc: 'Enable enhanced functionality and personalisation, such as remembering preferences.',
              color: 'bg-purple-500',
            },
            {
              type: 'Advertising',
              desc: 'Record your visit and pages visited to make advertising more relevant.',
              color: 'bg-amber-500',
            },
          ].map((item) => (
            <div
              key={item.type}
              className="flex items-start gap-3 rounded-lg border border-brand-soft/50 p-3 dark:border-brand-light/30 dark:bg-brand-mid/30"
            >
              <span
                className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${item.color}`}
              />
              <div>
                <p className="text-sm font-semibold text-brand-dark dark:text-brand-soft">
                  {item.type}
                </p>
                <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'children',
    icon: Baby,
    title: "Children's Privacy",
    gradient: 'from-pink-500 to-rose-500',
    content: (
      <p>
        Our services are aimed at adults and are not intended for children under
        the age of 18. We do not knowingly collect personal data from children.
        If you believe that a child has provided us with personal information,
        please contact us and we will delete the data.
      </p>
    ),
  },
  {
    id: 'changes',
    icon: RefreshCw,
    title: 'Changes to This Policy',
    gradient: 'from-slate-500 to-gray-600',
    content: (
      <p>
        We may update this Privacy Policy periodically to reflect changes in our
        practices, legal requirements or technological advances. The updated
        version will be posted on our website with a revised "last
        updated" date. We encourage you to review this Policy regularly to
        stay informed about how we protect your information.
      </p>
    ),
  },
  {
    id: 'contact',
    icon: Mail,
    title: 'Contact Us',
    gradient: 'from-blue-600 to-indigo-600',
    content: (
      <>
        <p className="mb-4">
          If you have any questions about this Privacy Policy or your personal
          data, or if you wish to exercise your rights, please contact us:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-brand-light/20 bg-gradient-to-br from-brand-soft/40 to-white p-5 dark:border-brand-light/40 dark:from-brand-mid/50 dark:to-brand-dark/50">
            <p className="text-sm font-semibold text-brand-dark dark:text-brand-accent">
              Data Controller
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Kenbright Holdings Limited
              <br />
              ACK Garden House, Ground Floor
              <br />
              1st Ngong Avenue, Nairobi, Kenya
            </p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              <strong>Tel:</strong>{' '}
              <a
                href="tel:+254709783000"
                className="font-medium text-brand-light hover:underline dark:text-brand-accent"
              >
                +254 709 783 000
              </a>
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <strong>Email:</strong>{' '}
              <a
                href="mailto:info@kenbright.africa"
                className="font-medium text-brand-light hover:underline dark:text-brand-accent"
              >
                info@kenbright.africa
              </a>
            </p>
          </div>
          <div className="rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white p-5 dark:border-purple-800/40 dark:from-purple-900/20 dark:to-brand-dark/50">
            <p className="text-sm font-semibold text-purple-800 dark:text-purple-300">
              Data Protection Commissioner
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Office of the Data Protection Commissioner (ODPC)
            </p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              <strong>Tel:</strong>{' '}
              <a
                href="tel:+254703722000"
                className="font-medium text-purple-600 hover:underline dark:text-purple-400"
              >
                +254 703 722 000
              </a>
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              If you are dissatisfied with how we handle your data, you may
              contact the ODPC directly.
            </p>
          </div>
        </div>
      </>
    ),
  },
]

export default function PrivacyPolicyPage() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="flex min-h-screen flex-col bg-blue-50/35 text-[var(--text-primary)] transition-colors duration-300 dark:bg-[var(--bg-primary)]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-500/45 via-blue-300/15 to-blue-700/35 pb-20 pt-24 sm:pb-28 sm:pt-32 dark:from-brand-dark dark:via-brand-mid dark:to-brand-light transition-colors duration-300">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-400/6 blur-3xl dark:bg-brand-accent/10" />
          <div className="absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-indigo-400/6 blur-3xl dark:bg-brand-light/30" />
          <div className="absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-purple-400/6 blur-3xl dark:bg-purple-500/10" />
        </div>

        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-light/20 bg-brand-soft/60 px-4 py-1.5 text-sm font-medium text-brand-dark backdrop-blur-sm dark:border-brand-accent/30 dark:bg-brand-accent/10 dark:text-brand-accent">
            <Shield className="h-4 w-4" />
            Your Data, Your Rights
          </div>
          <h1 className="mt-6 pb-10 bg-gradient-to-r from-brand-dark via-brand-light to-blue-800 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl dark:from-white dark:via-brand-soft dark:to-brand-accent">
            Privacy Policy
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-700 dark:text-brand-soft/90">
            At Kenbright, we are committed to protecting your personal data. This
            policy explains how we collect, use, store and safeguard your
            information in compliance with Kenya&rsquo;s Data Protection Act, 2019.
          </p>
          <p className="mt-4 text-sm font-medium text-slate-600 dark:text-brand-soft/50">
            Last updated: 14 January 2026
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="relative -mt-10 z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav className="rounded-2xl border border-blue-200/70 bg-blue-50/70 p-6 shadow-xl shadow-brand-dark/5 backdrop-blur-xl dark:border-brand-mid dark:bg-gray-700/60 dark:shadow-black/40">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-brand-soft/60">
            Contents
          </p>
          <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(s.id)
                }}
                className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-700 transition-colors hover:bg-brand-soft/40 hover:text-brand-dark dark:text-slate-300 dark:hover:bg-brand-light/40 dark:hover:text-white"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-slate-500 group-hover:text-brand-light dark:group-hover:text-brand-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {s.title}
              </a>
            ))}
          </div>
        </nav>
      </section>

      {/* Content */}
      <main className="relative mx-auto flex-1 max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {sections.map((section) => (
            <article
              key={section.id}
              id={section.id}
              className="scroll-mt-24 rounded-2xl border border-blue-200/70 bg-blue-50/65 p-6 shadow-sm transition-shadow hover:shadow-md dark:border-brand-mid dark:bg-gray-600/50 sm:p-8"
            >
              <div className="mb-5 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${section.gradient} shadow-md`}
                >
                  <section.icon className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-brand-dark dark:text-white sm:text-2xl">
                  {section.title}
                </h2>
              </div>
              <div className="prose prose-slate max-w-none text-[15px] leading-relaxed text-slate-700 dark:prose-invert dark:text-slate-300 [&_strong]:text-brand-dark dark:[&_strong]:text-white">
                {section.content}
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}