import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'
import { getShaThemeColors } from '../theme/sha'

const FacebookIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const LinkedinIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const InstagramIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const YoutubeIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
)

const XIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
)

const toFooterColors = (mode) => {
  const c = getShaThemeColors(mode)
  return {
    cyan: c.cyan,
    purple: c.purple,
    blue: c.blue,
    green: c.green,
    orange: c.orange,
    pink: c.purple,
    bg: c.bg,
    card: c.card,
    text: c.text,
    textSecondary: c.textSecondary,
    gray: c.muted,
    red: c.danger,
  }
}

const colors = {
  dark: toFooterColors('dark'),
  light: toFooterColors('light'),
}

function readDomTheme() {
  if (typeof document === 'undefined') return 'dark'
  const attr = document.documentElement.getAttribute('data-theme')
  if (attr === 'light' || attr === 'dark') return attr
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function useSyncedTheme(propTheme) {
  const [fromDom, setFromDom] = useState(readDomTheme)

  useEffect(() => {
    if (propTheme !== undefined) return
    const sync = () => setFromDom(readDomTheme())
    const mo = new MutationObserver(sync)
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    })
    sync()
    return () => mo.disconnect()
  }, [propTheme])

  return propTheme ?? fromDom
}

/**
 * Home-style footer. Pass `theme` from App when used on Home; omit on policy pages
 * so it follows `document.documentElement` dark mode (ThemeToggle).
 */
export default function Footer({ theme: themeProp }) {
  const navigate = useNavigate()
  const theme = useSyncedTheme(themeProp)
  const currentColors = theme === 'dark' ? colors.dark : colors.light

  const handleNavigation = (path) => {
    if (!path) return
    if (path.startsWith('http')) {
      window.open(path, '_blank', 'noopener,noreferrer')
    } else {
      navigate(path)
    }
  }

  return (
    <footer
      className="mt-auto border-t px-4 py-16 transition-colors duration-300 lg:px-8"
      style={{
        background: theme === 'dark' ? currentColors.card : '#FFFFFF',
        borderColor:
          theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-xl font-black text-white"
                style={{
                  background: `linear-gradient(135deg, ${currentColors.cyan}, ${currentColors.purple})`,
                }}
              >
                KB
              </div>
              <div>
                <div
                  className="text-lg font-bold"
                  style={{ color: currentColors.text }}
                >
                  Kenbright Actuarial Hub
                </div>
                <div className="text-sm" style={{ color: currentColors.textSecondary }}>
                  Empowering Actuarial Excellence
                </div>
              </div>
            </div>
            <p
              className="mb-6 text-sm leading-relaxed"
              style={{ color: currentColors.textSecondary }}
            >
              Your comprehensive platform for actuarial training, valuation tools,
              exam preparation, and gamified learning.
            </p>

            <div className="flex items-center gap-4">
              {[
                {
                  icon: <FacebookIcon className="h-5 w-5" />,
                  color: currentColors.blue,
                  url: 'https://www.facebook.com/kenbright',
                },
                {
                  icon: <LinkedinIcon className="h-5 w-5" />,
                  color: currentColors.cyan,
                  url: 'https://www.linkedin.com/company/kenbright/',
                },
                {
                  icon: <XIcon className="h-5 w-5" />,
                  color: currentColors.gray,
                  url: 'https://x.com/kenbright_ke',
                },
                {
                  icon: <InstagramIcon className="h-5 w-5" />,
                  color: currentColors.pink,
                  url: 'https://www.instagram.com/kenbright_ke/',
                },
                {
                  icon: <YoutubeIcon className="h-5 w-5" />,
                  color: currentColors.red,
                  url: 'https://www.youtube.com/@Kenbright_Ke',
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg transition-all hover:scale-110"
                  style={{
                    background: `${social.color}20`,
                    color: social.color,
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-bold" style={{ color: currentColors.text }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Training Modules', link: '/modules' },
                { label: 'IFRS 17 Hub', link: 'https://learn17.com/' },
                { label: 'Valuation Tools', link: '/tools' },
                { label: 'Exam Pathways', link: '/modules' },
                { label: 'IFRS 17 Game', link: 'https://www.ifrs17game.com/' },
              ].map((item, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => handleNavigation(item.link)}
                    className="text-left text-sm transition hover:opacity-70"
                    style={{ color: currentColors.textSecondary }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold" style={{ color: currentColors.text }}>
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li
                className="flex items-center gap-3 text-sm"
                style={{ color: currentColors.textSecondary }}
              >
                <Mail className="h-4 w-4" style={{ color: currentColors.cyan }} />
                <span>kafs@kenbright.co.ke</span>
              </li>
              <li
                className="flex items-center gap-3 text-sm"
                style={{ color: currentColors.textSecondary }}
              >
                <Phone className="h-4 w-4" style={{ color: currentColors.cyan }} />
                <span>+254 709 783 000</span>
              </li>
              <li
                className="flex items-center gap-3 text-sm"
                style={{ color: currentColors.textSecondary }}
              >
                <MapPin className="h-4 w-4" style={{ color: currentColors.cyan }} />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="flex flex-col items-center justify-between gap-4 pt-8 md:flex-row"
          style={{
            borderTop: `1px solid ${
              theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
            }`,
          }}
        >
          <div className="text-sm" style={{ color: currentColors.textSecondary }}>
            © {new Date().getFullYear()} Kenbright Actuarial Hub. All rights
            reserved.
          </div>
          <div
            className="flex items-center gap-6 text-sm"
            style={{ color: currentColors.textSecondary }}
          >
            <button type="button" onClick={() => handleNavigation('/privacy-policy')} className="transition hover:opacity-70">
              Privacy Policy
            </button>
            <button type="button" onClick={() => handleNavigation('/terms-of-service')} className="transition hover:opacity-70">
              Terms of Service
            </button>
            <button type="button" onClick={() => handleNavigation('/cookie-policy')} className="transition hover:opacity-70">
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
