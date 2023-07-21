import { SectionTitle } from '@simplenight/ui';
import Button from 'components/global/Button/Button';
import { useTranslation } from 'react-i18next';
import React, { useMemo, useState } from 'react';
import { IAuthComponent } from '..';
import { Controller, useForm } from 'react-hook-form';
import { TextTemplate } from '../../../components/global/FormSchema/FormTemplates';
import DividerSpace from '../../../components/global/Divider/DividerSpace';
import { CustomPassword } from '../../../components/global/FormSchema/CustomFields';
import ErrorMessage from '../../../components/global/ErrorMessage';
import FormsLoader from '../../../components/global/Loader/FormsLoader';
import {
  MultipleValidationsExecutor,
  PasswordCustomValidationWithConfirmPassword,
  PasswordCustomValidationWithEmail,
  PasswordRules,
} from '../../../validations';
import { configurePassword } from '../../core/services/AuthClientService';
import { getTemporalCredentials } from '../../core/utils';
import { useRouter } from 'next/router';
import { useSessionStore } from '../../../hooks/auth/useSessionStore';

interface FormData {
  confirmPassword: string;
  password: string;
  email: string;
}

const ConfigurePasswordForm = ({
  changeAuthType,
  closeModal,
}: IAuthComponent) => {
  const [t, i18n] = useTranslation('profiles');
  const [g] = useTranslation('global');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { setToken } = useSessionStore();
  const email = useMemo(() => {
    const value = getTemporalCredentials();
    if (value) {
      return value.email;
    }
    return '';
  }, []);
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>({
    mode: 'all',
    defaultValues: {
      confirmPassword: '',
      password: '',
      email: email,
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      setLoading(true);
      setErrorMessage('');
      const token = await configurePassword(values.password, i18n);
      if (token) {
        setToken(token);
      }
      router.push('/');
      closeModal();
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setErrorMessage(error?.response?.data?.message);
      }
      changeAuthType('configurePasswordError');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex h-full flex-col justify-between">
      <section>
        <section className="mb-4">
          <SectionTitle
            title={t(
              'passwordValidation',
              'Email successfully Validated.\nPlease enter a password:',
            )}
            displayIcon={false}
          />
        </section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name={'password'}
            control={control}
            rules={{
              ...PasswordRules(t),
              validate: {
                custom: (value, formValues) => {
                  return MultipleValidationsExecutor([
                    PasswordCustomValidationWithEmail(
                      t,
                      value,
                      formValues.email,
                    ),
                  ]);
                },
              },
            }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextTemplate label={'Password'}>
                <CustomPassword
                  value={value}
                  onChange={onChange}
                  errorMessage={error?.message}
                  placeholder={'Password'}
                />
              </TextTemplate>
            )}
          />
          <ErrorMessage message={errorMessage} />
          <DividerSpace />
          <Controller
            name={'confirmPassword'}
            control={control}
            rules={{
              ...PasswordRules(t),
              validate: {
                custom: (value, formValues) => {
                  return MultipleValidationsExecutor([
                    PasswordCustomValidationWithConfirmPassword(
                      t,
                      formValues.password,
                      value,
                    ),
                  ]);
                },
              },
            }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextTemplate label={'Re-Enter Password'}>
                <CustomPassword
                  value={value}
                  onChange={onChange}
                  errorMessage={error?.message}
                  placeholder={'Re-Enter Password'}
                />
              </TextTemplate>
            )}
          />
          <ErrorMessage message={errorMessage} />
          <DividerSpace />

          {!loading && (
            <Button
              value={t('confirmAccount', 'Confirm Account')}
              size="large"
              className="w-full py-3 my-5"
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid}
            />
          )}
          {loading && <FormsLoader size={'medium'}></FormsLoader>}
        </form>
      </section>
      <section />
    </section>
  );
};

export default ConfigurePasswordForm;
