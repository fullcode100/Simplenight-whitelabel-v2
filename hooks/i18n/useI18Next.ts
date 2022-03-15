import i18next from 'i18next';

import globalEn from 'translations/en/global.json';
import globalEs from 'translations/es/global.json';

export const useI18Next = () => {
  i18next.init({
    interpolation: {
      escapeValue: false,
    },
    lng: 'en',
    resources: {
      en: {
        global: globalEn,
      },
      es: {
        global: globalEs,
      },
    },
  });
  return i18next;
};
