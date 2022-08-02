import styles from './checkbox.module.scss';
interface ICheckbox {
  value?: string;
  checked?: boolean;
  name?: string;
  onChange?: (value: any) => void;
  children?: React.ReactNode;
  className?: string;
  isBoolean?: boolean;
}

const Checkbox = ({
  value,
  checked,
  name,
  children,
  className = '',
  onChange,
}: ICheckbox) => {
  const handleChange = () => {
    if (onChange) onChange(!checked);
  };
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center h-5">
        <input
          id={value}
          type="checkbox"
          aria-describedby={`${value}`}
          name={name}
          value={value}
          defaultChecked={checked}
          checked={checked}
          className={styles.inputCheckbox}
          onChange={handleChange}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={value} className="font-semibold text-sm text-dark-1000">
          {children}
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
