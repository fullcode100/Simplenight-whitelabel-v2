import Button from 'components/global/Button/Button';
import { Heading } from '@simplenight/ui';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface FooterProps {
  totalAmount: string;
}

const ItineraryOverlayFooter = ({ totalAmount }: FooterProps) => {
  const router = useRouter();
  const [t] = useTranslation('global');
  const tOrderTotal = t('orderTotal', 'Order Total');
  const checkOut = t('checkoutTitle', 'Check Out');

  return (
    <footer className="shadow-container bg-dark-100 px-5 py-6 space-y-6">
      <section className="flex gap-3 justify-center">
        <Heading tag="h4">{tOrderTotal}</Heading>
        <Heading tag="h4" textColor="text-primary-1000">
          {totalAmount.toString()}
        </Heading>
      </section>
      <Button
        size="full"
        translatioKey="checkoutTitle"
        value={checkOut}
        onClick={() => {
          router.replace('/checkout/client');
        }}
      />
    </footer>
  );
};

export default ItineraryOverlayFooter;
