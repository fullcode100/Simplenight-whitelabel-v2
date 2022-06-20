import classnames from 'classnames';

interface ToggleSwitchProps {
  id: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

const ToggleSwitch = ({ id, checked, onChange }: ToggleSwitchProps) => {
  const baseClass = classnames('block w-9 h-5 rounded-full transition', {
    'bg-primary-1000': checked,
    'border-[1px]': !checked,
  });
  const dotClass = classnames(
    'absolute left-1 top-1 bg-dark-800 w-3 h-3 rounded-full transition',
    {
      'translate-x-[130%] bg-white': checked,
    },
  );
  return (
    <label htmlFor={id} className="flex items-center cursor-pointer">
      <section className="relative">
        <input
          type="checkbox"
          id={id}
          className="sr-only"
          onChange={() => onChange(!checked)}
          checked={checked}
        />
        <section className={baseClass} />
        <span className={dotClass} />
      </section>
    </label>
  );
};

export default ToggleSwitch;
