import React from 'react';
import { useTranslation } from 'react-i18next';
import Car from 'public/icons/categories/Category-Cars.svg';
import BlockDivider from 'components/global/Divider/BlockDivider';
import CarDetailActions from './CarDetailActions';
export interface Rate {
  totalAmount: string;
  estimatedTotalAmount: string;
  currencyCode: string;
}
const CarIconCircle = () => {
  return (
    <section className="rounded-full grid place-content-center min-h-[40px] min-w-[40px] bg-primary-1000 text-white">
      <div className="w-[25px] h-[25px]">
        <Car />
      </div>
    </section>
  );
};

const ItemItinerary = ({
  label,
  estimatedAmount,
}: {
  label: string;
  estimatedAmount: string;
}) => {
  return (
    <div className="flex justify-between py-1 text-xs">
      <p>
        <span className="pr-3 text-lg leading-3 text-primary-1000">+</span>
        {label}
      </p>
      <p>${estimatedAmount}</p>
    </div>
  );
};

const TotalItinerary = ({
  label,
  totalAmount,
}: {
  label: string;
  totalAmount: string;
}) => {
  return (
    <div className="flex justify-between text-xs">
      <p>{label}</p>
      <p className="text-lg">${totalAmount}</p>
    </div>
  );
};
const CarItineraryDetail = ({
  name,
  rate,
  handleAction,
}: {
  name: string;
  rate: Rate;
  handleAction: (path: string) => void;
}) => {
  const [t] = useTranslation('cars');
  return (
    <div className="lg:flex flex-col hidden min-w-[376px] border-[1px] h-[90vh] sticky col-span-1 lg:top-20">
      <div className="flex items-center px-5 py-6 text-xs border-b-[1px]">
        <CarIconCircle />
        <h4 className="pl-3">{name}</h4>
      </div>
      <div className="flex flex-col content-between flex-1 p-6">
        <div className="flex-1">
          <ItemItinerary
            estimatedAmount={rate?.estimatedTotalAmount}
            label={t('basePrice')}
          />
          <ItemItinerary
            estimatedAmount={rate?.estimatedTotalAmount}
            label={t('taxes')}
          />
          <BlockDivider className="my-3" />
          <TotalItinerary totalAmount={rate?.totalAmount} label={t('payNow')} />
          <a
            href="https://terms.yelp.com/tos/en_us/20200101_en_us/"
            className="border-b-[1px] border-primary-1000 text-primary-1000 hover:text-primary-1000 visited:text-primary-1000"
          >
            {t('Terms Of Service')}
          </a>
        </div>
        <CarDetailActions
          total={rate?.totalAmount}
          handleAction={handleAction}
        />
      </div>
    </div>
  );
};

export default CarItineraryDetail;
