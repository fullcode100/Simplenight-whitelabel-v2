import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import useQuery from '../../../hooks/pageInteraction/useQuery';
import { TransportationItem } from 'transportation/types/response/TransportationSearchResponse';
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
  transportationItem: TransportationItem;
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
  const urlDetail = (transportation: TransportationItem) => {
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
        transportationItem?.extra_data?.vehicle_type,
      )}
      image={transportationItem?.extra_data?.photo_urls[0]}
      imageBackgroundSize={'contain'}
      url={transportationDetailsPageUrl}
      priceDisplay={<TransportaionDisplay transportaion={transportationItem} />}
      cancellable={
        <TransportationCancellable
          cancellable={true}
          description={transportationItem?.cancellation_policy?.[0]?.details}
        />
      }
      icon={<TransportIcon />}
      rating={transportationItem?.extra_data?.avg_rating}
      ratingCount={transportationItem?.extra_data?.review_amount}
      price={
        <section className="flex flex-col">
          <hr />
          <section className="flex flex-row items-end justify-between gap-2 px-1 py-4">
            <TransportationCancellable
              cancellable={true}
              description={
                transportationItem?.cancellation_policy?.[0]?.details
              }
            />
            <TransportaionDisplay transportaion={transportationItem} />
          </section>
        </section>
      }
    />
  );
};

const TransportationCardDetails: FC<{ transportation: TransportationItem }> = ({
  transportation,
}) => {
  return (
    <section className="flex flex-col justify-between gap-2">
      <section>
        <section className="text-xs font-semibold leading-5 text-dark-800">
          {useCapitalizeFirstChar(transportation?.extra_data?.service_class)}
        </section>
      </section>
      <section className="flex flex-col items-start justify-start gap-1">
        <section className="flex flex-row items-center justify-start gap-1">
          <Users className="w-4 h-4 text-primary-1000" />
          <section className="text-xs font-semibold leading-5 text-dark-1000">
            {transportation?.extra_data?.max_capacity} Passengers
          </section>
        </section>
        <section className="flex flex-row items-center justify-start gap-1">
          <Suitcase className="w-4 h-4 text-primary-1000" />
          <section className="text-xs font-semibold leading-5 text-dark-1000">
            {transportation?.extra_data?.luggage?.inclusive_allowance}
          </section>
        </section>
      </section>
      <section>
        {transportation?.extra_data?.description && (
          <ReadMore
            className="w-full text-xs font-semibold leading-5 text-dark-1000"
            text={transportation?.extra_data?.description}
          />
        )}
        <section></section>
      </section>
    </section>
  );
};
