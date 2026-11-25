import { createContext, useContext, useEffect, useRef, useState } from 'react';

// ONE audio player for the whole website.
// It lives above all the pages, so moving between the envelope, the invitation card
// and the homepage never starts a second track or restarts the song.
//
// How the music starts:
//   1. A guest taps the gold seal on the envelope  -> start() plays the music.
//   2. If the phone or browser blocks that, we wait and play on the guest's very next
//      tap, key press or scroll-tap (the first moment the browser allows sound).
//   3. If a guest presses Pause, we never start it again by ourselves.
//   4. If the music file cannot load at all, the music button disappears (never broken).

const MusicContext = createContext(null);
const MUSIC_URL = `${import.meta.env.BASE_URL}music/wedding.mp3`;
const RETRY_EVENTS = ['pointerup', 'touchend', 'click', 'keydown'];

export function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const userPaused = useRef(false); // true once the guest has chosen to pause
  const stopRetry = useRef(null); // removes the "try again on next tap" listeners
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  // Create the player once, but do not load anything until the first play.
  useEffect(() => {
    const audio = new Audio();
    audio.src = MUSIC_URL;
    audio.loop = true;
    audio.preload = 'none';
    audio.volume = 0.6;
    audio.addEventListener('play', () => setPlaying(true));
    audio.addEventListener('pause', () => setPlaying(false));
    audio.addEventListener('error', () => {
      setPlaying(false);
      setAvailable(false);
    });
    audioRef.current = audio;
    return () => {
      if (stopRetry.current) stopRetry.current();
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      audioRef.current = null;
    };
  }, []);

  const clearRetry = () => {
    if (stopRetry.current) {
      stopRetry.current();
      stopRetry.current = null;
    }
  };

  const tryPlay = async () => {
    const audio = audioRef.current;
    if (!audio || !audio.paused) return;
    try {
      await audio.play();
      clearRetry();
    } catch (err) {
      if (err && err.name === 'NotAllowedError') {
        armRetry(); // blocked: try again on the guest's next tap
      } else if (!err || err.name !== 'AbortError') {
        setAvailable(false); // the file or format is not usable
      }
    }
  };

  function armRetry() {
    if (stopRetry.current) return;
    const handler = () => {
      clearRetry();
      if (!userPaused.current) tryPlay();
    };
    RETRY_EVENTS.forEach((e) => document.addEventListener(e, handler, { capture: true, passive: true }));
    stopRetry.current = () =>
      RETRY_EVENTS.forEach((e) => document.removeEventListener(e, handler, { capture: true }));
  }

  // Called when the guest taps the envelope seal.
  const start = () => {
    if (userPaused.current) return;
    tryPlay();
  };

  // Called by the small music button.
  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    clearRetry();
    if (audio.paused) {
      userPaused.current = false;
      await tryPlay();
    } else {
      userPaused.current = true;
      audio.pause();
    }
  };

  return (
    <MusicContext.Provider value={{ playing, available, start, toggle }}>{children}</MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used inside MusicProvider');
  return ctx;
}
