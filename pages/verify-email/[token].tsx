import useQuery from '../../hooks/pageInteraction/useQuery';
import { useEffect } from 'react';
import { verifyEmail } from '../../profiles/core/services/AuthClientService';
import { useTranslation } from 'react-i18next';

const VerifyEmail = () => {
  const [t, i18n] = useTranslation('profiles');
  const { token } = useQuery() as { token: string | undefined };
  useEffect(() => {
    if (token) {
      verifyEmail(token, i18n)
        .then((r) => console.log(r))
        .catch((e) => console.error(e));
    }
  }, [token]);
  return null;
};

export default VerifyEmail;
