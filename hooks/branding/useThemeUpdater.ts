import { useSettings } from 'hooks/services/useSettings';

export const useThemeUpdater = () => {
  const { data: brandConfig } = useSettings();
  const { theme } = brandConfig;
  const { primaryColor } = theme || {};

  if (!primaryColor) return;
  Object.entries(primaryColor).forEach(([key, value]) => {
    const cssPropName = `--primary-color-${key}`;
    const cssPropValue = value as string;
    document.documentElement.style.setProperty(cssPropName, cssPropValue);
  });
};
