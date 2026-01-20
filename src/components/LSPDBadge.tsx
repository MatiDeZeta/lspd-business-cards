export default function LSPDBadge() {
  return (
    <svg viewBox="0 0 100 130" className="w-full h-full">
      <defs>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4a520" />
          <stop offset="30%" stopColor="#f7dc6f" />
          <stop offset="50%" stopColor="#f4d03f" />
          <stop offset="70%" stopColor="#d4a520" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
        <linearGradient id="goldDark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c9a227" />
          <stop offset="100%" stopColor="#8b6914" />
        </linearGradient>
        <linearGradient id="silver" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8e8e8" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#c0c0c0" />
        </linearGradient>
        <linearGradient id="navy" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#0d1f33" />
        </linearGradient>
      </defs>

      {/* Outer shield */}
      <path
        d="M50 3 L93 18 L93 55 Q93 105 50 125 Q7 105 7 55 L7 18 Z"
        fill="url(#gold)"
        stroke="#8b6914"
        strokeWidth="1"
      />

      {/* Inner shield */}
      <path
        d="M50 10 L85 23 L85 53 Q85 97 50 115 Q15 97 15 53 L15 23 Z"
        fill="url(#navy)"
        stroke="url(#gold)"
        strokeWidth="1.5"
      />

      {/* POLICE OFFICER arc text at top */}
      <path id="topArc" d="M22 38 Q50 18 78 38" fill="none" />
      <text fontSize="5" fill="#f4d03f" fontFamily="Arial, sans-serif" fontWeight="bold">
        <textPath href="#topArc" startOffset="50%" textAnchor="middle">
          POLICE OFFICER
        </textPath>
      </text>

      {/* Center building/city hall icon */}
      <g transform="translate(35, 42)">
        {/* Building base */}
        <rect x="8" y="20" width="14" height="18" fill="#f4d03f" />
        {/* Tower */}
        <rect x="11" y="8" width="8" height="12" fill="#f4d03f" />
        {/* Dome */}
        <ellipse cx="15" cy="8" rx="5" ry="4" fill="#f4d03f" />
        {/* Spire */}
        <line x1="15" y1="4" x2="15" y2="0" stroke="#f4d03f" strokeWidth="1" />
        {/* Windows */}
        <rect x="10" y="24" width="2" height="3" fill="#1e3a5f" />
        <rect x="14" y="24" width="2" height="3" fill="#1e3a5f" />
        <rect x="18" y="24" width="2" height="3" fill="#1e3a5f" />
        {/* Door */}
        <rect x="13" y="32" width="4" height="6" fill="#1e3a5f" />
      </g>

      {/* LOS ANGELES arc text at bottom of building */}
      <path id="bottomArc" d="M20 82 Q50 95 80 82" fill="none" />
      <text fontSize="5" fill="#f4d03f" fontFamily="Arial, sans-serif" fontWeight="bold">
        <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
          LOS SANTOS POLICE
        </textPath>
      </text>

      {/* Serial number plate */}
      <rect x="30" y="88" width="40" height="12" rx="1" fill="url(#silver)" stroke="#8b6914" strokeWidth="0.5" />
      <text x="50" y="97" textAnchor="middle" fontSize="7" fontWeight="bold" fontFamily="Arial, sans-serif" fill="#1a1a1a">
        LSPD
      </text>

      {/* Bottom banner */}
      <path d="M20 105 L80 105 L75 115 L25 115 Z" fill="url(#gold)" />
      <text x="50" y="112" textAnchor="middle" fontSize="5" fontWeight="bold" fontFamily="serif" fill="#1a1a1a">
        CITY OF LOS SANTOS
      </text>
    </svg>
  );
}
