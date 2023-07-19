import { RegisterOptions } from 'react-hook-form/dist/types/validator';

const EmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const EmailRules = (
  t: (text: string, defaultValue: string) => string,
) => ({
  required: {
    value: true,
    message: t('enterValidEmailAddress', 'Please enter a valid Email Address.'),
  },
  pattern: {
    value: EmailRegex,
    message: t('enterValidEmailAddress', 'Please enter a valid Email Address.'),
  },
  maxLength: {
    value: 50,
    message: t(
      '50maxCharacters',
      '50 is the maximum number of characters allowed.',
    ),
  },
});

export const PasswordRules = (
  t: (text: string, defaultValue: string) => string,
) => ({
  required: {
    value: true,
    message: t('enterValidPassword', 'Please enter a valid Password.'),
  },
  minLength: {
    value: 8,
    message: t(
      '8minCharacters',
      '8 is the minimum number of characters allowed.',
    ),
  },
  maxLength: {
    value: 15,
    message: t(
      '15maxCharacters',
      '15 is the maximum number of characters allowed.',
    ),
  },
  validate: {
    passwordRegex: (value: string, { email }: { email: string }) => {
      const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{0,}$/;
      const isValid = regex.test(value);
      if (!isValid) {
        return 'Must have at least 1 capital letter, 1 number, 1 symbol';
      }
      for (let index = 0; index < email.length; index++) {
        const char = email[index];
        if (value.includes(char)) {
          return 'Cannot contain same characters as in email';
        }
      }
    },
  },
});

export const NamesRules = (
  t: (text: string, defaultValue: string) => string,
) => ({
  required: {
    value: true,
    message: t('fieldRequired', 'Please enter a valid Name.'),
  },
  minLength: {
    value: 1,
    message: t(
      '1minCharacters',
      '1 is the minimum number of characters allowed.',
    ),
  },
  maxLength: {
    value: 25,
    message: t(
      '25maxCharacters',
      '25 is the maximum number of characters allowed.',
    ),
  },
});

export const LastNamesRules = (
  t: (text: string, defaultValue: string) => string,
) => ({
  required: {
    value: true,
    message: t('enterValidLastName', 'Please enter a valid Last Name.'),
  },
  minLength: {
    value: 1,
    message: t(
      '1minCharacters',
      '1 is the minimum number of characters allowed.',
    ),
  },
  maxLength: {
    value: 25,
    message: t(
      '25maxCharacters',
      '25 is the maximum number of characters allowed.',
    ),
  },
});
