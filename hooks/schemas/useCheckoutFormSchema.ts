import { z } from 'zod';
import { useTranslation } from 'react-i18next';

export const useCheckoutFormSchema = () => {
  const [t] = useTranslation('global');

  const fillOutThisFieldLabel = t(
    'fillOutThisField',
    'Please fill out this field',
  );
  const validEmailMessage = t('enterValidEmail', 'Please enter a valid email');
  const enterUpTo25CharactersLabel = t(
    'enterUpTo25Characters',
    'Please enter up to 25 characters',
  );
  const enterUpTo50CharactersLabel = t(
    'enterUpTo50Characters',
    'Please enter up to 50 characters',
  );

  const checkOutFormSchema = z.object({
    firstName: z
      .string()
      .min(1, fillOutThisFieldLabel)
      .max(25, enterUpTo25CharactersLabel),
    lastName: z
      .string()
      .min(1, fillOutThisFieldLabel)
      .max(25, enterUpTo25CharactersLabel),
    phoneNumber: z.string().refine((value) => {
      const parsedValue = JSON.parse(value);
      return parsedValue.phone_number.trim().length > 0;
    }, fillOutThisFieldLabel),
    email: z
      .string()
      .email(validEmailMessage)
      .min(1, fillOutThisFieldLabel)
      .max(50, enterUpTo50CharactersLabel),
    country: z.string().min(1, fillOutThisFieldLabel).optional(),
  });

  return { checkOutFormSchema };
};
