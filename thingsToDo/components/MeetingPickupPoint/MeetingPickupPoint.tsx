import { Paragraph } from '@simplenight/ui';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookingAnswer } from 'thingsToDo/types/request/ThingsCartRequest';
import { Item as CartItem } from 'types/cart/CartType';
import { Item as BookingItem } from 'types/booking/bookingType';
import { Location } from 'thingsToDo/types/response/ThingsDetailResponse';
import { geocodeByPlaceId } from 'react-places-autocomplete';

interface LocationRef {
  location: Location;
  pickup_type: string;
}

interface MeetingPointProps {
  item: CartItem | BookingItem;
}

const MeetingPickupPoint = ({ item }: MeetingPointProps) => {
  const [t] = useTranslation('things');
  const pickupPointLabel = t('pickupPoint', 'Pickup Point');
  const meetingPointLabel = t('meetingPoint', 'Meeting Point');

  const PICKUP_POINT_ID = 'PICKUP_POINT';
  const pickupPoint = item.booking_data?.booking_answers?.find(
    (bookingAnswer: BookingAnswer) =>
      bookingAnswer.question_id === PICKUP_POINT_ID,
  )?.value;

  const pickupLocations = item.item_data?.extra_data.pickup.locations;
  const selectedPickupLocation = pickupLocations?.find(
    (locationObject: LocationRef) => locationObject.location.ref == pickupPoint,
  )?.location;

  const pickupAddress = selectedPickupLocation?.address;
  const pickupName = selectedPickupLocation?.name;
  const pickupAddressFormatted = `${pickupAddress?.address1}, ${pickupAddress?.city}, ${pickupAddress?.country_code}, ${pickupAddress?.postal_code}`;

  const startLocation =
    item.item_data?.extra_data.start_locations &&
    item.item_data?.extra_data.start_locations[0];
  const [startLocationformattedAddress, setStartLocationFormattedAddress] =
    useState('');
  const meetingPoint =
    startLocationformattedAddress ||
    startLocation?.name ||
    startLocation?.description;

  useEffect(() => {
    const getAddress = async (startLocation: Location) => {
      const { address, provider } = startLocation || {};
      let pointFormattedAddress = '';
      if (address) {
        pointFormattedAddress = `${address?.address1}, ${address?.city} - ${address?.state} - ${address?.country}, ${address?.postal_code}`;
      }
      if (!address && provider === 'GOOGLE') {
        const geocode = await geocodeByPlaceId(startLocation.provider_ref);
        pointFormattedAddress = geocode[0].formatted_address;
      }
      setStartLocationFormattedAddress(pointFormattedAddress);
    };
    if (startLocation) getAddress(startLocation);
  }, [startLocation]);

  return (
    <div>
      <Paragraph textColor="text-dark-700">
        {pickupPoint ? pickupPointLabel : meetingPointLabel}
      </Paragraph>
      {pickupPoint && (
        <Paragraph>
          {pickupAddress ? pickupAddressFormatted : pickupName}
        </Paragraph>
      )}
      {!pickupPoint && <Paragraph>{meetingPoint}</Paragraph>}
    </div>
  );
};
export default MeetingPickupPoint;
