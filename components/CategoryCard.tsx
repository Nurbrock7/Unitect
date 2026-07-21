"use client";

import Link from "next/link";

type Props = {
  slug: string;
  name: string;
  description: string;
  isActive: boolean;
};

const illustrations: Record<string, React.ReactNode> = {
  "cable-ties": (
    <svg viewBox="0 0 120 80" className="h-full w-full" fill="none">
      {/* Cable bundle */}
      <line x1="10" y1="28" x2="110" y2="28" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round"/>
      <line x1="10" y1="40" x2="110" y2="40" stroke="#7f8ea3" strokeWidth="6" strokeLinecap="round"/>
      <line x1="10" y1="52" x2="110" y2="52" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round"/>
      {/* Cable tie strap */}
      <rect x="55" y="18" width="10" height="44" rx="5" fill="#cc2121"/>
      {/* Cable tie head/lock */}
      <rect x="52" y="14" width="16" height="10" rx="3" fill="#a81a1a"/>
      {/* Tail */}
      <line x1="60" y1="62" x2="60" y2="72" stroke="#cc2121" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  ),
  "heat-shrink-tubing": (
    <svg viewBox="0 0 120 80" className="h-full w-full" fill="none">
      {/* Tubes in perspective */}
      <ellipse cx="30" cy="60" rx="12" ry="6" fill="#1a1a1a" stroke="#cc2121" strokeWidth="1.5"/>
      <rect x="18" y="20" width="24" height="40" fill="#cc2121" opacity="0.9"/>
      <ellipse cx="30" cy="20" rx="12" ry="6" fill="#e03030" stroke="#cc2121" strokeWidth="1"/>
      <ellipse cx="30" cy="20" rx="7" ry="3.5" fill="#1a1a1a"/>

      <ellipse cx="62" cy="60" rx="12" ry="6" fill="#1a1a1a" stroke="#1b2d6e" strokeWidth="1.5"/>
      <rect x="50" y="14" width="24" height="46" fill="#1b2d6e" opacity="0.9"/>
      <ellipse cx="62" cy="14" rx="12" ry="6" fill="#2a3f8f" stroke="#1b2d6e" strokeWidth="1"/>
      <ellipse cx="62" cy="14" rx="7" ry="3.5" fill="#1a1a1a"/>

      <ellipse cx="93" cy="60" rx="12" ry="6" fill="#1a1a1a" stroke="#555" strokeWidth="1.5"/>
      <rect x="81" y="24" width="24" height="36" fill="#3a3a3a" opacity="0.9"/>
      <ellipse cx="93" cy="24" rx="12" ry="6" fill="#4a4a4a" stroke="#555" strokeWidth="1"/>
      <ellipse cx="93" cy="24" rx="7" ry="3.5" fill="#1a1a1a"/>
    </svg>
  ),
  "cable-markers": (
    <svg viewBox="0 0 120 80" className="h-full w-full" fill="none">
      {/* Cable */}
      <line x1="5" y1="40" x2="115" y2="40" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round"/>
      {/* Markers clipped on */}
      <rect x="22" y="28" width="14" height="24" rx="2" fill="#f5c518"/>
      <text x="29" y="44" textAnchor="middle" fill="#1a1a1a" fontSize="10" fontWeight="bold">1</text>

      <rect x="44" y="28" width="14" height="24" rx="2" fill="#f5c518"/>
      <text x="51" y="44" textAnchor="middle" fill="#1a1a1a" fontSize="10" fontWeight="bold">2</text>

      <rect x="66" y="28" width="14" height="24" rx="2" fill="#f5c518"/>
      <text x="73" y="44" textAnchor="middle" fill="#1a1a1a" fontSize="10" fontWeight="bold">3</text>

      <rect x="88" y="28" width="14" height="24" rx="2" fill="#cc2121"/>
      <text x="95" y="44" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">A</text>
    </svg>
  ),
  "ferrules": (
    <svg viewBox="0 0 120 80" className="h-full w-full" fill="none">
      {/* Red ferrule */}
      <rect x="15" y="30" width="20" height="28" rx="3" fill="#cc2121"/>
      <rect x="18" y="26" width="14" height="10" rx="2" fill="#a81a1a"/>
      <line x1="25" y1="26" x2="25" y2="18" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>

      {/* Blue ferrule */}
      <rect x="50" y="28" width="20" height="30" rx="3" fill="#1b2d6e"/>
      <rect x="53" y="24" width="14" height="10" rx="2" fill="#162458"/>
      <line x1="60" y1="24" x2="60" y2="16" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>

      {/* Yellow ferrule */}
      <rect x="85" y="32" width="20" height="26" rx="3" fill="#f5c518"/>
      <rect x="88" y="28" width="14" height="10" rx="2" fill="#d4a800"/>
      <line x1="95" y1="28" x2="95" y2="20" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>

      {/* Ring terminal */}
      <circle cx="25" cy="64" r="6" fill="none" stroke="#cc2121" strokeWidth="3"/>
      <circle cx="25" cy="64" r="2" fill="#1a1a1a"/>
      <circle cx="60" cy="64" r="6" fill="none" stroke="#1b2d6e" strokeWidth="3"/>
      <circle cx="60" cy="64" r="2" fill="#1a1a1a"/>
      <circle cx="95" cy="64" r="6" fill="none" stroke="#f5c518" strokeWidth="3"/>
      <circle cx="95" cy="64" r="2" fill="#1a1a1a"/>
    </svg>
  ),
  "cable-glands": (
    <svg viewBox="0 0 120 80" className="h-full w-full" fill="none">
      {/* Gland body - hexagonal */}
      <polygon points="60,10 80,20 80,45 60,55 40,45 40,20" fill="#4a4a4a" stroke="#cc2121" strokeWidth="2"/>
      <polygon points="60,16 76,24 76,41 60,49 44,41 44,24" fill="#333"/>
      {/* Thread section */}
      <rect x="48" y="55" width="24" height="16" rx="2" fill="#3a3a3a"/>
      <line x1="48" y1="59" x2="72" y2="59" stroke="#555" strokeWidth="1"/>
      <line x1="48" y1="63" x2="72" y2="63" stroke="#555" strokeWidth="1"/>
      <line x1="48" y1="67" x2="72" y2="67" stroke="#555" strokeWidth="1"/>
      {/* Cable through */}
      <line x1="60" y1="2" x2="60" y2="16" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round"/>
      <line x1="60" y1="49" x2="60" y2="71" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round"/>
      {/* Lock ring accent */}
      <circle cx="60" cy="32" r="10" fill="none" stroke="#cc2121" strokeWidth="1.5" strokeDasharray="3,2"/>
    </svg>
  ),
  "identification-labels": (
    <svg viewBox="0 0 120 80" className="h-full w-full" fill="none">
      {/* Main label */}
      <rect x="10" y="15" width="60" height="40" rx="4" fill="#e8e8e8"/>
      <circle cx="20" cy="22" r="4" fill="#aaa"/>
      <line x1="28" y1="30" x2="62" y2="30" stroke="#555" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="28" y1="37" x2="62" y2="37" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
      <line x1="28" y1="44" x2="50" y2="44" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
      {/* Red warning label */}
      <rect x="50" y="30" width="60" height="38" rx="4" fill="#cc2121"/>
      <line x1="58" y1="40" x2="102" y2="40" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="58" y1="47" x2="102" y2="47" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"/>
      <line x1="58" y1="54" x2="84" y2="54" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"/>
      {/* Blue label */}
      <rect x="30" y="48" width="45" height="28" rx="4" fill="#1b2d6e"/>
      <line x1="38" y1="57" x2="68" y2="57" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="38" y1="64" x2="68" y2="64" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  "cable-management": (
    <svg viewBox="0 0 120 80" className="h-full w-full" fill="none">
      {/* Trunking profile */}
      <rect x="10" y="22" width="100" height="36" rx="3" fill="#3a3a3a" stroke="#cc2121" strokeWidth="1.5"/>
      <rect x="14" y="26" width="92" height="28" rx="2" fill="#2a2a2a"/>
      {/* Cables inside */}
      <line x1="20" y1="40" x2="100" y2="40" stroke="#cc2121" strokeWidth="4" strokeLinecap="round"/>
      <line x1="20" y1="33" x2="100" y2="33" stroke="#1b2d6e" strokeWidth="4" strokeLinecap="round"/>
      <line x1="20" y1="47" x2="100" y2="47" stroke="#4a90d9" strokeWidth="4" strokeLinecap="round"/>
      {/* Lid */}
      <rect x="10" y="16" width="100" height="8" rx="2" fill="#cc2121" opacity="0.85"/>
      {/* Mounting slots */}
      <rect x="22" y="55" width="6" height="4" rx="1" fill="#555"/>
      <rect x="56" y="55" width="6" height="4" rx="1" fill="#555"/>
      <rect x="92" y="55" width="6" height="4" rx="1" fill="#555"/>
    </svg>
  ),
  "tapes-insulation": (
    <svg viewBox="0 0 120 80" className="h-full w-full" fill="none">
      {/* Tape roll - main */}
      <circle cx="50" cy="40" r="28" fill="#1b2d6e" stroke="#cc2121" strokeWidth="2"/>
      <circle cx="50" cy="40" r="18" fill="#2a2a2a"/>
      <circle cx="50" cy="40" r="10" fill="#1a1a1a"/>
      {/* Tape unrolling */}
      <path d="M 66 28 Q 90 20 100 30 Q 112 38 108 55" stroke="#1b2d6e" strokeWidth="10" fill="none" strokeLinecap="round"/>
      <path d="M 66 28 Q 90 20 100 30 Q 112 38 108 55" stroke="#2a3f8f" strokeWidth="6" fill="none" strokeLinecap="round"/>
      {/* Small tape roll */}
      <circle cx="96" cy="60" r="12" fill="#cc2121" stroke="#a81a1a" strokeWidth="1.5"/>
      <circle cx="96" cy="60" r="6" fill="#2a2a2a"/>
      <circle cx="96" cy="60" r="3" fill="#1a1a1a"/>
    </svg>
  ),
  "cable-sleeving": (
    <svg viewBox="0 0 120 80" className="h-full w-full" fill="none">
      {/* Corrugated tube - left open */}
      <ellipse cx="20" cy="40" rx="10" ry="16" fill="none" stroke="#94a3b8" strokeWidth="2"/>
      <ellipse cx="20" cy="40" rx="6" ry="10" fill="#1a1a1a"/>
      {/* Braided woven pattern */}
      {[30,40,50,60,70,80,90,100].map((x, i) => (
        <ellipse key={x} cx={x} cy={40} rx={4} ry={16} fill={i % 2 === 0 ? "#3a3a3a" : "#2d2d2d"} stroke="#cc2121" strokeWidth="1"/>
      ))}
      {/* Right open end */}
      <ellipse cx="110" cy="40" rx="10" ry="16" fill="none" stroke="#94a3b8" strokeWidth="2"/>
      {/* Inner cables peek */}
      <ellipse cx="110" cy="40" rx="6" ry="10" fill="#1a1a1a"/>
      <line x1="110" y1="34" x2="118" y2="32" stroke="#cc2121" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="110" y1="40" x2="118" y2="40" stroke="#1b2d6e" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="110" y1="46" x2="118" y2="48" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  "connectors": (
    <svg viewBox="0 0 120 80" className="h-full w-full" fill="none">
      {/* Connector strip body */}
      <rect x="15" y="25" width="90" height="30" rx="3" fill="#3a3a3a" stroke="#555" strokeWidth="1"/>
      {/* Individual connector blocks */}
      {[20, 36, 52, 68, 84].map((x) => (
        <g key={x}>
          <rect x={x} y="28" width="13" height="24" rx="2" fill="#2a2a2a" stroke="#cc2121" strokeWidth="1"/>
          {/* Top screw */}
          <circle cx={x + 6.5} cy="34" r="3.5" fill="#4a4a4a" stroke="#666" strokeWidth="1"/>
          <line x1={x + 4.5} y1="34" x2={x + 8.5} y2="34" stroke="#888" strokeWidth="1"/>
          <line x1={x + 6.5} y1="32" x2={x + 6.5} y2="36" stroke="#888" strokeWidth="1"/>
          {/* Bottom screw */}
          <circle cx={x + 6.5} cy="45" r="3.5" fill="#4a4a4a" stroke="#666" strokeWidth="1"/>
          <line x1={x + 4.5} y1="45" x2={x + 8.5} y2="45" stroke="#888" strokeWidth="1"/>
          <line x1={x + 6.5} y1="43" x2={x + 6.5} y2="47" stroke="#888" strokeWidth="1"/>
        </g>
      ))}
      {/* Wires entering top */}
      {[26, 43, 59, 75, 91].map((x, i) => (
        <line key={x} x1={x} y1="25" x2={x} y2="12" stroke={["#cc2121","#94a3b8","#1b2d6e","#f5c518","#cc2121"][i]} strokeWidth="3" strokeLinecap="round"/>
      ))}
    </svg>
  ),
  "wiring-accessories": (
    <svg viewBox="0 0 120 80" className="h-full w-full" fill="none">
      {/* Large grommet */}
      <circle cx="38" cy="38" r="22" fill="#3a3a3a" stroke="#cc2121" strokeWidth="2"/>
      <circle cx="38" cy="38" r="13" fill="#1a1a1a"/>
      <circle cx="38" cy="38" r="8" fill="#2a2a2a"/>
      {/* Snap bushing */}
      <rect x="72" y="20" width="30" height="24" rx="12" fill="#3a3a3a" stroke="#1b2d6e" strokeWidth="2"/>
      <rect x="78" y="26" width="18" height="12" rx="6" fill="#1a1a1a"/>
      {/* Small grommet */}
      <circle cx="87" cy="57" r="13" fill="#3a3a3a" stroke="#cc2121" strokeWidth="1.5"/>
      <circle cx="87" cy="57" r="8" fill="#1a1a1a"/>
      <circle cx="87" cy="57" r="4" fill="#2a2a2a"/>
      {/* Cable through large grommet */}
      <line x1="38" y1="2" x2="38" y2="26" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round"/>
      <line x1="38" y1="50" x2="38" y2="72" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round"/>
    </svg>
  ),
  "stainless-steel": (
    <svg viewBox="0 0 120 80" className="h-full w-full" fill="none">
      {/* SS strap */}
      <path d="M 10 38 L 85 38" stroke="url(#ss-grad)" strokeWidth="8" strokeLinecap="round"/>
      {/* Ball lock head */}
      <rect x="80" y="30" width="22" height="16" rx="4" fill="#8a9ba8" stroke="#b0c0cc" strokeWidth="1.5"/>
      <circle cx="91" cy="38" r="4" fill="#5a6a74" stroke="#b0c0cc" strokeWidth="1"/>
      {/* Strap tail */}
      <path d="M 80 35 Q 75 25 68 28" stroke="#8a9ba8" strokeWidth="6" fill="none" strokeLinecap="round"/>
      {/* Steel shine lines */}
      <line x1="12" y1="35" x2="78" y2="35" stroke="#c8d8e0" strokeWidth="1.5" opacity="0.6"/>
      {/* Bundle of cables being secured */}
      <line x1="10" y1="22" x2="115" y2="22" stroke="#555" strokeWidth="5" strokeLinecap="round"/>
      <line x1="10" y1="30" x2="115" y2="30" stroke="#4a4a4a" strokeWidth="5" strokeLinecap="round"/>
      <line x1="10" y1="46" x2="115" y2="46" stroke="#555" strokeWidth="5" strokeLinecap="round"/>
      <line x1="10" y1="54" x2="115" y2="54" stroke="#4a4a4a" strokeWidth="5" strokeLinecap="round"/>
      <defs>
        <linearGradient id="ss-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8a9ba8"/>
          <stop offset="50%" stopColor="#c8d8e0"/>
          <stop offset="100%" stopColor="#8a9ba8"/>
        </linearGradient>
      </defs>
    </svg>
  ),
};

export default function CategoryCard({ slug, name, description, isActive }: Props) {
  const illustration = illustrations[slug];

  return (
    <Link
      href={isActive ? "/products" : `/products?category=${slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-xl transition-all duration-200 ${
        isActive
          ? "ring-2 ring-accent shadow-lg shadow-accent/20"
          : "hover:shadow-lg hover:shadow-black/40 hover:-translate-y-0.5"
      }`}
    >
      {/* Charcoal background illustration area */}
      <div
        className="relative flex h-36 items-center justify-center overflow-hidden"
        style={{ background: "radial-gradient(ellipse at center, #3a3a3a 0%, #1e1e1e 100%)" }}
      >
        {illustration ? (
          <div className="h-24 w-24 drop-shadow-lg">{illustration}</div>
        ) : (
          <svg className="h-14 w-14 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        )}

        {/* Active tick badge */}
        {isActive && (
          <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent">
            <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        {/* Hover shine */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white/0 transition-all duration-300 group-hover:from-white/5 group-hover:to-white/0" />
      </div>

      {/* Label */}
      <div className={`px-3 py-2.5 ${isActive ? "bg-accent" : "bg-[#242424] group-hover:bg-[#2c2c2c]"}`}>
        <p className={`text-xs font-bold leading-tight ${isActive ? "text-white" : "text-neutral-100"}`}>
          {name}
        </p>
        {description && (
          <p className="mt-0.5 truncate text-[10px] text-neutral-400">{description}</p>
        )}
      </div>
    </Link>
  );
}
