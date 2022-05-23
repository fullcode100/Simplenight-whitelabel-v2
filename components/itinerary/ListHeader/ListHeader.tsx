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
    <header className="px-5 mt-6">
      <h4 className="font-semibold text-dark-800 text-lg">{checkoutLabel}</h4>
      <section className="border border-green-300 bg-green-100 rounded mt-6">
        <section className="flex items-start gap-2 py-1 pl-1.5 pr-1 text-green-1000">
          <section className="mt-1">
            <Tag />
          </section>
          <section className="text-green-1000 text-xs">
            <p className="font-semibold">{checkoutTagTitle}</p>
            <p>{checkoutTagText}</p>
          </section>
        </section>
      </section>
    </header>
  );
};

export default ListHeader;
