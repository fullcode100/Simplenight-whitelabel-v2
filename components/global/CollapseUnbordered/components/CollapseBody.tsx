import { ReactNode } from 'react';
import classnames from 'classnames';

interface CollapseBodyProps {
  body: ReactNode;
  show: boolean;
}
const CollapseBody = ({ body, show }: CollapseBodyProps) => {
  return (
    <section
      className={classnames('pl-[52px]', {
        ['opacity-100 ease-out duration-300']: show,
        ['opacity-0 ease-out duration-300']: !show,
      })}
    >
      {body}
    </section>
  );
};

export default CollapseBody;
