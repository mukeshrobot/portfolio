import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      colors: {
        bg: {
          DEFAULT: "#08090d",
          subtle: "#0d0e13",
          elevated: "#15151c",
        },
        border: {
          DEFAULT: "#222228",
          subtle: "#1a1a1f",
        },
        accent: {
          DEFAULT: "#7c9cff",
          muted: "#5b7bdc",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        shimmer: "shimmer 2.5s linear infinite",
        "gradient-x": "gradientX 8s ease infinite",
        "border-spin": "borderSpin 6s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3.2s ease-in-out infinite",
        "scroll-x": "scrollX 40s linear infinite",
        "caret-blink": "caretBlink 1.05s steps(1) infinite",
        "bg-pan": "bgPan 18s ease infinite",
        "aurora": "aurora 14s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        borderSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        scrollX: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        caretBlink: {
          "0%, 50%": { opacity: "1" },
          "50.01%, 100%": { opacity: "0" },
        },
        bgPan: {
          "0%, 100%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
        },
        aurora: {
          "0%, 100%": { transform: "translate3d(-10%, -8%, 0) scale(1)" },
          "33%": { transform: "translate3d(8%, 4%, 0) scale(1.08)" },
          "66%": { transform: "translate3d(-6%, 10%, 0) scale(0.96)" },
        },
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,156,255,0.08), transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
