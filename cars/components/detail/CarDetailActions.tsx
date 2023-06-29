import React, { useState } from 'react';
import Button from 'components/global/Button/Button';
import BreakdownTotal from 'components/checkout/BreakdownTotal/BreakdownTotal';
import { useTranslation } from 'react-i18next';
import { hasCartMode } from 'helpers/purchaseModeUtils';
import { useMutation } from '@tanstack/react-query';
import { addToCart } from 'core/client/services/CartClientService';
import { useRouter } from 'next/router';
import { carBookingItemAdapter } from 'cars/adapters/carBookingItem.adapter';
import { useSearchStore } from 'hooks/cars/useSearchStore';

interface CarDetailActionsProps {
  car: any;
}

const CarDetailActions = ({ car }: CarDetailActionsProps) => {
  const total = car.rate?.totalAmount;
  const router = useRouter();
  const [t, i18next] = useTranslation('cars');
  const showAddToItinerary = hasCartMode();
  const [url, setUrl] = useState<string>('/itinerary');
  const search = useSearchStore((state) => state.search);

  let itemToBook = {
    booking_data: car,
    category: 'car-rental',
  };

  if (search) {
    itemToBook = carBookingItemAdapter(car, search);
  }

  const handleAction = async () => {
    await addToCart(itemToBook, i18next);
  };

  const { mutate, isLoading } = useMutation(handleAction, {
    onSuccess: () => {
      router.push(url);
    },
  });
  return (
    <div>
      <BreakdownTotal total={`$${total}`} />
      {showAddToItinerary && (
        <Button
          className="mt-3"
          value={t('addToItinerary')}
          type="outlined"
          size="full"
          onClick={() => mutate()}
          disabled={isLoading}
        />
      )}
      <Button
        onClick={() => {
          setUrl('/checkout/car-rental/client');
          mutate();
        }}
        className="mt-3"
        value={t('bookNow')}
        size="full"
        disabled={isLoading}
      />
    </div>
  );
};

export default CarDetailActions;
