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
import { getBrandCodeFromHost, getHostLevels } from '../../config/configJson';

export const selectApiUrl = () => {
  console.log(window);
  const hostLevels = window.location.host.toUpperCase().split('.');

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

export const getApiKey = (): string => {
  const brandCode = getBrandCodeFromHost();
  const hostLevels = getHostLevels();
  if (isProd(hostLevels)) {
    if (isSandbox(hostLevels)) return API_KEYS.DEV;
    return API_KEYS.PROD;
  }
  return API_KEYS[brandCode] || API_KEYS.DEV;
};

const headers = {
  'X-API-KEY': '',
} as any;

export const setAuthHeaders = () => {
  const queryParams = queryString.parse(window.location.search);
  const oldKey = localStorage.getItem('SIMPLENIGHT-X-API-KEY') as string;
  let newKey: string;
  if (queryParams.apiKey) {
    newKey = queryParams.apiKey as string;
  } else if (oldKey) {
    newKey = oldKey;
  } else {
    newKey = getApiKey();
  }
  headers['X-API-KEY'] = newKey;
  localStorage.setItem('SIMPLENIGHT-X-API-KEY', newKey);
};

export default (() => {
  setAuthHeaders();

  return axios.create({
    baseURL: selectApiUrl(),
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
})();
