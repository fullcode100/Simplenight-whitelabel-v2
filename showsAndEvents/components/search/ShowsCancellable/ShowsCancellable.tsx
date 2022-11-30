import React from 'react';
// components
import FreeCancellation from 'components/global/FreeCancellation/FreeCancellation';
import NonRefundable from 'components/global/NonRefundable/NonRefundable';
import PartialRefund from 'components/global/PartialRefund/PartialRefund';

interface CancelationPolicyDetails {
  from_date: string;
  to_date: string;
  penalty_percentage: number;
  penalty_amount: {
    amount: number;
    formatted: string;
    currency: string;
  };
  cancellation_type: string;
}
interface CancelationPolicy {
  description: string;
  details: any;
  cancellation_type: string;
}
interface ThingsCancellableProps {
  cancellationPolicy: CancelationPolicy;
}
const ThingsCancellable = ({ cancellationPolicy }: ThingsCancellableProps) => {
  const freeCancelation = 'FREE_CANCELLATION';
  const nonRefundable = 'NON_REFUNDABLE';
  const partialRefund = 'PARTIAL_REFUND';

  const cancellable = cancellationPolicy?.cancellation_type === freeCancelation;
  const nonCancellable =
    cancellationPolicy?.cancellation_type === nonRefundable;
  const partialRefundable =
    cancellationPolicy?.cancellation_type === partialRefund;
  return (
    <section className="flex justify-end">
      {cancellable && <FreeCancellation cancellable={cancellable} />}
      {nonCancellable && <NonRefundable nonCancellable={nonCancellable} />}
      {partialRefundable && (
        <PartialRefund nonCancellable={partialRefundable} />
      )}
    </section>
  );
};

export default ThingsCancellable;
