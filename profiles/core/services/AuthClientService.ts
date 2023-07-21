import { i18n } from 'i18next';
import { ClientAuthLogin } from '../client/ClientAuthLogin';
import { ClientAuthSendVerificationEmail } from '../client/ClientAuthSendVerificationEmail';
import { ClientAuthVerifyEmail } from '../client/ClientAuthVerifyEmail';
import { LoginServerRequest } from '../types/request/LoginServerRequest';
import { ClientAuthForgotPassword } from '../client/ClientAuthForgotPassword';
import { ResetPasswordClientRequest } from '../types/request/ResetPasswordClientRequest';
import { ClientAuthResetPassword } from '../client/ClientAuthResetPassword';
import { ClientAuthConfigurePassword } from '../client/ClientAuthConfigurePassword';
import {
  cleanTemporalCredentials,
  getTemporalCredentials,
  setTemporalCredentials,
} from '../utils';
import { useSessionStore } from '../../../hooks/auth/useSessionStore';

export const SESSION_TOKEN = 'token';
interface LoginOptions {
  setTokenInSessionStorage: boolean;
}
export const login = async (
  loginData: LoginServerRequest,
  i18next: i18n,
  options: LoginOptions = { setTokenInSessionStorage: true },
) => {
  const authLogin = new ClientAuthLogin();
  const data = await authLogin.request(loginData, i18next);
  if (options.setTokenInSessionStorage) {
    loginWithToken(data.tokens.access.token);
  }
  return data.tokens.access.token;
};

export const loginWithToken = (token: string) => {
  localStorage.setItem(SESSION_TOKEN, token);
};
export const sendVerificationEmail = async (email: string, i18next: i18n) => {
  const client = new ClientAuthSendVerificationEmail();
  await client.request(email, i18next);
};

export const verifyEmail = async (token: string, i18next: i18n) => {
  const client = new ClientAuthVerifyEmail();
  await client.request(token, i18next);
};

export const configurePassword = async (password: string, i18next: i18n) => {
  const temporalCredentials = getTemporalCredentials();
  if (!temporalCredentials) {
    throw new Error('Temporal Credentials doesnt exist');
  }
  const token = await login(temporalCredentials, i18next);
  if (temporalCredentials.email && temporalCredentials.password) {
    const client = new ClientAuthConfigurePassword();
    await client.request({ password, token: token }, i18next);
    loginWithToken(token);
    cleanTemporalCredentials();
    return token;
  }
  return null;
};

export const sendForgotPasswordEmail = async (email: string, i18next: i18n) => {
  const client = new ClientAuthForgotPassword();
  await client.request(
    {
      email: email,
    },
    i18next,
  );
};

export const resetPassword = async (
  data: ResetPasswordClientRequest,
  i18next: i18n,
) => {
  const client = new ClientAuthResetPassword();
  await client.request(data, i18next);
};

export const logout = () => {
  localStorage.removeItem(SESSION_TOKEN);
};
