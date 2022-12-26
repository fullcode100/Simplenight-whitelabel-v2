import { MouseEvent } from 'react';
import classnames from 'classnames';

import PlusIcon from 'public/icons/assets/Plus.svg';
import MinusIcon from 'public/icons/assets/minus.svg';

interface ButtonMinusPlusProps {
  disabledMinus?: boolean;
  disabledPlus?: boolean;
  onClickMinus: (event?: MouseEvent<HTMLElement>) => void;
  onClickPlus: (event?: MouseEvent<HTMLElement>) => void;
}

const ButtonMinusPlus = ({
  disabledMinus,
  disabledPlus,
  onClickMinus,
  onClickPlus,
}: ButtonMinusPlusProps) => {
  return (
    <section className="flex flex-row">
      <button
        className={classnames(
          'flex items-center justify-center h-11 w-11 rounded-l',
          {
            ['cursor-pointer bg-primary-700 text-white']: !disabledMinus,
            ['cursor-not-allowed bg-dark-300 text-dark-700']: disabledMinus,
          },
        )}
        onClick={onClickMinus}
        disabled={disabledMinus}
      >
        <MinusIcon />
      </button>
      <button
        className={classnames(
          'flex items-center justify-center h-11 w-11 rounded-r',
          {
            ['cursor-pointer bg-primary-1000 text-white']: !disabledPlus,
            ['cursor-not-allowed bg-dark-300 text-dark-700']: disabledPlus,
          },
        )}
        onClick={onClickPlus}
        disabled={disabledPlus}
      >
        <PlusIcon />
      </button>
    </section>
  );
};

export default ButtonMinusPlus;
