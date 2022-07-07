import axios from 'axios';
import {
  isDev,
  isLocalhost,
  isProd,
  isSandbox,
  RUNNING_API_LOCALLY,
} from './envHelpers';
import API_KEYS from './api-keys';

import queryString from 'query-string';
import {
  getBrandCodeFromHost,
  getFormattedLevels,
} from '../../config/configJson';
import { getSimplenightApiKey } from './middlewares/authHeaderMiddleware';
import { i18n } from 'i18next';
import { handleError } from 'helpers/errorUtils';

export const API_KEY_HEADER_KEY = 'X-API-KEY';

export const selectApiUrl = (originUrl?: string) => {
  const hostLevels = getFormattedLevels(originUrl);

  const localhostApi = 'http://127.0.0.1:8000/api/v1';

  const devApi = 'https://dev-api.simplenight.com/api/v1';
  const prodApi = 'https://api.simplenight.com/api/v1';
  const prodApiSandbox = 'https://api.demo.simplenight.com/api/v1';

  if (RUNNING_API_LOCALLY && isLocalhost(hostLevels)) return localhostApi;
  if (isDev(hostLevels)) return devApi;
  if (isProd(hostLevels)) {
    if (isSandbox(hostLevels)) return prodApiSandbox;
    return prodApi;
  }
  return devApi;
};

export const getApiKey = (originUrl?: string): string => {
  const brandCode = getBrandCodeFromHost(originUrl);
  const hostLevels = getFormattedLevels(originUrl);
  if (isProd(hostLevels)) {
    if (isSandbox(hostLevels)) return API_KEYS.DEV;
    return API_KEYS.PROD;
  }
  return API_KEYS[brandCode] || API_KEYS.DEV;
};

const headers = {
  [API_KEY_HEADER_KEY]: '',
} as any;

export const setAuthHeaders = () => {
  const queryParams = queryString.parse(window.location.search);
  const oldKey = localStorage?.getItem('SIMPLENIGHT-X-API-KEY') as string;
  let newKey: string;
  if (queryParams.apiKey) {
    newKey = queryParams.apiKey as string;
  } else if (oldKey) {
    newKey = oldKey;
  } else {
    newKey = getApiKey();
  }
  headers[API_KEY_HEADER_KEY] = newKey;
  localStorage.setItem('SIMPLENIGHT-X-API-KEY', newKey);
};

const setServerAuthHeaders = (originUrl: string, apiKey?: string) => {
  if (apiKey) {
    headers[API_KEY_HEADER_KEY] = apiKey;
    return headers;
  }

  headers[API_KEY_HEADER_KEY] = getApiKey(originUrl);
  return headers;
};

export const axiosI18nInterceptor = (i18next: i18n) => (config: any) => {
  config.headers['Accept-Language'] = i18next.language;
  return config;
};

export const axiosCurrencyInterceptor = (currency: string) => (config: any) => {
  config.headers.currency = currency;
  return config;
};

export const axiosServerCurrencyInterceptor =
  (currency: string) => (config: any) => {
    if (config.params) {
      config.params = config.params ?? {};
      config.params.currency = currency.toUpperCase();
    }
    return config;
  };

const axiosClientErrorInterceptor = (error: any) => {
  handleError(error.response);
  return Promise.reject(error);
};

export const axiosServerI18nInterceptor =
  (language: string) => (config: any) => {
    config.params = config.params ?? {};
    config.params.lang = language;
    return config;
  };

export const createServerAxiosInstance = (req: any) => {
  const apiHeader = getSimplenightApiKey(req);
  const language = req.headers['accept-language'];
  const currency = req.headers.currency;

  const axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      [apiHeader.header]: apiHeader.key,
    },
  });

  axiosInstance.interceptors.request.use(
    axiosServerI18nInterceptor(language),
    (error) => Promise.reject(error),
  );

  axiosInstance.interceptors.request.use(
    axiosServerCurrencyInterceptor(currency),
    (error) => Promise.reject(error),
  );

  return axiosInstance;
};

const tryGetWindow = () => {
  try {
    return window;
  } catch (e) {
    return undefined;
  }
};

export const createClientAxiosInstance = (currency: string, i18next: i18n) => {
  const Window = tryGetWindow();

  const axiosInstance = axios.create({
    baseURL: `${Window?.location.protocol}//${Window?.location.host}/api`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(
    axiosI18nInterceptor(i18next),
    (error) => Promise.reject(error),
  );

  axiosInstance.interceptors.request.use(
    axiosCurrencyInterceptor(currency),
    (error) => Promise.reject(error),
  );

  axiosInstance.interceptors.response.use(
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    (response) => {
      return response;
    },
    // eslint-disable-next-line indent
    axiosClientErrorInterceptor,
  );

  return axiosInstance;
};

export default (() => {
  const Window = tryGetWindow();

  const instance = axios.create({
    baseURL: `${Window?.location.protocol}//${Window?.location.host}/api`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  instance.interceptors.response.use((response) => {
    return response;
  }, axiosClientErrorInterceptor);

  return instance;
})();
