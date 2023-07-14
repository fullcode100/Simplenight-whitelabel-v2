import { ExternalLink, SectionTitle } from '@simplenight/ui';
import Button from 'components/global/Button/Button';
import FormSchema from 'components/global/FormSchema/FormSchema';
import { useTranslation } from 'react-i18next';
import { login } from '../../core/services/AuthClientService';
import React, { useState } from 'react';
import Loader from '../../../components/global/Loader/Loader';

interface FormData {
  email: string;
  password: string;
}

interface iLogin {
  closeModal: () => void;
}

const Login = ({ closeModal }: iLogin) => {
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
      await login(values, i18n);
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  return (
    <section className="flex h-full flex-col justify-between">
      <section className="mt-4">
        <SectionTitle title={t('logIn', 'Log In')} displayIcon={false} />
      </section>
      <section>
        <FormSchema
          schema={mockSchema.travelers_form_schema}
          uiSchema={mockSchema.travel_form_ui_schema}
          onSubmit={onSubmit}
        >
          <section className="flex justify-end mt-3">
            <ExternalLink className="underline" href="/">
              {t('forgotPassword', 'Forgot Your Password?')}
            </ExternalLink>
          </section>

          {loading && <Loader></Loader>}
          {!loading && (
            <Button
              value={t('logIn', 'Log In')}
              size="large"
              className="w-full py-3 my-5"
            />
          )}
        </FormSchema>
      </section>
      <section className="flex justify-center">
        {t('dontHaveAccount', "Don't have an account?")}
        <ExternalLink className="underline !text-primary-1000" href="/">
          {t('signUp', 'Sign Up')}
        </ExternalLink>
      </section>
    </section>
  );
};

export default Login;
