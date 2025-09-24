'use client';
//react
import { createContext, useState } from 'react';


// Theme type and context value
type Theme = 'light' | 'dark';

// Theme Context types
interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

// Context
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Provider
export function ThemeProvider({
  children,
  defaultTheme
}: {
  children: React.ReactNode;
  defaultTheme: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // Toggle theme function with class update and server sync
  const toggleTheme = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    // document.documentElement.setAttribute('data-theme', newTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
    await fetch('/api/theme', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme: newTheme })
    });
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}