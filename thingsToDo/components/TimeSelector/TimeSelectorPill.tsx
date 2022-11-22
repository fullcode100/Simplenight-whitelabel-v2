import classnames from 'classnames';
import { useState } from 'react';
import { formatTicketTime } from 'thingsToDo/helpers/helper';
import {
  TimeItem,
  TimeObject,
} from 'thingsToDo/types/response/ThingsDetailResponse';
import { Collapse } from 'react-collapse';
import { useTranslation } from 'react-i18next';
import styles from './selectorPill.module.scss';

interface TimeSelectorProps {
  data: TimeObject[];
  value?: string;
  onChange?: (value: string) => void;
}

const TimeSelectorPill = ({
  data,
  value = '',
  onChange,
}: TimeSelectorProps) => {
  const [t] = useTranslation('global');
  const [isOpened, setIsOpened] = useState(false);
  const onChangeTime = (time: string) => {
    onChange?.(time);
  };
  const seeMoreText = t('seeMore', 'See more');
  const hideText = t('hide', 'Hide');

  const renderTimeList = (times: TimeObject[]) => (
    <section className={`${styles.pillContainer} text-dark-700`}>
      {times?.map((timeItem: TimeObject, index: number) => {
        const time = formatTicketTime(timeItem.start_time);
        const isSelected = time === value;
        const isDisabled = !timeItem.available;
        const onChangeFunc = !isDisabled ? () => onChangeTime(time) : undefined;
        return (
          <button
            key={index}
            className={classnames(
              'border border-dark-300 py-1 px-1 rounded block w-full text-[12px] ',
              {
                'bg-dark-300': isDisabled,
                'bg-primary-100  border-primary-1000 text-primary-1000':
                  isSelected,
              },
            )}
            onClick={onChangeFunc}
          >
            {time}
          </button>
        );
      })}
    </section>
  );

  const featuredTimes = data?.slice(0, 12);
  const isMoreTimes = data?.length > 12;
  const moreTimes = data?.slice(12);

  return (
    <section className="w-full">
      {renderTimeList(featuredTimes)}
      <Collapse isOpened={isOpened}>
        <section className="pt-4">{renderTimeList(moreTimes)} </section>
      </Collapse>
      {isMoreTimes && (
        <button
          onClick={() => setIsOpened(!isOpened)}
          className="block mx-auto mt-4 font-semibold underline text-primary-1000"
        >
          {!isOpened ? seeMoreText : hideText}
        </button>
      )}
    </section>
  );
};

export default TimeSelectorPill;
