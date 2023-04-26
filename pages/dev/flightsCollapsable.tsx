import FlightsCheckoutAccordion from 'flights/components/checkout/FlightsCheckoutAccordion/FlightsCheckoutAccordion';
import { useFlightsStore } from 'hooks/flights/useFligthsStore';
import { NextPage } from 'next';

const flightsCollapsableTest: NextPage = () => {
  const FlightList = () => {
    const flights = useFlightsStore((state) => state.flights);

    return (
      <>
        {flights.map((flight) => (
          <FlightsCheckoutAccordion
            key={flight.arrival.iata_code}
            flight={flight}
          />
        ))}
      </>
    );
  };
  return (
    <section className="flex items-start justify-center gap-8 px-0 py-0 lg:px-20 lg:py-12 ">
      <section className="w-full lg:w-[840px] lg:rounded-4 overflow-hidden bg-white">
        <FlightList />
      </section>
    </section>
  );
};

export default flightsCollapsableTest;
