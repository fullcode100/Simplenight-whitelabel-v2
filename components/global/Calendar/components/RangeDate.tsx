import { fromLowerCaseToCapitilize } from '../../../../helpers/stringUtils';

interface RangeDateProps {
  isStartDateTurn: boolean;
  onDateTurn: any;
  startDateLabel: string;
  endDateLabel: string;
  startDate: string;
  endDate: string;
}

const RangeDate = ({
  isStartDateTurn,
  onDateTurn,
  startDateLabel,
  endDateLabel,
  startDate,
  endDate,
}: RangeDateProps) => {
  return (
    <section className="grid grid-cols-2 justify-center pt-4 px-5">
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
      <div
        className={`col-span-1 pb-3 pl-2 border-b-2 ${
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
    </section>
  );
};

export default RangeDate;
