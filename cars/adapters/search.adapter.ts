/* eslint-disable camelcase */
import { CarSearchItem } from 'cars/types/adapter/SearchAdapter';
import { Car } from 'cars/types/response/CarSearchResponse';

export const searchAdapter = (items: CarSearchItem[]) => {
  const adapterSearchResponse: Car[] = items.map((item) => {
    const { rate_total_amount, ...rest } = item;
    return {
      ...rest,
      rate: {
        totalAmount: rate_total_amount['@RateTotalAmount'],
        estimatedTotalAmount: rate_total_amount['@EstimatedTotalAmount'],
        currencyCode: rate_total_amount['@CurrencyCode'],
      },
    };
  });

  return adapterSearchResponse;
};
