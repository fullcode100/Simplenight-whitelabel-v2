import { TimeObject } from 'thingsToDo/types/response/ThingsDetailResponse';
import classnames from 'classnames';
import { formatTicketTime } from 'thingsToDo/helpers/helper';
import { useTranslation } from 'react-i18next';

interface TimeSelectorProps {
  data: TimeObject[];
  value?: string;
  onChange?: (time: string) => void;
}

const TimeSelectorDrop = ({
  data,
  value = '',
  onChange,
}: TimeSelectorProps) => {
  const [t] = useTranslation('global');
  const selectAnyHour = t('selectAnyHour', 'Select Any Hour');
  const onChangeTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== '-') {
      onChange?.(e.target.value);
    }
  };
  return (
    <section
      className={classnames(
        'flex border-[1px] shadow-sm  w-full sm:text-sm border-gray-300 rounded-md resize-none items-center',
        {
          'ring-primary-500 border-primary-500': false,
        },
      )}
    >
      <select
        value={value}
        className="w-full border-0 rounded-md focus:ring-0"
        onChange={onChangeTime}
      >
        <option
          className={classnames(
            'border border-dark-300 p-2 rounded block w-20 text-[12px] text-dark-700 bg-dark-300',
          )}
          value={'-'}
          selected={true}
        >
          {selectAnyHour}
        </option>
        {data?.map((timeItem: TimeObject, index: number) => {
          const time = formatTicketTime(timeItem?.start_time);
          const isSelected = time === value;
          const isDisabled = !timeItem.available;
          return (
            <option
              key={index}
              className={classnames(
                'border border-dark-300 p-2 rounded block w-20 text-[12px] text-dark-700',
                {
                  'bg-dark-300': isDisabled,
                  'bg-primary-100  border-primary-1000': isSelected,
                },
              )}
              value={time}
              disabled={isDisabled}
            >
              {time}
            </option>
          );
        })}
      </select>
    </section>
  );
};

export default TimeSelectorDrop;
