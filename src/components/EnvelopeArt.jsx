// Festive illustration for the small card that slides out of the envelope.
// Pure SVG + CSS (no images, no libraries): a wedding mandap with a kalash, two diyas,
// lotus flowers, hanging marigold strands and floating petals.
// The animations only run once the envelope has been opened (see global.css).

const TASSELS = Array.from({ length: 16 }, (_, i) => 70 + i * 10);

// Hanging marigold strand: x = position, len = length
function Strand({ x, len, delay }) {
  const dots = [];
  for (let y = 8; y < len; y += 7) dots.push(y);
  return (
    <g className="ea-sway" style={{ animationDelay: `${delay}s` }}>
      <line x1={x} y1="2" x2={x} y2={len} stroke="#8d6a22" strokeWidth="0.7" />
      {dots.map((y, i) => (
        <circle key={y} cx={x} cy={y} r="2.7" fill={i % 2 ? '#e6b84a' : '#e8892b'} />
      ))}
      <circle cx={x} cy={len + 3} r="4" fill="#e8892b" stroke="#b8913a" strokeWidth="0.6" />
    </g>
  );
}

function Diya({ x }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <circle className="ea-glow" cx="0" cy="112" r="13" fill="url(#ea-glow)" />
      <path d="M-10 119 C-8 128 8 128 10 119 Z" fill="url(#ea-gold)" stroke="#8d6a22" strokeWidth="0.6" />
      <path d="M-11 119 H11" stroke="#8d6a22" strokeWidth="1" strokeLinecap="round" />
      <path className="ea-flame" d="M0 118.5 C-4 113 -3 108 0 103 C3 108 4 113 0 118.5Z" fill="#ffb52e" />
      <path className="ea-flame ea-flame--inner" d="M0 118 C-2 115 -1.5 111.5 0 109.5 C1.5 111.5 2 115 0 118Z" fill="#fff3c4" />
    </g>
  );
}

// Petals that drift down slowly. dx = sideways drift, rot = spin, d = seconds, s = start delay
const PETALS = [
  { x: 34, c: '#f2a6b3', dx: 14, rot: 200, d: 7, s: 0 },
  { x: 62, c: '#e8892b', dx: -10, rot: -180, d: 8.5, s: 2.2 },
  { x: 96, c: '#f6d27a', dx: 16, rot: 240, d: 7.5, s: 4.1 },
  { x: 128, c: '#f9dde2', dx: -12, rot: -220, d: 9, s: 1.2 },
  { x: 164, c: '#f2a6b3', dx: 12, rot: 190, d: 8, s: 5.3 },
  { x: 198, c: '#e8892b', dx: -16, rot: -240, d: 7.2, s: 3.1 },
  { x: 232, c: '#f6d27a', dx: 10, rot: 210, d: 8.8, s: 6.2 },
  { x: 262, c: '#f9dde2', dx: -14, rot: -200, d: 7.8, s: 0.8 },
  { x: 148, c: '#e8892b', dx: 8, rot: 160, d: 9.4, s: 7.0 },
];

