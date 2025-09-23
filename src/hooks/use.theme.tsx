import { useContext } from 'react';
import { ThemeContext } from '@/components/provider';

// Custom theme hook for theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider');
  return context;
};