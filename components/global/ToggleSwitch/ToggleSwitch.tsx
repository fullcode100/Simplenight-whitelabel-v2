import { Switch } from '@headlessui/react';
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
        <Switch
          checked={checked}
          onChange={() => onChange(!checked)}
          className={classnames(
            'relative inline-flex flex-shrink-0 h-5 w-9 p-[0.2rem] border border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none bg-primary-1000',
            {
              'border border-dark-1000 bg-dark-800': !checked,
            },
          )}
        >
          <span className="sr-only"></span>
          <span
            aria-hidden="true"
            className={classnames(
              'pointer-events-none inline-block h-3 w-3 rounded-full transform ring-0 transition ease-in-out duration-200 translate-x-4 bg-white',
              {
                'translate-x-0 bg-dark-800': !checked,
              },
            )}
          />
        </Switch>
      </section>
    </label>
  );
};

export default ToggleSwitch;
