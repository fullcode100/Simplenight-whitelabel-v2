import I18nHOC from '../I18nHOC/I18nHOC';

export interface BaseInputProps {
  children?: any;
  name?: string;
  value?: any;
  label?: string;
  placeholder?: string;
  inputClassName?: string;
  customInput?: any;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type InputType = 'text' | 'number' | 'date' | 'select';

interface BaseInputHiddenProps {
  type?: InputType;
  leftIcon?: any;
  rightIcon?: any;
}

const BaseInput = ({
  label = '',
  name = '',
  placeholder = '',
  inputClassName = '',
  type = 'text',
  className = '',
  leftIcon,
  rightIcon,
  customInput,
  value,
  onChange,
  children,
  ...others
}: BaseInputProps & BaseInputHiddenProps) => {
  const NumberInput = () => (
    <section className="w-full h-full flex flex-row items-center justify-between">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="max-w-[44px] max-h-[44px] relative">
        {children}
        {leftIcon}
        <Input internalInputClassName="text-center" />
        {rightIcon}
      </div>
    </section>
  );
  const Input =
    customInput ||
    (({ internalInputClassName }: { internalInputClassName: string }) => (
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${inputClassName} ${internalInputClassName}`}
        placeholder={placeholder}
        onChange={onChange}
        {...others}
      />
    ));

  if (type === 'number') return <NumberInput />;

  return (
    <div className={`w-full ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative">
        {children}
        {leftIcon}
        <Input />
        {rightIcon}
      </div>
    </div>
  );
};

export default I18nHOC<BaseInputProps & BaseInputHiddenProps>(BaseInput);
