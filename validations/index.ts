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
    message: t('enterValidEmailAddress', 'Please enter a valid Email Address.'),
  },
});

interface PasswordRulesProps {
  validateWithEmail: boolean;
}
export const PasswordRules = (
  t: (text: string, defaultValue: string) => string,
  options: PasswordRulesProps = {
    validateWithEmail: true,
  },
) => ({
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
  validate: {
    passwordRegex: (value: string, { email }: { email: string }) => {
      const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{0,}$/;
      const isValid = regex.test(value);
      if (!isValid) {
        return t('enterValidPassword', 'Please enter a valid Password.');
      }
      if (options.validateWithEmail) {
        const firstEmailPart = email.split('@')?.[0];
        if (firstEmailPart) {
          if (value.toLowerCase().includes(firstEmailPart.toLowerCase())) {
            return t('enterValidPassword', 'Please enter a valid Password.');
          }
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

export const LastNamesRules = (
  t: (text: string, defaultValue: string) => string,
) => ({
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
