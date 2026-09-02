import { useEffect, useState } from 'react';
import { Menu, X, Plus, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from './../logo.png';
import { NAV_GROUPS } from '../data/nav';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Any navigation closes whatever was open.
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenGroup(null);
  }, [location.pathname]);

  // Lock the page behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const solid = scrolled || openGroup !== null || isMenuOpen;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid ? 'border-line bg-void/95 backdrop-blur-md' : 'border-white/[0.06] bg-void/30 backdrop-blur-sm'
      }`}
      onMouseLeave={() => setOpenGroup(null)}
    >
      <div className="flex h-16 items-stretch justify-between">
        {/* Mark */}
        <div className="flex items-stretch">
          <Link to="/" className="flex items-center px-4 sm:px-6">
            <img src={logo} alt="Aminuteman Technologies" loading="eager" className="h-8 w-auto object-contain" />
          </Link>
          <span className="w-px bg-line" />
          <span className="hidden items-center px-5 font-mono text-[0.6rem] uppercase tracking-widest text-ink-dim xl:flex">
            Shaping the Deterrence
          </span>
        </div>

        {/* Desktop groups */}
        <div className="hidden items-stretch lg:flex">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="flex items-stretch">
              <span className="w-px bg-line" />
              <button
                type="button"
                onMouseEnter={() => setOpenGroup(group.label)}
                onFocus={() => setOpenGroup(group.label)}
                onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                className={`flex items-center gap-2 px-5 font-mono text-[0.7rem] uppercase tracking-widest transition-colors ${
                  openGroup === group.label ? 'bg-white/[0.04] text-white' : 'text-ink-2 hover:text-white'
                }`}
                aria-expanded={openGroup === group.label}
              >
                {group.label}
                <Plus
                  className={`h-3 w-3 transition-transform duration-300 ${
                    openGroup === group.label ? 'rotate-45' : ''
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-stretch">
          <span className="w-px bg-line" />
          <Link
            to="/contact"
            className="hidden items-center px-5 font-mono text-[0.7rem] uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-void sm:flex"
          >
            Contact
          </Link>
          <span className="hidden w-px bg-line sm:block" />
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex items-center px-5 text-white transition-colors hover:bg-white hover:text-void lg:hidden"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Desktop mega-menu */}
      {openGroup && (
        <div className="hidden border-t border-line bg-void lg:block">
          {NAV_GROUPS.filter((group) => group.label === openGroup).map((group) => (
            <div key={group.label} className="container py-10">
              <div className="grid grid-cols-12 gap-10">
                <div className="col-span-3">
                  <p className="eyebrow">{group.label}</p>
                  <p className="mt-5 text-sm leading-relaxed text-ink-3">{group.blurb}</p>
                  {group.to && (
                    <Link
                      to={group.to}
                      className="mt-6 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-accent transition-colors hover:text-white"
                    >
                      View all
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>

                {/* One uniform cell per entry. Hairline gaps and a filled
                    trailing row keep every group the same shape, whether it
                    holds three links or seven. */}
                <div className="col-span-9 grid auto-rows-fr grid-cols-3 gap-px bg-line">
                  {group.links.map((link) => (
                    <Link
                      key={link.to + link.label}
                      to={link.to}
                      className="flex items-center bg-void px-5 py-4 font-display text-base uppercase tracking-wide text-ink-1 transition-colors hover:bg-panel hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                  {/* Blank cells so the last row squares off. */}
                  {Array.from({ length: (3 - (group.links.length % 3)) % 3 }).map((_, i) => (
                    <span key={`pad-${i}`} className="bg-void" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile drawer */}
      {isMenuOpen && (
        <div className="h-[calc(100vh-4rem)] overflow-y-auto border-t border-line bg-void lg:hidden">
          <div className="divide-y divide-white/10">
            {NAV_GROUPS.map((group) => (
              <div key={group.label}>
                <button
                  type="button"
                  onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                  className="flex w-full items-center justify-between px-5 py-5 text-left"
                >
                  <span className="font-display text-2xl uppercase tracking-wide text-white">
                    {group.label}
                  </span>
                  <Plus
                    className={`h-4 w-4 text-ink-3 transition-transform duration-300 ${
                      openGroup === group.label ? 'rotate-45' : ''
                    }`}
                  />
                </button>
                {openGroup === group.label && (
                  <div className="space-y-px bg-line pb-px">
                    {group.links.map((link) => (
                      <Link
                        key={link.to + link.label}
                        to={link.to}
                        className="block bg-void px-5 py-3.5 font-display text-sm uppercase tracking-wide text-ink-1"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-5">
            <Link to="/contact" className="btn-primary w-full justify-center">
              Contact us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
