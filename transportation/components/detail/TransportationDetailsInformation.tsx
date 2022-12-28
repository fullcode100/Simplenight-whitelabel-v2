import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Quote } from 'transportation/types/response/TransportationSearchResponse';
import LocationPin from '@/icons/assets/location-pin.svg';
import Calendar from 'public/icons/assets/calendar.svg';
import useQuery from '../../../hooks/pageInteraction/useQuery';
import { fromLowerCaseToCapitilize } from '../../../helpers/stringUtils';
import { formatAsDisplayDatetime } from '../../../helpers/dajjsUtils';
import { useCapitalizeFirstChar } from 'transportation/hooks/useCapitalizeFirstChar';

interface TransportationDetailProps {
    transportation: Quote;
}

export const TransportationDetailsInformation: FC<TransportationDetailProps> = ({
    transportation,
}) => {
    const [t] = useTranslation('ground-transportation');


    return (
        <section className='px-5 py-6 flex flex-col items-start justify-start lg:px-12 lg:py-4 lg:flex lg:flex-row lg:w-full lg:justify-center lg:items-center'>
            <section className="min-h-[150px] lg:min-w-[15rem] lg:min-h-[11.3rem] lg:flex-1"
                style={{
                    backgroundImage: `url(${transportation?.service_info?.photo_url})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                }}
            />
            <section className='flex flex-col gap-3 lg:flex lg:flex-col lg:justify-center lg:h-full lg:gap-3 lg:flex-1'>
                <section className='lg:flex lg:flex-col lg:gap-1'>
                    <header className=" font-semibold text-dark-1000 text-base leading-[22px] lg:text-lg break-words">
                        {useCapitalizeFirstChar(transportation?.service_info?.vehicle_type)}
                    </header>
                    <section className="text-dark-1000">{useCapitalizeFirstChar(transportation?.service_info?.service_class)}</section>
                </section>
                <Summary />
            </section>
        </section>

    );
};

const Summary: FC = () => {
    const {
        startDate: startDateQuery,
        startTime: startTimeQuery,
        endDate: endDateQuery,
        endTime: endTimeQuery,
        address,
        address2
    } = useQuery();
    const startDate = formatAsDisplayDatetime(
        `${startDateQuery} ${startTimeQuery}`,
    );
    const endDate = formatAsDisplayDatetime(`${endDateQuery} ${endTimeQuery}`);

    return (
        <section className="grid gap-2 font-normal text-dark-1000">
            <section className="flex gap-2">
                <section className="grid w-6 place-items-center">
                    <LocationPin className="text-primary-1000" />
                </section>
                <span>{address?.toString().split(', ')[0]} - {address2?.toString().split(', ')[0]}</span>
            </section>
            <section className="flex gap-2">
                <section className="grid w-6 place-items-center">
                    <Calendar className="text-primary-1000" />
                </section>
                <section>
                    <span>{fromLowerCaseToCapitilize(startDate)} to {fromLowerCaseToCapitilize(endDate)}</span>
                </section>
            </section>
        </section>
    );
};