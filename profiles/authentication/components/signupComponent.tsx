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
import { CustomPassword } from '../../../components/global/FormSchema/CustomFields';
import ErrorMessage from '../../../components/global/ErrorMessage';
import { EmailRegex } from '../../../validations';
import Loader from 'components/global/Loader/Loader';
import FormsLoader from '../../../components/global/Loader/FormsLoader';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const SignUp = ({ changeAuthType }: IAuthComponent) => {
  const [t, i18n] = useTranslation('profiles');
  const [g] = useTranslation('global');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { control, handleSubmit } = useForm<FormData>({
    mode: 'all',
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
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
          password: values.password,
        },
        i18n,
      );
      await sendVerificationEmail(values.email, i18n);
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
      <section className="mt-4">
        <SectionTitle title={t('signUp', 'Sign Up')} displayIcon={false} />
      </section>
      <section className={'pt-5'}>
        <Controller
          name={'email'}
          control={control}
          rules={{
            required: {
              value: true,
              message: g('required', 'Required'),
            },
            pattern: {
              value: EmailRegex,
              message: g('emailInvalid', 'Invalid Email'),
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
          name={'firstName'}
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextTemplate label={'First Name'} className={'mb-6'}>
              <BaseInput
                value={value}
                onChange={onChange}
                errorMessage={error?.message}
                placeholder={'First Name'}
              />
            </TextTemplate>
          )}
        />
        <DividerSpace />
        <Controller
          name={'lastName'}
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextTemplate label={'Last Name'} className={'mb-6'}>
              <BaseInput
                value={value}
                onChange={onChange}
                errorMessage={error?.message}
                placeholder={'Last Name'}
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
              message: g('required', 'Required'),
            },
            minLength: {
              value: 5,
              message: g(
                'passwordMinLength',
                'Must contain at least 5 characters',
              ),
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
        <div className={'pt-2 text-gray-400'}>
          Must contain at least 5 characters
        </div>
        <ErrorMessage message={errorMessage} />
        <DividerSpace />

        {!loading && (
          <Button
            value={t('signUp', 'Sign Up')}
            size="large"
            className="w-full py-3 my-5"
            onClick={handleSubmit(onSubmit)}
          />
        )}
        {loading && <FormsLoader size={'medium'}></FormsLoader>}
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
