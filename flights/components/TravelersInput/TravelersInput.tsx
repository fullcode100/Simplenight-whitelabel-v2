/* eslint-disable indent */
import {
  useState,
  MouseEvent,
  Fragment,
  Dispatch,
  SetStateAction,
} from 'react';
import { useTranslation } from 'react-i18next';

import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import ChildrenAges from './components/ChildrenAges';
import InfantsAges from './components/InfantsAges';
import TravelersCount from './components/TravelersCount';
import { Traveler } from 'flights/helpers/traveler';

interface TravelersInputProps {
  showTravelersInput: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  travelers: Traveler[];
  setTravelers: Dispatch<SetStateAction<Traveler[]>>;
}

const TravelersInput = ({
  showTravelersInput,
  onClose,
  travelers,
  setTravelers,
}: TravelersInputProps) => {
  const [t, i18next] = useTranslation('global');
  const applyLabel = t('apply', 'Apply');
  const travelersLabel = t('travelers', 'Travelers');

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

  const applyTravelers = () => {
    setTravelers(newTravelers);
    onClose();
  };

  const Divider = () => (
    <div className="w-full border-t border-gray-300 mb-6" />
  );

  return (
    <FullScreenModal
      open={showTravelersInput}
      closeModal={onClose}
      title={travelersLabel}
      primaryButtonText={applyLabel}
      primaryButtonAction={applyTravelers}
      className={
        'lg:max-w-[842px] lg:max-h-[660px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-4 overflow-hidden shadow-full'
      }
    >
      <section className="h-full px-5 py-[22px] overflow-y-scroll">
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
    </FullScreenModal>
  );
};

export default TravelersInput;
