import { useTranslation } from 'react-i18next';

const ConfirmationFooterButtons = () => {
  const [t, i18next] = useTranslation('global');
  const continueShopping = t('continueShopping', 'Continue Shopping');
  const cancelOrder = t('cancelOrder', 'Cancel Order');

  return (
    <section className="flex flex-col">
      <button className="h-11 bg-primary-1000 rounded mb-3">
        <h4 className="font-semibold text-white  text-[18px]">
          {continueShopping}
        </h4>
      </button>
      <button className="h-11 rounded border border-dark-1000">
        <h4 className="font-semibold text-dark-1000 text-[18px]">
          {cancelOrder}
        </h4>
      </button>
    </section>
  );
};

export default ConfirmationFooterButtons;
