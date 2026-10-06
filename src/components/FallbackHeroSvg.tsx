export function FallbackHeroSvg() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8 select-none">
      <svg
        viewBox="0 0 600 500"
        className="w-full max-w-[500px] h-auto overflow-visible drop-shadow-2xl"
        fill="none"
      >
        {/* Record Sleeve behind on the right */}
        <g transform="translate(180, 40) rotate(6)">
          <rect
            x="0"
            y="0"
            width="340"
            height="340"
            fill="#0B0F20"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
          />
          {/* Subtle glow */}
          <circle cx="80" cy="80" r="120" fill="url(#sleeveGlow)" opacity="0.6" />
          {/* Sleeve border */}
          <rect
            x="16"
            y="16"
            width="308"
            height="308"
            fill="none"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1"
          />
          {/* Text */}
          <text
            x="32"
            y="70"
            fill="#FFFFFF"
            fontFamily="'Inter Tight', sans-serif"
            fontWeight="800"
            fontSize="36"
          >
            KNOW-TA!
          </text>
          <text
            x="32"
            y="95"
            fill="var(--white)"
            fontFamily="'JetBrains Mono', monospace"
            fontWeight="700"
            fontSize="13"
          >
            STEM SPLIT
          </text>
          <text
            x="32"
            y="135"
            fill="rgba(255, 255, 255, 0.6)"
            fontFamily="'JetBrains Mono', monospace"
            fontSize="10"
          >
            // TWO-BRANCH DEEP LEARNING
          </text>
          <text
            x="32"
            y="155"
            fill="rgba(255, 255, 255, 0.6)"
            fontFamily="'JetBrains Mono', monospace"
            fontSize="10"
          >
            AUDIO: EFFICIENTNET-B0
          </text>
          <text
            x="32"
            y="175"
            fill="rgba(255, 255, 255, 0.6)"
            fontFamily="'JetBrains Mono', monospace"
            fontSize="10"
          >
            VOCAL: BI-LSTM PROSODIC
          </text>
          {/* Waveform */}
          <path
            d="M 32 230 Q 60 210, 90 230 T 150 230 T 210 230 T 270 230 T 308 230"
            stroke="var(--color-human)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 32 245 Q 60 260, 90 245 T 150 245 T 210 245 T 270 245 T 308 245"
            stroke="var(--color-ai)"
            strokeWidth="1.5"
            fill="none"
          />
          <rect
            x="200"
            y="265"
            width="108"
            height="45"
            fill="none"
            stroke="var(--color-ai)"
            strokeWidth="1.5"
          />
          <text
            x="212"
            y="285"
            fill="var(--color-ai)"
            fontFamily="'JetBrains Mono', monospace"
            fontWeight="700"
            fontSize="9"
          >
            BENCHMARK
          </text>
        </g>

        {/* Standing Vinyl Disc in front */}
        <g transform="translate(190, 240)">
          {/* Outer vinyl disc */}
          <circle cx="0" cy="0" r="170" fill="#080A10" stroke="var(--gray-500)" strokeWidth="2" />
          {/* Grooves */}
          <circle cx="0" cy="0" r="150" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
          <circle cx="0" cy="0" r="135" fill="none" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" />
          <circle cx="0" cy="0" r="120" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
          <circle cx="0" cy="0" r="105" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
          <circle cx="0" cy="0" r="90" fill="none" stroke="rgba(255, 255, 255, 0.09)" strokeWidth="1" />
          {/* Center label */}
          <circle cx="0" cy="0" r="70" fill="#111A33" stroke="var(--white)" strokeWidth="3" />
          <text
            x="0"
            y="-16"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="'Inter Tight', sans-serif"
            fontWeight="800"
            fontSize="14"
          >
            KNOW-TA!
          </text>
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fill="var(--color-human)"
            fontFamily="'JetBrains Mono', monospace"
            fontWeight="700"
            fontSize="8"
          >
            STEM A // VOCAL
          </text>
          <text
            x="0"
            y="18"
            textAnchor="middle"
            fill="var(--color-ai)"
            fontFamily="'JetBrains Mono', monospace"
            fontWeight="700"
            fontSize="8"
          >
            STEM B // AUDIO
          </text>
          {/* Spindle hole */}
          <circle cx="0" cy="0" r="8" fill="#06080F" />
        </g>

        {/* Gradients */}
        <defs>
          <radialGradient id="sleeveGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--white)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0B0F20" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
