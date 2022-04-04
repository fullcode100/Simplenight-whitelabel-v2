import { NextRouter, useRouter } from 'next/router';

const hasMoreQuery = (router: NextRouter, paramsToExclude: string[]) => {
  const query = router.query;
  const keys = Object.keys(query);
  const filteredKeys = keys.filter((key) => !paramsToExclude.includes(key));
  return filteredKeys.length > 0;
};

export const removeURLParameter = (url: string, parameter: string) => {
  //prefer to use l.search if you have a location/link object
  var urlparts = url.split('?');
  if (urlparts.length >= 2) {
    var prefix = encodeURIComponent(parameter) + '=';
    var pars = urlparts[1].split(/[&;]/g);

    //reverse iteration as may be destructive
    for (var i = pars.length; i-- > 0; ) {
      //idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }

    return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
  }
  return url;
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
