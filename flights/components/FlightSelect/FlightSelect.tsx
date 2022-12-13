import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import Label from 'components/global/Label/Label';

interface FlightSelectProps {
  value?: string;
  onChange?: (value: string) => void;
}

const FlightSelect = ({value, onChange}: FlightSelectProps) => {
  const [t, i18n] = useTranslation('flights');
  const flights = ['one_way', 'round_trip', 'multi_city'];
  const flightsLabel = t('trip', 'Trip Type');
  const handleChangeFlight = (flight: string) => {
    if (onChange) onChange(flight);
  };
  return (
    <div className="w-full mt-0">
      <Label value={flightsLabel} className="block lg:hidden mb-3 lg:mb-0" />
      <div className="relative">
        <section className="p-2 bg-dark-200 flex rounded-md gap-1">
          {flights.map((flight) => {
            const isActive = flight === value;
            const className = classnames(
              ' p-2 w-[100px] rounded-md h-[36px] grid place-content-center cursor-pointer',
              {
                'bg-primary-400 text-primary-1000': isActive,
                'text-dark-1000': !isActive,
              },
            );
            return (
              <section
                key={flight}
                className={className}
                onClick={() => handleChangeFlight(flight)}
              >
                <p className="cursor-pointer select-none">
                  {t(flight)}
                </p>
              </section>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default FlightSelect;
