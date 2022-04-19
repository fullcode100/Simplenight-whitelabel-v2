import I18nHOC from '../I18nHOC/I18nHOC';
import BaseInput, { BaseInputProps } from './BaseInput';
import classnames from 'classnames';
interface IconInputSpecificProps {
  icon: any;
  orientation?: 'left' | 'right';
  customInputClassName?: string;
}

type IconInputProps = BaseInputProps & IconInputSpecificProps;

const IconInput = ({
  label,
  name,
  icon,
  orientation = 'left',
  customInputClassName = '',
  value,
  ...others
}: IconInputProps) => {
  const orientationBaseProp = `${orientation}Icon`;

  const getLeftSideIconClass = () => 'inset-y-0 left-0 pl-3';

  const getRightSideIconClass = () => 'inset-y-0 right-0 pr-3';

  const iconSideValue =
    orientation === 'right' ? getRightSideIconClass() : getLeftSideIconClass();

  const orientationRight = orientation === 'right';
  const inputClassName = classnames({
    'pr-10': orientationRight,
    'pl-10': !orientationRight,
    customInputClassName,
  });

  const dynamicProps = {
    [orientationBaseProp]: (
      <section
        className={`absolute ${iconSideValue} flex items-center pointer-events-none`}
      >
        {icon}
      </section>
    ),
  };

  return (
    <BaseInput
      label={label}
      name={name}
      value={value}
      inputClassName={inputClassName}
      {...dynamicProps}
      {...others}
    />
  );
};

export default I18nHOC<IconInputProps>(IconInput);
