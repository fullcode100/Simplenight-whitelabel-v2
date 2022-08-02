import classnames from 'classnames';
import ContinueCheckoutButtons from 'components/itinerary/ContinueCheckoutButtons/ContinueCheckoutButtons';
import { useTranslation } from 'react-i18next';
import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';

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
      <section className="flex items-center justify-between">
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
          {/* <h1 className="font-semibold text-dark-800 text-[20px] leading-[24px]">
          {title}
        </h1> */}
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
              size="xsmall"
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
