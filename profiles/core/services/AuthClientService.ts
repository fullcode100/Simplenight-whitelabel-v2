import { i18n } from 'i18next';
import { ClientAuthLogin } from '../client/ClientAuthLogin';
import { LoginRequest } from '../types/request/loginRequest';

const SESSION_TOKEN = 'token';
export const login = async (loginData: LoginRequest, i18next: i18n) => {
  try {
    const authLogin = new ClientAuthLogin();
    const data = await authLogin.request(loginData, i18next);
    sessionStorage.setItem(SESSION_TOKEN, data.tokens.access.token);
  } catch (error) {
    console.error(error);
  }
};
