/* eslint-disable indent */
import {
  useState,
  MouseEvent,
  Fragment,
  Dispatch,
  SetStateAction,
} from 'react';

import ChildrenAges from '../TravelersInput/components/ChildrenAges';
import InfantsAges from '../TravelersInput/components/InfantsAges';
import TravelersCount from '../TravelersInput/components/TravelersCount';
import { Traveler, createTraveler } from 'flights/helpers/traveler';
import classnames from 'classnames';

interface TravelersSelectProps {
  travelers: Traveler[];
  setTravelers: Dispatch<SetStateAction<Traveler[]>>;
}

const TravelersSelect = ({ travelers, setTravelers }: TravelersSelectProps) => {
  const [newTravelers, setNewTravelers] = useState<Traveler[]>(travelers);

  const handleCountChange = (value: number, index: number, type: string) => {
    const updatedTraveler = newTravelers[index];
    switch (type) {
      case 'adults':
        updatedTraveler['adults'] = value;
        break;
      case 'children':
        updatedTraveler['children'] = value;
        break;
      case 'infants':
        updatedTraveler['infants'] = value;
        break;
    }

    const updatedTravelers = [...newTravelers];
    updatedTravelers[index] = updatedTraveler;
    setNewTravelers(updatedTravelers);
    setTravelers(updatedTravelers);
  };

  const handleChildrenAgesChange = (
    value: number,
    indexAge: number,
    travelerNumber: number,
  ) => {
    const updatedTraveler = newTravelers[travelerNumber];
    updatedTraveler.childrenAges[indexAge] = value;

    const updatedTravelers = [...newTravelers];
    updatedTravelers[travelerNumber] = updatedTraveler;
    setNewTravelers(updatedTravelers);
    setTravelers(updatedTravelers);
  };

  const handleInfantsAgesChange = (
    value: number,
    indexAge: number,
    travelerNumber: number,
  ) => {
    const updatedTraveler = newTravelers[travelerNumber];
    updatedTraveler.infantsAges[indexAge] = value;

    const updatedTravelers = [...newTravelers];
    updatedTravelers[travelerNumber] = updatedTraveler;
    setNewTravelers(updatedTravelers);
    setTravelers(updatedTravelers);
  };

  const Divider = () => (
    <div className="w-full border-t border-gray-300 mb-6" />
  );

  return (
    <section className="h-full w-full lg:min-w-[400px] p-6 lg:p-2 ">
      {newTravelers.map((traveler: Traveler, index) => {
        return (
          <Fragment key={index}>
            <TravelersCount
              traveler={traveler}
              index={index}
              handleCountChange={handleCountChange}
            />

            {(!!traveler.children || !!traveler.infants) && <Divider />}

            {traveler.children > 0 && (
              <ChildrenAges
                traveler={traveler}
                travelerNumber={index}
                handleChildrenAgesChange={handleChildrenAgesChange}
                className={classnames({ ['mb-6']: traveler.infants > 0 })}
              />
            )}

            {traveler.infants > 0 && (
              <InfantsAges
                traveler={traveler}
                travelerNumber={index}
                handleInfantsAgesChange={handleInfantsAgesChange}
              />
            )}
          </Fragment>
        );
      })}
    </section>
  );
};

export default TravelersSelect;
