import { NextRouter, useRouter } from 'next/router';

const hasMoreQuery = (router: NextRouter, paramsToExclude: string[]) => {
  const query = router.query;
  const keys = Object.keys(query);
  const filteredKeys = keys.filter((key) => !paramsToExclude.includes(key));
  return filteredKeys.length > 0;
};

export const removeURLParameter = (url: string, parameter: string) => {
  let parsedUrl = new URL(url);
  let params = new URLSearchParams(parsedUrl.search);

  params.delete(parameter);

  return parsedUrl.origin + '/' + params.toString();
};

const useQuerySetter = (paramsToExclude?: string[]) => {
  const router = useRouter();
  return async (key: string, value: string) => {
    const { protocol, host, pathname } = window.location;
    const isFirstQuery = !hasMoreQuery(router, paramsToExclude ?? []);
    const separator = isFirstQuery ? '?' : '&';

    router.query[key] = value;

    const currentUrl = protocol + '//' + host + pathname;
    const updatedUrl = removeURLParameter(currentUrl, key);
    const newHref = `${updatedUrl}${separator}${key}=${value}`;

    window.history.pushState({ path: newHref }, '', newHref);
  };
};

export default useQuerySetter;
