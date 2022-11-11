import { ReactNode, useState } from 'react';
import { Collapse } from 'react-collapse';

import CollapseBody from '../CollapseUnbordered/components/CollapseBody';
import CollapseHeader from '../CollapseUnbordered/components/CollapseHeader';

interface CollapseProps {
  title: ReactNode;
  body: ReactNode;
  initialState?: boolean;
}

const CollapseUnbordered = ({ title, body, initialState }: CollapseProps) => {
  const [show, setShow] = useState(initialState ?? false);

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
