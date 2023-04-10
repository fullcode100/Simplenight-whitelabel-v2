import { useTranslation } from 'react-i18next';
import Label from 'components/global/Label/Label';

interface FlightSelectProps {
  value?: string;
  onChange?: (value: string) => void;
}

const FlightSelect = ({ value, onChange }: FlightSelectProps) => {
  const [t, i18n] = useTranslation('flights');
  const flights = ['one_way', 'round_trip', 'multi_city'];
  const flightsLabel = t('trip', 'Trip Type');
  const handleChangeFlight = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFlight = event.target.value;
    if (onChange) onChange(selectedFlight);
  };
  return (
    <div>
      <Label value={flightsLabel} className="block lg:hidden mb-3 lg:mb-0" />
      <div className="relative">
        <select
          value={value}
          onChange={handleChangeFlight}
          className="border border-gray-300 rounded-md text-gray-600 text-xs h-8 pl-3.5 py-0 pr-7 bg-white hover:border-gray-400 focus:outline-none appearance-none"
        >
          {flights.map((flight) => (
            <option key={flight} value={flight}>
              {t(flight)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FlightSelect;
