import { ExternalLink, SectionTitle } from '@simplenight/ui';
import Button from 'components/global/Button/Button';
import { useTranslation } from 'react-i18next';
import {
  login,
  resetPassword,
  sendForgotPasswordEmail,
} from '../../core/services/AuthClientService';
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

interface FormData {
  email: string;
}

const SetNewPassword = ({
  closeModal,
  changeAuthType,
  token = '',
}: IAuthComponent) => {
  const [t, i18n] = useTranslation('profiles');
  const [g] = useTranslation('global');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setErrorMessage('');
      setLoading(true);
      await resetPassword(
        {
          token,
          password: '',
        },
        i18n,
      );
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
        <section className="mt-4 mb-8">
          <SectionTitle
            title={t('resetYourPassword', 'Reset your password')}
            displayIcon={false}
            subTitle={
              "We'll email you instrucctions on how to reset your password"
            }
          />
        </section>
        <Controller
          name={'email'}
          control={control}
          rules={EmailRules(g)}
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
        {!loading && (
          <>
            <Button
              value={'Send Email'}
              size="large"
              className="w-full py-3 my-5"
              onClick={handleSubmit(onSubmit)}
            />
          </>
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

export default SetNewPassword;
