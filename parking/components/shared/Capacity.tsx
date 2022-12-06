import { FC } from 'react';
import { Highlighted } from '../../../components/global/Highlighted/Highlighted';
import { useTranslation } from 'react-i18next';

export const Capacity: FC<{ capacity?: number }> = ({ capacity }) => {
  const [t] = useTranslation('parking');

  if (!capacity) return null;
  return (
    <Highlighted color={'success'}>
      {capacity} {t(capacity === 1 ? 'spot' : 'spots')}
    </Highlighted>
  );
};
