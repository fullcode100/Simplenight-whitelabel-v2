import { Car } from 'cars/types/response/SearchResponse';
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
    <section className="flex flex-wrap">
      <section className="flex gap-1.5 py-1 pl-1.5 pr-2">
        <PassengersIcon className="w-7 mt-[-1px] text-green-1000 flex-shrink-0" />
        <label className="text-dark-700 text-[14px] font-normal">
          {item.VehAvailCore.Vehicle['@PassengerQuantity']} {passengersText}
        </label>
      </section>

      <section className="flex gap-1.5 py-1 pl-1.5 pr-2">
        <BaggageIcon className="w-7 mt-[-1px] text-green-1000 flex-shrink-0" />
        <label className="text-dark-700 text-[14px] font-normal">
          {item.VehAvailCore.Vehicle['@BaggageQuantity']} {bagsText}
        </label>
      </section>

      <section className="flex gap-1.5 py-1 pl-1.5 pr-2">
        <TransmissionIcon className="w-7 mt-[-1px] text-green-1000 flex-shrink-0" />
        <label className="text-dark-700 text-[14px] font-normal">
          {item.VehAvailCore.Vehicle['@TransmissionType']}
        </label>
      </section>

      <section className="flex gap-1.5 py-1 pl-1.5 pr-2">
        <FuelIcon className="w-7 mt-[-1px] text-green-1000 flex-shrink-0" />
        <label className="text-dark-700 text-[14px] font-normal">
          {item.VehAvailCore.Vehicle['@FuelType']}
        </label>
      </section>

      <section className="flex gap-1.5 py-1 pl-1.5 pr-2">
        <SizeIcon className="w-7 mt-[-1px] text-green-1000 flex-shrink-0" />
        <label className="text-dark-700 text-[14px] font-normal">
          {item.VehAvailCore.Vehicle.VehType['@DoorCount']} {doorsText}
        </label>
      </section>

      <section className="flex gap-1.5 py-1 pl-1.5 pr-2">
        <LocationIcon className="w-7 mt-[-1px] text-green-1000 flex-shrink-0" />
        <label className="text-dark-700 text-[14px] font-normal">
          {item.VehAvailCore.Vehicle['@AirConditionInd'] === 'true'
            ? acText
            : noAcText}
        </label>
      </section>
    </section>
  );
};
export default CarFeatures;
