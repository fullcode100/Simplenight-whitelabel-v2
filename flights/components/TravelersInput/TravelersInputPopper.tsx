/* eslint-disable indent */
import {
  useState,
  MouseEvent,
  Fragment,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import ChildrenAges from './components/ChildrenAges';
import InfantsAges from './components/InfantsAges';
import TravelersCount from './components/TravelersCount';
import { Traveler } from 'flights/helpers/traveler';
import Divider from '../../../components/global/Divider/Divider';

interface TravelersInputProps {
  showTravelersInput: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  travelers: Traveler[];
  setTravelers: Dispatch<SetStateAction<Traveler[]>>;
}

const TravelersInputPopper = ({
  travelers,
  setTravelers,
}: TravelersInputProps) => {
  const [t, i18next] = useTranslation('global');

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
  };

  useEffect(() => {
    setTravelers(newTravelers);
  }, [newTravelers]);

  return (
    <section className="bg-white w-full lg:w-96 h-full px-5 py-2">
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
                className="mb-6"
              />
            )}

            {traveler.infants > 0 && (
              <InfantsAges
                traveler={traveler}
                travelerNumber={index}
                handleInfantsAgesChange={handleInfantsAgesChange}
                className="mb-6"
              />
            )}
          </Fragment>
        );
      })}
    </section>
  );
};

export default TravelersInputPopper;
