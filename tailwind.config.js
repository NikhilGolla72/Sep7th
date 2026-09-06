/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base warm neutrals
        cream:      "#FBF8F3",
        "cream-2":  "#F5EFE6",
        "cream-3":  "#EDE4D7",
        ink:        "#1C1917",
        "ink-2":    "#44403C",
        "ink-3":    "#A8A29E",
        rule:       "#E7DDD1",

        // Chapter accent backgrounds — each chapter can have its own warm color
        rose:       "#F4B8C1",   // soft rose
        "rose-deep":"#E07A8A",   // deeper rose for text
        "rose-bg":  "#FDF2F4",   // very light rose bg

        peach:      "#F5C4A0",   // warm peach
        "peach-bg": "#FDF6EF",

        coral:      "#E8715A",   // muted coral — main accent
        "coral-bg": "#FEF0EC",

        gold:       "#D4A54A",   // warm gold
        "gold-bg":  "#FDF8EC",

        sage:       "#A8C5A0",   // muted sage green
        "sage-bg":  "#EFF6ED",

        lavender:   "#B8A9D4",   // dusty lavender
        "lavender-bg": "#F5F2FA",

        sky:        "#A0C4E8",   // soft sky blue
        "sky-bg":   "#EFF6FD",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        body:    ['"DM Sans"', "system-ui", "sans-serif"],
        hand:    ['"Caveat"', "cursive"],
      },
      fontSize: {
        "hero":       ["clamp(4rem, 12vw, 11rem)",  { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "display-xl": ["clamp(2.8rem, 7vw, 7rem)",  { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2rem, 4.5vw, 4.5rem)",{ lineHeight: "1.08", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.5rem, 3vw, 3rem)",  { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.1rem, 2vw, 1.8rem)",{ lineHeight: "1.25", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        measure: "38rem",
        wide:    "68rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
      },
      keyframes: {
        "petal-fall": {
          "0%":   { transform: "translateY(-20px) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(110vh) rotate(540deg)", opacity: "0" },
        },
        "bloom": {
          "0%":   { transform: "scale(0)", opacity: "0" },
          "60%":  { transform: "scale(1.15)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0px) rotate(-1deg)" },
          "50%":      { transform: "translateY(-10px) rotate(1deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(232,113,90,0.4)" },
          "50%":      { boxShadow: "0 0 0 16px rgba(232,113,90,0)" },
        },
        "typewriter": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "petal-fall":   "petal-fall linear forwards",
        "bloom":        "bloom 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "float-gentle": "float-gentle 5s ease-in-out infinite",
        "pulse-glow":   "pulse-glow 2s ease-in-out infinite",
        "typewriter":   "typewriter 0.4s ease forwards",
      },
    },
  },
  plugins: [],
};
