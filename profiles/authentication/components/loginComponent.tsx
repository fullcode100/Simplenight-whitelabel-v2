import { SectionTitle } from '@simplenight/ui';
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
import { EmailRegex } from '../../../validations';

interface FormData {
  email: string;
  password: string;
}

const Login = ({ closeModal, changeAuthType }: IAuthComponent) => {
  const [t, i18n] = useTranslation('profiles');
  const [g] = useTranslation('global');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setErrorMessage('');
      setLoading(true);
      await login(data, i18n);
      closeModal();
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
        <section className="mt-4 mb-8">
          <SectionTitle title={t('logIn', 'Log In')} displayIcon={false} />
        </section>
        <Controller
          name={'email'}
          control={control}
          rules={{
            required: {
              value: true,
              message: g(
                'enterValidEmailAddress',
                'Please enter a valid email address.',
              ),
            },
            pattern: {
              value: EmailRegex,
              message: g(
                'enterValidEmailAddress',
                'Please enter a valid email address.',
              ),
            },
            maxLength: {
              value: 50,
              message: g(
                '50maxCharacters',
                '50 is the maximum number of characters allowed.',
              ),
            },
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
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
          rules={{
            required: {
              value: true,
              message: g(
                'enterValidPassword',
                'Please enter a valid password.',
              ),
            },
            minLength: {
              value: 8,
              message: g(
                '8minCharacters',
                '8 is the minimum number of characters allowed.',
              ),
            },
            maxLength: {
              value: 15,
              message: g(
                '15maxCharacters',
                '15 is the maximum number of characters allowed.',
              ),
            },
            validate: {
              passwordRegex: (value, { email }) => {
                const regex =
                  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{0,}$/;
                const isValid = regex.test(value);
                if (!isValid) {
                  return 'Must have at least 1 capital letter, 1 number, 1 symbol';
                }
                for (let index = 0; index < email.length; index++) {
                  const char = email[index];
                  if (value.includes(char)) {
                    return 'Cannot contain same characters as in email';
                  }
                }
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
        {!loading && (
          <Button
            value={t('logIn', 'Log In')}
            size="large"
            className="w-full py-3 my-5"
            onClick={handleSubmit(onSubmit)}
          />
        )}
        {loading && <FormsLoader size={'medium'}></FormsLoader>}
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
  );
};

export default Login;
