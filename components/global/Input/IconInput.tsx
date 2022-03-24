import BaseInput, { BaseInputProps } from './BaseInput';

interface IconInputSpecificProps {
  icon: any;
  orientation?: 'left' | 'right';
}

const IconInput = ({
  label,
  name,
  icon,
  orientation = 'left',
  ...others
}: BaseInputProps & IconInputSpecificProps) => {
  const orientationBaseProp = `${orientation}Icon`;

  const getLeftSideIconClass = () => 'inset-y-0 left-0 pl-3';

  const getRightSideIconClass = () => 'inset-y-0 right-0 pr-3';

  const iconSideValue =
    orientation === 'right' ? getRightSideIconClass() : getLeftSideIconClass();

  const inputClassName = orientation === 'right' ? 'pr-10' : 'pl-10';

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
      inputClassName={inputClassName}
      {...dynamicProps}
      {...others}
    />
  );
};

export default IconInput;
