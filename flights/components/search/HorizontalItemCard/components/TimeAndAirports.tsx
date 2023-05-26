import { IconWrapper, Paragraph } from '@simplenight/ui';
import { Segment } from 'flights/types/response/FlightSearchResponse';
import { SegmentCollection } from 'flights/types/response/FlightSearchResponseMS';
import { formatTime } from 'flights/utils';
import ArrowRight from 'public/icons/assets/flights/arrow_right-short.svg';

const TimeAndAirports = ({
  segments,
}: {
  segments: Array<SegmentCollection>;
}) => {
  const firstSegment = segments[0];
  const lastSegment = segments[segments.length - 1];
  const departureTime = formatTime(firstSegment?.departureDateTime);
  const departureAirport = firstSegment?.departureAirportName;
  const arrivalTime = formatTime(lastSegment?.arrivalDateTime);
  const arrivalAirport = lastSegment?.arrivalAirportName;
  return (
    <section className="flex flex-col justify-center overflow-hidden grow ">
      <div className="items-center hidden gap-1 lg:flex ">
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
      <div className="items-center flex-initial hidden gap-1 lg:flex ">
        <Paragraph
          size="xxs"
          textColor="text-dark-700"
          className="flex-initial truncate whitespace-nowrap"
        >
          {departureAirport}
        </Paragraph>
        <IconWrapper size={16}>
          <ArrowRight className="text-dark-700 " />
        </IconWrapper>

        <Paragraph
          size="xxs"
          textColor="text-dark-700"
          className="flex-initial truncate whitespace-nowrap"
        >
          {arrivalAirport}
        </Paragraph>
      </div>
      <div className="flex items-center gap-1 text-center lg:hidden justify-evenly ">
        <div className="w-[45%] pr-2">
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
        <div className="w-[45%] pl-2">
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
