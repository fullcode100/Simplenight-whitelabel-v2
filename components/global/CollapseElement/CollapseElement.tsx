import { ReactNode } from 'react';
import { Collapse } from 'react-collapse';

import classnames from 'classnames';

interface CollapseElementProps {
  children: React.ReactNode;
  show: boolean;
}
const CollapseElement = ({ children, show }: CollapseElementProps) => {
  return (
    <Collapse isOpened={show}>
      <section
        className={classnames({
          ['opacity-100 ease-out duration-300']: show,
          ['opacity-0 ease-out duration-300']: !show,
        })}
      >
        {children}
      </section>
    </Collapse>
  );
};

export default CollapseElement;
