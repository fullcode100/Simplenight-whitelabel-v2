import SectionTitle from 'components/global/SectionTitleIcon/SectionTitle';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Quote } from 'transportation/types/response/TransportationSearchResponse';
import PoliciesIcon from '../../../public/icons/assets/policies.svg';


interface TransportationDetailProps {
    transportation: Quote;
}

export const TransportationDetailsPolicies: FC<TransportationDetailProps> = ({
    transportation,
}) => {
    const [tg] = useTranslation('global');
    const [t] = useTranslation('ground-transportation');
    const policiesLabel = tg('policies', 'Policies');

    const cancellationLabel = tg('cancellation', 'Cancellation');

    return (
        <section className="px-12 py-10 lg:flex-1 lg:flex lg:flex-col lg:gap-4">
            <SectionTitle title={policiesLabel} icon={<PoliciesIcon />} />
            <section className='lg:flex lg:flex-col lg:gap-4'>
                <p className="lg:text-sm lg:font-semibold lg:leading-6 lg:text-dark-800">{cancellationLabel}</p>
                <p className="lg:text-sm lg:font-normal lg:leading-6 lg:text-dark-800">{transportation?.fare?.refund_cancellation_policy}</p>
            </section>
        </section>
    );
};
