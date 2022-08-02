import { notification } from 'components/global/Notification/Notification';
import { ClientResponseError } from 'types/global/ClientResponseError';

export const getValidatorErrorMessage = (statusCode: string) => {
  type configOptions = {
    [key: string]: string;
  };

  const config: configOptions = {
    400: 'Invalid format on sent data',
    403: 'You don not have permission to execute that action',
    404: 'The requested information was not found',
    405: 'There has been an error, please try again later',
    406: 'The requested parameters are invalid',
    408: 'The requested action is taking longer than usual, please try again',
    500: 'There has been an error, please try again later',
    502: 'There has been an error, please try again later',
    503: 'There has been an error, please try again later',
    504: 'There has been an error, please try again later',
  };

  const hasTitle = Object.keys(config).find(
    (property) => property === statusCode.toString(),
  );

  if (!hasTitle) return '';
  return config[statusCode];
};

export const handleError = (error: any) => {
  const title = getValidatorErrorMessage(error.status);
  const { errors } = error.data as unknown as {
    errors: ClientResponseError[];
  };
  const errorMessage = errors.map(({ message }) => message).join('\n');
  notification(title, errorMessage, 'error');
};
