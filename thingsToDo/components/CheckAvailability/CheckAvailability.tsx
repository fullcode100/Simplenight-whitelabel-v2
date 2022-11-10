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

const CheckThingsAvailability = () => {
  const [t] = useTranslation('global');
  const setQueryParam = useQuerySetter();
  const textCheckAvailability = t('checkAvailability', 'Check Availability');
  const params = useQuery();
  const [checkInOutProps, startDate, endDate] = useCheckInOutInput();
  const [guestsData, setGuestsData] = useState({
    adults: parseInt(params?.adults as string) || 2,
    children: parseInt(params?.children as string) || 0,
    infants: parseInt(params?.infants as string) || 0,
  });

  const onApply = () => {
    setQueryParam({
      startDate: startDate.toString(),
      endDate: endDate.toString(),
      adults: guestsData?.adults.toString(),
      children: guestsData?.children?.toString(),
      infants: guestsData?.infants?.toString(),
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
