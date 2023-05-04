import { getAirlineIconUrl } from 'flights/utils';
import { Paragraph } from '@simplenight/ui';
import {
  SegmentCollection,
  SegmentItem,
} from 'flights/types/response/FlightSearchResponseMS';

const FlightAirlines = ({ segments }: { segments: SegmentCollection[] }) => {
  const firstSegment = segments[0];
  const hasOtherSegments = segments.length > 1;
  const amountOfOtherSegments = segments.length - 1;
  return (
    <section className="flex flex-col items-center gap-1 shrink-0">
      <img
        className="hidden h-10 lg:block"
        src={getAirlineIconUrl(firstSegment.marketingCarrier.toUpperCase())}
        alt={firstSegment?.marketingCarrierName}
      />
      <div className="flex gap-2 lg:hidden">
        {segments.map((segment) => (
          <img
            key={segment.segmentCode}
            className="h-7 "
            src={getAirlineIconUrl(segment.marketingCarrier.toUpperCase())}
            alt={segment.marketingCarrierName}
          />
        ))}
      </div>

      {hasOtherSegments && (
        <Paragraph size="xxsmall" textColor="text-dark-700 hidden lg:block">
          + {amountOfOtherSegments}
        </Paragraph>
      )}
    </section>
  );
};

export default FlightAirlines;
