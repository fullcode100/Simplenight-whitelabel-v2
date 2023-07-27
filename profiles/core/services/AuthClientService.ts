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
  cleanNewEmailValidationLinkDate,
  getNewEmailValidationLinkDate,
  setNewEmailValidationLinkDate,
} from '../utils';
import moment from 'moment';

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
  const lastRequestNewLink = getNewEmailValidationLinkDate(email);
  if (lastRequestNewLink) {
    const diffHours = moment(lastRequestNewLink).diff(moment(), 'hours');
    if (diffHours < 24) {
      return false;
    }
  }

  const client = new ClientAuthSendVerificationEmail();
  await client.request(email, i18next);
  setNewEmailValidationLinkDate(email, new Date());
  return true;
};

export const verifyEmail = async (token: string, i18next: i18n) => {
  const client = new ClientAuthVerifyEmail();
  await client.request(token, i18next);
};

interface ConfigurePasswordParams {
  email: string;
  password: string;
  resetPasswordToken: string;
}

export const configurePassword = async (
  { password, resetPasswordToken, email }: ConfigurePasswordParams,
  i18next: i18n,
) => {
  await resetPassword(
    { password: password, token: resetPasswordToken },
    i18next,
  );
  const token = await login({ email: email, password: password }, i18next);
  const client = new ClientAuthConfigurePassword();
  await client.request({ password, token: token }, i18next);
  loginWithToken(token);
  cleanNewEmailValidationLinkDate();
  return token;
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
