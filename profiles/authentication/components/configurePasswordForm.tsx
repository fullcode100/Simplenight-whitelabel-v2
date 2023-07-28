import { SectionTitle } from '@simplenight/ui';
import Button from 'components/global/Button/Button';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useMemo, useState } from 'react';
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
import { useRouter } from 'next/router';
import { useSessionStore } from '../../../hooks/auth/useSessionStore';
import PasswordHelpTooltip from '../../../components/global/Tooltips/PasswordHelpTooltip';
import AuthenticationContainer from 'components/authenticationContainer';

interface FormData {
  confirmPassword: string;
  password: string;
  email: string;
}

interface IConfigurePasswordForm extends IAuthComponent {
  resetPasswordToken: string;
  email: string;
}
const ConfigurePasswordForm = ({
  changeAuthType,
  closeModal,
  resetPasswordToken,
  email,
}: IConfigurePasswordForm) => {
  const [t, i18n] = useTranslation('profiles');
  const [g] = useTranslation('global');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { setToken } = useSessionStore();

  const {
    control,
    handleSubmit,
    setError,
    watch,
    trigger,
    formState: { isValid, errors },
  } = useForm<FormData>({
    defaultValues: {
      confirmPassword: '',
      password: '',
      email: email,
    },
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  useEffect(() => {
    if (confirmPassword != '' && confirmPassword != '') {
      trigger('confirmPassword');
    }
  }, [password, confirmPassword]);

  const onSubmit = async (values: FormData) => {
    try {
      if (values.password !== values.confirmPassword) {
        return setError(
          'confirmPassword',
          t('passwordsDoNotMatch', 'Passwords do not match'),
        );
      }
      setLoading(true);
      setErrorMessage('');
      if (resetPasswordToken) {
        const tokens = await configurePassword(
          {
            email,
            password: values.password,
            resetPasswordToken: resetPasswordToken,
          },
          i18n,
        );
        if (tokens) {
          setToken(tokens.token);
        }
        router.push('/');
        closeModal();
      }
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
    <AuthenticationContainer>
      <AuthenticationContainer.SimpleNightLogo />
      <section className="flex h-full flex-col justify-between">
        <section>
          <section className="mb-4">
            <SectionTitle
              title={t(
                'passwordValidation',
                'Email Successfully Verified.\nPlease Enter A Password:',
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
              render={({ field: { value, onChange } }) => (
                <TextTemplate
                  label={'Password'}
                  tooltip={<PasswordHelpTooltip />}
                >
                  <CustomPassword
                    value={value}
                    onChange={onChange}
                    errorMessage={errors.password?.message}
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
              render={({ field: { value, onChange } }) => (
                <TextTemplate label={'Re-Enter Password'}>
                  <CustomPassword
                    value={value}
                    onChange={onChange}
                    errorMessage={errors.confirmPassword?.message}
                    placeholder={'Re-Enter Password'}
                  />
                </TextTemplate>
              )}
            />
            <ErrorMessage message={errorMessage} />
            <DividerSpace />

            {!loading && (
              <Button
                value={t('createAccount', 'Create Account')}
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
    </AuthenticationContainer>
  );
};

export default ConfigurePasswordForm;
