import { useTranslation } from 'react-i18next';
import { Step } from './Step';

export const Stepper = () => {
  const [t] = useTranslation('flights');
  const flightsLabel = t('flights', ' Flights');
  const passengersLabel = t('passengers', ' Passengers');

  return (
    <section className="flex items-center gap-7">
      <Step label={flightsLabel} state="active" />
      <Step label={passengersLabel} state="disabled" />
    </section>
  );
};
