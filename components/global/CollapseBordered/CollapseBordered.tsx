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
}

const CollapseBordered = ({
  disclaimer,
  title,
  body,
  footer,
}: CollapseBorderedProps) => {
  const [show, setShow] = useState(false);

  return (
    <section className="border border-dark-300 rounded overflow-hidden">
      {disclaimer}
      <CollapseHeader title={title} show={show} setShow={setShow} />
      <Collapse isOpened={show}>
        <CollapseBody body={body} show={show} />
      </Collapse>
      <CollapseFooter footer={footer} show={show} />
    </section>
  );
};

export default CollapseBordered;
