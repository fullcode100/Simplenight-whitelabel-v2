import React, { FC, useState } from 'react';
import { Quote } from 'transportation/types/response/TransportationSearchResponse';
import { useTranslation } from 'react-i18next';
import TransportIcon from 'public/icons/categories/Category-Transport.svg';
import SectionTransportTitle from '../shared/Section/SectionTransportTitle';
import Button from 'components/global/Button/Button';
import FreeCancellation from 'components/global/FreeCancellation/FreeCancellation';
import Plus from '@/icons/assets/plusIcon.svg';
import { Item } from 'types/cart/CartType';
import { addToCart } from 'core/client/services/CartClientService';
import { useRouter } from 'next/router';
import useQuery from '../../../hooks/pageInteraction/useQuery';
import { useCapitalizeFirstChar } from 'transportation/hooks/useCapitalizeFirstChar';

interface TransportationDetailProps {
  transportation: Quote;
}
export const TransportationDetailsRightSide: FC<TransportationDetailProps> = ({
  transportation,
}) => {
  const [tg, i18next] = useTranslation('global');
  const [t] = useTranslation('ground-transportation');
  const transportationTitle = tg(
    'transportationTitle',
    `${transportation?.service_info?.vehicle_type}`,
  );
  const transportationSubTitle = tg(
    'transportationSubTitle',
    'Point-To-Point-Trip',
  );
  const bookText = tg('bookText', 'Book Now');
  const itineraryText = tg('itineraryText', 'Add To Itinerary');
  const totalText = tg('totalText', 'Total');
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const params = useQuery();

  const cartItem: Item = {
    category: 'GROUND-TRANSPORTATION',
    sector: 'other',
    booking_data: {
      inventory_id: params.id as string,
      search: {
        start_date: params.startDate as string,
        start_time: params.startTime as string,
        end_date: params.endDate as string,
        end_time: params.endTime as string,
        location1: params.address as string,
        location2: params.address2 as string,
      },
      transportation: transportation,
      rate: {
        total: {
          prepaid: {
            amount: transportation?.fare?.price,
            currency: transportation?.fare?.currency_code,
          },
        },
      },
    },
  };

  const handleAction = async (url: string) => {
    setDisabled(true);
    await addToCart(cartItem, i18next);
    router.replace(url);
  };

  return (
    <section className="lg:flex lg:flex-row lg:w-[25%] lg:shadow-container lg:max-h-[772px]">
      <hr className="hidden lg:visible lg:border-l-2" />
      <section className="flex flex-col items-start justify-start w-full lg:h-full">
        <section className="px-4 py-4">
          <SectionTransportTitle
            title={useCapitalizeFirstChar(transportationTitle)}
            icon={<TransportIcon />}
            subTitle={transportationSubTitle}
          />
        </section>
        <hr className="w-full border-t-2" />
        <section className="flex flex-col flex-1 w-full gap-2 px-6 py-6">
          <section className="flex flex-row justify-between">
            <section className="flex flex-row items-center gap-1">
              <Plus className="text-primary-1000" />
              <p className="text-sm font-normal leading-6 text-dark-1000">
                {transportationSubTitle}
              </p>
            </section>
            <p className="text-lg leading-[18px] text-dark-1000">
              {transportation?.fare?.currency_code}{' '}
              {transportation?.fare?.price.toFixed(2)}
            </p>
          </section>
          <hr className="w-full border-t-2" />
          <FreeCancellation wfull={true} cancellable={true} />
        </section>
        <hr className="w-full border-t-2" />
        <section className="flex flex-col items-start justify-start w-full gap-2 px-4 py-4">
          <section className="flex flex-row items-center justify-between w-full">
            <p className="text-sm font-normal leading-6 text-dark-800">
              {totalText}
            </p>
            <p className="text-lg leading-[18px] text-dark-1000">
              {transportation?.fare?.currency_code}{' '}
              {transportation?.fare?.price?.toFixed(2)}
            </p>
          </section>
          <Button
            value={itineraryText}
            size="full"
            type="outlined"
            textColor="primary"
            onClick={() => handleAction('/itinerary')}
            disabled={disabled}
          />
          <Button
            value={bookText}
            size="full"
            onClick={() => handleAction('/checkout/client')}
            disabled={disabled}
          />
        </section>
      </section>
    </section>
  );
};
