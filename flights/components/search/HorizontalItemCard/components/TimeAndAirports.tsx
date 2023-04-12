import { IconWrapper, Paragraph } from '@simplenight/ui';
import { Flight } from 'flights/types/response/SearchResponse';
import { formatTime } from 'flights/utils';
import ArrowRight from 'public/icons/assets/flights/arrow_right-short.svg';

const TimeAndAirports = ({ item }: { item: Flight }) => {
  const segments = item?.segments?.collection;
  const firstSegment = segments[0];
  const lastSegment = segments[segments.length - 1];
  const departureTime = formatTime(firstSegment?.departureDateTime);
  const departureAirport = firstSegment?.departureAirportName;
  const arrivalTime = formatTime(lastSegment?.arrivalDateTime);
  const arrivalAirport = lastSegment?.arrivalAirportName;
  return (
    <section className="justify-center flex flex-col grow overflow-hidden ">
      <div className="hidden lg:flex items-center gap-1 ">
        <Paragraph size="xs" fontWeight="semibold">
          {departureTime}
        </Paragraph>
        <IconWrapper size={16}>
          <ArrowRight />
        </IconWrapper>
        <Paragraph size="xs" fontWeight="semibold">
          {arrivalTime}
        </Paragraph>
      </div>
      <div className="hidden lg:flex  items-center flex-initial gap-1  ">
        <Paragraph
          size="xxs"
          textColor="text-dark-700"
          className=" whitespace-nowrap  flex-initial truncate"
        >
          {departureAirport}
        </Paragraph>
        <IconWrapper size={16}>
          <ArrowRight className="text-dark-700 " />
        </IconWrapper>

        <Paragraph
          size="xxs"
          textColor="text-dark-700"
          className="whitespace-nowrap  flex-initial truncate"
        >
          {arrivalAirport}
        </Paragraph>
      </div>
      <div className="flex lg:hidden items-center gap-1 justify-evenly text-center ">
        <div>
          <Paragraph size="xs" fontWeight="semibold">
            {departureTime}
          </Paragraph>
          <Paragraph size="xxs" textColor="text-dark-700">
            {departureAirport}
          </Paragraph>
        </div>
        <IconWrapper size={16}>
          <ArrowRight className="text-dark-700" />
        </IconWrapper>
        <div>
          <Paragraph size="xs" fontWeight="semibold">
            {arrivalTime}
          </Paragraph>
          <Paragraph size="xxs" textColor="text-dark-700">
            {arrivalAirport}
          </Paragraph>
        </div>
      </div>
    </section>
  );
};

export default TimeAndAirports;
