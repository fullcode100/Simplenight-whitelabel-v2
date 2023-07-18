import { i18n } from 'i18next';
import { ClientAuthLogin } from '../client/ClientAuthLogin';
import { ClientAuthSendVerificationEmail } from '../client/ClientAuthSendVerificationEmail';
import { ClientAuthVerifyEmail } from '../client/ClientAuthVerifyEmail';
import { LoginServerRequest } from '../types/request/LoginServerRequest';

const SESSION_TOKEN = 'token';
export const login = async (loginData: LoginServerRequest, i18next: i18n) => {
  const authLogin = new ClientAuthLogin();
  const data = await authLogin.request(loginData, i18next);
  sessionStorage.setItem(SESSION_TOKEN, data.tokens.access.token);
};

export const sendVerificationEmail = async (email: string, i18next: i18n) => {
  const client = new ClientAuthSendVerificationEmail();
  await client.request(email, i18next);
};

export const verifyEmail = async (token: string, i18next: i18n) => {
  const client = new ClientAuthVerifyEmail();
  await client.request(token, i18next);
};
