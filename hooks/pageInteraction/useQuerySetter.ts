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

const useQuerySetter = () => {
  const router = useRouter();
  const { query } = router;

  return (params: { [key: string]: string }) => {
    const urlParams = new URLSearchParams(query);
    Object.keys(params).forEach((key) => {
      urlParams.set(key, params[key]);
    });
    router.push(`?${urlParams.toString()}`);
  };
};

export default useQuerySetter;
