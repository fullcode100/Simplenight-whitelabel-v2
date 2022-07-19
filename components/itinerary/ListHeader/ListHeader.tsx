import Tag from 'public/icons/assets/tag.svg';
import { useTranslation } from 'react-i18next';

const ListHeader = () => {
  const [t, i18next] = useTranslation('global');
  const checkoutLabel = t('checkout', 'Ready For Checkout');
  const checkoutTagTitle = t('checkoutTagTitle', 'Check Out Now!');
  const checkoutTagText = t(
    'checkoutTagText',
    'Room rates are increasing soon.',
  );

  return (
    <header>
      <h4 className="text-lg leading-6 text-dark-800 font-semibold lg:bg-dark-100 bg-white px-5 py-6">
        {checkoutLabel}
      </h4>
      <section className="border border-green-300 bg-green-100 rounded mx-5 lg:mt-6">
        <section className="flex items-start gap-2 py-1 pl-1.5 pr-1 text-green-1000">
          <section className="mt-1">
            <Tag />
          </section>
          <section className="text-green-1000 text-xs lg:flex lg:gap-1">
            <p className="font-semibold">{checkoutTagTitle}</p>
            <p>{checkoutTagText}</p>
          </section>
        </section>
      </section>
    </header>
  );
};

export default ListHeader;
