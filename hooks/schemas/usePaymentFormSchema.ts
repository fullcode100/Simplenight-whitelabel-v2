import { z } from 'zod';
import valid from 'card-validator';
import { useTranslation } from 'react-i18next';

export const usePaymentFormSchema = () => {
  const [t] = useTranslation('global');

  const fillOutThisFieldLabel = t(
    'fillOutThisField',
    'Please fill out this field',
  );

  const needsNameAndLastName = t(
    'needsNameAndLastName',
    'Please enter your name and last name',
  );

  const enterValidCreditCardLabel = t(
    'enterValidCreditCard',
    'Please enter a valid credit card number',
  );
  const enterValidCardExpirationDateLabel = t(
    'enterValidCardExpirationDate',
    'Please enter a valid card expiration date',
  );
  const enterValidCardCVVLabel = t(
    'enterValidCardCVV',
    'Please enter a valid card CVV number',
  );
  const enterValidBillinAddressLabel = t(
    'enterValidBillinAddress',
    'Please enter a valid billing address',
  );
  const stateShouldHaveAtMost2CharactersLabel = t(
    'stateShouldHaveAtMost2Characters',
    'Please Province/State should have at most 2 characters up to 50 characters',
  );
  const enterUpTo50CharactersLabel = t(
    'enterUpTo50Characters',
    'Please enter up to 50 characters',
  );
  const enterValidStateProvinceLabel = t(
    'enterValidStateProvince',
    'Please enter a valid State/Province',
  );
  const enterValidCityLabel = t('enterValidCity', 'Please enter a valid City');
  const enterValidZIPCodeLabel = t(
    'enterValidZIPCode',
    'Please a valid Zip Code',
  );

  const paymentFormSchema = z.object({
    creditCardName: z
      .string()
      .regex(/^(?=.*\s)(\w+\s\w+).*/, needsNameAndLastName)
      .min(1, fillOutThisFieldLabel)
      .max(50, enterUpTo50CharactersLabel),
    creditCardNumber: z
      .string()
      .regex(/^\d+$/, enterValidCreditCardLabel)
      .min(13, enterValidCreditCardLabel)
      .max(16, enterValidCreditCardLabel),
    creditCardExpiration: z
      .string()
      .regex(/\d\d\/\d\d/, enterValidCardExpirationDateLabel)
      .refine((value) => {
        return valid.expirationDate(value).isValid;
      }, enterValidCardExpirationDateLabel),
    creditCardCVV: z
      .string()
      .regex(/^\d+$/, enterValidCardCVVLabel)
      .min(3, enterValidCardCVVLabel)
      .max(4, enterValidCardCVVLabel),
    address1: z
      .string()
      .min(1, enterValidBillinAddressLabel)
      .max(50, enterUpTo50CharactersLabel),
    address2: z.string().optional(),
    state: z
      .string()
      .max(2, stateShouldHaveAtMost2CharactersLabel)
      .min(1, enterValidStateProvinceLabel)
      .max(50, enterUpTo50CharactersLabel),
    city: z
      .string()
      .min(1, enterValidCityLabel)
      .max(50, enterUpTo50CharactersLabel),
    postalCode: z
      .string()
      .regex(/^\d+$/, enterValidZIPCodeLabel)
      .min(5, enterValidZIPCodeLabel)
      .max(5, enterValidZIPCodeLabel),
  });

  return { paymentFormSchema };
};
