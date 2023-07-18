import { SectionTitle } from '@simplenight/ui';
import Button from 'components/global/Button/Button';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CustomPassword } from '../../../components/global/FormSchema/CustomFields';
import BaseInput from '../../../components/global/Input/BaseInput';
import { IAuthComponent } from '..';
import { TextTemplate } from '../../../components/global/FormSchema/FormTemplates';

interface FormData {
  email: string;
  password: string;
}

const Login = ({ closeModal, changeAuthType }: IAuthComponent) => {
  const [t, i18n] = useTranslation('profiles');
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<FormData>({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mockSchema = {
    login_form_schema: {
      type: 'object',
      required: ['password', 'email'],
      properties: {
        email: {
          type: 'string',
          title: 'Email',
          format: 'email',
        },
        password: {
          type: 'string',
          title: 'Password',
          format: 'password',
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

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      // await login(values, i18n);
      closeModal();
    } catch (error) {
      console.error(error);
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
              message: 'This field is required',
            },
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextTemplate label={'Email'} className={'mb-6'}>
              <BaseInput
                value={value}
                onChange={onChange}
                errorMessage={error?.message}
              />
            </TextTemplate>
          )}
        />
        <Controller
          name={'password'}
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Este campo es requerido',
            },
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextTemplate label={'Password'}>
              <CustomPassword
                value={value}
                onChange={onChange}
                errorMessage={error?.message}
              />
            </TextTemplate>
          )}
        />

        {!loading && (
          <Button
            value={t('logIn', 'Log In')}
            size="large"
            className="w-full py-3 my-5"
            onClick={handleSubmit(onSubmit)}
          />
        )}
        {/*
          <FormSchema
            schema={mockSchema.login_form_schema}
            uiSchema={mockSchema.login_form_ui_schema}
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
        */}
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
