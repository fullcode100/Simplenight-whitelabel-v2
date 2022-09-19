interface ICheckbox {
  value: string;
  state: any;
  label: string;
  name: string;
  className?: string;
  onChange?: (value: any) => void;
}

const Checkbox = ({
  value,
  state,
  label,
  name,
  className = '',
  onChange,
}: ICheckbox) => {
  const handleChange = () => {
    if (onChange) onChange(!state);
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center h-5">
        <input
          id={value}
          aria-describedby={`${value}`}
          name={name}
          type="checkbox"
          defaultChecked={state}
          onChange={handleChange}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={value} className="font-semibold text-sm text-dark-1000">
          {label}
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
