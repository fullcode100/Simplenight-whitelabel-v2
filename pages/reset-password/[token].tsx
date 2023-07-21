import useQuery from '../../hooks/pageInteraction/useQuery';
import { useEffect } from 'react';
import { resetPassword } from '../../profiles/core/services/AuthClientService';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

const ResetPassword = () => {
  const [t, i18n] = useTranslation('profiles');
  const { token } = useQuery() as { token: string | undefined };
  const router = useRouter();
  useEffect(() => {
    if (token) {
      router.push(`/?setNewPass=${token}`);
    }
  }, [token]);
  return null;
};

export default ResetPassword;
