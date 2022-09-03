import React, { useState } from 'react';
import {
  Rate,
  CancellationPolicy,
  Services,
} from '../../../../../types/response/SearchResponse';
import PriceBreakdownModal from 'hotels/components/PriceBreakdownModal/PriceBreakdownModal';
import { Item } from '../../../../../../types/cart/CartType';
interface DetailItemCardProps {
  label: string;
  description: string;
  rates: Rate;
  cancellationPolicy?: CancellationPolicy;
  features: string[];
  itemToBook: Item;
  nights: number;
  guests: number;
  services: Services;
}

const DetailItemCard = ({
  label,
  description,
  rates,
  cancellationPolicy,
  features,
  itemToBook,
  nights,
  guests,
  services,
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
        itemToBook={itemToBook}
        nights={nights}
        guests={guests}
        services={services}
      />
      <section>
        <button
          onClick={() => setShowPriceBreakdown(true)}
          className="text-base font-semibold underline text-primary-1000"
        >
          {label}
        </button>
      </section>
    </>
  );
};

export default DetailItemCard;
