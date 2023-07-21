import { SectionTitle } from '@simplenight/ui';
import Button from 'components/global/Button/Button';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { signUp } from '../../core/services/ProfileClientService';
import { IAuthComponent } from '..';
import { sendVerificationEmail } from '../../core/services/AuthClientService';
import { Controller, useForm } from 'react-hook-form';
import { TextTemplate } from '../../../components/global/FormSchema/FormTemplates';
import BaseInput from '../../../components/global/Input/BaseInput';
import DividerSpace from '../../../components/global/Divider/DividerSpace';
import ErrorMessage from '../../../components/global/ErrorMessage';
import { EmailRules, LastNamesRules, NamesRules } from '../../../validations';
import FormsLoader from '../../../components/global/Loader/FormsLoader';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
}

const SignUp = ({ changeAuthType, setExtraProps }: IAuthComponent) => {
  const [t, i18n] = useTranslation('profiles');
  const [g] = useTranslation('global');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      setLoading(true);
      setErrorMessage('');
      await signUp(
        {
          email: values.email,
          first_name: values.firstName,
          last_name: values.lastName,
        },
        i18n,
      );
      await sendVerificationEmail(values.email, i18n);
      setExtraProps((props: any) => ({
        ...props,
        email: values.email,
        resetPassword: false,
        passwordUpdated: false,
      }));
      changeAuthType('emailConfirmation');
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setErrorMessage(error?.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex h-full flex-col justify-between">
      <section>
        <section className="mb-4">
          <SectionTitle title={t('signUp', 'Sign Up')} displayIcon={false} />
        </section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name={'email'}
            control={control}
            rules={EmailRules(g)}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextTemplate label={t('email', 'Email')} className={'mb-6'}>
                <BaseInput
                  value={value}
                  onChange={onChange}
                  errorMessage={error?.message}
                  placeholder={t('email', 'Email')}
                />
              </TextTemplate>
            )}
          />
          <DividerSpace />
          <Controller
            name={'firstName'}
            control={control}
            rules={NamesRules(t)}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextTemplate
                label={t('firstName', 'First Name')}
                className={'mb-6'}
              >
                <BaseInput
                  value={value}
                  onChange={onChange}
                  errorMessage={error?.message}
                  placeholder={t('firstName', 'First Name')}
                />
              </TextTemplate>
            )}
          />
          <DividerSpace />
          <Controller
            name={'lastName'}
            control={control}
            rules={LastNamesRules(t)}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextTemplate
                label={t('lastName', 'Last Name')}
                className={'mb-6'}
              >
                <BaseInput
                  value={value}
                  onChange={onChange}
                  errorMessage={error?.message}
                  placeholder={t('lastName', 'Last Name')}
                />
              </TextTemplate>
            )}
          />
          <ErrorMessage message={errorMessage} />
          <DividerSpace />

          {!loading && (
            <Button
              value={t('signUp', 'Sign Up')}
              size="large"
              className="w-full py-3 my-5"
            />
          )}
          {loading && <FormsLoader></FormsLoader>}
        </form>
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
