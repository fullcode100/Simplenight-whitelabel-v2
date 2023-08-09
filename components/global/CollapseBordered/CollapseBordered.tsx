import { ReactNode, useState } from 'react';
import { Collapse } from 'react-collapse';
import classnames from 'classnames';

import CollapseHeader from './components/CollapseHeader';
import CollapseBody from './components/CollapseBody';
import CollapseFooter from './components/CollapseFooter';

interface CollapseBorderedProps {
  disclaimer?: ReactNode;
  title: ReactNode;
  body: ReactNode;
  footer?: ReactNode;
  isOpen?: boolean;
  className?: string;
}

const CollapseBordered = ({
  disclaimer,
  title,
  body,
  footer,
  isOpen = false,
  className = '',
}: CollapseBorderedProps) => {
  const [show, setShow] = useState(isOpen);

  return (
    <section
      className={classnames(
        'overflow-hidden rounded-b-lg border-r border-b border-l border-dark-300',
        className,
      )}
    >
      {disclaimer}
      <CollapseHeader title={title} show={show} setShow={setShow} />
      <Collapse isOpened={show}>
        <CollapseBody body={body} show={show} />
      </Collapse>
      {footer && <CollapseFooter footer={footer} show={show} />}
    </section>
  );
};

export default CollapseBordered;
