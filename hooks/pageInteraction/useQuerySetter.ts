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
