import React, { useEffect, useState } from 'react';
import { CartObjectResponse } from '../../../types/cart/CartType';
import ItineraryOverlayHeader from './components/ItineraryOverlayHeader';
import ItineraryOverlayBody from './components/ItineraryOverlayBody';
import ItineraryOverlayFooter from './components/ItineraryOverlayFooter';

interface ItineraryOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  cart?: CartObjectResponse;
}

const ItineraryOverlay = ({ isOpen, onClose, cart }: ItineraryOverlayProps) => {
  const [reload, setReload] = useState(false);

  const totalAmount = cart?.rate.total.full.formatted;
  const itemsQty = cart?.total_item_qty;

  const showCheckOut = !!itemsQty && itemsQty > 0;

  return (
    <>
      {isOpen && (
        <div className="fixed z-50 flex justify-end w-screen h-screen overflow-y-hidden bg-black/25">
          <section className="h-full w-[335px] lg:w-[485px] bg-white z-50 flex flex-col items-stretch">
            <ItineraryOverlayHeader
              totalAmount={totalAmount}
              itemsQty={itemsQty}
              onClose={onClose}
            />
            <ItineraryOverlayBody
              showCheckOut={showCheckOut}
              cart={cart}
              reload={reload}
              setReload={setReload}
            />
            {showCheckOut && totalAmount && (
              <ItineraryOverlayFooter totalAmount={totalAmount} />
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default ItineraryOverlay;
