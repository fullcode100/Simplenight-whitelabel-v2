import { ReactNode, useRef, useState } from 'react';

import CollapseHeader from './components/CollapseHeader';
import CollapseBody from './components/CollapseBody';
import CollapseFooter from './components/CollapseFooter';

interface CollapseBorderedProps {
  title: ReactNode;
  body: ReactNode;
  footer: ReactNode;
}

const CollapseBordered = ({ title, body, footer }: CollapseBorderedProps) => {
  const [show, setShow] = useState(false);

  return (
    <section className="border border-dark-300 rounded">
      <CollapseHeader title={title} show={show} setShow={setShow} />
      {show && <CollapseBody body={body} show={show} />}
      <CollapseFooter footer={footer} show={show} />
    </section>
  );
};

export default CollapseBordered;
