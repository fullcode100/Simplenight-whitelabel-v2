import React from 'react';
import { useTranslation } from 'react-i18next';
import Dining from 'public/icons/categories/Category-Dining.svg';
import BlockDivider from 'components/global/Divider/BlockDivider';
import DiningItineraryActions from './DiningItineraryActions';

const DiningIconCircle = () => {
  return (
    <section className="rounded-full grid place-content-center min-h-[40px] min-w-[40px] bg-primary-1000 text-white">
      <div className="w-[25px] h-[25px]">
        <Dining />
      </div>
    </section>
  );
};

const ItemItinerary = ({ label }: { label: string }) => {
  return (
    <div className="flex justify-between py-1 text-xs">
      <p>
        <span className="pr-3 text-lg leading-3 text-primary-1000">+</span>
        {label}
      </p>
      <p>US$0.00</p>
    </div>
  );
};

const TotalItinerary = ({ label }: { label: string }) => {
  return (
    <div className="flex justify-between text-xs">
      <p>{label}</p>
      <p className="text-lg">US$0.00</p>
    </div>
  );
};
const DiningItineraryDetail = ({
  name,
  handleAction,
}: {
  name: string;
  handleAction: (path: string) => void;
}) => {
  const [t] = useTranslation('dining');
  return (
    <div className="lg:flex hidden w-full max-w-[376px] border-[1px] flex-col max-h-[calc(100vh-129px)]">
      <div className="flex items-center px-5 py-6 text-xs border-b-[1px]">
        <DiningIconCircle />
        <h4 className="pl-3">{name}</h4>
      </div>
      <div className="flex flex-col content-between flex-1 p-6">
        <div className="flex-1">
          <ItemItinerary label={t('basePrice')} />
          <ItemItinerary label={t('taxes')} />
          <BlockDivider className="my-3" />
          <TotalItinerary label={t('payNow')} />
          <a
            href="https://terms.yelp.com/tos/en_us/20200101_en_us/"
            className="border-b-[1px] border-primary-1000 text-primary-1000 hover:text-primary-1000 visited:text-primary-1000"
          >
            {t('termsOfService')}
          </a>
        </div>
        <DiningItineraryActions handleAction={handleAction} />
      </div>
    </div>
  );
};

export default DiningItineraryDetail;