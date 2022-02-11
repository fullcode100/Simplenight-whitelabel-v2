import { useEffect } from 'react';
import { CoreTheme } from 'types/redux/CoreState';
import { useBrandTheme } from './useBrandTheme';

export const useThemeUpdater = () => {
  const theme = useBrandTheme();

  const updateTheme = () => {
    debugger;
    theme?.forEach((keyValue: CoreTheme) => {
      debugger;
      const cssPropName = keyValue.key;
      const cssPropValue = keyValue.value;
      document.documentElement.style.setProperty(cssPropName, cssPropValue);
    });
  };

  useEffect(() => {
    updateTheme();
  }, [theme]);
};
