// src/components/ThemeToggle.jsx
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { getShaThemeColors } from '../theme/sha';

export default function ThemeToggle({ theme, toggleTheme }) {
  const colors = getShaThemeColors(theme);

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-110 shadow-lg"
      style={{
        background: `linear-gradient(135deg, ${colors.darkBlue}, ${colors.bgSecondary})`,
        borderColor: colors.cardBorder,
        boxShadow: theme === 'light' ? '0 12px 40px rgba(0, 61, 107, 0.2)' : '0 12px 40px rgba(0, 0, 0, 0.35)',
      }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-6 h-6" style={{ color: colors.blue }} />
      ) : (
        <Sun className="w-6 h-6" style={{ color: colors.green }} />
      )}
    </button>
  );
}
