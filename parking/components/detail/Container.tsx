import { FC } from 'react';

export const Container: FC = (props) => (
  <section className="px-4 lg:px-20">
    <section className="max-w-7xl mx-auto">{props.children}</section>
  </section>
);
