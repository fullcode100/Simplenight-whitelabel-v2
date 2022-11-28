import { NextApiRequestWithSession } from 'types/core/server';

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

export const forwardError = (err: any, res: any) => {
  const apiErrors = err.response?.data?.errors;
  const axiosErrorMessage = err.message;

  console.error(err);

  return res
    .status(err.response?.status ?? 500)
    .json({ errors: apiErrors } ?? axiosErrorMessage);
};

export const sendSuccess = (res: any, data: any) => res.status(200).json(data);
