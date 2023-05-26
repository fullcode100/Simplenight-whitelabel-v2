import { ReactNode, useState } from 'react';
import { Collapse } from 'react-collapse';

import CollapseHeader from './components/CollapseHeader';
import CollapseBody from './components/CollapseBody';
import CollapseFooter from './components/CollapseFooter';

interface CollapseBorderedProps {
  disclaimer?: ReactNode;
  title: ReactNode;
  body: ReactNode;
  footer: ReactNode;
  isOpen?: boolean;
}

const CollapseBordered = ({
  disclaimer,
  title,
  body,
  footer,
  isOpen = false,
}: CollapseBorderedProps) => {
  const [show, setShow] = useState(isOpen);

  return (
    <section className="overflow-hidden rounded border border-dark-300">
      {disclaimer}
      <CollapseHeader title={title} show={show} setShow={setShow} />
      <Collapse isOpened={show}>
        <CollapseBody body={body} show={show} />
      </Collapse>
      {footer !== null && <CollapseFooter footer={footer} show={show} />}
    </section>
  );
};

export default CollapseBordered;
