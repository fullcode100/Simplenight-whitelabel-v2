type Translations = (text: string, defaultValue: string) => string;

const EmailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const EmailRules = (t: Translations) => ({
  required: {
    value: true,
    message: t('enterValidEmailAddress', 'Please enter a valid email address.'),
  },
  pattern: {
    value: EmailRegex,
    message: t('enterValidEmailAddress', 'Please enter a valid email address.'),
  },
  maxLength: {
    value: 50,
    message: t('enterValidEmailAddress', 'Please enter a valid email address.'),
  },
});

var PassRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*\W)(?!.* ).{0,}$/;
export const PasswordRules = (t: Translations) => ({
  required: {
    value: true,
    message: t('enterValidPassword', 'Please enter a valid password.'),
  },
  minLength: {
    value: 8,
    message: t('enterValidPassword', 'Please enter a valid password.'),
  },
  maxLength: {
    value: 15,
    message: t('enterValidPassword', 'Please enter a valid password.'),
  },
  pattern: {
    value: PassRegex,
    message: t('enterValidPassword', 'Please enter a valid password.'),
  },
});

export const NamesRules = (t: Translations) => ({
  required: {
    value: true,
    message: t('invalidName', 'Please enter a valid Name.'),
  },
  minLength: {
    value: 1,
    message: t('invalidName', 'Please enter a valid Name.'),
  },
  maxLength: {
    value: 25,
    message: t('invalidName', 'Please enter a valid Name.'),
  },
});

export const LastNamesRules = (t: Translations) => ({
  required: {
    value: true,
    message: t('enterValidLastName', 'Please enter a valid Last Name.'),
  },
  minLength: {
    value: 1,
    message: t('enterValidLastName', 'Please enter a valid Last Name.'),
  },
  maxLength: {
    value: 25,
    message: t('enterValidLastName', 'Please enter a valid Last Name.'),
  },
});

export const PasswordCustomValidationWithEmail = (
  t: Translations,
  password: string,
  email: string,
) => {
  return () => {
    const firstEmailPart = email.split('@')?.[0];
    if (firstEmailPart) {
      if (password.toLowerCase().includes(firstEmailPart.toLowerCase())) {
        return t('enterValidPassword', 'Please enter a valid password.');
      }
    }
    return '';
  };
};

export const PasswordCustomValidationWithConfirmPassword = (
  t: Translations,
  password: string,
  confirmPassword: string,
) => {
  return () => {
    if (password !== confirmPassword) {
      return t('passwordsDoNotMatch', 'Passwords do not match');
    }
    return '';
  };
};

type CustomValidation = () => string | undefined | null;
export const MultipleValidationsExecutor = <T, S>(
  validations: CustomValidation[],
) => {
  for (let index = 0; index < validations.length; index++) {
    const result = validations[index]();
    if (result) {
      return result;
    }
  }
};
