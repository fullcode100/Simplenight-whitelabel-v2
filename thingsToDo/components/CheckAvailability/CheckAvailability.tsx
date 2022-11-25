import {
  useCheckInOutInput,
  UseCheckInOutInputPropsComponentReturn,
} from 'hotels/components/CheckInOutInput/CheckInOutInput';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import useQuery from 'hooks/pageInteraction/useQuery';
import DateThingsInput from './DateThingsInput';
import Button from 'components/global/ButtonNew/Button';
import GuestsThingsInput from '../GuestsInput/GuestsThingsInput';
import { Pricing } from 'thingsToDo/types/response/ThingsDetailResponse';
import { getDefaultGuests } from 'thingsToDo/helpers/helper';

interface CheckAvailabilityProps {
  pricing: Pricing;
  onApply: (date: string, ticketTypes: any[]) => any;
  isAdultRequired: boolean;
  activityMaxTravelers: number;
}

const CheckThingsAvailability = ({
  pricing,
  onApply,
  isAdultRequired,
  activityMaxTravelers,
}: CheckAvailabilityProps) => {
  const [t] = useTranslation('global');
  const setQueryParam = useQuerySetter();
  const textCheckAvailability = t('checkAvailability', 'Check Availability');
  const [checkInOutProps, startDate, endDate] = useCheckInOutInput();
  const params = useQuery();
  const defaultGuestData: any = getDefaultGuests(pricing?.ticket_types, params);
  const [guestsData, setGuestsData] = useState(defaultGuestData);
  const [isEditing, setIsEditing] = useState(true);
  const ticketTypes: any[] = [];

  // const onApply = () => {
  //   if (isEditing) {
  //     const guestsParams: any = {};
  //     Object.keys(guestsData).forEach((key) => {
  //       guestsParams[key] = guestsData[key].toString();
  //     });
  //     setQueryParam({
  //       startDate: startDate.toString(),
  //       endDate: endDate.toString(),
  //       ...guestsParams,
  //     });
  //     setIsEditing(false);
  //   }
  // };

  const {
    showDatePicker,
    handleStartDateChange,
    handleEndDateChange,
    handleOpenDatePicker,
    handleCloseDatePicker,
  } = checkInOutProps as UseCheckInOutInputPropsComponentReturn;

  const isInitialMount = useRef(true);

  useEffect(() => {
    const entries = Object.entries(guestsData);
    entries.map(([prop, val]) =>
      ticketTypes.push({
        ticket_type_id: prop,
        quantity: val,
      }),
    );
  }, [guestsData]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setIsEditing(true);
    }
  }, [startDate, endDate, guestsData]);

  return (
    <section className="h-full lg:gap-4 lg:flex lg:items-end">
      <section className="flex flex-col lg:gap-4 lg:flex-row lg:w-[85%] items-end">
        <GuestsThingsInput
          guestsData={guestsData}
          setGuestsData={setGuestsData}
          inputs={pricing?.ticket_types}
          isAdultRequired={isAdultRequired}
          activityMaxTravelers={activityMaxTravelers}
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
      </section>
      <Button
        disabled={isEditing ? false : true}
        width="mt-4 w-full lg:w-[15%]"
        onClick={() => {
          onApply(startDate as string, ticketTypes);
          setIsEditing(false);
        }}
      >
        {textCheckAvailability}
      </Button>
    </section>
  );
};

export default CheckThingsAvailability;
