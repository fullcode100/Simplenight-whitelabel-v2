import { NextRouter, useRouter } from 'next/router';

const hasMoreQuery = (router: NextRouter) => {
  const query = router.query;
  return Object.keys(query).length > 0;
};

const useQuerySetter = () => {
  const router = useRouter();
  return async (key: string, value: string) => {
    const { protocol, host, pathname } = window.location;
    const isFirstQuery = !hasMoreQuery(router);
    const separator = isFirstQuery ? '?' : '&';

    router.query[key] = value;

    const currentUrl = protocol + '//' + host + pathname;
    const newHref = `${currentUrl}${separator}${key}=${value}`;

    window.history.pushState({ path: newHref }, '', newHref);
  };
};

export default useQuerySetter;
