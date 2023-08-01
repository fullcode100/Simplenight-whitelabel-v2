import { i18n } from 'i18next';
import { ClientAuthLogin } from '../client/ClientAuthLogin';
import { ClientAuthSendVerificationEmail } from '../client/ClientAuthSendVerificationEmail';
import { ClientAuthVerifyEmail } from '../client/ClientAuthVerifyEmail';
import { LoginServerRequest } from '../types/request/LoginServerRequest';
import { ClientAuthForgotPassword } from '../client/ClientAuthForgotPassword';
import { ResetPasswordClientRequest } from '../types/request/ResetPasswordClientRequest';
import { ClientAuthResetPassword } from '../client/ClientAuthResetPassword';
import {
  cleanNewEmailValidationLinkDate,
  getNewEmailValidationLinkDate,
  setNewEmailValidationLinkDate,
} from '../utils';
import moment from 'moment';

export const SESSION_TOKEN = 'token';
export const REFRESH_TOKEN = 'refresh_token';

export const login = async (
  loginData: LoginServerRequest,
  i18next: i18n,
): Promise<LoginWithToken> => {
  const authLogin = new ClientAuthLogin();
  const data = await authLogin.request(loginData, i18next);
  const tokens = {
    token: data.tokens.access.token,
    refreshToken: data.tokens.refresh.token,
  };
  loginWithToken(tokens);
  return tokens;
};
interface LoginWithToken {
  token: string;
  refreshToken: string;
}
export const loginWithToken = (tokenData: LoginWithToken) => {
  localStorage.setItem(SESSION_TOKEN, tokenData.token);
  localStorage.setItem(REFRESH_TOKEN, tokenData.refreshToken);
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

  const tokens = await login({ email: email, password: password }, i18next);
  cleanNewEmailValidationLinkDate();
  return tokens;
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
