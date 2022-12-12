import { useTranslation } from 'react-i18next';

import { Item } from 'types/cart/CartType';
import ShowsGeneralInfo from './ShowsGeneralInfo';
import { fromUpperCaseToCapitilize } from 'helpers/stringUtils';
import ExternalLink from 'components/global/ExternalLink/ExternalLink';

import PlusIcon from 'public/icons/assets/Plus.svg';
import ExtraDetailItem from '../ShowsPriceBreakdown/ExtraDataItem/ExtraDataItem';

interface ShowsItineraryBodyProps {
  item: Item;
}

const ShowsItineraryBody = ({ item }: ShowsItineraryBodyProps) => {
  const qty = 2;
  const nameFormatted = fromUpperCaseToCapitilize('State Street Pavillio Club');
  const [t, i18next] = useTranslation('events');
  const ticketLabel = t('ticket', 'Ticket');
  const ticketsLabel = t('tickets', 'Tickets');
  const basePriceLabel = t('basePrice', 'Base Price');
  const taxesLabel = t('taxes', 'Taxes');
  const payNowLabel = t('payNow', 'Pay now');

  const ticketsCountLabel = qty > 1 ? ticketsLabel : ticketLabel;

  return (
    <>
      <ShowsGeneralInfo />
      <section className="flex flex-col gap-2 border-t border-dark-300 py-4 px-4">
        <section className="flex justify-between font-semibold">
          <p className="text-sm lg:text-lg leading-[22px] lg:leading-[26px] text-dark-1000">
            {nameFormatted}
          </p>
          <p className="text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-800">
            {qty} {ticketsCountLabel}
          </p>
        </section>
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
            <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
              {'US$407.00'}
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
              {'US$397.00'}
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
              {'US$10.00'}
            </p>
          </section>
        </section>
        <div className="border-t border-dark-200"></div>
        <section className="flex justify-between mb-5">
          <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
            {payNowLabel}
          </p>
          <p className="font-semibold text-[18px] leading-[24px] text-dark-1000">
            {'US$1018.00'}
          </p>
        </section>
        <ExtraDetailItem
          detail={'{ticket features}'}
          label={'Price includes'}
        />
        <ExtraDetailItem
          detail={'{cancellation policy}'}
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