export default function EnvelopeArt() {
  return (
    <svg className="ea" viewBox="0 0 300 145" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="ea-glow">
          <stop offset="0" stopColor="#ffd98a" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ea-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ecd18a" />
          <stop offset="1" stopColor="#b8913a" />
        </linearGradient>
        <g id="ea-lotus">
          <path d="M0 0 C-6 -5 -6 -13 0 -19 C6 -13 6 -5 0 0Z" transform="rotate(-70)" fill="#fbe9ec" stroke="#b8913a" strokeWidth="0.7" />
          <path d="M0 0 C-6 -5 -6 -13 0 -19 C6 -13 6 -5 0 0Z" transform="rotate(70)" fill="#fbe9ec" stroke="#b8913a" strokeWidth="0.7" />
          <path d="M0 0 C-6 -5 -6 -13 0 -19 C6 -13 6 -5 0 0Z" transform="rotate(-38)" fill="#f7d3da" stroke="#b8913a" strokeWidth="0.7" />
          <path d="M0 0 C-6 -5 -6 -13 0 -19 C6 -13 6 -5 0 0Z" transform="rotate(38)" fill="#f7d3da" stroke="#b8913a" strokeWidth="0.7" />
          <path d="M0 0 C-6 -5 -6 -13 0 -19 C6 -13 6 -5 0 0Z" fill="#f2a6b3" stroke="#b8913a" strokeWidth="0.7" />
        </g>
      </defs>

      {/* hanging marigold strands */}
      <Strand x={26} len={28} delay={0} />
      <Strand x={46} len={40} delay={0.6} />
      <Strand x={254} len={40} delay={0.3} />
      <Strand x={274} len={28} delay={0.9} />

      {/* mandap roof */}
      <circle cx="150" cy="5" r="2.6" fill="url(#ea-gold)" />
      <line x1="150" y1="7" x2="150" y2="13" stroke="#b8913a" strokeWidth="1.2" />
      <path d="M150 12 C130 22 100 36 68 46 L232 46 C200 36 170 22 150 12Z" fill="#7a1d3a" stroke="#b8913a" strokeWidth="1" />
      <path d="M150 15 C141 26 122 38 102 45" fill="none" stroke="#d4b36a" strokeWidth="0.7" opacity="0.7" />
      <path d="M150 15 C159 26 178 38 198 45" fill="none" stroke="#d4b36a" strokeWidth="0.7" opacity="0.7" />
      <circle cx="150" cy="31" r="3" fill="url(#ea-gold)" />
      <rect x="66" y="44" width="168" height="4.5" rx="1" fill="url(#ea-gold)" />
      {TASSELS.map((x) => (
        <path key={x} d={`M${x} 48.5 l5 0 l-2.5 6z`} fill="#b8913a" />
      ))}

      {/* pillars */}
      <rect x="79" y="55" width="6" height="70" fill="url(#ea-gold)" />
      <rect x="76" y="52" width="12" height="4" rx="1" fill="#b8913a" />
      <rect x="76" y="123" width="12" height="4" rx="1" fill="#b8913a" />
      <rect x="215" y="55" width="6" height="70" fill="url(#ea-gold)" />
      <rect x="212" y="52" width="12" height="4" rx="1" fill="#b8913a" />
      <rect x="212" y="123" width="12" height="4" rx="1" fill="#b8913a" />

      {/* flower garland between the pillars */}
      <path d="M85 58 C112 86 188 86 215 58" fill="none" stroke="#5f7d3b" strokeWidth="6.5" strokeLinecap="round" strokeDasharray="0.1 5.2" opacity="0.8" />
      <path d="M85 58 C112 86 188 86 215 58" fill="none" stroke="#e8892b" strokeWidth="5" strokeLinecap="round" strokeDasharray="0.1 6.4" />
      <path d="M85 59 C112 87 188 87 215 59" fill="none" stroke="#f2c14e" strokeWidth="3" strokeLinecap="round" strokeDasharray="0.1 6.4" strokeDashoffset="3" />

      {/* kalash */}
      <circle className="ea-glow" cx="150" cy="104" r="30" fill="url(#ea-glow)" />
      <g>
        {[-48, -24, 24, 48].map((a) => (
          <path key={a} d="M150 98 C144 91 144 83 150 78 C156 83 156 91 150 98Z" transform={`rotate(${a} 150 98)`} fill="#4f7a3a" stroke="#355a26" strokeWidth="0.5" />
        ))}
        <path d="M150 98 C144 91 144 83 150 78 C156 83 156 91 150 98Z" fill="#5d8a44" stroke="#355a26" strokeWidth="0.5" />
        <circle cx="150" cy="91" r="7.5" fill="#c98a3a" stroke="#8d6a22" strokeWidth="0.7" />
        <circle cx="148" cy="89" r="0.9" fill="#8d6a22" />
        <circle cx="152" cy="89" r="0.9" fill="#8d6a22" />
        <circle cx="150" cy="92.5" r="0.9" fill="#8d6a22" />
        <rect x="136" y="97" width="28" height="4" rx="2" fill="url(#ea-gold)" stroke="#8d6a22" strokeWidth="0.5" />
        <path d="M138 101 C133 110 135 122 144 124.5 L156 124.5 C165 122 167 110 162 101Z" fill="url(#ea-gold)" stroke="#8d6a22" strokeWidth="0.7" />
        <path d="M136.5 111 Q150 116 163.5 111" fill="none" stroke="#7a1d3a" strokeWidth="1" />
        <circle cx="150" cy="117" r="1.8" fill="#7a1d3a" />
      </g>

      {/* diyas */}
      <Diya x={112} />
      <Diya x={188} />

      {/* base and lotus flowers */}
      <rect x="62" y="127" width="176" height="3" rx="1.5" fill="url(#ea-gold)" />
      <rect x="74" y="130" width="152" height="2.5" rx="1.2" fill="#d4b36a" opacity="0.8" />
      <use href="#ea-lotus" transform="translate(58 126) scale(0.9)" />
      <use href="#ea-lotus" transform="translate(242 126) scale(0.9)" />

      {/* floating petals */}
      {PETALS.map((p, i) => (
        <ellipse
          key={i}
          className="ea-petal"
          cx={p.x}
          cy="0"
          rx="2.8"
          ry="1.7"
          fill={p.c}
          style={{ '--dx': `${p.dx}px`, '--rot': `${p.rot}deg`, animationDuration: `${p.d}s`, animationDelay: `${p.s}s` }}
        />
      ))}
    </svg>
  );
}
