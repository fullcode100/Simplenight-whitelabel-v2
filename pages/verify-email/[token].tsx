import useQuery from '../../hooks/pageInteraction/useQuery';
import { useEffect } from 'react';
import {
  loginWithToken,
  verifyEmail,
} from '../../profiles/core/services/AuthClientService';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

const VerifyEmail = () => {
  const [t, i18n] = useTranslation('profiles');
  const { token } = useQuery() as { token: string | undefined };
  const router = useRouter();
  useEffect(() => {
    if (token) {
      verifyEmail(token, i18n)
        .then(() => {
          loginWithToken(token);
          router.push('/');
        })
        .catch((e) => console.error(e));
    }
  }, [token]);
  return null;
};

export default VerifyEmail;
