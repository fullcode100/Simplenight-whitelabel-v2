import { ExternalLink, SectionTitle } from '@simplenight/ui';
import Button from 'components/global/Button/Button';
import { useTranslation } from 'react-i18next';
import { login } from '../../core/services/AuthClientService';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CustomPassword } from '../../../components/global/FormSchema/CustomFields';
import BaseInput from '../../../components/global/Input/BaseInput';
import { IAuthComponent } from '..';
import { TextTemplate } from '../../../components/global/FormSchema/FormTemplates';
import DividerSpace from '../../../components/global/Divider/DividerSpace';
import ErrorMessage from '../../../components/global/ErrorMessage';
import FormsLoader from '../../../components/global/Loader/FormsLoader';
import { EmailRules, PasswordRules } from '../../../validations';
import { useSessionStore } from '../../../hooks/auth/useSessionStore';
import SNIcon from '@/icons/logos/sn-mobile-logo.svg';
import AuthenticationContainer from '../../../components/authenticationContainer';

interface FormData {
  email: string;
  password: string;
}

const Login = ({ closeModal, changeAuthType }: IAuthComponent) => {
  const [t, i18n] = useTranslation('profiles');
  const [g] = useTranslation('global');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { setToken } = useSessionStore();

  const { control, handleSubmit, setError } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setErrorMessage('');
      setLoading(true);
      const tokens = await login(data, i18n);
      setToken(tokens.token);
      closeModal();
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setError('email', {
          message: t(
            'enterValidEmailAddress',
            'Please enter a valid email address.',
          ),
        });
        setError('password', {
          message: t('enterValidPassword', 'Please enter a valid password.'),
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthenticationContainer>
      <AuthenticationContainer.SimpleNightLogo />
      <section className="flex h-full flex-col justify-between">
        <section>
          <section className="mt-4 mb-8">
            <SectionTitle title={t('logIn', 'Log In')} displayIcon={false} />
          </section>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name={'email'}
              control={control}
              rules={EmailRules(g)}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextTemplate label={'Email'} className={'mb-6'}>
                  <BaseInput
                    value={value}
                    onChange={onChange}
                    errorMessage={error?.message}
                    placeholder={'Email'}
                  />
                </TextTemplate>
              )}
            />
            <DividerSpace />
            <Controller
              name={'password'}
              control={control}
              rules={PasswordRules(g, true)}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
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
            {!loading && (
              <>
                <section
                  onClick={() => changeAuthType('resetPassword')}
                  className="flex cursor-pointer underline justify-end mt-3"
                >
                  {t('forgotPassword', 'Forgot Your Password?')}
                </section>
                <Button
                  value={t('logIn', 'Log In')}
                  size="large"
                  className="w-full py-3 my-5"
                  onClick={handleSubmit(onSubmit)}
                />
              </>
            )}
            {loading && <FormsLoader size={'medium'}></FormsLoader>}
          </form>
        </section>
        <section className="flex justify-center">
          {t('dontHaveAccount', "Don't have an account?")}&nbsp;
          <a
            className="text-xs font-semibold underline text-primary-1000 hover:text-primary-600"
            onClick={() => changeAuthType('signUp')}
          >
            {t('signUp', 'Sign Up')}
          </a>
        </section>
      </section>
    </AuthenticationContainer>
  );
};

export default Login;
