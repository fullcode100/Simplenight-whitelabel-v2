export const RUNNING_API_LOCALLY = false;

const DEV_ENV_URL_KEY = 'DEV';

const DEMO_ENV_URL_KEY = 'DEMO';

const PROD_URL_KEYS = ['VIP', 'DEMO'];

const LOCALHOST_URL_KEYS = ['LOCALHOST:3000', '127.0.0.1:3000'];

const isVipOrDemo = (hostLevels: string[]) =>
  hostLevels.some((element) => PROD_URL_KEYS.includes(element));

const isGentex = (hostLevels: string[]) => hostLevels.includes('GENTEX');

export const isDemo = (hostLevels: string[]) =>
  hostLevels.includes(DEMO_ENV_URL_KEY);

export const isSandbox = (hostLevels: string[]) => hostLevels.includes('DEMO');

export const isProd = (hostLevels: string[]) =>
  isVipOrDemo(hostLevels) && isGentex(hostLevels);

export const isDev = (hostLevels: string[]) =>
  hostLevels.includes(DEV_ENV_URL_KEY);

export const isLocalhost = (hostLevels: string[]) =>
  hostLevels.some((element) => LOCALHOST_URL_KEYS.includes(element));
