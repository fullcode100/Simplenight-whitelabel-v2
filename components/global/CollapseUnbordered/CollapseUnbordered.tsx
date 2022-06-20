import { ReactNode, useState } from 'react';
import { Collapse } from 'react-collapse';

import CollapseBody from '../CollapseUnbordered/components/CollapseBody';
import CollapseHeader from '../CollapseUnbordered/components/CollapseHeader';

interface CollapseProps {
  title: ReactNode;
  body: ReactNode;
}

const CollapseUnbordered = ({ title, body }: CollapseProps) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <CollapseHeader title={title} show={show} setShow={setShow} />
      <Collapse isOpened={show}>
        <CollapseBody body={body} show={show} />
      </Collapse>
    </>
  );
};

export default CollapseUnbordered;
