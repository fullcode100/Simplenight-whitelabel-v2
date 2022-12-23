interface Option {
  label: string;
  value: string | number;
}

interface SelectInputProps {
  value: string | number;
  required?: boolean;
  id: string;
  onChange: (e: any) => void;
  children?: React.ReactNode;
  options: Option[];
}

const SelectInput = ({
  options,
  value,
  onChange,
  required,
  id,
  ...others
}: SelectInputProps) => {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      autoFocus={true}
      className="block w-full border-gray-300 rounded-md shadow-sm resize-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
      id={id}
      {...others}
      required={required}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
