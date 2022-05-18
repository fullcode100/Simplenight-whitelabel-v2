import type { NextPage } from 'next';
import ItineraryHeader from 'components/itinerary/ItineraryHeader/ItineraryHeader';

const Itinerary: NextPage = () => {
  return (
    <main>
      <header>
        <ItineraryHeader />
      </header>
      <section className="p-5"></section>
      <section></section>
      <aside></aside>
    </main>
  );
};

export default Itinerary;
