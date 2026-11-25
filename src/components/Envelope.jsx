import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../services/LanguageContext.jsx';
import { useMusic } from '../services/MusicContext.jsx';
import weddingConfig from '../config/wedding.config.js';
import EnvelopeArt from './EnvelopeArt.jsx';

// Timings in milliseconds
const LEAVE_AT = 2300; // the envelope starts to fade away
const OPEN_TIME = 2800; // the full card appears

// Small gold specks that float upwards. Fixed values, so it looks the same every time.
const PARTICLES = [
  { left: 6, size: 4, delay: 0, dur: 11 },
  { left: 14, size: 3, delay: 3, dur: 13 },
  { left: 22, size: 5, delay: 6, dur: 12 },
  { left: 31, size: 3, delay: 1.5, dur: 14 },
  { left: 40, size: 4, delay: 8, dur: 11 },
  { left: 49, size: 3, delay: 4, dur: 15 },
  { left: 57, size: 5, delay: 9.5, dur: 12 },
  { left: 66, size: 3, delay: 2, dur: 13 },
  { left: 74, size: 4, delay: 7, dur: 14 },
  { left: 82, size: 3, delay: 5, dur: 11 },
  { left: 90, size: 5, delay: 10, dur: 13 },
  { left: 96, size: 3, delay: 3.5, dur: 15 },
];

export default function Envelope({ onOpened }) {
  const { lang, t } = useLanguage();
  const { start: startMusic } = useMusic();
  const { couple } = weddingConfig;
  const [opening, setOpening] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const locked = useRef(false); // stops double taps instantly, before React re-renders
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const open = () => {
    if (locked.current) return;
    locked.current = true;
    startMusic(); // the tap on the seal is the "first touch" that lets the music begin
    setOpening(true);
    timers.current.push(setTimeout(() => setLeaving(true), LEAVE_AT));
    timers.current.push(setTimeout(onOpened, OPEN_TIME));
  };

  return (
    <div className={`envelope-stage ${leaving ? 'envelope-stage--leaving' : ''}`}>
      <div className="particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
            }}
          />
        ))}
      </div>

      <p className="envelope-stage__kicker">{t.blessing[0]}</p>
      <h1 className="envelope-stage__title">{t.invitation.envelopeTitle}</h1>

      <button
        type="button"
        className={`envelope ${opening ? 'envelope--open' : ''}`}
        onClick={open}
        disabled={opening}
        aria-label={t.invitation.tapToOpen}
      >
        <span className="envelope__back" />

        {/* The card that slides up out of the envelope */}
        <span className="envelope__letter">
          <span className="envelope__letter-names">
            {couple.groom[lang]}
            <em>&</em>
            {couple.bride[lang]}
          </span>
          <EnvelopeArt />
        </span>

        <span className="envelope__front" />
        <span className="envelope__flap" />

        <span className="envelope__seal" aria-hidden="true">
          <span className="envelope__seal-ring">K&amp;K</span>
        </span>
      </button>

      <p className="envelope-stage__names">
        {couple.groom[lang]} &amp; {couple.bride[lang]}
      </p>
      <p className={`envelope-stage__hint ${opening ? 'is-hidden' : ''}`}>{t.invitation.tapToOpen}</p>
    </div>
  );
}
