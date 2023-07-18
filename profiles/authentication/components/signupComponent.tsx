import { SectionTitle } from '@simplenight/ui';
import Button from 'components/global/Button/Button';
import FormSchema from 'components/global/FormSchema/FormSchema';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import Loader from '../../../components/global/Loader/Loader';
import { signUp } from '../../core/services/ProfileClientService';
import { IAuthComponent } from '..';
import { sendVerificationEmail } from '../../core/services/AuthClientService';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const SignUp = ({ changeAuthType }: IAuthComponent) => {
  const [t, i18n] = useTranslation('profiles');
  const [loading, setLoading] = useState(false);

  const mockSchema = {
    travelers_form_schema: {
      type: 'object',
      required: ['password', 'email'],
      properties: {
        email: {
          type: 'string',
          title: 'Email',
          format: 'email',
          hideRequired: true,
        },
        firstName: {
          type: 'string',
          title: 'First Name',
          format: 'text',
          hideRequired: true,
        },
        lastName: {
          type: 'string',
          title: 'Last Name',
          format: 'text',
          hideRequired: true,
        },
        password: {
          type: 'string',
          title: 'Password',
          format: 'password',
          hideRequired: true,
        },
      },
    },
    travel_form_ui_schema: {
      email: {
        'ui:placeholder': 'Email',
        classNames: 'col-span-2',
      },
      firstName: {
        'ui:placeholder': 'First Name',
        classNames: 'col-span-2',
      },
      lastName: {
        'ui:placeholder': 'Last Name',
        classNames: 'col-span-2',
      },
      password: {
        'ui:placeholder': 'Password',
        classNames: 'col-span-2',
      },
    },
  };

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const values: FormData = data.formData;
      await signUp(
        {
          email: values.email,
          first_name: values.firstName,
          last_name: values.lastName,
          password: values.password,
        },
        i18n,
      );
      await sendVerificationEmail(values.email, i18n);
      changeAuthType('emailConfirmation');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex h-full flex-col justify-between">
      <section className="mt-4">
        <SectionTitle title={t('signUp', 'Sign Up')} displayIcon={false} />
      </section>
      <section>
        <FormSchema
          schema={mockSchema.travelers_form_schema}
          uiSchema={mockSchema.travel_form_ui_schema}
          onSubmit={onSubmit}
        >
          <section className="flex mt-3">
            {/* <ExternalLink className="underline" href="/"> */}
            {t('PasswordRules', 'Must contain at least 5 caracters')}
            {/* </ExternalLink> */}
          </section>

          {loading && <Loader></Loader>}
          {!loading && (
            <Button
              value={t('signUp', 'Sign Up')}
              size="large"
              className="w-full py-3 my-5"
            />
          )}
        </FormSchema>
      </section>
      <section className="flex justify-center">
        {t('alreadyHaveAnAccount', 'Already have an account?')}&nbsp;
        <a
          className="text-xs font-semibold underline text-primary-1000 hover:text-primary-600"
          onClick={() => changeAuthType('login')}
        >
          {t('logIn', 'Log In')}
        </a>
      </section>
    </section>
  );
};

export default SignUp;
