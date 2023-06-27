import { z } from 'zod';
import { useTranslation } from 'react-i18next';

export const usePassengerSchema = () => {
  const [tg] = useTranslation('global');

  const fillOutThisFieldLabel = tg(
    'fillOutThisField',
    'Please fill out this field',
  );
  const maxCharacters25Label = tg(
    '25maxCharacters',
    '25 is the maximum number of characters allowed',
  );

  const passengerSchema = z.object({
    firstName: z
      .string()
      .min(1, { message: fillOutThisFieldLabel })
      .max(25, { message: maxCharacters25Label }),
    middleName: z
      .string()
      .max(25, { message: maxCharacters25Label })
      .optional(),
    lastName: z
      .string()
      .min(1, { message: fillOutThisFieldLabel })
      .max(25, { message: maxCharacters25Label }),
    dateOfBirth: z.date().optional(),
    gender: z.string().min(1, { message: fillOutThisFieldLabel }),
    countryOfResidence: z.string().min(1, { message: fillOutThisFieldLabel }),
    loyaltyProgram: z.string().optional(),
    loyaltyNumber: z
      .string()
      .max(25, { message: maxCharacters25Label })
      .optional(),
    passportIdNumber: z
      .string()
      .max(25, { message: maxCharacters25Label })
      .optional(),
    country: z.string().optional(),
    expiration: z.date().optional(),
    wheelChair: z.boolean().optional(),
    vaccinationRecords: z.boolean().optional(),
    knownTravelerNumber: z.boolean().optional(),
    passengerType: z.string().optional(),
    passengerAge: z.number().optional(),
  });

  const passengerFormSchema = z.object({
    passengers: z.array(passengerSchema),
  });

  return { passengerSchema, passengerFormSchema };
};
