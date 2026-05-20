import {
  Cookie,
  Shield,
  Settings,
  BarChart3,
  Sparkles,
  Megaphone,
  ToggleLeft,
  Globe,
  RefreshCw,
  Mail,
} from 'lucide-react'

import Footer from './footer'

const cookieTable = [
  { name: '__session', purpose: 'Maintains your logged-in session and authentication state.', duration: 'Session', category: 'Necessary', color: 'bg-green-500' },
  { name: 'sb-access-token', purpose: 'Supabase authentication token for secure API access.', duration: '1 hour', category: 'Necessary', color: 'bg-green-500' },
  { name: 'sb-refresh-token', purpose: 'Refreshes your authentication session automatically.', duration: '7 days', category: 'Necessary', color: 'bg-green-500' },
  { name: 'cookie_consent', purpose: 'Stores your cookie preferences and consent choices.', duration: '1 year', category: 'Necessary', color: 'bg-green-500' },
  { name: 'game_store', purpose: 'Saves game progress, scores and achievements locally.', duration: 'Persistent', category: 'Functional', color: 'bg-purple-500' },
  { name: 'guest_mode', purpose: 'Manages guest user sessions without requiring registration.', duration: 'Session', category: 'Functional', color: 'bg-purple-500' },
  { name: '_ga / _ga_*', purpose: 'Google Analytics \u2014 distinguishes unique users and tracks visits.', duration: '2 years', category: 'Analytical', color: 'bg-blue-500' },
  { name: '_gid', purpose: 'Google Analytics \u2014 distinguishes users for 24-hour reporting.', duration: '24 hours', category: 'Analytical', color: 'bg-blue-500' },
]

