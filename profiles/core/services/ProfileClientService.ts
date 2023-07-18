import { i18n } from 'i18next';
import { SignUpRequest } from '../types/request/SignUpRequest';
import { ClientProfileCreate } from '../client/ClientProfileCreate';
import { ClientProfileDetails } from '../client/ClientProfileDetails';

export const signUp = async (signUpData: SignUpRequest, i18next: i18n) => {
  const client = new ClientProfileCreate();
  return await client.request(signUpData, i18next);
};

export const getCurrentUser = async (i18next: i18n) => {
  const client = new ClientProfileDetails();
  return await client.request(null, i18next);
};
