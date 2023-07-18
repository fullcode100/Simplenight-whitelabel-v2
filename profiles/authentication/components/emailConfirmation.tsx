import { SectionTitle } from '@simplenight/ui';
import { useTranslation } from 'react-i18next';
import { login } from '../../core/services/AuthClientService';
import React, { useState } from 'react';
import Check from 'public/icons/assets/check-round.svg';
import { IAuthComponent } from '../index';

interface FormData {
  email: string;
  password: string;
}

interface iEmailConfirmation extends IAuthComponent {
  email: string;
}

const EmailConfirmation = ({ closeModal }: iEmailConfirmation) => {
  const [t, i18n] = useTranslation('profiles');
  const [loading, setLoading] = useState(false);

  const mockSchema = {
    login_form_schema: {
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
    login_form_ui_schema: {
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
      closeModal();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex h-full flex-col justify-center content-center">
      <Check className="text-primary-1000 flex h-8 w-8 align-middle self-center" />
      <section className="mt-4 flex">
        <SectionTitle
          title={t('validationEmail', 'Validation email sent to ')}
          subTitle={t(
            'validationMessage',
            'A validation email was sent to your email address, please note that the verification email link will expire in 24 hours.',
          )}
          displayIcon={false}
        />
      </section>
    </section>
  );
};

export default EmailConfirmation;
