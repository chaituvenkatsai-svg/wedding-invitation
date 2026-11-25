import { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../services/LanguageContext.jsx';

// Full-screen photo viewer. Works with the arrow buttons, the keyboard
// (Esc, left and right arrows) and by swiping on a phone.
export default function Lightbox({ photos, index, onClose, onChange }) {
  const { t } = useLanguage();
  const touchStartX = useRef(null);
  const count = photos.length;

  const prev = () => onChange((index - 1 + count) % count);
  const next = () => onChange((index + 1) % count);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onChange((index - 1 + count) % count);
      else if (e.key === 'ArrowRight') onChange((index + 1) % count);
    };
    window.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [index, count, onClose, onChange]);

  const photo = photos[index];
  const base = import.meta.env.BASE_URL;

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  };

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button className="lightbox__btn lightbox__close" onClick={onClose} aria-label={t.lightbox.close}>
        <X size={24} />
      </button>
      {count > 1 && (
        <button
          className="lightbox__btn lightbox__prev"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label={t.lightbox.prev}
        >
          <ChevronLeft size={28} />
        </button>
      )}
      <img
        key={photo.full}
        className="lightbox__img"
        src={`${base}${photo.full}`}
        alt={photo.alt}
        onClick={(e) => e.stopPropagation()}
      />
      {count > 1 && (
        <button
          className="lightbox__btn lightbox__next"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label={t.lightbox.next}
        >
          <ChevronRight size={28} />
        </button>
      )}
      <p className="lightbox__count">
        {index + 1} / {count}
      </p>
    </div>
  );
}
