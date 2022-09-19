const cancellationTypes = {
  FREE_CANCELLATION: 'FREE_CANCELLATION',
  NON_REFUNDABLE: 'NON_REFUNDABLE',
  PARTIAL_REFUND: 'PARTIAL_REFUND',
};

export const cancellationTypeAdapter = (value: string): string => {
  const types = [];
  if (value) {
    if (value.includes('freeCancellation'))
      types.push(cancellationTypes.FREE_CANCELLATION);
    if (value.includes('nonRefundable'))
      types.push(cancellationTypes.NON_REFUNDABLE);
    if (value.includes('partialRefund'))
      types.push(cancellationTypes.PARTIAL_REFUND);
    return types.join(',');
  }
  return `${cancellationTypes.FREE_CANCELLATION},${cancellationTypes.NON_REFUNDABLE},${cancellationTypes.PARTIAL_REFUND}`;
};
