import { useLanguage } from '../services/LanguageContext.jsx';
import weddingConfig from '../config/wedding.config.js';
import { GoldDivider, Toranam } from './Ornaments.jsx';

// The full invitation card. All text comes from the config file and translations,
// so changing wedding.config.js changes this card too.
export default function InvitationCard() {
  const { lang, t } = useLanguage();
  const { couple, family, ceremony, dinner, venue, hosts } = weddingConfig;
  const inv = t.invitation;

  return (
    <article className="card">
      <Toranam />
      <div className="card__body">
        <p className="card__blessing">{t.blessing.join('   ')}</p>

        <h2 className="card__title">{t.weddingOf}</h2>
        <GoldDivider />

        <p className="card__intro">{inv.solicit}</p>

        <p className="card__name">
          <span className="card__honorific">{inv.chiGroom}</span> {couple.groom[lang]}
        </p>
        <p className="card__with">{inv.with}</p>
        <p className="card__name">
          <span className="card__honorific">{inv.chiBride}</span> {couple.bride[lang]}
        </p>
        <p className="card__small">({family.brideNote[lang]})</p>

        <section className="card__block">
          <h3>{ceremony.title[lang]}</h3>
          <p>{ceremony.dateLabel[lang]}</p>
          <p className="card__time">{ceremony.time[lang]}</p>
          <p className="card__small">{ceremony.note[lang]}</p>
        </section>

        <section className="card__block">
          <h3>{inv.venueTitle}</h3>
          <p>{venue.name[lang]}</p>
          <p className="card__small">{venue.address[lang]}</p>
        </section>

        <section className="card__block">
          <h3>{dinner.title[lang]}</h3>
          <p>{dinner.dateLabel[lang]}</p>
          <p className="card__time">{dinner.time[lang]}</p>
          <p className="card__small">{dinner.note[lang]}</p>
        </section>

        <p className="card__yours">{inv.yours}</p>
        <p className="card__hosts">{hosts[lang]}</p>

        <GoldDivider />
        <p className="card__small">{inv.compliments}</p>
      </div>
      <Toranam />
    </article>
  );
}
