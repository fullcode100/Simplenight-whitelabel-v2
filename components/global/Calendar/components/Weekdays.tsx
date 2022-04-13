import { weekDays } from 'helpers/calendar/calendar';

const WeekDays = () => {
  return (
    <>
      {weekDays.map(
        (dayName) => (
          <div className='col-span-1 text-dark-700 mt-3 bg-white' key={dayName.day}>
            {dayName.abbr}
          </div>
        ),
      )}
    </>
  )
}

export default WeekDays;