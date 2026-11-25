import { Play, Pause } from 'lucide-react';
import { useMusic } from '../services/MusicContext.jsx';
import { useLanguage } from '../services/LanguageContext.jsx';

// Small round gold button, fixed in the bottom-right corner of the screen.
export default function MusicButton() {
  const { playing, toggle } = useMusic();
  const { t } = useLanguage();
  const label = playing ? t.music.pause : t.music.play;

  return (
    <button
      type="button"
      className={`music-button ${playing ? 'music-button--on' : ''}`}
      onClick={toggle}
      aria-label={label}
      aria-pressed={playing}
      title={label}
    >
      {playing ? <Pause size={18} strokeWidth={1.6} /> : <Play size={18} strokeWidth={1.6} />}
    </button>
  );
}
