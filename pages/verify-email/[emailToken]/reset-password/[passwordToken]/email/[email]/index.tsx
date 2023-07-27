import useQuery from '../../../../../../../hooks/pageInteraction/useQuery';
import { useEffect } from 'react';
import { verifyEmail } from '../../../../../../../profiles/core/services/AuthClientService';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

const VerifyEmail = () => {
  const [t, i18n] = useTranslation('profiles');
  const { emailToken, passwordToken, email } = useQuery() as {
    emailToken: string | undefined;
    passwordToken: string | undefined;
    email: string | undefined;
  };
  const router = useRouter();
  useEffect(() => {
    if (emailToken && passwordToken && email) {
      verifyEmail(emailToken, i18n)
        .then(() => {
          router.push(
            `/?view=configurePassword&resetPasswordToken=${passwordToken}&email=${email}`,
          );
        })
        .catch(() =>
          router.push(`/?view=configurePasswordError&email=${email}`),
        );
    }
  }, [emailToken, passwordToken, email]);
  return null;
};

export default VerifyEmail;
