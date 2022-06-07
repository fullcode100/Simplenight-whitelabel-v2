import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

interface PageTitleProps {
  title: string;
  icon?: React.ReactNode;
  productsAmount?: number;
  productsLabel?: string;
}

const PageTitle = ({
  title,
  icon,
  productsAmount,
  productsLabel,
}: PageTitleProps) => {
  const [t, i18next] = useTranslation('global');
  const item = t('item', 'Item');
  const items = t('items', 'Items');
  const itemsLabel = productsAmount == 1 ? item : items;

  const showProductsAmount = !!productsAmount && productsAmount > 0;

  return (
    <section className="flex items-center justify-between">
      <section
        className={classnames('flex items-center', {
          ['gap-3']: icon,
        })}
      >
        <span className="text-primary-1000">{icon}</span>
        <h1 className="font-semibold text-dark-800 text-[20px] leading-[24px]">
          {title}
        </h1>
      </section>

      {showProductsAmount && (
        <section className="font-semibold text-dark-800 text-[16px] leading-[20px]">
          {productsAmount} {itemsLabel}
        </section>
      )}
    </section>
  );
};

export default PageTitle;
