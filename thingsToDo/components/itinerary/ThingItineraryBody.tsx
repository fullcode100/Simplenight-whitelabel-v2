import ThingGeneralInfo from './ThingGeneralInfo';
import ThingTicketsInfo from './ThingTicketsInfo';

interface ThingsItineraryBodyProps {
  item: any;
}

const ThingsItineraryBody = ({ item }: ThingsItineraryBodyProps) => {
  return (
    <>
      <ThingGeneralInfo item={item} />
      <ThingTicketsInfo item={item} />
    </>
  );
};

export default ThingsItineraryBody;
