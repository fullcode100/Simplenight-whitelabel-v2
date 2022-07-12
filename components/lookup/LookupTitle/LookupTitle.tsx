import { useTranslation } from 'react-i18next';

const LookupTitle = () => {
  const [t, i18next] = useTranslation('global');
  const orderLookup = t('orderLookup', 'Order Lookup');
  const manageYourOrder = t('manageYourOrder', 'Manage Your Order');

  return (
    <section className="grid gap-2 text-white text-center">
      <h2 className="text-white">{orderLookup}</h2>
      <p className="font-normal text-base leading-[24px] lg:text-xl">
        {manageYourOrder}
      </p>
    </section>
  );
};

export default LookupTitle;
