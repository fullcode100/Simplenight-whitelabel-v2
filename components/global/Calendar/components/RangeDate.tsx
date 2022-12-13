import { fromLowerCaseToCapitilize } from '../../../../helpers/stringUtils';
import classNames from 'classnames';

interface RangeDateProps {
  isStartDateTurn: boolean;
  onDateTurn: any;
  startDateLabel: string;
  endDateLabel: string;
  startDate: string;
  endDate: string;
  isRange?: boolean;
}

const RangeDate = ({
  isStartDateTurn,
  onDateTurn,
  startDateLabel,
  endDateLabel,
  startDate,
  endDate,
  isRange = true,
}: RangeDateProps) => {
  return (
    <section
      className={classNames('grid pt-4 px-5', {
        'grid-cols-2 justify-center': isRange,
      })}
    >
      <div
        className={`col-span-1 pb-3 pr-2 border-b-2 ${
          isStartDateTurn ? 'border-primary-1000' : 'border-dark-300'
        }`}
      >
        <p className="text-sm text-dark-800">{startDateLabel}</p>
        <button
          onClick={onDateTurn}
          className={`text-base font-semibold ${
            isStartDateTurn ? 'text-primary-1000' : 'text-dark-1000'
          }`}
        >
          {fromLowerCaseToCapitilize(startDate)}
        </button>
      </div>
      {isRange && (
        <div
          className={`col-span-1 pb-3 px-2 border-b-2 ${
            !isStartDateTurn ? 'border-primary-1000' : 'border-dark-300'
          }`}
        >
          <p className="text-sm text-dark-800">{endDateLabel}</p>
          <button
            onClick={onDateTurn}
            className={`text-base font-semibold ${
              !isStartDateTurn ? 'text-primary-1000' : 'text-dark-1000'
            }`}
          >
            {fromLowerCaseToCapitilize(endDate)}
          </button>
        </div>
      )}
    </section>
  );
};

export default RangeDate;
