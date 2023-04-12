import { getAirlineIconUrl } from 'flights/utils';
import { Flight } from 'flights/types/response/SearchResponse';
import { Paragraph } from '@simplenight/ui';

const FlightAirlines = ({ item }: { item: Flight }) => {
  const firstSegment = item?.segments?.collection[0];
  const hasOtherSegments = item?.segments?.collection.length > 1;
  const amountOfOtherSegments = item?.segments?.collection.length - 1;
  return (
    <section className="flex flex-col items-center  gap-1 shrink-0">
      <img
        className="h-10 hidden lg:block"
        src={getAirlineIconUrl(firstSegment?.marketingCarrier.toUpperCase())}
        alt={firstSegment?.marketingCarrierName}
      />
      <div className="lg:hidden flex gap-2">
        {item.segments.collection.map((segment) => (
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
