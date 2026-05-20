import {
  FileText,
  UserCheck,
  ShieldCheck,
  BookOpen,
  CreditCard,
  Ban,
  AlertTriangle,
  Scale,
  Globe,
  RefreshCw,
  Gavel,
  Mail,
} from 'lucide-react'

import Footer from './footer'

const sections = [
  {
    id: 'acceptance',
    icon: UserCheck,
    title: 'Acceptance of Terms',
    gradient: 'from-blue-500 to-indigo-500',
    content: (
      <>
        <p>
          Welcome to Kenbright Actuarial Hub ("the Platform"), a
          gamified learning platform operated by Kenbright Holdings Limited
          ("Kenbright", "we", "us" or
          "our"). By accessing or using the Platform, you agree to
          be bound by these Terms of Service ("Terms"). If you do
          not agree, please do not use the Platform.
        </p>
        <p>
          These Terms constitute a legally binding agreement between you and
          Kenbright Holdings Limited, a company registered in Kenya with offices
          at ACK Garden House, Ground Floor, 1st Ngong Avenue, Nairobi, Kenya.
        </p>
      </>
    ),
  },
  {
    id: 'eligibility',
    icon: ShieldCheck,
    title: 'Eligibility',
    gradient: 'from-emerald-500 to-teal-500',
    content: (
      <>
        <p>To use the Platform, you must:</p>
        <ul className="mt-3 space-y-2">
          {[
            'Be at least 18 years of age.',
            'Have the legal capacity to enter into a binding agreement.',
            'Provide accurate, complete and current registration information.',
            'Not be barred from accessing the Platform under the laws of Kenya or any other applicable jurisdiction.',
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          If you are using the Platform on behalf of an organisation, you
          represent and warrant that you have authority to bind that organisation
          to these Terms.
        </p>
      </>
    ),
  },
  {
    id: 'accounts',
    icon: BookOpen,
    title: 'Accounts & Registration',
    gradient: 'from-violet-500 to-purple-500',
    content: (
      <>
        <p>
          Certain features of the Platform require you to create an account. You
          agree to:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            'Provide truthful and accurate information during registration.',
            'Keep your login credentials confidential and not share your account with others.',
            'Notify us immediately if you suspect unauthorised access to your account.',
            'Accept responsibility for all activities that occur under your account.',
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          We reserve the right to suspend or terminate accounts that violate
          these Terms, contain false information, or are used for fraudulent
          purposes.
        </p>
      </>
    ),
  },
  {
    id: 'platform-use',
    icon: FileText,
    title: 'Use of the Platform',
    gradient: 'from-cyan-500 to-blue-500',
    content: (
      <>
        <h4 className="mb-3 text-base font-semibold text-gray-800 dark:text-gray-200">
          Permitted Use
        </h4>
        <p>
          The Platform is provided for educational and professional development
          purposes related to IFRS 17 insurance accounting standards. You may use
          it to:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            'Complete learning modules and quizzes on IFRS 17 topics.',
            'Track your learning progress and earn achievements.',
            'Participate in tournaments and leaderboards.',
            'Obtain certificates of completion where applicable.',
            'Access AI‑powered tutoring and explanations.',
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <h4 className="mb-3 mt-6 text-base font-semibold text-gray-800 dark:text-gray-200">
          Guest Access
        </h4>
        <p>
          Limited functionality may be available without an account
          ("Guest Mode"). Guest progress is stored locally and may
          be lost if your browser data is cleared. We encourage you to register
          for a full account to preserve your progress across devices.
        </p>
      </>
    ),
  },
  {
    id: 'prohibited',
    icon: Ban,
    title: 'Prohibited Conduct',
    gradient: 'from-red-500 to-rose-500',
    content: (
      <>
        <p>You agree not to:</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            {
              heading: 'Misuse the Platform',
              desc: 'Use it for any purpose other than personal or organisational learning, or attempt to reverse‑engineer, decompile or disassemble the Platform.',
            },
            {
              heading: 'Cheat or Manipulate',
              desc: 'Manipulate scores, leaderboard rankings, achievement data or tournament results through automated means or exploits.',
            },
            {
              heading: 'Share Credentials',
              desc: 'Share, sell or transfer your account credentials to any third party, or allow multiple individuals to use a single account.',
            },
            {
              heading: 'Distribute Content',
              desc: 'Copy, reproduce, distribute or create derivative works from Platform content, including questions, explanations and AI tutor responses.',
            },
            {
              heading: 'Disrupt Services',
              desc: 'Interfere with the operation of the Platform, including through denial‑of‑service attacks, injection of malicious code or excessive automated requests.',
            },
            {
              heading: 'Violate Laws',
              desc: 'Use the Platform in a manner that violates any applicable law, regulation or third‑party right, including intellectual property rights.',
            },
          ].map((item) => (
            <div
              key={item.heading}
              className="rounded-xl border border-red-100 bg-red-50/40 p-4 dark:border-red-900/30 dark:bg-red-950/20"
            >
              <p className="text-sm font-semibold text-red-800 dark:text-red-300">
                {item.heading}
              </p>
              <p className="mt-1 text-sm text-red-700/70 dark:text-red-400/70">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'subscriptions',
    icon: CreditCard,
    title: 'Subscriptions & Payments',
    gradient: 'from-amber-500 to-orange-500',
    content: (
      <>
        <p>
          The Platform may offer free and paid subscription tiers. Paid
          subscriptions may be offered through individual purchases or
          organisational licences. Where applicable:
        </p>
        <ol className="mt-4 space-y-4">
          {[
            {
              num: '01',
              heading: 'Pricing',
              text: 'All prices are displayed in Kenyan Shillings (KES) or US Dollars (USD) and are inclusive of applicable taxes unless otherwise stated.',
            },
            {
              num: '02',
              heading: 'Payment',
              text: 'Payments are processed through secure third‑party payment providers. We do not store your full payment card details on our servers.',
            },
            {
              num: '03',
              heading: 'Renewals',
              text: 'Subscriptions may auto‑renew at the end of each billing cycle unless you cancel before the renewal date.',
            },
            {
              num: '04',
              heading: 'Refunds',
              text: 'Refund requests may be considered on a case‑by‑case basis within 14 days of purchase. Completed modules or certificates cannot be refunded.',
            },
            {
              num: '05',
              heading: 'Organisational Licences',
              text: 'Organisations purchasing bulk licences are subject to a separate licence agreement that may include additional terms.',
            },
          ].map((item) => (
            <li key={item.num} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/10 to-orange-500/10 text-xs font-bold text-amber-600 dark:from-amber-400/10 dark:to-orange-400/10 dark:text-amber-400">
                {item.num}
              </span>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {item.heading}
                </p>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  {item.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </>
    ),
  },
  {
    id: 'intellectual-property',
    icon: Scale,
    title: 'Intellectual Property',
    gradient: 'from-indigo-500 to-blue-600',
    content: (
      <>
        <p>
          All content on the Platform — including but not limited to text,
          graphics, logos, icons, images, audio, video, software, question
          databases, explanations, AI tutor outputs, certificates and course
          materials — is owned by or licensed to Kenbright Holdings Limited and
          is protected by copyright, trademark and other intellectual property
          laws.
        </p>
        <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4 dark:border-indigo-900/40 dark:bg-indigo-950/30">
          <p className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
            Limited Licence
          </p>
          <p className="mt-1 text-sm text-indigo-700/80 dark:text-indigo-400/80">
            We grant you a limited, non‑exclusive, non‑transferable,
            revocable licence to access and use the Platform for its intended
            purpose. This licence does not include the right to reproduce,
            distribute, modify or commercially exploit any content without prior
            written consent from Kenbright.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'certificates',
    icon: ShieldCheck,
    title: 'Certificates & Achievements',
    gradient: 'from-emerald-500 to-green-600',
    content: (
      <>
        <p>
          Certificates issued through the Platform represent completion of
          specific learning modules and achievements. They are:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            'Issued at the sole discretion of Kenbright and may be revoked for cause.',
            'Not professional certifications, accreditations or guarantees of competency.',
            'Provided as evidence of participation in the Kenbright Actuarial Hub learning programme.',
            'Subject to verification through the Platform\u2019s certificate verification system.',
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Kenbright does not guarantee that certificates will be recognised by
          any particular employer, professional body or regulatory authority.
        </p>
      </>
    ),
  },
  {
    id: 'disclaimers',
    icon: AlertTriangle,
    title: 'Disclaimers & Limitation of Liability',
    gradient: 'from-yellow-500 to-amber-500',
    content: (
      <>
        <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-5 dark:border-amber-900/40 dark:bg-amber-950/30">
          <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-300">
            "As Is" Provision
          </h4>
          <p className="mt-2 text-sm text-amber-700/80 dark:text-amber-400/80">
            The Platform is provided "as is" and "as
            available" without warranties of any kind, whether express or
            implied, including but not limited to warranties of
            merchantability, fitness for a particular purpose or
            non‑infringement.
          </p>
        </div>
        <div className="mt-4 space-y-3">
          {[
            'Educational content on the Platform is for learning purposes only and does not constitute professional actuarial, accounting or legal advice.',
            'AI tutor responses are generated by artificial intelligence and may contain inaccuracies. They should not be relied upon as definitive interpretations of IFRS 17 standards.',
            'We do not guarantee uninterrupted, error‑free or secure access to the Platform.',
            'To the maximum extent permitted by Kenyan law, Kenbright shall not be liable for any indirect, incidental, special, consequential or punitive damages arising from your use of the Platform.',
            'Our total liability for any claim arising under these Terms shall not exceed the amount you paid to us in the 12 months preceding the claim.',
          ].map((text, i) => (
            <div
              key={i}
              className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'indemnification',
    icon: ShieldCheck,
    title: 'Indemnification',
    gradient: 'from-slate-500 to-gray-600',
    content: (
      <p>
        You agree to indemnify, defend and hold harmless Kenbright Holdings
        Limited, its directors, officers, employees, agents and affiliates from
        and against any claims, liabilities, damages, losses and expenses
        (including reasonable legal fees) arising out of or in any way connected
        with your use of the Platform, your violation of these Terms, or your
        infringement of any third‑party rights.
      </p>
    ),
  },
  {
    id: 'privacy',
    icon: ShieldCheck,
    title: 'Privacy & Data Protection',
    gradient: 'from-fuchsia-500 to-purple-600',
    content: (
      <>
        <p>
          Your use of the Platform is also governed by our{' '}
          <a
            href="/privacy-policy"
            className="font-medium text-purple-600 hover:text-purple-700 underline decoration-purple-300 underline-offset-2 dark:text-purple-400 dark:hover:text-purple-300"
          >
            Privacy Policy
          </a>
          , which explains how we collect, use, store and protect your personal
          data. By using the Platform, you consent to the practices described in
          the Privacy Policy.
        </p>
        <p className="mt-3">
          We process personal data in accordance with Kenya&rsquo;s Data
          Protection Act, 2019 and related regulations.
        </p>
      </>
    ),
  },
  {
    id: 'termination',
    icon: Ban,
    title: 'Termination',
    gradient: 'from-rose-500 to-pink-500',
    content: (
      <>
        <p>
          We may suspend or terminate your access to the Platform at any time,
          with or without notice, for any reason including:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            'Violation of these Terms or any applicable laws.',
            'Fraudulent, abusive or otherwise harmful conduct.',
            'Prolonged inactivity (subject to reasonable notice).',
            'Discontinuance of the Platform or any part thereof.',
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          Upon termination, your right to use the Platform ceases immediately.
          Provisions relating to intellectual property, disclaimers,
          limitation of liability and governing law shall survive termination.
        </p>
      </>
    ),
  },
  {
    id: 'governing-law',
    icon: Gavel,
    title: 'Governing Law & Dispute Resolution',
    gradient: 'from-blue-600 to-indigo-600',
    content: (
      <>
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of the Republic of Kenya, without regard to its conflict of law
          provisions.
        </p>
        <p className="mt-3">
          Any dispute arising out of or in connection with these Terms shall
          first be submitted to mediation in accordance with the rules of the
          Nairobi Centre for International Arbitration (NCIA). If the dispute
          cannot be resolved through mediation within 30 days, it shall be
          submitted to the exclusive jurisdiction of the courts of Kenya.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    icon: RefreshCw,
    title: 'Changes to These Terms',
    gradient: 'from-teal-500 to-cyan-500',
    content: (
      <p>
        We may update these Terms from time to time. When we make material
        changes, we will notify you by updating the "Last Updated"
        date and, where appropriate, through a notice on the Platform or via
        email. Your continued use of the Platform after the updated Terms take
        effect constitutes your acceptance of the changes.
      </p>
    ),
  },
  {
    id: 'general',
    icon: Globe,
    title: 'General Provisions',
    gradient: 'from-gray-500 to-slate-600',
    content: (
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          {
            heading: 'Entire Agreement',
            desc: 'These Terms, together with the Privacy Policy and any separate licence agreements, constitute the entire agreement between you and Kenbright regarding the Platform.',
          },
          {
            heading: 'Severability',
            desc: 'If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.',
          },
          {
            heading: 'No Waiver',
            desc: 'Our failure to enforce any right or provision of these Terms shall not constitute a waiver of that right or provision.',
          },
          {
            heading: 'Assignment',
            desc: 'You may not assign or transfer these Terms without our prior written consent. We may assign our rights and obligations without restriction.',
          },
        ].map((item) => (
          <div
            key={item.heading}
            className="rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-4 shadow-sm dark:border-gray-800 dark:from-gray-800/50 dark:to-gray-900/50"
          >
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {item.heading}
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
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
          If you have any questions about these Terms of Service, please contact
          us:
        </p>
        <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 dark:border-blue-900/40 dark:from-blue-950/40 dark:to-indigo-950/40">
          <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">
            Kenbright Holdings Limited
          </p>
          <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            ACK Garden House, Ground Floor
            <br />
            1st Ngong Avenue, Nairobi, Kenya
          </p>
          <div className="mt-3 flex flex-wrap gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Tel:</strong>{' '}
              <a
                href="tel:+254709783000"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                +254 709 783 000
              </a>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Email:</strong>{' '}
              <a
                href="mailto:info@kenbright.africa"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                info@kenbright.africa
              </a>
            </p>
          </div>
        </div>
      </>
    ),
  },
]

export default function TermsOfServicePage() {
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
            <Gavel className="h-4 w-4" />
            Legal Agreement
          </div>
          <h1 className="mt-6 pb-10 bg-gradient-to-r from-brand-dark via-brand-light to-blue-800 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl dark:from-white dark:via-brand-soft dark:to-brand-accent">
            Terms of Service
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-700 dark:text-brand-soft/90">
            Please read these terms carefully before using the Kenbright Actuarial
            Hub platform. By accessing or using our services, you agree to be
            bound by these terms.
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
