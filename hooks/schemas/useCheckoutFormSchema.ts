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

export const useClientQuestionsCheckoutFormSchema = (schemas: any[]) => {
  const baseValidationSchema: { [index: string]: any } = {};
  const [t] = useTranslation('global');

  const fillOutThisFieldLabel = t(
    'fillOutThisField',
    'Please fill out this field',
  );
  schemas?.forEach(({ travelerSchema, bookingSchema }) => {
    // TODO: this would be refactored to check the travelers dynamic schema
    // travelerSchema?.schema?.required?.forEach((value: string)=> {
    //   baseValidationSchema[`root_${value}`] =
    //     z[travelerSchema?.schema?.properties[value].type]()
    //     .min(1)
    // })
    bookingSchema?.schema?.required?.forEach((value: string) => {
      let zCopy;
      switch (bookingSchema?.schema?.properties[value]!.type) {
        case 'string':
          zCopy = z.string();
          break;
        default:
          zCopy = z.string();
          break;
      }
      baseValidationSchema[`root_${value}`] = zCopy
        .min(1, fillOutThisFieldLabel)
        .max(bookingSchema?.schema?.properties[value]!.maxLength);
    });
  });
  return z.object(baseValidationSchema);
};
