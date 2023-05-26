import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TransportationItem } from 'transportation/types/response/TransportationSearchResponse';
import Suitcase from 'public/icons/assets/suitcase.svg';
import Users from 'public/icons/assets/users.svg';

interface TransportationDetailProps {
  transportation: TransportationItem;
}

export const TransportationDetailsDescription: FC<
  TransportationDetailProps
> = ({ transportation }) => {
  const [t] = useTranslation('ground-transportation');

  return (
    <section className="flex flex-col gap-4 px-5 py-6 lg:px-12 lg:py-8 lg:flex lg:flex-row lg:w-full lg:justify-around lg:items-start lg:gap-0">
      <section className="flex flex-col justify-center gap-4 items-satart lg:flex lg:flex-row lg:justify-around lg:items-start lg:flex-1">
        <section className="flex flex-row items-center gap-4 lg:flex lg:flex-col lg:gap-2 lg:items-center lg:justify-start">
          <Suitcase className="text-primary-1000 w-[20px] h-[19px] lg:w-[40px] lg:h-[38px]" />
          <section className="text-dark-1000">
            {transportation?.extra_data?.luggage?.inclusive_allowance}
          </section>
        </section>
        <section className="flex flex-row items-center gap-4 lg:flex lg:flex-col lg:gap-2 lg:items-center lg:justify-start">
          <Users className="text-primary-1000 w-[22px] h-[17px] lg:w-[44px] lg:h-[34px]" />
          <section className="text-dark-1000">
            {transportation?.extra_data?.max_capacity} Passengers
          </section>
        </section>
      </section>
      <section className="text-dark-1000 lg:flex-1">
        {transportation?.extra_data?.description}
      </section>
    </section>
  );
};
