export const kitov = {
  direction: "rtl" as const,
  lang: "ar" as const,
  colors: {
    red: "#E31E24",
    yellow: "#FFD200",
    dark: "#1B3022",
    shell: "#F9F9F9",
  },
  borderRadius: {
    carton: "1.25rem",
  },
  shadows: {
    kitov: "0 4px 16px rgba(27, 48, 34, 0.15)",
    "kitov-lg": "0 8px 32px rgba(27, 48, 34, 0.2)",
  },
  animation: {
    pop: "pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
    "bounce-soft": "bounce-soft 0.5s ease-out",
    "wipe-in": "wipe-in 0.6s ease-out",
  },
  fonts: {
    heading: "'Graphik Arabic', sans-serif",
    body: "'Readex Pro', sans-serif",
    mono: "'Geist Mono', monospace",
    sources: {
      heading: { type: "local", path: "/fonts/graphik-arabic/", weights: [700, 900] },
      body: { type: "google", name: "Readex Pro", weights: [400, 500, 700] },
      mono: { type: "google", name: "Geist Mono", weights: [400, 500] },
    },
  },
  roles: {
    "Barn Red": {
      hex: "#E31E24",
      usage: "Primary CTA, sale banners, active states",
    },
    "Golden Yolk": {
      hex: "#FFD200",
      usage: "Section backgrounds, highlights, warning alerts",
    },
    "Deep Forest": {
      hex: "#1B3022",
      usage: "Footer, primary text, high-contrast containers",
    },
    "Eggshell White": {
      hex: "#F9F9F9",
      usage: "Main background (use instead of pure white #FFF)",
    },
  },
} as const;
