import { useTranslation } from 'react-i18next';

interface RangeDateProps {
  isStartDateTurn: boolean;
  onDateTurn: any;
  startDate: string;
  endDate: string;
}

const RangeDate = ({
  isStartDateTurn,
  onDateTurn,
  startDate,
  endDate,
}: RangeDateProps) => {
  const [t] = useTranslation('hotels');
  const checkInText = t('checkIn');
  const checkOutText = t('checkOut');
  return (
    <section className="grid grid-cols-2 justify-center pt-4 px-5">
      <div
        className={`col-span-1 pb-3 px-2 border-b-2 ${
          isStartDateTurn ? 'border-primary-1000' : 'border-dark-300'
        }`}
      >
        <p className="text-sm text-dark-800">{checkInText}</p>
        <button
          onClick={onDateTurn}
          className={`text-base font-semibold ${
            isStartDateTurn ? 'text-primary-1000' : 'text-dark-1000'
          }`}
        >
          {startDate}
        </button>
      </div>
      <div
        className={`col-span-1 pb-3 px-2 border-b-2 ${
          !isStartDateTurn ? 'border-primary-1000' : 'border-dark-300'
        }`}
      >
        <p className="text-sm text-dark-800">{checkOutText}</p>
        <button
          onClick={onDateTurn}
          className={`text-base font-semibold ${
            !isStartDateTurn ? 'text-primary-1000' : 'text-dark-1000'
          }`}
        >
          {endDate}
        </button>
      </div>
    </section>
  );
};

export default RangeDate;
