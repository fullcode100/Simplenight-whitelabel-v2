import React, { ReactNode } from 'react';
import { Stepper } from './components/Stepper';
import classnames from 'classnames';
import useScrollDirection from 'hooks/layoutAndUITooling/useScrollDirection';

interface BreadCrumbProps {
  content: ReactNode;
  step: 1 | 2;
}
const FlightsBreadcrumbs = ({ content, step }: BreadCrumbProps) => {
  return (
    <section
      className={classnames(
        'absolute flex w-full left-0 bg-primary-100 h-16 items-center justify-between transition-all duration-500 mt-[60px] md:mt-0 md:px-20 ',
        step === 1 && 'hidden md:flex',
      )}
    >
      <section className="flex w-full items-center justify-between max-w-7xl mx-auto">
        <section className="flex items-center gap-6">{content}</section>
        <div className="hidden md:block">
          <Stepper step={step} />
        </div>
      </section>
    </section>
  );
};

export default FlightsBreadcrumbs;
