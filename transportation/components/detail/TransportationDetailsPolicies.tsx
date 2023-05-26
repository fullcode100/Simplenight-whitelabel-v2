import SectionTitle from 'components/global/SectionTitleIcon/SectionTitle';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TransportationItem } from 'transportation/types/response/TransportationSearchResponse';
import PoliciesIcon from '../../../public/icons/assets/policies.svg';

interface TransportationDetailProps {
  transportation: TransportationItem;
}

export const TransportationDetailsPolicies: FC<TransportationDetailProps> = ({
  transportation,
}) => {
  const [tg] = useTranslation('global');
  const [t] = useTranslation('ground-transportation');
  const policiesLabel = tg('policies', 'Policies');

  const cancellationLabel = tg('cancellation', 'Cancellation');

  return (
    <section className="flex flex-col gap-6 px-5 py-6 lg:px-12 lg:py-8 lg:flex-1 lg:flex lg:flex-col lg:gap-4">
      <SectionTitle title={policiesLabel} icon={<PoliciesIcon />} />
      <section className="flex flex-col gap-2 lg:flex lg:flex-col lg:gap-4">
        <p className="lg:text-sm lg:font-semibold lg:leading-6 lg:text-dark-800">
          {cancellationLabel}
        </p>
        <p className="lg:text-sm lg:font-normal lg:leading-6 lg:text-dark-800">
          {transportation?.cancellation_policy?.[0]?.details}
        </p>
      </section>
    </section>
  );
};
