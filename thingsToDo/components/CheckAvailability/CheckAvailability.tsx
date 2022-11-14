import {
  useCheckInOutInput,
  UseCheckInOutInputPropsComponentReturn,
} from 'hotels/components/CheckInOutInput/CheckInOutInput';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import useQuery from 'hooks/pageInteraction/useQuery';
import DateThingsInput from './DateThingsInput';
import Button from 'components/global/ButtonNew/Button';
import GuestsThingsInput from '../GuestsInput/GuestsThingsInput';
import { Pricing } from 'thingsToDo/types/response/ThingsDetailResponse';
import { getDefaultGuests } from 'thingsToDo/helpers/helper';

interface CheckAvailabilityProps {
  pricing: Pricing;
}

const CheckThingsAvailability = ({ pricing }: CheckAvailabilityProps) => {
  const [t] = useTranslation('global');
  const setQueryParam = useQuerySetter();
  const textCheckAvailability = t('checkAvailability', 'Check Availability');
  const [checkInOutProps, startDate, endDate] = useCheckInOutInput();
  const params = useQuery();
  const defaultGuestData: any = getDefaultGuests(pricing?.ticket_types, params);
  const [guestsData, setGuestsData] = useState(defaultGuestData);
  console.log('pricing', pricing);

  const onApply = () => {
    const guestsParams: any = {};
    Object.keys(guestsData).forEach((key) => {
      guestsParams[key] = guestsData[key].toString();
    });
    setQueryParam({
      startDate: startDate.toString(),
      endDate: endDate.toString(),
      ...guestsParams,
    });
  };

  const {
    showDatePicker,
    handleStartDateChange,
    handleEndDateChange,
    handleOpenDatePicker,
    handleCloseDatePicker,
  } = checkInOutProps as UseCheckInOutInputPropsComponentReturn;

  return (
    <section className="h-full">
      <GuestsThingsInput
        guestsData={guestsData}
        setGuestsData={setGuestsData}
        inputs={pricing?.ticket_types}
      />
      <DateThingsInput
        showDatePicker={showDatePicker}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
        handleOpenDatePicker={handleOpenDatePicker}
        handleCloseDatePicker={handleCloseDatePicker}
        startDate={startDate as string}
        endDate={endDate as string}
      />
      <Button width="w-full mt-4" onClick={onApply}>
        {textCheckAvailability}
      </Button>
    </section>
  );
};

export default CheckThingsAvailability;
