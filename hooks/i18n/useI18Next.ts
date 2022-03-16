import i18next from 'i18next';
import Backend from 'i18next-locize-backend';
import { initReactI18next } from 'react-i18next';

import globalEn from 'translations/en/global.json';
import globalEs from 'translations/es/global.json';

const locizeOptions = {
  projectId: process.env.NEXT_PUBLIC_LOCIZE_PROJECT_ID as unknown as string,
  apiKey: process.env.NEXT_PUBLIC_LOCIZE_API_KEY,
  referenceLng: process.env.NEXT_PUBLIC_LOCIZE_REF_LNG,
};

export const useI18Next = () => {
  console.log(locizeOptions);
  debugger;
  i18next
    .use(Backend)
    .use(initReactI18next)
    .init({
      ns: ['global'],
      defaultNS: 'global',
      interpolation: {
        escapeValue: false,
      },
      fallbackLng: 'en',
      saveMissing: true,
      debug: true,
      backend: locizeOptions,
      react: {
        useSuspense: false,
      },
      // lng: 'en',
      // resources: {
      //   en: {
      //     global: globalEn,
      //   },
      //   es: {
      //     global: globalEs,
      //   },
      // },
    });
  return i18next;
};