const sections = [
  {
    id: 'what-are-cookies',
    icon: Cookie,
    title: 'What Are Cookies?',
    gradient: 'from-blue-500 to-cyan-500',
    content: (
      <>
        <p>
          Cookies are small text files that are stored on your device (computer,
          tablet or mobile phone) when you visit a website. They are widely used
          to make websites work more efficiently, to remember your preferences
          and to provide useful information to site owners.
        </p>
        <p>
          Cookies may be set by the website you are visiting
          ("first‑party cookies") or by third parties whose services
          appear on the page ("third‑party cookies"). They can be
          "session" cookies, which are deleted when you close your
          browser, or "persistent" cookies, which remain on your
          device for a set period or until you delete them.
        </p>
      </>
    ),
  },
  {
    id: 'how-we-use',
    icon: Sparkles,
    title: 'How We Use Cookies',
    gradient: 'from-blue-500 to-indigo-500',
    content: (
      <>
        <p>
          Kenbright Actuarial Hub uses cookies and similar technologies to:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            'Keep you signed in and maintain your authenticated session securely.',
            'Remember your game progress, scores and achievements locally so you can resume where you left off.',
            'Store your cookie consent preferences so we do not ask you repeatedly.',
            'Analyse how visitors use the platform so we can improve the learning experience.',
            'Support guest mode sessions without requiring registration.',
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: 'cookie-categories',
    icon: Settings,
    title: 'Cookie Categories',
    gradient: 'from-violet-500 to-purple-500',
    content: (
      <>
        <p>
          We classify the cookies used on this platform into the following
          categories:
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            {
              type: 'Necessary',
              icon: Shield,
              desc: 'Essential for the platform to function. These cookies enable core features such as authentication, session management and security. They cannot be disabled.',
              color: 'bg-green-500',
              border: 'border-green-100 dark:border-green-900/40',
            },
            {
              type: 'Functional',
              icon: Settings,
              desc: 'Enable enhanced functionality and personalisation, such as saving game progress locally and managing guest sessions.',
              color: 'bg-purple-500',
              border: 'border-purple-100 dark:border-purple-900/40',
            },
            {
              type: 'Analytical',
              icon: BarChart3,
              desc: 'Help us understand how visitors interact with the platform by collecting anonymous usage data, allowing us to improve content and performance.',
              color: 'bg-blue-500',
              border: 'border-blue-100 dark:border-blue-900/40',
            },
            {
              type: 'Marketing',
              icon: Megaphone,
              desc: 'Used to deliver relevant advertisements and track the effectiveness of marketing campaigns. We currently do not use marketing cookies.',
              color: 'bg-amber-500',
              border: 'border-amber-100 dark:border-amber-900/40',
            },
          ].map((item) => (
            <div
              key={item.type}
              className={`flex items-start gap-3 rounded-xl border ${item.border} bg-white p-4 shadow-sm dark:bg-gray-800/50`}
            >
              <span
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.color} shadow-sm`}
              >
                <item.icon className="h-4 w-4 text-white" />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {item.type}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
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
    id: 'cookies-we-use',
    icon: BarChart3,
    title: 'Cookies We Use',
    gradient: 'from-cyan-500 to-blue-500',
    content: (
      <>
        <p>
          The table below lists the specific cookies used on Kenbright Actuarial
          Hub, along with their purpose, duration and category.
        </p>
        <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/80">
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">
                    Cookie
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">
                    Purpose
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">
                    Duration
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">
                    Category
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {cookieTable.map((cookie) => (
                  <tr
                    key={cookie.name}
                    className="transition-colors hover:bg-gray-50/60 dark:hover:bg-gray-800/40"
                  >
                    <td className="px-4 py-3">
                      <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                        {cookie.name}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {cookie.purpose}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-400">
                      {cookie.duration}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className={`h-2 w-2 rounded-full ${cookie.color}`}
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          {cookie.category}
                        </span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'managing-cookies',
    icon: ToggleLeft,
    title: 'Managing Your Cookies',
    gradient: 'from-emerald-500 to-teal-500',
    content: (
      <>
        <p>
          You can control and manage cookies in several ways. Please note that
          removing or blocking cookies may affect your user experience and some
          features of the platform may not function properly.
        </p>
        <div className="mt-4 space-y-3">
          {[
            {
              heading: 'Browser Settings',
              text: 'Most browsers allow you to view, manage, delete and block cookies. You can configure your browser to reject all cookies or to notify you when a cookie is set. Refer to your browser\u2019s help menu for instructions.',
            },
            {
              heading: 'Cookie Consent Banner',
              text: 'When you first visit the platform, we display a cookie consent banner that allows you to accept or customise which categories of cookies you permit.',
            },
            {
              heading: 'Opt‑Out of Analytics',
              text: 'You can opt out of Google Analytics tracking by installing the Google Analytics Opt‑Out Browser Add‑on, available at tools.google.com/dlpage/gaoptout.',
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
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'third-party',
    icon: Globe,
    title: 'Third‑Party Cookies',
    gradient: 'from-rose-500 to-pink-500',
    content: (
      <p>
        Some cookies on our platform are placed by third‑party services that
        appear on our pages — for example, Google Analytics. We do not control
        these cookies and recommend you review the respective third‑party privacy
        policies for more information on how they use cookies and the data they
        collect.
      </p>
    ),
  },
  {
    id: 'updates',
    icon: RefreshCw,
    title: 'Changes to This Cookie Policy',
    gradient: 'from-slate-500 to-gray-600',
    content: (
      <p>
        We may update this Cookie Policy from time to time to reflect changes in
        the cookies we use or in applicable legal requirements. When we make
        changes, we will update the "last updated" date at the top
        of this page. We encourage you to review this policy periodically to
        stay informed.
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
          If you have any questions about our use of cookies or this Cookie
          Policy, please contact us:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 dark:border-blue-900/40 dark:from-blue-950/40 dark:to-indigo-950/40">
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">
              Platform Operator
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              Kenbright Holdings Limited
              <br />
              ACK Garden House, Ground Floor
              <br />
              1st Ngong Avenue, Nairobi, Kenya
            </p>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
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
          <div className="rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50 to-fuchsia-50 p-5 dark:border-purple-900/40 dark:from-purple-950/40 dark:to-fuchsia-950/40">
            <p className="text-sm font-semibold text-purple-800 dark:text-purple-300">
              Data Protection
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              For data protection and privacy enquiries, including requests to
              exercise your rights under Kenya&rsquo;s Data Protection Act, 2019.
            </p>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              <strong>Email:</strong>{' '}
              <a
                href="mailto:info@kenbright.africa"
                className="text-purple-600 hover:underline dark:text-purple-400"
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

export default function CookiesPolicyPage() {
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
            <Cookie className="h-4 w-4" />
            Transparency &amp; Control
          </div>
          <h1 className="mt-6 pb-10 bg-gradient-to-r from-brand-dark via-brand-light to-blue-800 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl dark:from-white dark:via-brand-soft dark:to-brand-accent">
            Cookie Policy
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-700 dark:text-brand-soft/90">
            We use cookies and similar technologies to provide a secure,
            personalised experience on Kenbright Actuarial Hub. This policy
            explains what cookies we use, why we use them and how you can manage
            your preferences.
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