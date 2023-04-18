/* eslint-disable no-useless-escape */
import { NextRouter, useRouter } from 'next/router';

const hasMoreQuery = (router: NextRouter, paramsToExclude: string[]) => {
  const query = router.query;
  const keys = Object.keys(query);
  const filteredKeys = keys.filter((key) => !paramsToExclude.includes(key));
  return filteredKeys.length > 0;
};

export const removeURLParameter = (url: string, parameter: string) => {
  const parsedUrl = new URL(url);
  const params = new URLSearchParams(parsedUrl.search);

  params.delete(parameter);

  return parsedUrl.origin + '/' + params.toString();
};

export const useQueryShallowSetter = () => {
  const router = useRouter();
  const { query } = router;

  return (params: { [key: string]: string }) => {
    const urlParams = new URLSearchParams(query as unknown as string);
    Object.keys(params).forEach((key) => {
      params[key].length > 0 && urlParams.set(key, params[key]);
      params[key].length === 0 && urlParams.delete(key);
    });
    router.push(`?${urlParams.toString()}`, undefined, { shallow: true });
  };
};

const useQuerySetter = () => {
  const router = useRouter();
  const { query } = router;

  return (params: { [key: string]: string }) => {
    const urlParams = new URLSearchParams(query as unknown as string);
    Object.keys(params).forEach((key) => {
      params[key].length > 0 && urlParams.set(key, params[key]);
      params[key].length === 0 && urlParams.delete(key);
    });
    router.push(`?${urlParams.toString()}`);
  };
};

export default useQuerySetter;

export const useQuerySetterNotReload = () => {
  const router = useRouter();
  const { query } = router;
  const pathname = router?.pathname as any;
  const pathParamsKeys = pathname
    ?.match?.(/\[(.*?)\]/g)
    .map((key: string) => key.replace(/[\[\]]/g, ''));
  const hostUrl = `${window.location.protocol}//${window.location.host}`;
  const baseUrl = `${hostUrl}${window.location.pathname}`;

  return (params: { [key: string]: string }) => {
    const urlParams = new URLSearchParams(query as unknown as string);
    Object.keys(params).forEach((key) => {
      params[key].length > 0 && urlParams.set(key, params[key]);
      params[key].length === 0 && urlParams.delete(key);
    });
    pathParamsKeys.forEach((key: string) => {
      urlParams.delete(key);
    });
    const newUrl = `${baseUrl}?${urlParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };
};
