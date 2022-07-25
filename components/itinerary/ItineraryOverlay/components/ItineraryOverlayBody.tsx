import { useRouter } from 'next/router';
import BreakdownItemList from 'components/checkout/BreakdownItemList/BreakdownItemList';
import Button from 'components/global/Button/Button';
import Divider from 'components/global/Divider/Divider';
import ItineraryEmpty from 'components/itinerary/ItineraryEmpty/ItineraryEmpty';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { CartObjectResponse } from '../../../../types/cart/CartType';

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
        <ItineraryEmpty />
      )}
    </section>
  );
};

export default ItineraryOverlayBody;
