import { useState } from 'react';
import { useLanguage } from '../services/LanguageContext.jsx';
import weddingConfig from '../config/wedding.config.js';

// Time (in milliseconds) the opening animation takes before the full card appears.
const OPEN_TIME = 2200;

export default function Envelope({ onOpened }) {
  const { lang, t } = useLanguage();
  const { couple } = weddingConfig;
  const [opening, setOpening] = useState(false);

  const open = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpened, OPEN_TIME);
  };

  return (
    <div className="envelope-stage">
      <p className="envelope-stage__title">{t.invitation.invited}</p>

      <button
        type="button"
        className={`envelope ${opening ? 'envelope--open' : ''}`}
        onClick={open}
        aria-label={t.invitation.tapToOpen}
      >
        <span className="envelope__back" />

        {/* The small card that slides up out of the envelope */}
        <span className="envelope__letter">
          <span className="envelope__letter-names">
            {couple.groom[lang]}
            <em>&</em>
            {couple.bride[lang]}
          </span>
        </span>

        <span className="envelope__front" />
        <span className="envelope__flap" />

        <span className="envelope__seal" aria-hidden="true">
          <span className="envelope__seal-ring">K&amp;K</span>
        </span>
      </button>

      <p className={`envelope-stage__hint ${opening ? 'is-hidden' : ''}`}>{t.invitation.tapToOpen}</p>
    </div>
  );
}
