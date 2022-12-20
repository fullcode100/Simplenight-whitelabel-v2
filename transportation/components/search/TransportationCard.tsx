import React, { FC } from 'react';
import HorizontalItemCard from '../../../components/global/HorizontalItemCard/HorizontalItemCard';
import { useTranslation } from 'react-i18next';
import useQuery from '../../../hooks/pageInteraction/useQuery';
import { Quote } from 'transportation/types/response/TransportationSearchResponse';
import { TransportaionDisplay } from './PriceDisplay';
import ReadMore from './ReadMoreDescription';
import { TransportationCancellable } from './TransportationCancellable';
import Suitcase from 'public/icons/assets/suitcase.svg';
import Users from 'public/icons/assets/users.svg';
import Ticket from 'public/icons/assets/ticket.svg';


interface TransportationCardProps {
  transportationItem: any;
  quoteRequestId: string
}

export const TransportationCard: FC<TransportationCardProps> = ({ transportationItem, quoteRequestId }) => {
  const { slug, startDate, endDate, startTime, endTime, address, address2, latitude, longitude, latitude2, longitude2 } = useQuery();
  const urlDetail = (transportation: Quote) => {
    const { quote_id: id } = transportation;
    return `/detail/${slug
      }/${quoteRequestId}:${id
      }?startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime
      }&address=${address}&latitude=${latitude}&longitude=${longitude
      }&address2=${address2}&latitude2=${latitude2}&longitude2=${longitude2}`;
  };

  const [t] = useTranslation('ground-transportation');

  const transportationDetailsPageUrl = urlDetail(transportationItem);

  const Item = {
    id: transportationItem?.quote_id
  }
  return (
    <HorizontalItemCard
      key={transportationItem?.quote_id}
      categoryName={t('Transportation')}
      item={Item}
      title={capitalizeFirst(transportationItem?.service_info?.vehicle_type)}
      image={transportationItem?.service_info?.photo_url}
      url={transportationDetailsPageUrl}
      priceDisplay={<TransportaionDisplay transportaion={transportationItem} />}
      address={<TransportationCardDetails transportation={transportationItem} />}
      cancellable={<TransportationCancellable cancellable={true} description={transportationItem?.fare?.refund_cancellation_policy} />}
      icon={<Ticket />}
    />
  );
};

const TransportationCardDetails: FC<{ transportation: Quote }> = ({ transportation }) => {

  return (
    <section className="flex flex-col justify-between gap-2">
      <section>
        <section className="text-dark-1000">{capitalizeFirst(transportation?.service_info?.service_class)}</section>
      </section>
      <section className='flex flex-col gap-1 items-start justify-start lg:flex lg:flex-row lg:justify-around lg:items-start lg:flex-1'>
        <section className='flex flex-row items-center justify-start gap-1 lg:flex lg:flex-row lg:gap-1 lg:items-center lg:justify-start'>
          <Users className=" w-4 h-4 text-primary-1000" />
          <section className="text-dark-1000">{transportation?.service_info?.max_pax} Passengers</section>
        </section>
        <section className='flex flex-row gap-1 items-center justify-start lg:flex lg:flex-row lg:gap-1 lg:items-center lg:justify-start'>
          <Suitcase className="w-4 h-4 text-primary-1000" />
          <section className="text-dark-1000">{transportation?.luggage?.inclusive_allowance}</section>
        </section>
      </section>
      <section>
        {transportation?.service_info.supplier?.description && (
          <ReadMore
            className="w-full text-xs leading-5 text-dark-1000"
            text={transportation?.service_info?.supplier?.description}
          />
        )}
        <section>
        </section>
      </section>
    </section>
  );
};

const capitalizeFirst = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
