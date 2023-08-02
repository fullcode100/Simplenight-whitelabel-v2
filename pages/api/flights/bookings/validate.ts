// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { FLIGHT_DEBUG } from 'flights';

const defaultErrorMsg = 'Something went wrong, please try again';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const { body } = req;
    const { data, status } = await axios.post(
      `${process.env.NEXT_PUBLIC_FLIGHTS_MS}/sn-booking-service/reservation/price`,
      body,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    if (data && data.errorMessage) {
      throw new Error(data.errorMessage.error);
    } else if (status !== 200) {
      throw new Error(defaultErrorMsg);
    }
    const { offer } = body;

    const pricingGroupLevelGroupList =
      data?.mainGroup?.pricingGroupLevelGroup || [];

    const newFareDetails = pricingGroupLevelGroupList.map((item: any) => {
      const passengerType =
        item?.fareInfoGroup?.segmentLevelGroup?.[0]?.ptcSegment?.quantityDetails
          ?.unitQualifier;
      const amount =
        item?.fareInfoGroup?.fareAmount?.otherMonetaryDetails?.[0]?.amount || 0;
      const taxDetailsList =
        item?.fareInfoGroup?.surchargesGroup?.taxesAmount?.taxDetails || [];
      const tax = taxDetailsList.reduce((a: any, b: any) => {
        return Number(a) + Number(b['rate']);
      }, 0);
      const numberOfUnits =
        item?.numberOfPax?.segmentControlDetails?.[0]?.numberOfUnits || 0;
      const totalFareAmount = Number(amount) * Number(numberOfUnits);
      const totalTaxAmount = Number(tax) * Number(numberOfUnits);
      return {
        amount: `${Number(amount).toFixed(2)}`,
        passengerType,
        tax: `${Number(tax).toFixed(2)}`,
        numberOfUnits,
        totalFareAmount,
        totalTaxAmount,
      };
    });

    const total = newFareDetails.reduce((a: any, b: any) => {
      return Number(a) + Number(b['totalFareAmount']);
    }, 0);

    const totalFareAmount = `${total.toFixed(2)}`;

    const totalTax = newFareDetails.reduce((a: any, b: any) => {
      return Number(a) + Number(b['totalTaxAmount']);
    }, 0);

    const totalTaxAmount = `${totalTax.toFixed(2)}`;

    const offerFareAmount = offer.totalFareAmount;
    res.status(200).json({
      priceChanged: offerFareAmount !== totalFareAmount,
      offerFareAmount,
      newOffer: {
        totalFareAmount,
        totalTaxAmount,
        fareDetails: newFareDetails.map((item: any) => {
          return {
            passengerType: item.passengerType,
            amount: item.amount,
            tax: item.tax,
          };
        }),
      },
      supplier: FLIGHT_DEBUG ? data : null,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status as number).json({
        errors: [{ message: error.message }],
      });
    } else {
      let message = defaultErrorMsg;
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(500).json({
        errors: [{ message }],
      });
    }
  }
}
