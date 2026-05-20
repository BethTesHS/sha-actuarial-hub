/** SHA brand palette — single source of truth */
export const shaColors = {
  blue: "#0066B3",
  green: "#8BC53F",
  darkBlue: "#003D6B",
  purple: "#9D4EDD",
  cyan: "#00D4FF",
  orange: "#FF6B35",
};

const hexToRgba = (hex, alpha) => {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/** Semantic tokens for one theme mode */
export function getShaThemeColors(theme = "dark") {
  const isDark = theme === "dark";
  const c = shaColors;

  return {
    ...c,
    primary: c.blue,
    secondary: c.green,
    accent: isDark ? c.cyan : c.purple,
    gradientStart: c.blue,
    gradientEnd: c.green,
    gradientAccent: isDark ? c.cyan : c.purple,
    primaryLight: hexToRgba(c.blue, isDark ? 0.2 : 0.12),
    accentLight: hexToRgba(isDark ? c.cyan : c.purple, isDark ? 0.15 : 0.1),

    bg: isDark ? "#001529" : "#F8FAFC",
    bgSecondary: isDark ? "#002847" : "#FFFFFF",
    bgElevated: isDark ? "#003D6B" : "#FFFFFF",
    card: isDark ? "#0f2744" : "#FFFFFF",
    darkCard: isDark ? "#0f2744" : "#F8FAFC",

    text: isDark ? "#FFFFFF" : "#0F172A",
    textSecondary: isDark ? "#94A3B8" : "#64748B",
    muted: isDark ? "#94A3B8" : "#64748B",

    inputBg: isDark ? "rgba(255,255,255,0.05)" : "#FFFFFF",
    inputBorder: isDark ? "rgba(255,255,255,0.1)" : "#E2E8F0",
    inputText: isDark ? "#FFFFFF" : "#0F172A",
    cardBorder: isDark ? hexToRgba(c.cyan, 0.15) : hexToRgba(c.blue, 0.15),

    navBg: isDark ? "rgba(0, 21, 41, 0.95)" : "rgba(255, 255, 255, 0.95)",
    navBorder: isDark ? hexToRgba(c.cyan, 0.1) : "rgba(0, 0, 0, 0.08)",

    danger: isDark ? "#F87171" : "#DC2626",
    success: c.green,

    footerBg: isDark
      ? `linear-gradient(135deg, ${c.darkBlue} 0%, #001529 100%)`
      : `linear-gradient(135deg, ${c.darkBlue} 0%, #002847 100%)`,

    pageGradient: isDark
      ? `radial-gradient(1000px at 80% 20%, ${hexToRgba(c.blue, 0.15)}, transparent 70%),
         radial-gradient(800px at 20% 80%, ${hexToRgba(c.green, 0.15)}, transparent 70%),
         radial-gradient(600px at 60% 50%, ${hexToRgba(c.purple, 0.08)}, transparent 70%),
         linear-gradient(180deg, #001529 0%, #002847 100%)`
      : `radial-gradient(1000px at 80% 20%, ${hexToRgba(c.blue, 0.08)}, transparent 70%),
         radial-gradient(800px at 20% 80%, ${hexToRgba(c.green, 0.08)}, transparent 70%),
         linear-gradient(180deg, #F8FAFC 0%, #E8F4FC 100%)`,
  };
}

/** `{ dark, light }` shape used by Modules, UserProfile, footer, etc. */
export function getShaThemeColorSets() {
  return {
    dark: getShaThemeColors("dark"),
    light: getShaThemeColors("light"),
  };
}

export function getShaColorsForTheme(theme = "dark") {
  return getShaThemeColors(theme);
}

/** Compact palette for admin / auth status screens */
export function getShaAdminColors(theme = "dark") {
  const c = getShaThemeColors(theme);
  return {
    bg: c.bg,
    card: c.card,
    text: c.text,
    muted: c.textSecondary,
    primary: c.primary,
    secondary: c.secondary,
    gradientEnd: c.gradientEnd,
    success: c.success,
    danger: c.danger,
  };
}
