import Cookie from 'universal-cookie';

const useCookies = () => {
  const cookie = new Cookie();
  const getCookie = (key: string) => {
    return cookie.get(key);
  };
  const setCookie = (key: string, value: string, options: object) => {
    return cookie.set(key, value, options);
  };
  const removeCookie = (key: string, options?: object) => {
    return cookie.remove(key, options);
  };
  return { getCookie, setCookie, removeCookie };
};
export default useCookies;
