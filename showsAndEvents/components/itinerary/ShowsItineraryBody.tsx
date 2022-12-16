import { useTranslation } from 'react-i18next';

import { Item } from 'types/cart/CartType';
import ShowsGeneralInfo from './ShowsGeneralInfo';
import ExternalLink from 'components/global/ExternalLink/ExternalLink';

import PlusIcon from 'public/icons/assets/Plus.svg';
import ExtraDetailItem from '../ShowsPriceBreakdown/ExtraDataItem/ExtraDataItem';
import SupplierReference from '../SupplierReference/SupplierReference';

interface ShowsItineraryBodyProps {
  item: Item;
}

const ShowsItineraryBody = ({ item }: ShowsItineraryBodyProps) => {
  const [t, i18next] = useTranslation('events');
  const sectorLabel = t('sector', 'Sector');
  const rowLabel = t('row', 'Row');
  const ticketLabel = t('ticket', 'Ticket');
  const ticketsLabel = t('tickets', 'Tickets');
  const basePriceLabel = t('basePrice', 'Base Price');
  const taxesLabel = t('taxes', 'Taxes');
  const payNowLabel = t('payNow', 'Pay now');
  const vendorConfirmationLabel = t(
    'vendorConfirmation',
    'Vendor Confirmation Number',
  );

  const qty = item.quantity as number;
  const ticketsCountLabel = qty > 1 ? ticketsLabel : ticketLabel;

  const supplierReferenceID = item?.supplier_order_number;
  const vendorConfirmationNumber =
    item?.vendor_confirmation_code && item?.vendor_confirmation_code.length > 0
      ? item?.vendor_confirmation_code
      : '-';

  return (
    <>
      <ShowsGeneralInfo item={item} />
      <section className="flex flex-col gap-2 border-t border-dark-300 py-4 px-4">
        <section className="flex justify-between font-semibold">
          <p className="text-sm lg:text-lg leading-[22px] lg:leading-[26px] text-dark-1000">
            {`${sectorLabel} ${item?.item_data?.extra_data.seats[0].section}, ${rowLabel} ${item?.item_data?.extra_data.seats[0].row}`}
          </p>
          <p className="text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-800">
            {qty} {ticketsCountLabel}
          </p>
        </section>
        {supplierReferenceID && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-4">
            <SupplierReference supplierReferenceID={supplierReferenceID} />

            {vendorConfirmationNumber && (
              <section className="grid gap-0 ">
                <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-700">
                  {vendorConfirmationLabel}
                </p>
                <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-primary-1000">
                  {vendorConfirmationNumber}
                </p>
              </section>
            )}
          </section>
        )}
        <section className="flex justify-between py-2">
          <section className="flex flex-row gap-1">
            <section className="flex flex-row gap-1 lg:gap-3 items-baseline">
              <PlusIcon className="h-3.5 lg:h-4 lg:w-4 ml-0.5 mr-1 mt-1 text-primary-1000" />
              <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
                {`${qty}x ${ticketsCountLabel}`}
              </p>
            </section>
          </section>

          <section className="text-right">
            <div className="flex items-center text-gray-500">
              <p className="text-xs pr-2 ">
                {item.rate?.total.net.currency}
                {item.rate?.total.net.formatted}
              </p>
              <p className="text-primary-1000">
                {item.rate?.discounts.percentage_to_apply}
              </p>
            </div>
            <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
              {item.rate?.discounts.total_amount_before_apply.currency}
              {item.rate?.discounts.total_amount_before_apply.formatted}
            </p>
          </section>
        </section>
        <section className="flex justify-between pb-2">
          <section className="flex flex-row gap-1">
            <section className="flex flex-row gap-1 lg:gap-3 items-baseline">
              <PlusIcon className="h-3.5 lg:h-4 lg:w-4 ml-0.5 mr-1 mt-1 text-primary-1000" />
              <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
                {taxesLabel}
              </p>
            </section>
          </section>

          <section className="text-right">
            <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
              {'US$0.00'}
            </p>
          </section>
        </section>
        <div className="border-t border-dark-200"></div>
        <section className="flex justify-between mb-5">
          <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
            {payNowLabel}
          </p>
          <p className="font-semibold text-[18px] leading-[24px] text-dark-1000">
            {item?.rate?.total.net.currency}
            {item?.rate?.total.net.formatted}
          </p>
        </section>
        <ExtraDetailItem
          detail={'All sales are final and not cancellable.'}
          label={'Cancellation Policy'}
        />
        <ExternalLink
          className="text-primary-1000 hover:text-primary-1000 font-semibold text-[14px] leading-tight pt-2"
          href={'#'}
        >
          [SUPPLIER] Terms Of Services
        </ExternalLink>
      </section>
    </>
  );
};

export default ShowsItineraryBody;
