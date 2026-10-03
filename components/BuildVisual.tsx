import { Build } from "@/lib/types";

/** Small drawing at the top of each build card. */
export default function BuildVisual({ visual }: { visual: Build["visual"] }) {
  const p = { width: 260, height: 170, viewBox: "0 0 260 170", fill: "none", "aria-hidden": true } as const;
  switch (visual) {
    case "rover":
      return (
        <svg {...p}>
          <path d="M150 45a70 70 0 0 1 0 80" stroke="#D98E4A" strokeWidth="1.5" className="trace-slow" />
          <path d="M170 30a95 95 0 0 1 0 110" stroke="#D98E4A" strokeWidth="1.5" opacity=".5" className="trace-slow" />
          <rect x="40" y="50" width="100" height="70" rx="10" stroke="#EDEAE3" strokeWidth="1.5" />
          <rect x="52" y="34" width="36" height="16" rx="3" fill="#2A2F33" />
          <rect x="52" y="120" width="36" height="16" rx="3" fill="#2A2F33" />
          <circle cx="128" cy="72" r="7" stroke="#8C9298" strokeWidth="1.5" />
          <circle cx="128" cy="98" r="7" stroke="#8C9298" strokeWidth="1.5" />
          <rect x="66" y="70" width="36" height="30" rx="3" stroke="#8C9298" strokeWidth="1.2" />
        </svg>
      );
    case "greenhouse":
      return (
        <svg {...p}>
          <path d="M60 120a70 70 0 0 1 140 0" stroke="#2A2F33" strokeWidth="10" strokeLinecap="round" />
          <path d="M60 120a70 70 0 0 1 108-59" stroke="#E3B341" strokeWidth="10" strokeLinecap="round" />
          <path d="M130 120l34-40" stroke="#EDEAE3" strokeWidth="2" strokeLinecap="round" />
          <circle cx="130" cy="120" r="5" fill="#EDEAE3" />
          <text x="130" y="152" fill="#8C9298" fontFamily="JetBrains Mono, monospace" fontSize="11" textAnchor="middle">SOIL · RH 64%</text>
        </svg>
      );
    case "arm":
      return (
        <svg {...p}>
          <path d="M70 60a70 70 0 0 1 120 0" stroke="#6FA8FF" strokeWidth="1.5" strokeDasharray="3 6" />
          <rect x="95" y="128" width="70" height="22" rx="4" stroke="#EDEAE3" strokeWidth="1.5" />
          <rect x="118" y="96" width="24" height="32" rx="3" stroke="#8C9298" strokeWidth="1.5" />
          <path d="M110 96V72h40v24" stroke="#EDEAE3" strokeWidth="1.5" />
          <rect x="104" y="52" width="52" height="24" rx="4" stroke="#EDEAE3" strokeWidth="1.5" />
          <circle cx="130" cy="64" r="7" stroke="#6FA8FF" strokeWidth="1.5" />
        </svg>
      );
    case "booking":
      return (
        <svg {...p}>
          <rect x="20" y="30" width="150" height="104" rx="8" stroke="#8C9298" strokeWidth="1.5" />
          <path d="M20 48h150" stroke="#2A2F33" strokeWidth="1.5" />
          <rect x="32" y="60" width="40" height="62" rx="4" fill="#22272A" />
          <rect x="82" y="60" width="76" height="26" rx="4" stroke="#2A2F33" />
          <rect x="82" y="94" width="76" height="28" rx="4" stroke="#2A2F33" />
          <rect x="178" y="20" width="62" height="124" rx="12" fill="#111315" stroke="#EDEAE3" strokeWidth="1.5" />
          <rect x="188" y="44" width="42" height="18" rx="4" stroke="#D98E4A" strokeWidth="1.5" />
          <rect x="188" y="68" width="42" height="18" rx="4" stroke="#2A2F33" />
          <rect x="188" y="114" width="42" height="16" rx="6" fill="#D98E4A" />
        </svg>
      );
    case "saas":
      return (
        <svg {...p}>
          <rect x="20" y="20" width="220" height="130" rx="8" stroke="#8C9298" strokeWidth="1.5" />
          <rect x="34" y="34" width="60" height="30" rx="4" stroke="#2A2F33" />
          <rect x="100" y="34" width="60" height="30" rx="4" stroke="#2A2F33" />
          <rect x="166" y="34" width="60" height="30" rx="4" stroke="#E3B341" strokeWidth="1.5" />
          <path d="M36 132l30-18 28 8 30-26 30 10 30-30 40-8" stroke="#E3B341" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "api":
      return (
        <svg {...p} fontFamily="JetBrains Mono, monospace">
          <text x="24" y="44" fill="#6FA8FF" fontSize="12">GET</text>
          <text x="70" y="44" fill="#D6D2CA" fontSize="12">/v1/bookings</text>
          <text x="24" y="72" fill="#5BC98A" fontSize="12">POST</text>
          <text x="70" y="72" fill="#D6D2CA" fontSize="12">/v1/bookings</text>
          <text x="24" y="100" fill="#5BC98A" fontSize="12">POST</text>
          <text x="70" y="100" fill="#D6D2CA" fontSize="12">/v1/auth/login</text>
          <text x="24" y="128" fill="#E3B341" fontSize="12">PATCH</text>
          <text x="70" y="128" fill="#D6D2CA" fontSize="12">/v1/users/:id</text>
          <path d="M24 146h212" stroke="#6FA8FF" strokeWidth="1.5" className="trace-slow" />
        </svg>
      );
  }
}
