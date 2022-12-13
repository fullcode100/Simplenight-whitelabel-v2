import React from 'react';
import PriceDisplay from 'cars/components/PriceDisplay/PriceDisplay';
import { Rates } from '../../../types/response/SearchResponse';
import { useTranslation } from 'react-i18next';
import Paragraph from '../../../../components/global/Typography/Paragraph';
import TaxesAndFeesPopover from 'cars/components/TaxesAndFeesPopover/TaxesAndFeesPopover';
import { usePlural } from 'hooks/stringBehavior/usePlural';

interface BreakdownSummaryProps {
  rate: Rates;
  nights?: number;
  guests?: number;
  CustomPriceBreakdown?: React.ReactElement;
  roomsQty?: number;
  showTotal?: boolean;
}

const BreakdownSummary = ({
  rate,
  CustomPriceBreakdown,
  showTotal = false,
  nights = 0,
  roomsQty = 0,
}: BreakdownSummaryProps) => {
  const [tg] = useTranslation('global');
  const totalLabel = tg('total', 'Total');
  const tRoom = tg('room', 'Room');
  const tRooms = tg('rooms', 'Rooms');
  const ROOM_TEXT = usePlural(roomsQty, tRoom, tRooms);
  const tNight = tg('night', 'Night');
  const tNights = tg('nights', 'Nights');
  const NIGHT_TEXT = usePlural(nights, tNight, tNights);

  return (
    <section className="flex items-center justify-between">
      <Paragraph size="small" fontWeight="normal">
        {showTotal
          ? totalLabel
          : `${roomsQty} ${ROOM_TEXT}, ${nights} ${NIGHT_TEXT}`}
      </Paragraph>
      <section className="text-right">
        {/* <PriceDisplay rate={rate} /> */}

        {CustomPriceBreakdown && <>{CustomPriceBreakdown}</>}
      </section>
    </section>
  );
};

export default BreakdownSummary;
