import { useTranslation } from 'react-i18next';
import { Step } from './Step';

interface StepperProps {
  step?: 1 | 2;
}

export const Stepper = ({ step = 1 }: StepperProps) => {
  const [t] = useTranslation('flights');
  const flightsLabel = t('flights', ' Flights');
  const passengersLabel = t('passengers', ' Passengers');

  return (
    <section className="flex items-center gap-7">
      <Step label={flightsLabel} state={step === 1 ? 'active' : 'complete'} />
      <Step
        label={passengersLabel}
        state={step === 1 ? 'disabled' : 'active'}
      />
    </section>
  );
};
