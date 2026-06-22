import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu, Sun, Moon } from 'lucide-react';
import { useClock } from '../../hooks/useClock';
import { useWeather } from '../../hooks/useWeather';

type Props = {
  activeSection: string;
  onNavClick: (section: string) => void;
  isProjectView?: boolean;
  onBack?: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
};

const links = [
  { label: 'WORK', section: 'work' },
  { label: 'ABOUT', section: 'about' },
  { label: 'JOURNEY', section: 'journey' },
  { label: 'CONTACT', section: 'contact' },
];

const socials = [
  { label: 'Twitter', href: 'https://twitter.com' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Behance', href: 'https://behance.net' },
];

/* ── Info widget: date · time · weather ─────────────────────────────── */
function InfoWidget({ dim }: { dim: boolean }) {
  const clock = useClock();
  const weather = useWeather();

  const base = dim
    ? 'text-ink/40 dark:text-ink/40'
    : 'text-white/45';

  const sep = dim
    ? 'text-ink/20 dark:text-ink/20'
    : 'text-white/22';

  return (
    <div className={`hidden lg:flex items-center gap-2.5 text-[10px] font-medium tracking-[0.08em] ${base}`}>
      <span>{clock.day}, {clock.date} {clock.month}</span>
      <span className={sep}>·</span>
      <span className="tabular-nums">{clock.time}</span>
      {weather.status === 'ok' && (
        <>
          <span className={sep}>·</span>
          <span>{weather.temp}°C</span>
          <span className={sep}>·</span>
          <span>{weather.city}</span>
        </>
      )}
    </div>
  );
}

/* ── Theme toggle ────────────────────────────────────────────────────── */
function ThemeToggle({
  isDark,
  onToggle,
  dim,
}: {
  isDark: boolean;
  onToggle: () => void;
  dim: boolean;
}) {
  const col = dim
    ? 'text-ink/50 hover:text-ink dark:text-ink/50 dark:hover:text-ink'
    : 'text-white/55 hover:text-white';

  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors ${col}`}
    >
      <motion.span
        key={isDark ? 'sun' : 'moon'}
        initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
        transition={{ duration: 0.25 }}
      >
        {isDark ? <Sun size={14} strokeWidth={2.2} /> : <Moon size={14} strokeWidth={2.2} />}
      </motion.span>
    </button>
  );
}

/* ── Main Navbar ─────────────────────────────────────────────────────── */
export default function Navbar({
  activeSection,
  onNavClick,
  isProjectView = false,
  onBack,
  isDark,
  onToggleTheme,
}: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* Background colour — project view uses cream/dark-cream, else always dark */
  const navBg = isProjectView
    ? scrolled
      ? isDark
        ? 'rgba(26,23,20,0.88)'
        : 'rgba(232,227,216,0.85)'
      : 'transparent'
    : isDark
      ? scrolled ? 'rgba(18,16,13,0.92)' : '#12100d'
      : scrolled ? 'rgba(13,13,13,0.92)' : '#0d0d0d';

  const textDim = isProjectView; /* cream nav = dark text */

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: navBg,
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          transition: 'background 0.3s ease',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between gap-6">

          {/* Logo */}
          <button
            onClick={() => onNavClick('hero')}
            className="flex items-center gap-2 shrink-0"
          >
            <span
              className="w-2 h-2 rounded-sm"
              style={{ background: textDim ? 'var(--color-ink)' : '#ffffff' }}
            />
            <span
              className="text-xs font-semibold tracking-[0.15em] uppercase"
              style={{ color: textDim ? 'var(--color-ink)' : '#ffffff' }}
            >
              John Kalu
            </span>
          </button>

          {isProjectView ? (
            /* Project view — simple back button */
            <button
              onClick={onBack}
              className="text-[11px] font-semibold tracking-[0.15em] uppercase flex items-center gap-1 hover:opacity-60 transition-opacity"
              style={{ color: textDim ? 'var(--color-ink)' : '#ffffff' }}
            >
              ← Back
            </button>
          ) : (
            <>
              {/* Desktop centre: nav links */}
              <div className="hidden md:flex items-center gap-7 flex-1 justify-center">
                {links.map((link) => (
                  <button
                    key={link.section}
                    onClick={() => onNavClick(link.section)}
                    className="relative text-[11px] font-medium tracking-[0.15em] text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                    {activeSection === link.section && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-0.5 left-0 right-0 h-px bg-white"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Desktop right: info widget + theme toggle */}
              <div className="hidden md:flex items-center gap-3 shrink-0">
                <InfoWidget dim={textDim} />
                <div className="w-px h-3.5 bg-white/15 mx-1" />
                <ThemeToggle isDark={isDark} onToggle={onToggleTheme} dim={textDim} />
              </div>

              {/* Mobile right: theme toggle + hamburger */}
              <div className="flex md:hidden items-center gap-3">
                <ThemeToggle isDark={isDark} onToggle={onToggleTheme} dim={false} />
                <button
                  onClick={() => setMobileOpen(true)}
                  className="text-white"
                  aria-label="Open menu"
                >
                  <Menu size={20} />
                </button>
              </div>
            </>
          )}
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink dark:bg-[#12100d]"
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between px-6 h-14">
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white">
                John Kalu
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex flex-col gap-7 px-6 pt-14">
              {links.map((link, i) => (
                <motion.button
                  key={link.section}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => { onNavClick(link.section); setMobileOpen(false); }}
                  className="text-4xl font-bold text-white text-left"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            {/* Mobile weather + socials */}
            <div className="mt-auto px-6 pb-12 space-y-6">
              <MobileInfoRow />
              <div className="flex items-center gap-5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] tracking-[0.15em] text-white/40 hover:text-white transition-colors"
                  >
                    {s.label.slice(0, 2).toUpperCase()}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* Date/time/weather row shown inside mobile menu */
function MobileInfoRow() {
  const clock = useClock();
  const weather = useWeather();
  return (
    <div className="text-[11px] text-white/35 tracking-[0.08em] flex flex-wrap gap-x-3 gap-y-1">
      <span>{clock.day}, {clock.date} {clock.month}</span>
      <span>·</span>
      <span className="tabular-nums">{clock.time}</span>
      {weather.status === 'ok' && (
        <>
          <span>·</span>
          <span>{weather.temp}°C · {weather.city}</span>
        </>
      )}
    </div>
  );
}
