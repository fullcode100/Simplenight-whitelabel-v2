import classnames from 'classnames';
import dayjs from 'dayjs';

interface DatePickerProps {
  className?: string;
  value?: string;
  [key: string]: any;
}

const DatePicker = ({ className, value, ...others }: DatePickerProps) => {
  const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');

  return (
    <input
      type="date"
      className={classnames('', className)}
      min={tomorrow}
      value={value || tomorrow}
      {...others}
    />
  );
};

export default DatePicker;
