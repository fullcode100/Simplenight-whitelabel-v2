import React, { useState } from 'react';
import {
  Rate,
  CancellationPolicy,
} from '../../../hotels/types/response/SearchResponse';
import PriceBreakdownModal from '../PriceBreakdownModal/PriceBreakdownModal';
interface DetailItemCardProps {
  label: string;
  description: string;
  rates: Rate;
  cancellationPolicy?: CancellationPolicy;
  features: string[];
}

const DetailItemCard = ({
  label,
  description,
  rates,
  cancellationPolicy,
  features,
}: DetailItemCardProps) => {
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);

  return (
    <>
      <PriceBreakdownModal
        showPriceBreakdown={showPriceBreakdown}
        onClose={() => setShowPriceBreakdown(false)}
        description={description}
        rates={rates}
        cancellationPolicy={cancellationPolicy}
        features={features}
      />
      <section>
        <button
          onClick={() => setShowPriceBreakdown(true)}
          className="text-base text-primary-1000 font-semibold underline"
        >
          {label}
        </button>
      </section>
    </>
  );
};

export default DetailItemCard;
