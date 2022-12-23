import { useTranslation } from 'react-i18next';
import { Item } from 'types/cart/CartType';
import DiningGeneralInfo from './DiningGeneralInfo';
import PlusIcon from 'public/icons/assets/Plus.svg';
import DiningConfirmationBuyerInfo from '../confirmation/DiningConfirmationBuyerInfo';
import { CustomerType } from 'dining/types/diningCustom';

interface DiningItineraryBodyProps {
  item?: Item;
  date?: string;
  time?: string;
  covers?: string;
  customer?: CustomerType;
  bookingId?: string;
  supplierId?: string;
}

const DiningItineraryBody = ({
  item,
  date,
  time,
  covers,
  customer,
  bookingId,
  supplierId,
}: DiningItineraryBodyProps) => {
  const [t] = useTranslation('dining');
  const basePriceLabel = t('basePrice', 'Base Price');
  const tableForLabel = t('tableFor', 'Table For');

  return (
    <>
      <DiningGeneralInfo date={date} time={time} />
      {customer ? <DiningConfirmationBuyerInfo customer={customer} /> : null}
      <section className="flex flex-col gap-2 px-4 py-4 border-t border-dark-300">
        <p className="text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-800 font-semibold">
          {tableForLabel} {covers}
        </p>
        {bookingId || supplierId ? (
          <section className="grid grid-cols-1 my-6 lg:grid-cols-2">
            <div>
              <p className="text-sm text-dark-700">{t('supplierReference')}</p>
              <p>{supplierId}</p>
            </div>
            <div>
              <p className="text-sm text-dark-700">{t('confirmationNumber')}</p>
              <p>{bookingId}</p>
            </div>
          </section>
        ) : null}
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
              {'$0.00'}
            </p>
          </section>
        </section>
      </section>
    </>
  );
};

export default DiningItineraryBody;
