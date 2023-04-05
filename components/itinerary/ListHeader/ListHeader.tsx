import Tag from 'public/icons/assets/tag.svg';
import { useTranslation } from 'react-i18next';

const ListHeader = () => {
  const [t, i18next] = useTranslation('global');
  const checkoutLabel = t('readyForCheckout', 'Ready For Checkout');
  const checkoutTagTitle = t('checkoutNow', 'Check Out Now!');
  const checkoutTagText = t('checkoutTagText', 'Prices are increasing soon.');

  return (
    <section>
      <h4 className="text-lg leading-6 text-dark-800 font-semibold lg:bg-dark-100 bg-white px-5 py-6">
        {checkoutLabel}
      </h4>
    </section>
  );
};

export default ListHeader;
