// import { weekDays } from 'helpers/calendar/calendar';
import { useTranslation } from 'react-i18next';

interface WeekDays {
  day: string;
  abbr: string;
}

const WeekDays = () => {
  const [t] = useTranslation('global');
  const sundayText = t('sundayText', 'Sunday');
  const sundayAbbr = t('sundayAbbr', 'S');
  const mondayText = t('mondayText', 'Monday');
  const mondayAbbr = t('mondayAbbr', 'M');
  const tuesdayText = t('tuesdayText', 'Tuesday');
  const tuesdayAbbr = t('tuesdayAbbr', 'T');
  const wednesdayText = t('wednesdayText', 'Wednesday');
  const wednesdayAbbr = t('wednesdayAbbr', 'W');
  const thursdayText = t('thursdayText', 'Thursday');
  const thursdayAbbr = t('thursdayAbbr', 'T');
  const fridayText = t('fridayText', 'Friday');
  const fridayAbbr = t('fridayAbbr', 'F');
  const saturdayText = t('saturdayText', 'Saturday');
  const saturdayAbbr = t('saturdayAbbr', 'S');

  const weekDays: Array<WeekDays> = [
    { day: sundayText, abbr: sundayAbbr },
    { day: mondayText, abbr: mondayAbbr },
    { day: tuesdayText, abbr: tuesdayAbbr },
    { day: wednesdayText, abbr: wednesdayAbbr },
    { day: thursdayText, abbr: thursdayAbbr },
    { day: fridayText, abbr: fridayAbbr },
    { day: saturdayText, abbr: saturdayAbbr },
  ];

  return (
    <>
      {weekDays.map((dayName) => (
        <div
          className="col-span-1 text-dark-700 mt-3 bg-white"
          key={dayName.day}
        >
          {dayName.abbr}
        </div>
      ))}
    </>
  );
};

export default WeekDays;
