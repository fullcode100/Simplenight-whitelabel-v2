import { NextApiRequestWithSession } from 'types/core/server';
import * as process from 'process';

export const applyApiBaseUrl = (
  req: NextApiRequestWithSession,
  endpoint: string,
) => {
  const apiUrl = req.session.api_url;
  return `${apiUrl}${endpoint}`;
};

export const applyApiBaseUrlV2 = (
  endpoint: string,
  request: NextApiRequestWithSession,
) => {
  return `${request.session.api_url}${endpoint}`;
};

export const applyApiAuthUrlV1 = (endpoint: string) => {
  return `${process.env.NEXT_PUBLIC_AUTH_API_URL_V1}${endpoint}`;
};
export const forwardError = (err: any, res: any) => {
  const apiErrors = err.response?.data?.errors;
  const axiosErrorMessage = err.message;

  console.error(err);

  return res
    .status(err.response?.status ?? 500)
    .json(
      { errors: apiErrors, ...(err.response.data || {}) } ?? axiosErrorMessage,
    );
};

export const sendSuccess = (res: any, data: any) => res.status(200).json(data);
