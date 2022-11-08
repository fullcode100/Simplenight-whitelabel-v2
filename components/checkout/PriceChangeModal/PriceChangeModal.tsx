import React, { useEffect } from 'react';
import { CartObjectResponse } from 'types/cart/CartType';
import PriceChangeBody from './components/PriceChangeBody';
import PriceChangeFooter from './components/PriceChangeFooter';
import PriceChangeHeader from './components/PriceChangeHeader';

interface PriceChangeModalProps {
  cart: CartObjectResponse;
  isOpen: boolean;
  onClose: () => void;
}

const PriceChangeModal = ({ cart, isOpen, onClose }: PriceChangeModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <div className="absolute inset-0 h-screen w-screen bg-white/75 z-[100] p-5">
      <section className="h-full w-full bg-white border border-dark-300 rounded overflow-hidden flex flex-col items-stretch">
        <PriceChangeHeader onClose={onClose} />
        <PriceChangeBody items={cart?.items} />
        <PriceChangeFooter
          priceAccepted={true}
          oldTotal="$220.00"
          newTotal="$150.00"
        />
      </section>
    </div>
  );
};

export default PriceChangeModal;
