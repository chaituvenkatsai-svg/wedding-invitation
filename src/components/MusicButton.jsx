import { Play, Pause } from 'lucide-react';
import { useMusic } from '../services/MusicContext.jsx';
import { useLanguage } from '../services/LanguageContext.jsx';

// Small round gold button, fixed in the bottom-right corner of the screen.
// It shows Pause while the music is playing and Play while it is off.
// If the music file cannot be loaded, the button is hidden (never a broken button).
export default function MusicButton() {
  const { playing, available, toggle } = useMusic();
  const { t } = useLanguage();
  if (!available) return null;
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
