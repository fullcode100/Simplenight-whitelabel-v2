import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import useQuery from '../../../hooks/pageInteraction/useQuery';
import { Quote } from 'transportation/types/response/TransportationSearchResponse';
import { TransportaionDisplay } from './PriceDisplay';
import ReadMore from './ReadMoreDescription';
import { TransportationCancellable } from './TransportationCancellable';
import Suitcase from 'public/icons/assets/suitcase.svg';
import Users from 'public/icons/assets/users.svg';
import TransportIcon from 'public/icons/categories/Category-Transport.svg';
import HorizontalItemCard from 'components/global/HorizontalItemCard/HorizontalItemCard';
import { useCapitalizeFirstChar } from 'transportation/hooks/useCapitalizeFirstChar';
import CategoryTags from 'components/global/CategoryTags/CategoryTags';

interface TransportationCardProps {
  transportationItem: Quote;
  quoteRequestId: string;
}

export const TransportationCard: FC<TransportationCardProps> = ({
  transportationItem,
  quoteRequestId,
}) => {
  const {
    slug,
    startDate,
    endDate,
    startTime,
    endTime,
    address,
    address2,
    latitude,
    longitude,
    latitude2,
    longitude2,
  } = useQuery();
  const urlDetail = (transportation: Quote) => {
    const { quote_id: id } = transportation;
    return `/detail/${slug}/${quoteRequestId}:${id}?startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}&address=${address}&latitude=${latitude}&longitude=${longitude}&address2=${address2}&latitude2=${latitude2}&longitude2=${longitude2}`;
  };

  const [t] = useTranslation('ground-transportation');

  const transportationDetailsPageUrl = urlDetail(transportationItem);

  const Item = {
    id: transportationItem?.quote_id,
  };
  return (
    <HorizontalItemCard
      className=" flex-0-0-auto"
      key={transportationItem?.quote_id}
      categoryName={t('Transportation')}
      item={Item}
      title={useCapitalizeFirstChar(
        transportationItem?.service_info?.vehicle_type,
      )}
      image={transportationItem?.service_info?.photo_url}
      imageBackgroundSize={'contain'}
      url={transportationDetailsPageUrl}
      priceDisplay={<TransportaionDisplay transportaion={transportationItem} />}
      address={
        <TransportationCardDetails transportation={transportationItem} />
      }
      cancellable={
        <TransportationCancellable
          cancellable={true}
          description={transportationItem?.fare?.refund_cancellation_policy}
        />
      }
      icon={<TransportIcon />}
      rating={
        transportationItem?.service_info?.passenger_reviews?.average_rating
      }
      ratingCount={transportationItem?.service_info?.passenger_reviews?.count}
      price={
        <section className="flex flex-col">
          <hr />
          <section className="flex flex-row items-end justify-between gap-2 py-4 px-1">
            <TransportationCancellable
              cancellable={true}
              description={transportationItem?.fare?.refund_cancellation_policy}
            />
            <TransportaionDisplay transportaion={transportationItem} />
          </section>
        </section>
      }
    />
  );
};

const TransportationCardDetails: FC<{ transportation: Quote }> = ({
  transportation,
}) => {
  return (
    <section className="flex flex-col justify-between gap-2">
      <section>
        <section className="text-dark-800 font-semibold text-xs leading-5">
          {useCapitalizeFirstChar(transportation?.service_info?.service_class)}
        </section>
      </section>
      <section className="flex flex-col gap-1 items-start justify-start">
        <section className="flex flex-row items-center justify-start gap-1">
          <Users className=" w-4 h-4 text-primary-1000" />
          <section className="font-semibold text-xs leading-5 text-dark-1000">
            {transportation?.service_info?.max_pax} Passengers
          </section>
        </section>
        <section className="flex flex-row gap-1 items-center justify-start">
          <Suitcase className="w-4 h-4 text-primary-1000" />
          <section className="font-semibold text-xs leading-5 text-dark-1000">
            {transportation?.luggage?.inclusive_allowance}
          </section>
        </section>
      </section>
      <section>
        {transportation?.service_info.supplier?.description && (
          <ReadMore
            className="w-full font-semibold text-xs leading-5 text-dark-1000"
            text={transportation?.service_info?.supplier?.description}
          />
        )}
        <section></section>
      </section>
    </section>
  );
};
