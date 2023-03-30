import { useRouter } from 'next/router';
import BreakdownItemList from 'components/checkout/BreakdownItemList/BreakdownItemList';
import Button from 'components/global/Button/Button';
import Divider from 'components/global/Divider/Divider';
import { Itinerary } from '@simplenight/ui';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { CartObjectResponse } from '../../../../types/cart/CartType';
import EmptyStateContainer from 'components/global/EmptyStateContainer/EmptyStateContainer';

interface BodyProps {
  showCheckOut: boolean;
  cart?: CartObjectResponse;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const ItineraryOverlayBody = ({
  showCheckOut,
  cart,
  reload,
  setReload,
}: BodyProps) => {
  const router = useRouter();
  const [t] = useTranslation('global');
  const checkOut = t('checkoutTitle', 'Check Out');
  const goToItinerary = t('goToItinerary', 'Go To Itinerary');
  const emptyItineraryText = t(
    'itineraryEmpty',
    'Add Something To Your Itinerary!',
  );

  return (
    <section className="h-full py-6 overflow-y-scroll">
      <section className="flex flex-row gap-3 px-5">
        <Button
          size="full-sm"
          type="outlined"
          translationKey="goToItinerary"
          value={goToItinerary}
          onClick={() => {
            router.replace('/itinerary');
          }}
        />
        {showCheckOut && (
          <Button
            size="full-sm"
            translatioKey="checkoutTitle"
            value={checkOut}
            onClick={() => {
              router.replace('/checkout/client');
            }}
          />
        )}
      </section>
      <Divider className="mt-6 mx-5" />
      {cart ? (
        <BreakdownItemList cart={cart} reload={reload} setReload={setReload} />
      ) : (
        <EmptyStateContainer
          text={emptyItineraryText}
          Icon={Itinerary}
          width={160}
        />
      )}
    </section>
  );
};

export default ItineraryOverlayBody;
