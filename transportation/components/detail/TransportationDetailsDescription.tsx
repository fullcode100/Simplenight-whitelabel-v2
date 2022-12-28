import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Quote } from 'transportation/types/response/TransportationSearchResponse';
import Suitcase from 'public/icons/assets/suitcase.svg';
import Users from 'public/icons/assets/users.svg';

interface TransportationDetailProps {
    transportation: Quote;
}

export const TransportationDetailsDescription: FC<TransportationDetailProps> = ({
    transportation,
}) => {
    const [t] = useTranslation('ground-transportation');


    return (
        <section className='px-5 py-6 flex flex-col gap-8 lg:px-12 lg:py-8 lg:flex lg:flex-row lg:w-full lg:justify-around lg:items-start lg:gap-0'>
            <section className='flex flex-col gap-6 items-satart justify-center lg:flex lg:flex-row lg:justify-around lg:items-start lg:flex-1'>
                <section className='flex flex-row items-center gap-4 lg:flex lg:flex-col lg:gap-2 lg:items-center lg:justify-start'>
                    <Suitcase className="text-primary-1000" />
                    <section className="text-dark-1000">{transportation?.luggage?.inclusive_allowance}</section>
                </section>
                <section className='flex flex-row items-center gap-4 lg:flex lg:flex-col lg:gap-2 lg:items-center lg:justify-start'>
                    <Users className="text-primary-1000" />
                    <section className="text-dark-1000">{transportation?.service_info?.max_pax} Passengers</section>
                </section>
            </section>
            <section className="text-dark-1000 lg:flex-1">{transportation?.service_info?.supplier?.description}</section>
        </section>
    );
};