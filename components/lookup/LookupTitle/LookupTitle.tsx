import { useTranslation } from 'react-i18next';

const LookupTitle = () => {
  const [t, i18next] = useTranslation('global');
  const orderLookup = t('orderLookup', 'Order Lookup');
  const manageYourOrder = t('manageYourOrder', 'Manage Your Order');

  return (
    <section className="grid gap-2 text-white text-center">
      <p className="font-semibold text-[32px] leading-[40px] lg:text-[2.75rem]">
        {orderLookup}
      </p>
      <p className="font-normal text-base leading-[24px] lg:text-xl">
        {manageYourOrder}
      </p>
    </section>
  );
};

export default LookupTitle;
