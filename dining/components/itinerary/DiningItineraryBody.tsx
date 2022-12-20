import { useTranslation } from 'react-i18next';
import { Item } from 'types/cart/CartType';
import DiningGeneralInfo from './DiningGeneralInfo';
import PlusIcon from 'public/icons/assets/Plus.svg';

interface DiningItineraryBodyProps {
  item: Item;
  name?: string;
  date?: string;
  time?: string;
  covers?: string;
}

const DiningItineraryBody = ({
  item,
  name,
  date,
  time,
  covers,
}: DiningItineraryBodyProps) => {
  // const nameFormatted = fromUpperCaseToCapitilize('State Street Pavillio Club');
  const [t, i18next] = useTranslation('dining');
  const basePriceLabel = t('basePrice', 'Base Price');
  const tableForLabel = t('tableFor', 'Table For');
  const payNowLabel = t('payNow', 'Pay now');

  return (
    <>
      <DiningGeneralInfo date={date} time={time} />
      <section className="flex flex-col gap-2 px-4 py-4 border-t border-dark-300">
        <section className="flex justify-between font-semibold">
          <p className="text-sm lg:text-lg leading-[22px] lg:leading-[26px] text-dark-1000">
            {name}
          </p>
          <p className="text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-800">
            {tableForLabel} {covers}
          </p>
        </section>
        <section className="flex justify-between py-2">
          <section className="flex flex-row gap-1">
            <section className="flex flex-row items-baseline gap-1 lg:gap-3">
              <PlusIcon className="h-3.5 lg:h-4 lg:w-4 ml-0.5 mr-1 mt-1 text-primary-1000" />
              <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
                {tableForLabel} {covers}
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
            <section className="flex flex-row items-baseline gap-1 lg:gap-3">
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
