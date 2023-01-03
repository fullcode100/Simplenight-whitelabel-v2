import { ReactElement } from 'react';
import { Item } from 'types/booking/bookingType';
import { useTranslation } from 'react-i18next';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import ExternalLink from 'components/global/ExternalLink/ExternalLink';
import { useCategoryType } from 'hooks/category/useCategory';

interface HotelConfirmationHeaderProps {
  item?: Item;
  icon: ReactElement;
}

const HotelConfirmationHeader = ({
  item,
  icon,
}: HotelConfirmationHeaderProps) => {
  const [t, i18next] = useTranslation('hotels');
  const hotelName = item?.name;
  const roomsAmount = item?.booking_data?.room_qty;
  const room = t('room', 'Room');
  const rooms = t('rooms', 'Rooms');
  const roomsLabel = item?.room_qty == 1 ? room : rooms;
  const roomsFormatted = `${roomsAmount} ${roomsLabel}`;

  const hotelId = item?.item_data?.id;
  const startDate = item?.item_data?.start_date;
  const endDate = item?.item_data?.end_date;
  const slug = useCategoryType('hotels')?.slug;

  const detailHref = `/detail/${slug}/${hotelId}?startDate=${startDate}&endDate=${endDate}&rooms=${roomsAmount}`;

  return (
    <section className="flex flex-row gap-3">
      <IconRoundedContainer className="bg-primary-1000">
        <div className="text-white">{icon}</div>
      </IconRoundedContainer>
      <section className="grid gap-1">
        <ExternalLink
          href={detailHref}
          className="font-semibold text-dark-1000 underline underline-offset-4 decoration-1 text-base leading-[22px] lg:text-lg lg:leading-[26px]"
        >
          {hotelName}
        </ExternalLink>
        <section className="font-semibold text-dark-800 text-[16px] leading-[22px]">
          {roomsFormatted}
        </section>
      </section>
    </section>
  );
};

export default HotelConfirmationHeader;
