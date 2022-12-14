import { useTranslation } from 'react-i18next';
import { Item } from 'types/cart/CartType';
import DiningGeneralInfo from './DiningGeneralInfo';
import { fromUpperCaseToCapitilize } from 'helpers/stringUtils';
import ExternalLink from 'components/global/ExternalLink/ExternalLink';
import PlusIcon from 'public/icons/assets/Plus.svg';
import ExtraDataItem from '../DiningPriceBreakdown/components/ExtraDataItem';

interface DiningItineraryBodyProps {
  item: Item;
}

const DiningItineraryBody = ({ item }: DiningItineraryBodyProps) => {
  const nameFormatted = fromUpperCaseToCapitilize('State Street Pavillio Club');
  const [t, i18next] = useTranslation('dining');
  const basePriceLabel = t('basePrice', 'Base Price');
  const tableForLabel = t('tableFor', 'Table For');
  const payNowLabel = t('payNow', 'Pay now');

  return (
    <>
      <DiningGeneralInfo />
      <section className="flex flex-col gap-2 border-t border-dark-300 py-4 px-4">
        <section className="flex justify-between font-semibold">
          <p className="text-sm lg:text-lg leading-[22px] lg:leading-[26px] text-dark-1000">
            {nameFormatted}
          </p>
          <p className="text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-800">
            {tableForLabel} 2
          </p>
        </section>
        <section className="flex justify-between py-2">
          <section className="flex flex-row gap-1">
            <section className="flex flex-row gap-1 lg:gap-3 items-baseline">
              <PlusIcon className="h-3.5 lg:h-4 lg:w-4 ml-0.5 mr-1 mt-1 text-primary-1000" />
              <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
                {tableForLabel} 2
              </p>
            </section>
          </section>
          <section className="text-right">
            <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
              {'US$0.00'}
            </p>
          </section>
        </section>
        <section className="flex justify-between pb-2">
          <section className="flex flex-row gap-1">
            <section className="flex flex-row gap-1 lg:gap-3 items-baseline">
              <PlusIcon className="h-3.5 lg:h-4 lg:w-4 ml-0.5 mr-1 mt-1 text-primary-1000" />
              <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
                {basePriceLabel}
              </p>
            </section>
          </section>

          <section className="text-right">
            <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
              {'US$0.00'}
            </p>
          </section>
        </section>
      </section>
    </>
  );
};

export default DiningItineraryBody;
