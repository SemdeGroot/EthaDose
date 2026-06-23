import React from "react";

export type ColorToken =
  | "primary"
  | "primaryDark"
  | "primarySoft"
  | "primaryBright"
  | "primaryBrightSoft"
  | "primaryDisabled"
  | "primaryBorderHover"
  | "bg"
  | "bgGlass"
  | "panel"
  | "panelSoft"
  | "textMain"
  | "textSub"
  | "muted"
  | "border"
  | "hover"
  | "inputBg"
  | "placeholder"
  | "textButton"
  | "danger"
  | "dangerSoft"
  | "warning"
  | "warningSoft"
  | "success"
  | "successSoft"
  | "info"
  | "infoSoft";

export type TypographyVariant = "caption" | "bodySm" | "bodyMd" | "titleMd" | "titleXl";
export type TypographyWeight = "regular" | "medium" | "semibold" | "bold";

type Theme = Record<ColorToken, string> & {
  fonts: Record<TypographyWeight, string>;
  typography: Record<TypographyVariant, { fontSize: number; lineHeight: number; letterSpacing?: number }>;
  space: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    "2xl": number;
    "3xl": number;
  };
  radius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  elevation: {
    sm: object;
    md: object;
    lg: object;
  };
};

const shared = {
  fonts: {
    regular: "Inter_400Regular",
    medium: "Inter_500Medium",
    semibold: "Inter_600SemiBold",
    bold: "Inter_700Bold",
  },
  typography: {
    caption: { fontSize: 13, lineHeight: 18, letterSpacing: 0 },
    bodySm: { fontSize: 14, lineHeight: 21, letterSpacing: 0 },
    bodyMd: { fontSize: 15, lineHeight: 23, letterSpacing: 0 },
    titleMd: { fontSize: 18, lineHeight: 24, letterSpacing: -0.2 },
    titleXl: { fontSize: 28, lineHeight: 34, letterSpacing: -0.4 },
  },
  space: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    "2xl": 24,
    "3xl": 32,
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 14,
    xl: 18,
    full: 9999,
  },
  elevation: {
    sm: { boxShadow: "0 2px 6px rgba(0,0,0,0.04)" },
    md: { boxShadow: "0 8px 12px rgba(0,0,0,0.05)" },
    lg: { boxShadow: "0 12px 20px rgba(0,0,0,0.08)" },
  },
};

const lightTheme: Theme = {
  primary: "#2F6F73",
  primaryDark: "#1F4F55",
  primarySoft: "rgba(47,111,115,0.12)",
  primaryBright: "#3F8F90",
  primaryBrightSoft: "rgba(63,143,144,0.14)",
  primaryDisabled: "rgba(15,23,42,0.45)",
  primaryBorderHover: "rgba(47,111,115,0.24)",
  bg: "#F5F8F7",
  bgGlass: "rgba(245,248,247,0.92)",
  panel: "#FFFFFF",
  panelSoft: "#EAF2F0",
  textMain: "#0E1726",
  textSub: "#475569",
  muted: "#536176",
  border: "rgba(15,23,42,0.10)",
  hover: "rgba(15,23,42,0.05)",
  inputBg: "#FFFFFF",
  placeholder: "rgba(100,116,139,0.85)",
  textButton: "#FFFFFF",
  danger: "#D32F2F",
  dangerSoft: "rgba(211,47,47,0.14)",
  warning: "#DF5B17",
  warningSoft: "rgba(223,91,23,0.14)",
  success: "#0C8F66",
  successSoft: "rgba(12,143,102,0.14)",
  info: "#2F67E1",
  infoSoft: "rgba(47,103,225,0.14)",
  ...shared,
};

const ThemeContext = React.createContext<Theme | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeContext.Provider value={lightTheme}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const theme = React.useContext(ThemeContext);
  if (!theme) throw new Error("useTheme must be used inside ThemeProvider");
  return theme;
}
