import { HotelCart } from 'types/cart/CartType';

export const getPercentage = (before: number, after: number) => {
  const percentage = ((before - after) * 100) / before;
  return `${percentage.toFixed(0)}%`;
};

export const getPriceDisplayParams = (item: HotelCart | undefined) => {
  const totalRate = JSON.parse(
    JSON.stringify(item?.items?.[0].rate?.min_rate.rate),
  );

  item?.items?.slice(1).forEach((room) => {
    const totalAmount = totalRate?.total_amount;
    const totalDiscounts = totalRate?.rate_breakdown.discounts;
    const totalAmountBeforeDiscount = totalDiscounts?.total_amount_before_apply;

    const roomRate = room.rate?.min_rate.rate;
    const roomTotalAmount = roomRate?.total_amount;
    const roomDiscounts = roomRate?.rate_breakdown.discounts;
    const roomAmountBeforeDiscount = roomDiscounts?.total_amount_before_apply;

    if (totalAmount) {
      totalAmount.amount += roomTotalAmount?.amount || 0;
      totalAmount.formatted = `$${totalAmount.amount.toFixed(2)}`;
    }

    if (totalAmountBeforeDiscount) {
      totalAmountBeforeDiscount.amount += roomAmountBeforeDiscount?.amount || 0;
      totalAmountBeforeDiscount.formatted = `$${totalAmountBeforeDiscount.amount.toFixed(
        2,
      )}`;
    }

    if (totalDiscounts && totalAmountBeforeDiscount && totalAmount) {
      totalDiscounts.percentage_to_apply = getPercentage(
        totalAmountBeforeDiscount.amount,
        totalAmount.amount,
      );
    }
  });

  return totalRate;
};
