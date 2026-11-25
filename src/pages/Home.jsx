import { CalendarHeart, MapPin, Clock, UtensilsCrossed } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import { GoldDivider, Toranam } from '../components/Ornaments.jsx';
import useReveal from '../components/useReveal.js';
import { useLanguage } from '../services/LanguageContext.jsx';
import weddingConfig from '../config/wedding.config.js';

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;

function SectionTitle({ children }) {
  return (
    <div className="section-title reveal">
      <h2>{children}</h2>
      <GoldDivider />
    </div>
  );
}

export default function Home() {
  const { lang, t } = useLanguage();
  const { couple, family, ceremony, dinner, venue, hosts, images } = weddingConfig;
  useReveal();

  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapsQuery)}`;
  const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(venue.mapsQuery)}&output=embed`;

  return (
    <>
      <Navbar />
      <main>
        <Hero />

        {/* Welcome message */}
        <section className="section section--ivory" id="welcome">
          <div className="container container--narrow reveal">
            <SectionTitle>{t.welcome.title}</SectionTitle>
            <p className="lead">{t.welcome.text}</p>
          </div>
        </section>

        <Toranam />

        {/* About the couple + families */}
        <section className="section" id="story">
          <div className="container">
            <SectionTitle>{t.story.title}</SectionTitle>
            <div className="couple-grid">
              <article className="person-card reveal">
                <div className="person-card__photo">
                  <img src={assetUrl('images/krishna.jpg')} alt={`${couple.groom.en}, the groom`} width="600" height="600" loading="lazy" />
                </div>
                <p className="eyebrow">{t.story.groomRole}</p>
                <h3>{couple.groom[lang]}</h3>
                <p className="muted">{family.groomNote[lang]}</p>
              </article>
              <article className="person-card reveal">
                <div className="person-card__photo">
                  <img src={assetUrl('images/kartheeka.jpg')} alt={`${couple.bride.en}, the bride`} width="600" height="600" loading="lazy" />
                </div>
                <p className="eyebrow">{t.story.brideRole}</p>
                <h3>{couple.bride[lang]}</h3>
                <p className="muted">{family.brideNote[lang]}</p>
              </article>
            </div>
            <p className="lead reveal">{t.story.text}</p>

            <div className="family-block reveal">
              <h3 className="family-block__title">{t.family.title}</h3>
              <div className="family-grid">
                <div>
                  <p className="eyebrow">{t.family.groomSide}</p>
                  <p>{family.groomParents[lang]}</p>
                </div>
                <div>
                  <p className="eyebrow">{t.family.brideSide}</p>
                  <p>{family.brideParents[lang]}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ceremony and dinner */}
        <section className="section section--maroon" id="events">
          <div className="container">
            <SectionTitle>{t.events.title}</SectionTitle>
            <div className="event-grid">
              <article className="event-card reveal">
                <CalendarHeart size={26} strokeWidth={1.3} />
                <h3>{ceremony.title[lang]}</h3>
                <p className="event-card__date">{ceremony.dateLabel[lang]}</p>
                <p className="event-card__time">
                  <Clock size={16} strokeWidth={1.5} /> {ceremony.time[lang]}
                </p>
                <p className="event-card__note">{ceremony.note[lang]}</p>
              </article>
              <article className="event-card reveal">
                <UtensilsCrossed size={26} strokeWidth={1.3} />
                <h3>{dinner.title[lang]}</h3>
                <p className="event-card__date">{dinner.dateLabel[lang]}</p>
                <p className="event-card__time">
                  <Clock size={16} strokeWidth={1.5} /> {dinner.time[lang]}
                </p>
                <p className="event-card__note">{dinner.note[lang]}</p>
              </article>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="section section--ivory" id="gallery">
          <div className="container">
            <SectionTitle>{t.gallery.title}</SectionTitle>
            {images.gallery.length === 0 ? (
              <p className="lead muted reveal">{t.gallery.empty}</p>
            ) : (
              <div className="gallery-grid">
                {images.gallery.map((src, i) => (
                  <figure className="gallery-item reveal" key={src}>
                    <img src={assetUrl(src)} alt={`Wedding photo ${i + 1}`} loading="lazy" />
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Venue and map */}
        <section className="section" id="venue">
          <div className="container">
            <SectionTitle>{t.venue.title}</SectionTitle>
            <div className="venue reveal">
              <h3>{venue.name[lang]}</h3>
              <p className="muted">
                <MapPin size={16} strokeWidth={1.5} /> {venue.address[lang]}
              </p>
              <div className="map-frame">
                <iframe
                  title={t.venue.mapTitle}
                  src={mapsEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a className="btn btn--outline" href={mapsLink} target="_blank" rel="noopener noreferrer">
                {t.venue.directions}
              </a>
            </div>
          </div>
        </section>

        <Toranam />

        {/* Final invitation message */}
        <section className="section section--ivory" id="invitation">
          <div className="container container--narrow final reveal">
            <SectionTitle>{t.final.title}</SectionTitle>
            <p className="lead">{t.final.text}</p>
            <p className="eyebrow">{t.final.yours}</p>
            <p className="final__hosts">{hosts[lang]}</p>
            <p className="muted final__compliments">{t.final.compliments}</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          {couple.groom[lang]} &amp; {couple.bride[lang]} · {ceremony.dateLabel[lang]}
        </p>
      </footer>
    </>
  );
}
