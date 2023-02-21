import React from 'react';
// components
import FreeCancellation from 'components/global/FreeCancellation/FreeCancellation';
import NonRefundable from 'components/global/NonRefundable/NonRefundable';
import PartialRefund from 'components/global/PartialRefund/PartialRefund';

const FREE_CANCELLATION = 'FREE_CANCELLATION';
const NON_REFUNDABLE = 'NON_REFUNDABLE';
const PARTIAL_REFUND = 'PARTIAL_REFUND';

const ShowsCancellable = ({
  cancellationType,
}: {
  cancellationType: string;
}) => {
  const cancellable = cancellationType === FREE_CANCELLATION;
  const nonCancellable = cancellationType === NON_REFUNDABLE;
  const partialRefundable = cancellationType === PARTIAL_REFUND;

  return (
    <section className="flex justify-end">
      <FreeCancellation cancellable={cancellable} />
      <NonRefundable nonCancellable={nonCancellable} />
      <PartialRefund nonCancellable={partialRefundable} />
    </section>
  );
};

export default ShowsCancellable;
