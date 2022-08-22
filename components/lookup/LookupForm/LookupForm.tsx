import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import BaseInput from 'components/global/Input/BaseInput';
import Button from 'components/global/Button/Button';
import { getBookingByOrderNumber } from 'core/client/services/BookingService';

const CONFIRMATION_URI = '/confirmation';

const LookupForm = () => {
  const router = useRouter();

  const [t, i18next] = useTranslation('global');
  const simplenightOrderNumber = t(
    'simplenightOrderNumber',
    'Simplenight Order Number',
  );
  const simplenightOrderNumberPlaceholder = t(
    'simplenightOrderNumberPlaceholder',
    'E.g. ABCD1234',
  );
  const lastNameLabel = t('lastName', 'Last Name');
  const lastNamePlaceholder = t('lastNamePlaceholder', 'Order Last Name');
  const findOrder = t('findOrder', 'Find Order');

  const [orderNumber, setOrderNumber] = useState('');
  const [lastName, setLastName] = useState('');

  const handleFindOrder = () => {
    getBookingByOrderNumber(i18next, orderNumber, lastName).then((response) => {
      if (response) {
        const bookingId = response?.booking_id;
        router.push(`${CONFIRMATION_URI}?bookingId=${bookingId}&lookup=true`);
      }
    });
  };

  return (
    <section className="grid gap-5 bg-white rounded p-4 lg:flex lg:items-end lg:gap-4">
      <section className="grid gap-4 lg:flex lg:w-[80%] lg:flex-1 lg:items-end">
        <BaseInput
          label={simplenightOrderNumber}
          value={orderNumber}
          placeholder={simplenightOrderNumberPlaceholder}
          inputClassName={'placeholder:text-dark-600'}
          onChange={(e) => setOrderNumber(e.target.value)}
        />
        <BaseInput
          label={lastNameLabel}
          value={lastName}
          placeholder={lastNamePlaceholder}
          inputClassName={'placeholder:text-dark-600'}
          onChange={(e) => setLastName(e.target.value)}
        />
      </section>

      <Button
        value={findOrder}
        size="full"
        onClick={handleFindOrder}
        className="lg:w-[20%] lg:h-[2.7rem]"
      />
    </section>
  );
};

export default LookupForm;
