export interface BaseInputProps {
  children?: any;
  name?: string;
  label?: string;
  placeholder?: string;
  inputClassName?: string;
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
  onChange,
  children,
}: BaseInputProps & BaseInputHiddenProps) => (
  <div className={`w-full ${className}`}>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1 relative">
      {children}
      {leftIcon}
      <input
        type={type}
        name={name}
        id={name}
        className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${inputClassName}`}
        placeholder={placeholder}
        onChange={onChange}
      />
      {rightIcon}
    </div>
  </div>
);

export default BaseInput;
