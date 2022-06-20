import { camelKeysToKebabKeys, flattenObjectOfObjects } from 'helpers/stringUtils';
import { useEffect } from 'react';
import { CoreTheme } from 'types/redux/CoreState';
import { useBrandTheme } from './useBrandTheme';

export const useThemeUpdater = () => {
  const theme = useBrandTheme();

  const updateTheme = () => {
     const cssProperties = flattenObjectOfObjects(theme);
     const cssPropertiesKebab = camelKeysToKebabKeys(cssProperties);

     Object.entries(cssPropertiesKebab).forEach(([key, value]) => {
       const cssPropName = `--${key}`;
       const cssPropValue = value;
       document.documentElement.style.setProperty(cssPropName, cssPropValue);
     });
  };

  useEffect(() => {
    updateTheme();
  }, [theme]);
};
