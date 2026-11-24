// Small decorative SVG pieces. They use "currentColor" so each theme can recolour them.

export function GoldDivider() {
  return (
    <div className="gold-divider" aria-hidden="true">
      <span className="gold-divider__line" />
      <svg viewBox="0 0 40 40" width="22" height="22">
        <g fill="none" stroke="currentColor" strokeWidth="1.4">
          <circle cx="20" cy="20" r="3" fill="currentColor" />
          <path d="M20 4 C24 11 24 15 20 17 C16 15 16 11 20 4 Z" />
          <path d="M20 36 C24 29 24 25 20 23 C16 25 16 29 20 36 Z" />
          <path d="M4 20 C11 16 15 16 17 20 C15 24 11 24 4 20 Z" />
          <path d="M36 20 C29 16 25 16 23 20 C25 24 29 24 36 20 Z" />
        </g>
      </svg>
      <span className="gold-divider__line" />
    </div>
  );
}

// Corner flourish for the hero. Rotate it with CSS for the four corners.
export function FloralCorner({ className = '' }) {
  return (
    <svg className={`floral-corner ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M6 6 C60 10 110 30 150 70 C180 100 190 140 194 194" opacity="0.7" />
        <path d="M6 6 C20 50 40 90 80 120 C110 142 150 150 194 194" opacity="0.45" />
        {/* lotus */}
        <g transform="translate(46 46)">
          <path d="M0 -26 C10 -14 10 -4 0 0 C-10 -4 -10 -14 0 -26 Z" />
          <path d="M26 0 C14 10 4 10 0 0 C4 -10 14 -10 26 0 Z" />
          <path d="M0 26 C-10 14 -10 4 0 0 C10 4 10 14 0 26 Z" />
          <path d="M-26 0 C-14 -10 -4 -10 0 0 C-4 10 -14 10 -26 0 Z" />
          <path d="M18 -18 C16 -6 8 -2 0 0 C2 -8 8 -16 18 -18 Z" />
          <path d="M-18 -18 C-16 -6 -8 -2 0 0 C-2 -8 -8 -16 -18 -18 Z" />
          <path d="M18 18 C16 6 8 2 0 0 C2 8 8 16 18 18 Z" />
          <path d="M-18 18 C-16 6 -8 2 0 0 C-2 8 -8 16 -18 18 Z" />
          <circle r="4" fill="currentColor" stroke="none" />
        </g>
        {/* leaves along the vine */}
        <path d="M96 38 c8 -4 14 0 14 8 c-8 4 -14 0 -14 -8 Z" />
        <path d="M140 66 c8 -2 14 4 12 12 c-8 2 -14 -4 -12 -12 Z" />
        <path d="M168 110 c6 -5 14 -2 15 6 c-7 5 -14 2 -15 -6 Z" />
        <path d="M40 98 c-2 -8 4 -14 12 -12 c2 8 -4 14 -12 12 Z" />
        <path d="M62 134 c-5 -6 -2 -14 6 -15 c5 7 2 14 -6 15 Z" />
      </g>
    </svg>
  );
}

// Repeating border strip (mango-leaf style "toranam") used between sections.
export function Toranam() {
  return (
    <div className="toranam" aria-hidden="true">
      <svg width="100%" height="26" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="toranam-pattern" width="36" height="26" patternUnits="userSpaceOnUse">
            <path d="M0 2 H36" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            <path d="M18 4 C24 10 24 17 18 24 C12 17 12 10 18 4 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="18" cy="24" r="1.4" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="26" fill="url(#toranam-pattern)" />
      </svg>
    </div>
  );
}
