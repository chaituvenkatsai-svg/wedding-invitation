import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../services/LanguageContext.jsx';

// Order matches the order of the sections on the page.
const LINKS = [
  { id: 'home', key: 'home' },
  { id: 'story', key: 'story' },
  { id: 'events', key: 'events' },
  { id: 'gallery', key: 'gallery' },
  { id: 'venue', key: 'venue' },
  { id: 'invitation', key: 'invitation' },
];

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Navbar() {
  const { t, toggleLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Stop the page scrolling behind the open mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    // Wait a moment so the menu can close before scrolling.
    setTimeout(() => scrollToSection(id), 50);
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--solid' : ''}`}>
      <div className="navbar__inner">
        <button className="navbar__brand" onClick={() => go('home')} aria-label="Go to top">
          K <span>&</span> K
        </button>

        <nav className="navbar__links" aria-label="Main">
          {LINKS.map((l) => (
            <button key={l.id} onClick={() => go(l.id)}>
              {t.nav[l.key]}
            </button>
          ))}
        </nav>

        <div className="navbar__actions">
          <button className="lang-toggle" onClick={toggleLang} aria-label="Change language">
            {t.langToggle}
          </button>
          <button
            className="navbar__burger"
            onClick={() => setOpen(true)}
            aria-label={t.menu}
            aria-expanded={open}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      <div className={`drawer ${open ? 'drawer--open' : ''}`} aria-hidden={!open}>
        <button className="drawer__close" onClick={() => setOpen(false)} aria-label={t.close}>
          <X size={24} />
        </button>
        {LINKS.map((l) => (
          <button key={l.id} className="drawer__link" onClick={() => go(l.id)} tabIndex={open ? 0 : -1}>
            {t.nav[l.key]}
          </button>
        ))}
      </div>
    </header>
  );
}
