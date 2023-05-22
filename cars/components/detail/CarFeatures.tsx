import { Car } from 'cars/types/response/CarSearchResponse';
import { useTranslation } from 'react-i18next';
import PassengersIcon from 'public/icons/assets/cars/passengers.svg';
import BaggageIcon from 'public/icons/assets/cars/baggage.svg';
import TransmissionIcon from 'public/icons/assets/cars/transmission.svg';
import FuelIcon from 'public/icons/assets/cars/fuel.svg';
import SizeIcon from 'public/icons/assets/cars/size.svg';
import LocationIcon from 'public/icons/assets/cars/location.svg';

interface CarFeaturesProps {
  item: Car;
}

const CarFeatures = ({ item }: CarFeaturesProps) => {
  const [t, i18next] = useTranslation('cars');
  const passengersText = t('passengers', 'Passengers');
  const bagsText = t('bags', 'Bags');
  const doorsText = t('doors', 'Doors');
  const unlimitedMilesText = t('unlimitedMiles', 'Unlimited Miles');
  const unspecifiedMilesLimitText = t(
    'unspecifiedMilesLimit',
    'Unspecified Miles Limit',
  );
  const limitText = t('limit', 'Limit');
  const acText = t('ac', 'Air Conditioning');
  const noAcText = t('noAc', 'No Air Conditioning');

  return (
    <section className="flex flex-wrap justify-between">
      <section className="flex flex-col items-center gap-1.5 py-1 pl-1.5 pr-2">
        <PassengersIcon className="w-10 h-10 mt-[-1px] text-primary-1000 flex-shrink-0" />
        <label className="text-dark-700 text-[14px] font-normal">
          {item.passenger_quantity} {passengersText}
        </label>
      </section>

      <section className="flex flex-col items-center gap-1.5 py-1 pl-1.5 pr-2">
        <BaggageIcon className="w-10 h-10 mt-[-1px] text-primary-1000 flex-shrink-0" />
        <label className="text-dark-700 text-[14px] font-normal">
          {item.baggage_quantity} {bagsText}
        </label>
      </section>

      <section className="flex flex-col items-center gap-1.5 py-1 pl-1.5 pr-2">
        <TransmissionIcon className="w-10 h-10 mt-[-1px] text-primary-1000 flex-shrink-0" />
        <label className="text-dark-700 text-[14px] font-normal">
          {item.transmission_type}
        </label>
      </section>

      <section className="flex flex-col items-center gap-1.5 py-1 pl-1.5 pr-2">
        <FuelIcon className="w-10 h-10 mt-[-1px] text-primary-1000 flex-shrink-0" />
        <label className="text-dark-700 text-[14px] font-normal">
          {item.fuel_policy}
        </label>
      </section>

      <section className="flex flex-col items-center gap-1.5 py-1 pl-1.5 pr-2">
        <SizeIcon className="w-10 h-10 mt-[-1px] text-primary-1000 flex-shrink-0" />
        <label className="text-dark-700 text-[14px] font-normal">
          {item.door_count} {doorsText}
        </label>
      </section>

      <section className="flex flex-col items-center gap-1.5 py-1 pl-1.5 pr-2">
        <LocationIcon className="w-10 h-10 mt-[-1px] text-primary-1000 flex-shrink-0" />
        <label className="text-dark-700 text-[14px] font-normal">
          {item.air_condition_ind ? acText : noAcText}
        </label>
      </section>
    </section>
  );
};
export default CarFeatures;
