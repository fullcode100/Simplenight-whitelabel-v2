import classnames from 'classnames';
import ContinueCheckoutButtons from 'components/itinerary/ContinueCheckoutButtons/ContinueCheckoutButtons';
import { useTranslation } from 'react-i18next';
import { Heading } from '@simplenight/ui';
import { Paragraph } from '@simplenight/ui';

interface PageTitleProps {
  title: string;
  icon?: React.ReactNode;
  productsAmount?: number;
}

const PageTitle = ({ title, icon, productsAmount }: PageTitleProps) => {
  const [t, i18next] = useTranslation('global');
  const item = t('item', 'Item');
  const items = t('items', 'Items');
  const itemsLabel = productsAmount == 1 ? item : items;

  const showProductsAmount = !!productsAmount && productsAmount > 0;

  return (
    <>
      <section className="flex items-center justify-between max-w-7xl mx-auto w-full">
        <section
          className={classnames('flex items-center', {
            ['gap-3']: icon,
          })}
        >
          <section className="w-8 h-8 lg:w-[60px] lg:h-[60px] flex items-center justify-center lg:p-[7.5px] p-1">
            <span className="text-primary-1000">{icon}</span>
          </section>
          <Heading tag="h3" textColor="text-dark-800">
            {title}
          </Heading>
        </section>

        <section className="lg:flex flex-col gap-4 items-end hidden">
          {showProductsAmount && (
            <Heading
              tag="h4"
              textColor="text-dark-800"
            >{`${productsAmount} ${itemsLabel}`}</Heading>
          )}
          <ContinueCheckoutButtons productsAmount={productsAmount} />
        </section>
        {showProductsAmount && (
          <section className="lg:hidden">
            <Paragraph
              textColor="text-dark-800"
              fontWeight="semibold"
            >{`${productsAmount} ${itemsLabel}`}</Paragraph>
          </section>
        )}
      </section>
      <section className="lg:hidden">
        <ContinueCheckoutButtons productsAmount={productsAmount} />
      </section>
    </>
  );
};

export default PageTitle;
