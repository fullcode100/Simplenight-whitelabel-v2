import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

const useQuery = () => useRouter().query;

export const useQueryAsPath = () => {
  const { asPath } = useRouter();

  const [, queryString = ''] = asPath.split('?');
  const result: Record<string, unknown> = {};

  queryString
    .split('&')
    .reduce<Map<string, string>>((prev, curr) => {
      const [key, value] = curr.split('=');
      prev.set(key, value);
      return prev;
    }, new Map())
    .forEach((value, key) => {
      result[key] = value;
    });
  return result as ParsedUrlQuery;
};

export default useQuery;
