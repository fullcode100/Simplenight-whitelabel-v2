import i18next from 'i18next';
import Backend from 'i18next-locize-backend';
import { initReactI18next } from 'react-i18next';

import globalEn from 'translations/en/global.json';
import globalEs from 'translations/es/global.json';
import hotelsEn from 'translations/en/hotels.json';
import hotelsEs from 'translations/es/hotels.json';
import thingsEn from 'translations/en/things.json';
import thingsEs from 'translations/es/things.json';
import diningEn from 'translations/en/dining.json';
import diningEs from 'translations/es/dining.json';
import flightsEn from 'translations/en/flights.json';
import flightsEs from 'translations/es/flights.json';
import carsEn from 'translations/en/cars.json';
import carsEs from 'translations/es/cars.json';
import parkingEs from 'translations/es/parking.json';
import parkingEn from 'translations/en/parking.json';

const locizeOptions = {
  projectId: process.env.NEXT_PUBLIC_LOCIZE_PROJECT_ID as unknown as string,
  apiKey: process.env.NEXT_PUBLIC_LOCIZE_API_KEY,
  referenceLng: process.env.NEXT_PUBLIC_LOCIZE_REF_LNG,
};

const withLocize = () => {
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
      // debug: true,
      backend: locizeOptions,
      react: {
        useSuspense: false,
      },
    });
  return i18next;
};

export const initializeI18Next = () => {
  const isUsingLocize =
    process.env.NEXT_PUBLIC_USE_LOCIZE === 'true' ? true : false;
  if (isUsingLocize) {
    return withLocize();
  }

  i18next.init({
    ns: ['global'],
    defaultNS: 'global',
    interpolation: {
      escapeValue: false,
    },
    fallbackLng: 'en',
    react: {
      useSuspense: false,
    },
    backend: undefined,
    lng: 'en',
    resources: {
      en: {
        global: globalEn,
        hotels: hotelsEn,
        things: thingsEn,
        flights: flightsEn,
        cars: carsEn,
        parking: parkingEn,
        dining: diningEn,
      },
      es: {
        global: globalEs,
        hotels: hotelsEs,
        things: thingsEs,
        flights: flightsEs,
        cars: carsEs,
        parking: parkingEs,
        dining: diningEs,
      },
    },
  });
  return i18next;
};
