import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { useLanguage } from '../services/LanguageContext.jsx';
import Envelope from '../components/Envelope.jsx';
import InvitationCard from '../components/InvitationCard.jsx';
import ShareBar from '../components/ShareBar.jsx';
import MusicButton from '../components/MusicButton.jsx';

// This is the first screen every guest sees (the sealed envelope).
// Public link: https://chaituvenkatsai-svg.github.io/wedding-invitation/
export default function Invitation() {
  const { t, toggleLang } = useLanguage();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [opened]);

  return (
    <div className={`invitation-page ${opened ? '' : 'invitation-page--stage'}`}>
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
        <div className="invitation-reveal">
          <InvitationCard />
          <ShareBar />
          <Link to="/home" className="btn btn--outline-gold invitation-site-link">
            {t.invitation.visitSite}
          </Link>
          <button type="button" className="invitation-replay" onClick={() => setOpened(false)}>
            {t.invitation.replay}
          </button>
        </div>
      )}
      <MusicButton />
    </div>
  );
}
