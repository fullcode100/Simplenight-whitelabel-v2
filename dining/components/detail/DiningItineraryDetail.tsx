import React from 'react';
import { useTranslation } from 'react-i18next';
import Dining from 'public/icons/categories/Category-Dining.svg';
import DiningDetailActions from './DiningDetailActions';
import BlockDivider from 'components/global/Divider/BlockDivider';
import { transformTo12hours } from 'dining/helpers/time';

const DiningIconCircle = () => {
  return (
    <section className="rounded-full grid place-content-center min-h-[40px] min-w-[40px] bg-primary-1000 text-white">
      <div className="w-[25px] h-[25px]">
        <Dining />
      </div>
    </section>
  );
};

const DiningItineraryDetail = ({
  name,
  handleAction,
  time,
  date,
  covers = 2,
}: {
  name: string;
  handleAction: (path: string) => void;
  time: string;
  date: string;
  covers?: number;
}) => {
  const [t] = useTranslation('dining');
  return (
    <div className="lg:flex flex-col hidden min-w-[376px] border-[1px] h-[90vh] sticky col-span-1 lg:top-20">
      <div className="flex items-center px-5 py-6 text-xs border-b-[1px]">
        <DiningIconCircle />
        <h6 className="pl-3">{name}</h6>
      </div>
      <BlockDivider />
      <div className="px-5 py-6">
        <p className="text-lg text-dark-700">
          <span className="mr-2 font-semibold text-dark-1000">{date}</span>
          {transformTo12hours(time)}
        </p>
        <p className="text-sm text-dark-1000">Table for {covers}</p>
      </div>
      <BlockDivider />
      <div className="flex flex-col content-between flex-1 p-6">
        <div className="flex-1">
          <a
            href="https://terms.yelp.com/tos/en_us/20200101_en_us/"
            className="border-b-[1px] border-primary-1000 text-primary-1000 hover:text-primary-1000 visited:text-primary-1000"
          >
            {t('termsOfService')}
          </a>
        </div>
        <DiningDetailActions handleAction={handleAction} />
      </div>
    </div>
  );
};

export default DiningItineraryDetail;
