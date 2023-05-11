import { FormField, TextInput } from '@simplenight/ui';
import NewPhoneNumberInput from 'components/global/PhoneNumberInput/NewPhoneNumberInput';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const ClientFormContent = () => {
  const [g] = useTranslation('global');
  const firstName = g('firstName', 'First Name');
  const lastName = g('lastName', 'Last Name');
  const phoneNumber = g('phoneNumber', 'Phone Number');
  const email = g('email', 'Email Address');

  const name = g('name', 'Name');
  const requiredText = g('required', 'Required');

  const methods = useFormContext();
  const {
    register,
    formState: { errors },
  } = methods;

  const { field } = useController({
    name: 'phoneNumber',
    control: methods.control,
    rules: { required: true },
  });

  const getErrors = (key: string) => {
    if (errors[key]) {
      return errors[key]!.message as string;
    }
  };

  return (
    <div>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6">
        <FormField
          label={firstName}
          required={{ required: true, label: requiredText }}
          error={getErrors('firstName')}
        >
          <TextInput
            state={getErrors('firstName') ? 'error' : 'idle'}
            placeholder={name}
            {...register('firstName')}
          />
        </FormField>
        <FormField
          label={lastName}
          required={{ required: true, label: requiredText }}
          error={getErrors('lastName')}
        >
          <TextInput
            state={getErrors('lastName') ? 'error' : 'idle'}
            placeholder={name}
            {...register('lastName')}
          />
        </FormField>
        <FormField
          label={phoneNumber}
          required={{ required: true, label: requiredText }}
          error={getErrors('phoneNumber')}
        >
          <NewPhoneNumberInput
            placeholder={phoneNumber}
            defaultCode={'us'}
            defaultPhoneNumber={''}
            onChange={field.onChange}
          />
        </FormField>
        <FormField
          label={email}
          required={{ required: true, label: requiredText }}
          error={getErrors('email')}
        >
          <TextInput
            state={getErrors('email') ? 'error' : 'idle'}
            placeholder={email}
            {...register('email')}
          />
        </FormField>
      </section>
    </div>
  );
};
