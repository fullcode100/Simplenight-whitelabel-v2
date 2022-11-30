import { Dispatch, ReactNode, SetStateAction } from 'react';
import classnames from 'classnames';

import ChevronDownIcon from 'public/icons/assets/chevron-down.svg';

interface CollapseBorderedProps {
  title: ReactNode;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const CollapseHeader = ({ title, show, setShow }: CollapseBorderedProps) => {
  const onClick = () => {
    setShow(!show);
  };

  return (
    <section className="flex justify-between py-6">
      {title}
      <section
        className={classnames('flex items-center text-dark-700', {
          ['ease-out duration-300 -rotate-180']: show,
          ['ease-out duration-300 rotate-0']: !show,
        })}
        onClick={onClick}
      >
        <ChevronDownIcon />
      </section>
    </section>
  );
};

export default CollapseHeader;
