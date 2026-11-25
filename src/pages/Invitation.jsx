import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { useLanguage } from '../services/LanguageContext.jsx';
import Envelope from '../components/Envelope.jsx';
import InvitationCard from '../components/InvitationCard.jsx';
import ShareBar from '../components/ShareBar.jsx';
import MusicButton from '../components/MusicButton.jsx';

// How the automatic move to the homepage behaves:
//  - It only becomes "armed" after the guest has really scrolled down (so a tall screen
//    that shows the whole card at once never jumps ahead by accident).
//  - It waits DWELL_MS at the very bottom, so there is time to read, share or replay.
//  - Tapping a button or link (share, replay...) cancels it until the guest scrolls away and back.
//  - It fades out smoothly (LEAVE_MS), then opens the homepage, and only ever once.
const ARM_SCROLL_PX = 120;
const DWELL_MS = 1800;
const LEAVE_MS = 700;

// Public link: https://chaituvenkatsai-svg.github.io/wedding-invitation/
export default function Invitation() {
  const { t, toggleLang } = useLanguage();
  const navigate = useNavigate();
  const navigateRef = useRef(navigate); // always the latest navigate, without restarting the scroll watcher
  navigateRef.current = navigate;
  const [opened, setOpened] = useState(false);
  const [counting, setCounting] = useState(false); // waiting at the bottom
  const [leaving, setLeaving] = useState(false); // fading out
  const endRef = useRef(null);
  const flags = useRef({ armed: false, blocked: false, done: false, timer: null });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [opened]);

  useEffect(() => {
    if (!opened || !endRef.current) return undefined;
    const s = flags.current;
    s.armed = false;
    s.blocked = false;
    s.done = false;

    const onScroll = () => {
      if (window.scrollY > ARM_SCROLL_PX) s.armed = true;
    };
    const atBottom = () => window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24;
    const cancel = () => {
      clearTimeout(s.timer);
      s.timer = null;
      setCounting(false);
    };
    const go = () => {
      if (s.done) return;
      s.done = true;
      setCounting(false);
      setLeaving(true);
      s.timer = setTimeout(() => navigateRef.current('/home'), LEAVE_MS);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!s.armed || s.blocked || s.done) return;
          cancel();
          setCounting(true);
          s.timer = setTimeout(() => {
            if (s.armed && !s.blocked && atBottom()) go();
            else setCounting(false);
          }, DWELL_MS);
        } else {
          s.blocked = false;
          if (!s.done) cancel();
        }
      },
      { threshold: 0.5 } // half of the marker visible = at the bottom (avoids sub-pixel rounding on phones)
    );
    observer.observe(endRef.current);

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
      clearTimeout(s.timer);
    };
  }, [opened]);

  // A tap on a button or link (share, copy, replay) means the guest is not done here yet.
  const handlePointerDown = (e) => {
    if (e.target.closest && e.target.closest('a, button')) {
      const s = flags.current;
      s.blocked = true;
      clearTimeout(s.timer);
      s.timer = null;
      setCounting(false);
    }
  };

  const pageClass = [
    'invitation-page',
    opened ? 'invitation-page--reading' : 'invitation-page--stage',
    leaving ? 'invitation-page--leaving' : '',
  ].join(' ');

  return (
    <div className={pageClass}>
      <header className="invitation-bar">
        {opened ? (
          <Link to="/home" className="invitation-bar__back">
            <Globe size={16} strokeWidth={1.6} /> {t.invitation.visitSite}
          </Link>
        ) : (
          <span />
        )}
        <button type="button" className="lang-toggle" onClick={toggleLang} aria-label="Change language">
          {t.langToggle}
        </button>
      </header>

      {!opened ? (
        <Envelope onOpened={() => setOpened(true)} />
      ) : (
        <div className="invitation-reveal" onPointerDown={handlePointerDown}>
          <InvitationCard />
          <ShareBar />
          <button type="button" className="invitation-replay" onClick={() => setOpened(false)}>
            {t.invitation.replay}
          </button>

          <div className={`enter-hint ${counting ? 'enter-hint--active' : ''}`} aria-live="polite">
            <p>{counting ? t.invitation.entering : t.invitation.next}</p>
            <span className="enter-hint__bar" />
          </div>
          {/* Invisible marker at the very end of the page: when it is fully on screen, the guest is at the bottom */}
          <div ref={endRef} className="invitation-end" aria-hidden="true" />
        </div>
      )}
      <MusicButton />
    </div>
  );
}
