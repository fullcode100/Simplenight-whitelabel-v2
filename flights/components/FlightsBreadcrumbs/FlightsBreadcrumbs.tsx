import React, { ReactNode } from 'react';
import { Stepper } from './components/Stepper';
import classnames from 'classnames';
import useScrollDirection from 'hooks/layoutAndUITooling/useScrollDirection';

interface BreadCrumbProps {
  content: ReactNode;
  step: 1 | 2;
}
const FlightsBreadcrumbs = ({ content, step }: BreadCrumbProps) => {
  const scrollDirection = useScrollDirection();

  const classNameAbsolute = classnames(
    'hidden lg:flex w-full left-0 absolute bg-primary-100 h-16 items-center justify-between z-10 transition-all duration-500 px-20',
  );

  const classNameFixed = classnames(
    'hidden lg:flex w-full fixed left-0 bg-primary-100 h-16 items-center justify-between z-10 transition-all duration-500 px-20 top-20',
  );

  return (
    <section
      className={
        scrollDirection === 'down' ? classNameFixed : classNameAbsolute
      }
    >
      <section className="flex w-full items-center justify-between max-w-7xl mx-auto">
        <section className="flex items-center gap-6">{content}</section>
        <Stepper step={step} />
      </section>
    </section>
  );
};

export default FlightsBreadcrumbs;
