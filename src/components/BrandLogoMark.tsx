import React, { useState, useEffect } from 'react';

interface BrandLogoMarkProps {
  size?: number;
  height?: number;
  className?: string;
  interactive?: boolean;
}

/**
 * BrandLogoMark
 * 
 * 3D Geometric Architectural NCK Emblem:
 * - Direct representation of the official 3D interlocking NCK emblem:
 *   - 'N': Warm 3D amber/orange beveled gradient with sharp diagonal cuts
 *   - 'C': Metallic silver/white architectural curved loop with 3D beveled notches
 *   - 'K': Stealth obsidian black angular wings with vivid glowing orange central cleft
 * - Clean, permanent presentation without interactive upload/dropzone overlays
 */
export const BrandLogoMark: React.FC<BrandLogoMarkProps> = ({
  size = 36,
  height,
  className = '',
  interactive = true
}) => {
  const [customLogo, setCustomLogo] = useState<string | null>(() => {
    return localStorage.getItem('nck_custom_logo') || null;
  });

  const actualHeight = height || size;
  const actualWidth = Math.round(actualHeight * 1.78); // 16:9 ratio to fit the 3D NCK emblem

  // Check if server already has /nck-logo.png
  useEffect(() => {
    if (!customLogo) {
      const img = new Image();
      img.src = '/nck-logo.png';
      img.onload = () => {
        setCustomLogo('/nck-logo.png');
      };
    }
  }, [customLogo]);

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group transition-all duration-300 ${
        interactive ? 'hover:scale-[1.04] active:scale-[0.97]' : ''
      } ${className}`}
      style={{ width: actualWidth, height: actualHeight }}
      title="NCK 3D Architectural Logo"
      aria-label="NCK Logo"
    >
      {/* A. If a custom raster PNG/JPG logo is active, display it */}
      {customLogo ? (
        <div className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center shadow-md bg-[#FF5F00]/10">
          <img
            src={customLogo}
            alt="NCK 3D Logo"
            className="w-full h-full object-contain drop-shadow-md"
            loading="eager"
          />
        </div>
      ) : (
        /* B. High-Fidelity 3D Vector SVG Recreation of the NCK Emblem */
        <svg
          width={actualWidth}
          height={actualHeight}
          viewBox="0 0 160 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-lg transition-transform"
        >
          <defs>
            {/* Studio Orange Backdrop Gradient */}
            <linearGradient id="plateOrangeGrad" x1="0" y1="0" x2="160" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF6B00" />
              <stop offset="50%" stopColor="#FF5500" />
              <stop offset="100%" stopColor="#E64500" />
            </linearGradient>

            {/* Letter N: Warm Amber/Gold/Orange Gradient */}
            <linearGradient id="gradN_Main" x1="20" y1="18" x2="56" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFBA38" />
              <stop offset="35%" stopColor="#FF8800" />
              <stop offset="75%" stopColor="#E8500A" />
              <stop offset="100%" stopColor="#BD3800" />
            </linearGradient>

            {/* Letter N: 3D Depth Shadow Bevel */}
            <linearGradient id="gradN_Bevel" x1="20" y1="40" x2="58" y2="72" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#9E2E00" />
              <stop offset="100%" stopColor="#541400" />
            </linearGradient>

            {/* Letter C: Metallic White/Silver Gradient */}
            <linearGradient id="gradC_Main" x1="50" y1="20" x2="100" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#F5F5F7" />
              <stop offset="70%" stopColor="#E2E2E8" />
              <stop offset="100%" stopColor="#C4C4CC" />
            </linearGradient>

            {/* Letter C: Metallic Under-Bevel */}
            <linearGradient id="gradC_Bevel" x1="60" y1="30" x2="100" y2="72" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8A8A94" />
              <stop offset="100%" stopColor="#484852" />
            </linearGradient>

            {/* Letter K: Obsidian Black Gradient */}
            <linearGradient id="gradK_Main" x1="90" y1="20" x2="145" y2="72" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#303036" />
              <stop offset="30%" stopColor="#1C1C20" />
              <stop offset="100%" stopColor="#0B0B0D" />
            </linearGradient>

            {/* Letter K: Bevel Highlight */}
            <linearGradient id="gradK_Rim" x1="90" y1="20" x2="140" y2="45" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#585862" />
              <stop offset="100%" stopColor="#222226" />
            </linearGradient>

            {/* Soft Ambient Cast Shadow */}
            <filter id="nck3dShadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="1" dy="3.5" stdDeviation="3.2" floodColor="#000000" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* 1. VIBRANT ORANGE SUBSTRATE BASE PLATE */}
          <rect
            x="2"
            y="2"
            width="156"
            height="86"
            rx="12"
            fill="url(#plateOrangeGrad)"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1.2"
          />

          {/* Top studio light reflection rule */}
          <line
            x1="12"
            y1="4"
            x2="148"
            y2="4"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* ========================================================
              2. 3D INTERLOCKING NCK EMBLEM GROUP (WITH CAST SHADOW)
              ======================================================== */}
          <g filter="url(#nck3dShadow)">

            {/* ------------------------------------------------------
                A. LETTER 'N' (3D Amber/Orange Facets)
                ------------------------------------------------------ */}
            {/* N: 3D Under-extrusion Bottom Shadow */}
            <polygon
              points="18,54 28,62 60,72 58,74 24,65 18,56"
              fill="url(#gradN_Bevel)"
            />

            {/* N: Left Vertical Pillar */}
            <polygon
              points="18,20 28,20 28,62 18,54"
              fill="url(#gradN_Main)"
            />
            {/* N: Left Highlight Top Edge */}
            <line x1="18" y1="20" x2="28" y2="20" stroke="#FFE4A0" strokeWidth="1" />

            {/* N: Main Angled Diagonal Traverse */}
            <polygon
              points="18,36 38,16 48,16 28,62 18,54"
              fill="url(#gradN_Main)"
            />

            {/* N: Sharp Chevron Spearhead (Top-Right of N) */}
            <polygon
              points="28,16 52,40 60,40 38,16"
              fill="#FFA81E"
            />
            <polygon
              points="38,16 60,40 60,43 38,19"
              fill="#D44200"
            />

            {/* N: Center Bevel Crease Light */}
            <line x1="18" y1="20" x2="28" y2="62" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />


            {/* ------------------------------------------------------
                B. LETTER 'C' (3D Gleaming White/Silver Metallic)
                ------------------------------------------------------ */}
            {/* C: 3D Extruded Inner/Bottom Shadow */}
            <path
              d="M 54 22 C 66 22, 94 22, 102 22 L 94 30 L 78 30 C 66 30, 60 36, 60 45 C 60 54, 66 60, 78 60 L 98 60 L 90 68 L 54 68 C 40 68, 32 57, 32 45 C 32 33, 40 22, 54 22 Z"
              fill="url(#gradC_Bevel)"
              transform="translate(1, 1.5)"
            />

            {/* C: Main Front Metallic Face */}
            <path
              d="M 54 21 C 66 21, 95 21, 104 21 L 94 30 L 78 30 C 66 30, 60 36, 60 45 C 60 54, 66 60, 78 60 L 98 60 L 90 68 L 54 68 C 40 68, 33 57, 33 45 C 33 33, 40 21, 54 21 Z"
              fill="url(#gradC_Main)"
            />

            {/* C: Top Beveled Notch Highlight */}
            <line x1="54" y1="21.5" x2="103" y2="21.5" stroke="#FFFFFF" strokeWidth="1" />
            <polygon points="95,21 104,21 94,30 87,30" fill="#FFFFFF" opacity="0.6" />

            {/* C: Bottom Angled Notch Reflective Flare */}
            <polygon points="98,60 90,68 85,68 93,60" fill="#FFA500" opacity="0.85" />


            {/* ------------------------------------------------------
                C. LETTER 'K' (3D Stealth Obsidian Black)
                ------------------------------------------------------ */}
            {/* K: Lower Wing Bottom Extrusion */}
            <polygon
              points="88,45 106,45 142,71 138,74 104,48 88,48"
              fill="#060608"
            />

            {/* K: Upper Wing Top Extrusion */}
            <polygon
              points="108,19 140,19 142,21 110,21"
              fill="#52525C"
            />

            {/* K: Main Upper Cantilever Wing Face */}
            <polygon
              points="88,45 110,21 140,21 105,45"
              fill="url(#gradK_Main)"
            />
            {/* K: Upper Wing Rim Highlight */}
            <line x1="110" y1="21.5" x2="140" y2="21.5" stroke="#808090" strokeWidth="0.8" />

            {/* K: Main Lower Cantilever Wing Face */}
            <polygon
              points="88,45 105,45 142,71 114,71"
              fill="url(#gradK_Main)"
            />
            {/* K: Lower Wing Bevel Highlight */}
            <line x1="114" y1="70.5" x2="142" y2="70.5" stroke="#484852" strokeWidth="0.8" />

            {/* K: SIGNATURE LUMINOUS ORANGE CENTER CLEFT SEAM */}
            <line
              x1="88"
              y1="45"
              x2="106"
              y2="45"
              stroke="#FFA818"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <line
              x1="90"
              y1="45"
              x2="104"
              y2="45"
              stroke="#FFFFFF"
              strokeWidth="0.9"
              strokeLinecap="round"
            />
          </g>
        </svg>
      )}
    </div>
  );
};
