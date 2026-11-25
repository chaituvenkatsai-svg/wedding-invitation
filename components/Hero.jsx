import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../services/LanguageContext.jsx';
import weddingConfig from '../config/wedding.config.js';
import Countdown from './Countdown.jsx';
import { FloralCorner, GoldDivider } from './Ornaments.jsx';

// Turns "images/hero.jpg" into a URL that also works on GitHub Pages sub-folders.
const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;

export default function Hero() {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const { couple, ceremony, venue, images, weddingDateTime } = weddingConfig;

  const groom = couple.groom[lang];
  const bride = couple.bride[lang];
  const bgStyle = images.hero ? { backgroundImage: `url(${assetUrl(images.hero)})` } : undefined;

  return (
    <section id="home" className={`hero ${images.hero ? 'hero--photo' : ''}`} style={bgStyle}>
      <div className="hero__overlay" />
      <FloralCorner className="floral-corner--tl" />
      <FloralCorner className="floral-corner--tr" />
      <FloralCorner className="floral-corner--bl" />
      <FloralCorner className="floral-corner--br" />

      <div className="hero__content">
        <p className="hero__blessing fade-up" style={{ animationDelay: '0.1s' }}>
          {t.blessing.join('  ·  ')}
        </p>
        <p className="hero__kicker fade-up" style={{ animationDelay: '0.3s' }}>
          {t.weddingOf}
        </p>

        <h1 className="hero__names">
          <span className="fade-up" style={{ animationDelay: '0.5s' }}>{groom}</span>
          <span className="hero__amp fade-up" style={{ animationDelay: '0.8s' }}>&</span>
          <span className="fade-up" style={{ animationDelay: '1.1s' }}>{bride}</span>
        </h1>

        <div className="fade-up" style={{ animationDelay: '1.4s' }}>
          <GoldDivider />
        </div>

        <p className="hero__date fade-up" style={{ animationDelay: '1.6s' }}>
          {ceremony.dateLabel[lang]}
        </p>
        <p className="hero__place fade-up" style={{ animationDelay: '1.7s' }}>
          {venue.address[lang].split(',').pop().trim()}
        </p>

        <div className="fade-up" style={{ animationDelay: '1.9s' }}>
          <Countdown target={weddingDateTime} />
        </div>

        <button
          className="btn btn--gold fade-up"
          style={{ animationDelay: '2.1s' }}
          onClick={() => navigate('/invitation')}
        >
          {t.explore}
        </button>
      </div>
    </section>
  );
}
