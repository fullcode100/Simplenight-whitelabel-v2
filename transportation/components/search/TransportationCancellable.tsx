import React, { FC } from 'react';
import FreeCancellation from 'components/global/FreeCancellation/FreeCancellation';
import { PopoverCancellable } from './PopoverCancellable';

interface TransportationCancellableProps {
  cancellable?: boolean;
  description?: string;
}

export const TransportationCancellable: FC<TransportationCancellableProps> = ({
  cancellable,
  description,
}) => {
  return (
    <section className="flex justify-end lg:flex lg:flex-col lg:w-full lg:items-end">
      <FreeCancellation wfull cancellable={cancellable} />
      <section className="flex flex-row gap-1 justify-end">
        <p className="text-[12px] leading-[15px] text-dark-800">
          Cancellation Policy
        </p>
        <PopoverCancellable description={description} />
      </section>
    </section>
  );
};
