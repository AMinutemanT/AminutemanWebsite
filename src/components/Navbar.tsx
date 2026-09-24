import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Menu, X, Plus, ArrowRight } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from './../logo.png';
import { NAV_GROUPS, type NavLink as NavLinkData, type NavSection } from '../data/nav';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const nav = useRef<HTMLElement>(null);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const groupTriggers = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Any navigation closes whatever was open.
  useLayoutEffect(() => {
    setIsMenuOpen(false);
    setOpenGroup(null);
  }, [location.pathname]);

  // Lock the page behind the mobile drawer.
  useLayoutEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    const background = Array.from(document.querySelectorAll<HTMLElement>('main, footer'));
    background.forEach((element) => { element.inert = isMenuOpen; });
    return () => {
      document.body.style.overflow = '';
      background.forEach((element) => { element.inert = false; });
    };
  }, [isMenuOpen]);

  // Keep keyboard users inside the open drawer and return focus on dismissal.
  useEffect(() => {
    if (!openGroup && !isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (isMenuOpen) {
          setIsMenuOpen(false);
          menuToggle.current?.focus();
        } else if (openGroup) {
          groupTriggers.current[openGroup]?.focus();
        }
        setOpenGroup(null);
      }
      if (e.key === 'Tab' && isMenuOpen) {
        const controls = Array.from(nav.current?.querySelectorAll<HTMLElement>('a[href], button') ?? [])
          .filter((element) => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openGroup, isMenuOpen]);

  useEffect(() => {
    const breakpoint = window.matchMedia('(min-width: 1025px)');
    const closeDrawer = () => {
      setIsMenuOpen(false);
      setOpenGroup(null);
    };
    breakpoint.addEventListener('change', closeDrawer);
    return () => breakpoint.removeEventListener('change', closeDrawer);
  }, []);

  const solid = scrolled || openGroup !== null || isMenuOpen;

  return (
    <nav
      ref={nav}
      aria-label="Main navigation"
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid ? 'border-line bg-void/95 backdrop-blur-md' : 'border-white/[0.06] bg-void/30 backdrop-blur-sm'
      }`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpenGroup(null);
      }}
    >
      <div className="flex h-16 items-stretch justify-between">
        {/* Mark */}
        <div className="flex items-stretch">
          <Link to="/" className="flex items-center px-4 sm:px-6">
            <span className="brand-logo"><img src={logo} alt="Aminuteman Technologies" loading="eager" width="500" height="500" /></span>
          </Link>
          <span className="w-px bg-line" />
          <Link to="/contact" className="flex items-center px-4 font-mono text-xs uppercase tracking-widest text-accent sm:hidden">Contact</Link>
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
                ref={(element) => { groupTriggers.current[group.label] = element; }}
                onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                data-active={group.to === location.pathname.replace(/\/$/, '') || group.links.some((link) => link.to === location.pathname.replace(/\/$/, ''))}
                className={`flex items-center gap-2 px-5 font-sans text-sm font-medium transition-colors data-[active=true]:text-accent ${
                  openGroup === group.label ? 'bg-white/[0.04] text-white' : 'text-ink-2 hover:text-white'
                }`}
                aria-expanded={openGroup === group.label}
                aria-controls={openGroup === group.label ? 'desktop-navigation-panel' : undefined}
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
          {/* The one filled control in the chrome, so the primary action is never
              ambiguous. A full-height cell rather than a floating pill: the bar
              is built out of stacked cells and a pill would sit outside that. */}
          <Link
            to="/contact"
            className="hidden items-center whitespace-nowrap bg-accent px-6 font-sans text-sm font-semibold text-void transition-colors hover:bg-accent-soft sm:flex"
          >
            Request a briefing
          </Link>
          <button
            ref={menuToggle}
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex items-center px-5 text-white transition-colors hover:bg-white hover:text-void lg:hidden"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls={isMenuOpen ? 'mobile-navigation-panel' : undefined}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Desktop mega-menu */}
      {openGroup && (
        <div id="desktop-navigation-panel" className="hidden border-t border-line bg-void lg:block">
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

                <div className="col-span-9">
                  {group.sections ? (
                    <div
                      className="grid gap-x-10 gap-y-8"
                      style={{
                        gridTemplateColumns: `repeat(${group.sections.length}, minmax(0, 1fr))`,
                      }}
                    >
                      {group.sections.map((s) => (
                        <MenuColumn key={s.label} section={s} />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-x-10 gap-y-2">
                      {group.links.map((link) => (
                        <MenuEntry key={link.to + link.label} link={link} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile drawer */}
      {isMenuOpen && (
        <div id="mobile-navigation-panel" className="h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-line bg-void pb-safe-bottom lg:hidden">
          <div className="divide-y divide-white/10">
            {NAV_GROUPS.map((group) => (
              <div key={group.label}>
                <button
                  type="button"
                  onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                  aria-expanded={openGroup === group.label}
                  aria-controls={openGroup === group.label ? `mobile-group-${group.label}` : undefined}
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
                  <div id={`mobile-group-${group.label}`} className="space-y-px bg-line pb-px">
                    {group.to && !group.links.some((link) => link.to === group.to) && (
                      <Link to={group.to} className="block bg-void px-5 py-3.5 text-sm text-accent">
                        View all {group.label.toLowerCase()}
                      </Link>
                    )}
                    {group.links.map((link) => (
                      <NavLink
                        end
                        key={link.to + link.label}
                        to={link.to}
                        className="block bg-void px-5 py-3.5 aria-[current=page]:border-l-2 aria-[current=page]:border-accent"
                      >
                        <span className="font-display text-sm uppercase tracking-wide text-ink-1">
                          {link.label}
                        </span>
                        {link.note && (
                          <span className="mt-1 block text-xs leading-relaxed text-ink-dim">
                            {link.note}
                          </span>
                        )}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-5">
            <Link to="/contact" className="btn-primary w-full justify-center">
              Request a briefing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

/** One titled column of the mega-menu. */
function MenuColumn({ section }: { section: NavSection }) {
  return (
    <div>
      <p className="data-label border-b border-line pb-3 text-ink-dim">{section.label}</p>
      <div className="mt-2">
        {section.links.map((link) => (
          <MenuEntry key={link.to + link.label} link={link} />
        ))}
      </div>
    </div>
  );
}

/**
 * A menu entry carries its descriptor. The content model has always held a
 * one-line `note` per link; showing it is the difference between a list of
 * names and a menu somebody can choose from without guessing.
 */
function MenuEntry({ link }: { link: NavLinkData }) {
  return (
    <NavLink
      end
      to={link.to}
      className="group block border-l border-transparent py-3 pl-4 transition-colors hover:border-accent aria-[current=page]:border-accent aria-[current=page]:bg-white/[0.04]"
    >
      {link.designation && (
        <span className="block font-mono text-[0.55rem] uppercase tracking-widest text-accent/70">
          {link.designation}
        </span>
      )}
      <span className="mt-1 block font-display text-lg uppercase leading-none tracking-wide text-ink-1 transition-colors group-hover:text-white">
        {link.label}
      </span>
      {link.note && (
        <span className="mt-1.5 block text-xs leading-relaxed text-ink-dim">{link.note}</span>
      )}
    </NavLink>
  );
}

export default Navbar;
