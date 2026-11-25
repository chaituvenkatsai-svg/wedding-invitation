import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../services/LanguageContext.jsx';
import Envelope from '../components/Envelope.jsx';
import InvitationCard from '../components/InvitationCard.jsx';
import ShareBar from '../components/ShareBar.jsx';

// Public link: https://chaituvenkatsai-svg.github.io/wedding-invitation/#/invitation
export default function Invitation() {
  const { t, toggleLang } = useLanguage();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [opened]);

  return (
    <div className="invitation-page">
      <header className="invitation-bar">
        <Link to="/" className="invitation-bar__back">
          <ArrowLeft size={16} strokeWidth={1.6} /> {t.invitation.back}
        </Link>
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
          <button type="button" className="invitation-replay" onClick={() => setOpened(false)}>
            {t.invitation.replay}
          </button>
        </div>
      )}
    </div>
  );
}
