import { i18n } from 'i18next';
import { SignUpServerRequest } from '../types/request/SignUpServerRequest';
import { ClientProfileCreate } from '../client/ClientProfileCreate';
import { ClientProfileDetails } from '../client/ClientProfileDetails';
import { SignUpClientRequest } from '../types/request/SignUpClientRequest';

export const signUp = async (
  signUpData: SignUpClientRequest,
  i18next: i18n,
) => {
  const client = new ClientProfileCreate();
  return await client.request(signUpData, i18next);
};

export const getCurrentUser = async (i18next: i18n) => {
  const client = new ClientProfileDetails();
  return await client.request(null, i18next);
};
