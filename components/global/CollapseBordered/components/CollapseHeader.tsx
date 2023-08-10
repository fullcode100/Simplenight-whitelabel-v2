import { Dispatch, ReactNode, SetStateAction } from 'react';
import classnames from 'classnames';

import ChevronDownIcon from 'public/icons/assets/chevron-down.svg';

interface CollapseBorderedProps {
  title: ReactNode;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  titleClassName?: string;
}

const CollapseHeader = ({
  title,
  show,
  setShow,
  titleClassName,
}: CollapseBorderedProps) => {
  const onClick = () => {
    setShow(!show);
  };

  return (
    <section
      className={classnames(
        'border-b border-dark-300 flex justify-between py-4 px-5',
        titleClassName,
      )}
    >
      {title}
      <section
        className={classnames('flex items-center', {
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
