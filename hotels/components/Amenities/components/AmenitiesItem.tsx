import { ReactNode } from 'react';
import classnames from 'classnames';

interface AmenitiesItemProps {
  text: string;
  icon: ReactNode;
  view: 'list' | 'grid';
}

const AmenitiesItem = ({ text, icon, view }: AmenitiesItemProps) => {
  return (
    <section
      className={classnames('text-primary-1000', {
        ['flex items-center gap-2']: view === 'list',
      })}
    >
      {icon}
      <p
        className={classnames('text-dark-1000 text-sm font-normal', {
          ['text-center']: view === 'grid',
        })}
      >
        {text}
      </p>
    </section>
  );
};

export default AmenitiesItem;
