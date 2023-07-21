import axios from 'axios';
import {
  isDev,
  isLocalhost,
  isProd,
  isSandbox,
  RUNNING_API_LOCALLY,
} from './envHelpers';
import API_KEYS from './api-keys';

import {
  getBrandCodeFromHost,
  getFormattedLevels,
} from '../../helpers/hostUtils';
import { getSimplenightApiKey } from './middlewares/authHeaderMiddleware';
import { i18n } from 'i18next';
import { handleError } from 'helpers/errorUtils';
import curlirize from 'axios-curlirize';

const X_SESSION = 'x-session';
const TOKEN = 'token';

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

interface CreateServerAxiosInstanceOptions {
  useLang: boolean;
}
export const createServerAxiosInstance = (
  req: any,
  options: CreateServerAxiosInstanceOptions = { useLang: true },
) => {
  const apiHeader = getSimplenightApiKey(req);
  const language = req.headers['accept-language'];
  const currency = req.headers.currency;
  const authorization = req.headers.authorization;

  const axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      [apiHeader.header]: apiHeader.key,
      'X-API-KEY': apiHeader.key,
      authorization: authorization,
    },
  });

  curlirize(axiosInstance, (result: any, err: any) => {
    const curl = result.command;
    const isBooking = curl.includes('bookings');
    if (!isBooking) {
      console.log(`Request curl: ${curl}`);
    }
  });
  if (options.useLang) {
    axiosInstance.interceptors.request.use(
      axiosServerI18nInterceptor(language),
      (error) => Promise.reject(error),
    );
  }

  axiosInstance.interceptors.request.use(
    axiosServerCurrencyInterceptor(currency),
    (error) => Promise.reject(error),
  );

  return axiosInstance;
};

const getSessionKey = () => {
  const Window = tryGetWindow();
  const session = Window?.sessionStorage.getItem(X_SESSION);
  return session ?? '';
};

export const createClientAxiosInstance = (currency: string, i18next: i18n) => {
  const Window = tryGetWindow();
  const sessionkey = getSessionKey();
  const zone = localStorage.getItem('timezone');
  const token = localStorage.getItem(TOKEN);
  const axiosInstance = axios.create({
    baseURL: `${Window?.location.protocol}//${Window?.location.host}/api`,
    headers: {
      'Content-Type': 'application/json',
      'x-session': sessionkey,
      timezone: zone ? zone : '',
      Authorization: token ? `Bearer ${token}` : '',
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

const tryGetWindow = () => {
  try {
    return window;
  } catch (e) {
    return undefined;
  }
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
