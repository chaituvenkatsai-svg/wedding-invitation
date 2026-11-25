import { createContext, useContext, useEffect, useRef, useState } from 'react';

// ONE audio player for the whole website.
// It lives above all the pages, so moving between the envelope, the invitation card
// and the homepage never starts a second track. Music is always OFF until the
// visitor presses Play (browsers block autoplay anyway, and guests would not want it).

const MusicContext = createContext(null);
const MUSIC_URL = `${import.meta.env.BASE_URL}music/wedding.mp3`;

export function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Create the player once, but do not load anything until the first Play.
  useEffect(() => {
    const audio = new Audio();
    audio.src = MUSIC_URL;
    audio.loop = true;
    audio.preload = 'none';
    audio.volume = 0.6;
    audio.addEventListener('play', () => setPlaying(true));
    audio.addEventListener('pause', () => setPlaying(false));
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setPlaying(false); // the phone refused or the file could not load
      }
    } else {
      audio.pause();
    }
  };

  return <MusicContext.Provider value={{ playing, toggle }}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used inside MusicProvider');
  return ctx;
}
