import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import classNames from 'classnames';

interface InputProps {
  type?: string;
  label: string;
  name: string;
  id?: string;
  placeholder?: string;
  errorMessage: string;
  defaultValue?: string;
  ref?: React.Ref<any>;
  validator?: (value: string) => boolean;
}

const TextInput = ({
  type,
  id,
  name,
  label,
  placeholder,
  errorMessage,
  defaultValue,
  validator,
  ref,
  ...others
}: InputProps) => {
  const [hasValidInput, setHasValidInput] = useState(true);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validator) {
      const isValid = validator(value);
      setHasValidInput(isValid);
    }
  };

  return (
    <div ref={ref}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type={type || 'text'}
          name={name}
          id={id || name}
          className={classNames({
            'block w-full pr-10': true,
            'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md':
              !hasValidInput,
          })}
          placeholder={placeholder}
          defaultValue={defaultValue || ''}
          onChange={onChange}
          aria-invalid="true"
          {...others}
        />
        {!hasValidInput && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {!hasValidInput && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default TextInput;
