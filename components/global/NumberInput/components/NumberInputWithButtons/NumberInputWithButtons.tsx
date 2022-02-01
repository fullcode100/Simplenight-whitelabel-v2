import { ChangeEvent } from 'react';
import classnames from 'classnames';

import PlusIcon from '../../../../../public/icons/assets/plus.svg';
import MinusIcon from '../../../../../public/icons/assets/minus.svg';

import styles from './NumberInputWithButtons.module.scss';

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  hasButtons?: boolean;
  className?: string;
  min?: number;
  max?: number;
  [key: string]: any;
}

const DISABLED_BTN_STATE = 'bg-gray-200 cursor-not-allowed';

const ACTIVE_BTN_STATE = 'bg-primary cursor-pointer';

const NumberInputWithButtons = ({
  value,
  className,
  min,
  max,
  onChange,
}: NumberInputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const parsedInputValue = parseInt(event.target.value);
    return onChange(parsedInputValue);
  };

  const reachedMin = Boolean(min && value <= min);

  const reachedMax = Boolean(max && value >= max);

  const increment = () => {
    if (reachedMax) return;

    onChange(value + 1);
  };

  const decrement = () => {
    if (reachedMin) return;

    onChange(value - 1);
  };

  return (
    <section className={classnames(styles.root, className)}>
      <MinusIcon
        className={classnames(
          'text-white select-none w-full h-full px-2 rounded-l-md',
          {
            [DISABLED_BTN_STATE]: reachedMin,
            [ACTIVE_BTN_STATE]: !reachedMin,
          },
        )}
        onClick={decrement}
      />
      <input
        type="number"
        value={value}
        min={min}
        onChange={handleChange}
        className="w-full h-full"
      />
      <PlusIcon
        className={classnames(
          'text-white select-none w-full h-full px-2 rounded-r-md',
          {
            [DISABLED_BTN_STATE]: reachedMax,
            [ACTIVE_BTN_STATE]: !reachedMax,
          },
        )}
        onClick={increment}
      />
    </section>
  );
};

export default NumberInputWithButtons;
