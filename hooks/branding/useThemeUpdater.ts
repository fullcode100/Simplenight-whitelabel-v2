import { useEffect } from 'react';
import { useBrandTheme } from './useBrandTheme';

export const useThemeUpdater = () => {
  const theme = useBrandTheme() || {};
  const { primaryColor } = theme || {};

  const updateTheme = () => {
    if (!primaryColor) return;
    Object.entries(primaryColor).forEach(([key, value]) => {
      const cssPropName = `--primary-color-${key}`;
      const cssPropValue = value as string;
      document.documentElement.style.setProperty(cssPropName, cssPropValue);
    });
  };

  useEffect(() => {
    updateTheme();
  }, [theme]);
};
