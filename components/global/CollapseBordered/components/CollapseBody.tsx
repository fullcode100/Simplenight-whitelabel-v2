import { ReactNode } from 'react';
import classnames from 'classnames';

interface CollapseBodyProps {
  body: ReactNode;
  show: boolean;
}
const CollapseBody = ({ body, show }: CollapseBodyProps) => {
  return (
    <section
      className={classnames('border-b border-dark-300', {
        ['opacity-100 border-b ease-out duration-300']: show,
        ['opacity-0 ease-out duration-300']: !show,
      })}
    >
      {body}
    </section>
  );
};

export default CollapseBody;
