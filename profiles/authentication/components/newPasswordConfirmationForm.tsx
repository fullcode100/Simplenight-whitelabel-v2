import { SectionTitle } from '@simplenight/ui';
import Button from 'components/global/Button/Button';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { IAuthComponent } from '..';
import { Controller, useForm } from 'react-hook-form';
import { TextTemplate } from '../../../components/global/FormSchema/FormTemplates';
import DividerSpace from '../../../components/global/Divider/DividerSpace';
import { CustomPassword } from '../../../components/global/FormSchema/CustomFields';
import ErrorMessage from '../../../components/global/ErrorMessage';
import FormsLoader from '../../../components/global/Loader/FormsLoader';
import AuthenticationContainer from '../../../components/authenticationContainer';
import {
  configurePassword,
  resetPassword,
} from '../../core/services/AuthClientService';
import {
  MultipleValidationsExecutor,
  PasswordCustomValidationWithConfirmPassword,
  PasswordRules,
} from 'validations';
import { useSessionStore } from 'hooks/auth/useSessionStore';
import { useRouter } from 'next/router';

interface FormData {
  confirmPassword: string;
  password: string;
}

interface INewPasswordConfirmationForm extends IAuthComponent {
  resetPasswordToken: string;
}

const NewPasswordConfirmationForm = ({
  changeAuthType,
  setExtraProps,
  closeModal,
  resetPasswordToken,
  email,
}: INewPasswordConfirmationForm) => {
  const [t, i18n] = useTranslation('profiles');
  const [g] = useTranslation('global');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { setToken } = useSessionStore();
  const { control, handleSubmit } = useForm<FormData>({
    mode: 'all',
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      setLoading(true);
      setErrorMessage('');
      if (resetPasswordToken) {
        const tokens = await configurePassword(
          {
            email: email ?? '',
            password: values.password,
            resetPasswordToken: resetPasswordToken,
          },
          i18n,
        );
        if (tokens) {
          setToken(tokens.token);
        }
        setExtraProps((props: any) => ({
          ...props,
          email: email,
          resetPassword: false,
          passwordUpdated: true,
        }));
        changeAuthType('emailConfirmation');
      }
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setErrorMessage(error?.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthenticationContainer>
      <section className="flex h-full flex-col justify-center">
        <section className="mt-4">
          <SectionTitle
            title={t('setNewPassword', 'Set new password')}
            displayIcon={false}
          />
        </section>
        <section className={'pt-5'}>
          <Controller
            name={'password'}
            control={control}
            rules={{
              ...PasswordRules(t),
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
              <TextTemplate label={'Confirm Password'}>
                <CustomPassword
                  value={value}
                  onChange={onChange}
                  errorMessage={error?.message}
                  placeholder={'Confirm Password'}
                />
              </TextTemplate>
            )}
          />
          <ErrorMessage message={errorMessage} />
          <DividerSpace />

          {!loading && (
            <Button
              value={t('updatePassword', 'Update Password')}
              size="large"
              className="w-full py-3 my-5"
              onClick={handleSubmit(onSubmit)}
            />
          )}
          {loading && <FormsLoader size={'medium'}></FormsLoader>}
        </section>
        <section />
      </section>
    </AuthenticationContainer>
  );
};

export default NewPasswordConfirmationForm;
