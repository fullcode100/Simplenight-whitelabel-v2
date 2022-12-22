import DatePicker from 'components/global/Calendar/Calendar';
import IconInput from 'components/global/Input/IconInput';
import dayjs from 'dayjs';
import { formatAsDisplayDate, formatAsSearchDate } from 'helpers/dajjsUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Calendar from 'public/icons/assets/calendar.svg';
import { fromLowerCaseToCapitilize } from 'helpers/stringUtils';

const DiningDateDetail = ({
  onDateChange,
}: {
  onDateChange: (value: string) => void;
}) => {
  const [t] = useTranslation('dining');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const params = useQuery();
  const handleEndDateChange = () => {
    // TODO: Do nothing
  };

  const [startDate, setStartDate] = useState<string>(
    params.startDate
      ? params.startDate.toString()
      : formatAsSearchDate(dayjs()),
  );

  const [endDate, setEndDate] = useState<string>(
    params.endDate
      ? params.endDate.toString()
      : formatAsSearchDate(dayjs().add(1, 'day')),
  );

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    onDateChange(value);
  };

  return (
    <div>
      <DatePicker
        showDatePicker={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        startDateLabel={t('startDate')}
        endDateLabel={t('endDate')}
        initialStartDate={startDate}
        initialEndDate={endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        openOnStart={false}
        isRange={false}
      />
      <section className="flex gap-4 lg:mt-0 lg:w-full">
        <IconInput
          label={t('startDate')}
          name="Check-in"
          placeholder="Placeholder"
          className="lg:mt-0"
          orientation="left"
          icon={<Calendar className="w-5 h-5 text-dark-700" />}
          value={fromLowerCaseToCapitilize(formatAsDisplayDate(startDate))}
          onChange={(event) => handleStartDateChange(event.target.value)}
          onClick={() => setShowDatePicker(true)}
          disabled
        />
      </section>
    </div>
  );
};

export default DiningDateDetail;
