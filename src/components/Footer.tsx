import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

import logo from './../logo.png';
import { NAV_GROUPS } from '../data/nav';
import { TAGLINE, OFFICES } from '../data/company';

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/106417184/admin/page-posts/published/',
    Icon: Linkedin,
  },
  { label: 'X', href: 'https://x.com/Aminutemantech', Icon: Twitter },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/aniruddhanarayan__/?utm_source=ig_web_button_share_sheet',
    Icon: Instagram,
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-void">
      <div className="absolute inset-0 bg-grid-coarse bg-grid-coarse opacity-[0.12]" />

      <div className="container relative py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ---- Identity + contact ------------------------------------- */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center">
              <img
                loading="lazy"
                src={logo}
                alt="Aminuteman Technologies"
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="mt-5 font-mono text-[0.65rem] uppercase tracking-ultra text-accent-soft/80">
              {TAGLINE}
            </p>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-3">
              Autonomous air systems, the effectors that finish an engagement, and the grid that
              connects every sensor and shooter into a single picture. Designed, developed and
              manufactured in India.
            </p>

            <ul className="mt-8 space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent/80" />
                <span className="font-mono text-xs text-ink-2">+91 93562 21384</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent/80" />
                <span className="break-all font-mono text-xs text-ink-2">
                  aminutemantechnologies@gmail.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent/80" />
                <span className="break-all font-mono text-xs text-ink-2">
                  admincontrols@aminutemantechnologies.com
                </span>
              </li>
            </ul>

            <div className="mt-8 flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent/80" />
              <div>
                <p className="data-label">Sites</p>
                {OFFICES.map((office) => (
                  <p
                    key={office.city + office.role}
                    className="mt-1 text-xs leading-relaxed text-ink-3"
                  >
                    {office.city}
                    <span className="text-ink-dim"> · {office.role}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* ---- Sitemap, driven by the same IA as the navbar ------------ */}
          <nav className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {NAV_GROUPS.map((group) => (
                <div key={group.label}>
                  <h3 className="data-label text-white/70">
                    {group.to ? (
                      <Link to={group.to} className="transition-colors hover:text-accent">
                        {group.label}
                      </Link>
                    ) : (
                      group.label
                    )}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {group.links.map((link) => (
                      <li key={link.to + link.label}>
                        <Link
                          to={link.to}
                          className="text-xs leading-relaxed text-ink-3 transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          {/* ---- Contact CTA + socials ----------------------------------- */}
          <div className="lg:col-span-2">
            <h3 className="data-label text-white/70">Connect</h3>

            <div className="mt-4 flex gap-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group inline-flex h-9 w-9 items-center justify-center border border-line-bright transition-colors hover:border-accent/50 hover:bg-accent/10"
                >
                  <Icon className="h-4 w-4 text-ink-3 transition-colors group-hover:text-accent" />
                </a>
              ))}
            </div>

            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-accent transition-colors hover:text-white"
            >
              Programme enquiries
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <div className="mt-8 flex items-center gap-4">
              <img
                src="/images/indianflag.jpg"
                alt="India"
                loading="lazy"
                className="h-6 w-auto object-contain opacity-70"
              />
            </div>
          </div>
        </div>

        {/* ---- Baseline ------------------------------------------------- */}
        <div className="mt-16 border-t border-line pt-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <p className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-dim">
              © {new Date().getFullYear()} Aminuteman Technologies · Pune · Delhi · Bengaluru ·
              Madhya Pradesh
            </p>
            <p className="max-w-xl font-mono text-[0.6rem] uppercase leading-relaxed tracking-widest text-ink-dim sm:text-right">
              Performance data released to qualified counterparties following end-user
              certification. Commitment authority is never delegated to a machine.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
