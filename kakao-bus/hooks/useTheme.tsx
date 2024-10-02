import { DARK_COLOR, LIGHT_COLOR } from '@/styles/color';
import { useState } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleIsDark = () => setIsDark(!isDark);

  return {
    COLOR: isDark ? DARK_COLOR : LIGHT_COLOR,
    toggleIsDark,
    isDark,
  };
};
