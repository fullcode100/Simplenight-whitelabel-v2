import React, { FC } from 'react';
import { Quote } from 'transportation/types/response/TransportationSearchResponse';
import { useTranslation } from 'react-i18next';
import TransportIcon from 'public/icons/categories/Category-Transport.svg';
import SectionTransportTitle from '../shared/Section/SectionTransportTitle';
import Button from 'components/global/Button/Button';
import FreeCancellation from 'components/global/FreeCancellation/FreeCancellation';
import Plus from '@/icons/assets/plusIcon.svg';


interface TransportationDetailProps {
    transportation: Quote;
}
export const TransportationDetailsRightSide: FC<TransportationDetailProps> = ({
    transportation,
}) => {

    const [tg] = useTranslation('global');
    const [t] = useTranslation('ground-transportation');
    const transportationTitle = tg('transportationTitle', `${transportation?.service_info?.vehicle_type}`);
    const transportationSubTitle = tg('transportationSubTitle', `Point-To-Point-Trip`);
    const bookText = tg('bookText', 'Book Now');
    const itineraryText = tg('itineraryText', 'Add To Itinerary');
    const totalText = tg('totalText', 'Total');


    return (
        <section className="lg:flex lg:flex-row lg:w-[25%] lg:shadow-container">
            <hr className='lg:border-l-2 h-full' />
            <section className='lg:flex lg:flex-col lg:justify-start lg:items-start lg:w-full lg:h-full'>
                <section className='px-4 py-4'>
                    <SectionTransportTitle title={capitalizeFirst(transportationTitle)} icon={<TransportIcon />} subTitle={transportationSubTitle} />
                </section>
                <hr className="lg:border-t-2 lg:w-full" />
                <section className='px-6 py-6 lg:flex-1 lg:w-full lg:flex lg:flex-col lg:gap-2'>
                    <section className='lg:flex lg:flex-row lg:justify-between'>
                        <section className="lg:flex lg:flex-row lg:gap-1 lg:items-center">
                            <Plus className="text-primary-1000" />
                            <p className="lg:text-sm lg:font-normal lg:leading-6 lg:text-dark-1000">{transportationSubTitle}</p>
                        </section>
                        <p className="text-lg leading-[18px] text-dark-1000">
                            {transportation?.fare?.currency_code} {transportation?.fare?.price.toFixed(2)}
                        </p>
                    </section>
                    <hr className="lg:border-t-2 lg:w-full" />
                    <FreeCancellation wfull={true} cancellable={true} />
                </section>
                <hr className="lg:border-t-2 lg:w-full" />
                <section className='px-4 py-4 lg:flex lg:flex-col lg:justify-start lg:items-start lg:gap-2 lg:w-full'>
                    <section className='lg:flex lg:flex-row lg:justify-between lg:w-full lg:items-center'>
                        <p className="lg:text-sm lg:font-normal lg:leading-6 lg:text-dark-800">{totalText}</p>
                        <p className="text-lg leading-[18px] text-dark-1000">
                            {transportation?.fare?.currency_code} {transportation?.fare?.price?.toFixed(2)}
                        </p>
                    </section>
                    <Button
                        value={itineraryText}
                        size="full"
                        type="outlined"
                        textColor="primary"
                    />
                    <Button
                        value={bookText}
                        size="full"
                    />
                </section>
            </section>
        </section>
    );
};

const capitalizeFirst = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};