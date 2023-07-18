import { notification } from 'components/global/Notification/Notification';
import { ClientResponseError } from 'types/global/ClientResponseError';

type configOptions = {
  [key: string]: string;
};

const defaultTitles: configOptions = {
  400: 'Oops! Invalid Data Format',
  403: 'Access Denied: Insufficient Permissions',
  404: 'Oops! Page Not Found',
  405: 'Oops! Unable to Perform Action',
  406: 'Invalid Parameters: Please Check Your Input',
  408: 'Oops! Request Taking Too Long',
  500: 'Oops! Something Went Wrong',
  502: 'Oops! Temporary Glitch, Please Retry',
  503: 'Oops! Service Currently Unavailable',
  504: 'Oops! Gateway Timeout',
};

const defaultMessages: configOptions = {
  400: 'Oops! It seems there was a problem with the data you provided. Please double-check and try again.',
  403: 'Uh-oh! You do not have sufficient permissions to perform this action. Please contact support for assistance.',
  404: 'Oops! The page you are looking for could not be found. Please check the URL or navigate back.',
  405: 'Oops! We encountered an error while processing your request. Please try again later.',
  406: 'Oops! The parameters you provided are not valid. Please review and resubmit the form.',
  408: 'Hang on! The request is taking longer than expected. Please try again in a moment.',
  500: 'Oh no! Something went wrong on our end. We apologize for the inconvenience. Please try again later.',
  502: 'Yikes! Our server encountered a temporary issue. Please give us another shot in a little while.',
  503: "Whoops! The service is currently unavailable. We're working to fix it. Please try again later.",
  504: "Hold tight! We're experiencing a delay in communication. Please refresh the page or try again shortly.",
};

export const getValidatorErrorTitle = (statusCode: string) => {
  const hasTitle = Object.keys(defaultTitles).find(
    (property) => property === statusCode.toString(),
  );

  if (!hasTitle) return '';
  return defaultTitles[statusCode];
};

export const getValidatorErrorMessage = (statusCode: string) => {
  const hasTitle = Object.keys(defaultMessages).find(
    (property) => property === statusCode.toString(),
  );

  if (!hasTitle) return '';
  return defaultMessages[statusCode];
};

export const handleError = (error: any) => {
  if (error.status === 401) {
    return;
  }
  const title =
    getValidatorErrorTitle(error.status) !== ''
      ? getValidatorErrorTitle(error.status)
      : 'Unknown Error';
  const message =
    getValidatorErrorMessage(error.status) !== ''
      ? getValidatorErrorMessage(error.status)
      : 'Unknown Error';
  const { errors } = error.data as unknown as {
    errors: ClientResponseError[];
  };
  console.warn(title);
  notification(title, message, 'error', 4000);
};
