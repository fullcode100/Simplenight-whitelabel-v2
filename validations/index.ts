type Translations = (text: string, defaultValue: string) => string;

const EmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const EmailRules = (t: Translations) => ({
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
    message: t('enterValidEmailAddress', 'Please enter a valid Email Address.'),
  },
});

export const PasswordRules = (t: Translations) => ({
  required: {
    value: true,
    message: t('enterValidPassword', 'Please enter a valid Password.'),
  },
  minLength: {
    value: 8,
    message: t('enterValidPassword', 'Please enter a valid Password.'),
  },
  maxLength: {
    value: 15,
    message: t('enterValidPassword', 'Please enter a valid Password.'),
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
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{0,}$/;
    const isValid = regex.test(password);
    if (!isValid) {
      return t('enterValidPassword', 'Please enter a valid Password.');
    }
    const firstEmailPart = email.split('@')?.[0];
    if (firstEmailPart) {
      if (password.toLowerCase().includes(firstEmailPart.toLowerCase())) {
        return t('enterValidPassword', 'Please enter a valid Password.');
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
