import React from 'react';
import { Item } from 'types/cart/CartType';
import PlusIcon from 'public/icons/assets/Plus.svg';
import ThingItineraryPriceBreakdown from '../itinerary/ThingItineraryPriceBreakdown';
import Divider from 'components/global/Divider/Divider';
import { useTranslation } from 'react-i18next';
import {
  BookingAnswer,
  TicketTypes,
} from 'thingsToDo/types/request/ThingsCartRequest';
import { BookingQuestion } from 'thingsToDo/types/response/ThingsDetailResponse';

interface Props {
  item: Item;
}

const ThingTicketsInfo = ({ item }: Props) => {
  const paxes = item.booking_data?.ticket_types || [];
  const quantity = item.quantity;
  const rate = item.rate as any;
  const discounts = rate.discounts;
  const totalAmount = rate.total;
  const tickets = item.item_data?.extra_data.tickets[0];
  const ticketName = tickets?.name;
  const cancellationPolicy = tickets?.ticket_types[0].cancellation_policy;
  const [t] = useTranslation('things');
  const [g] = useTranslation('global');

  const FeesRow = ({ priceBreakdown, label }: any) => {
    return (
      <section className="flex justify-between items-start">
        <section className="text-sm flex items-center gap-2 capitalize">
          <PlusIcon className={'text-primary-1000 h-4 w-4 '} />
          {label}
        </section>
        {priceBreakdown}
      </section>
    );
  };

  const FeesSection = () => {
    const payNowLabel = g('payNow', 'Pay Now');
    const formattedTotalAmount = totalAmount.full.formatted;
    const hasDiscount =
      discounts.total_amount_before_apply.amount > totalAmount.full.amount;
    const formattedDiscount = discounts.percentage_to_apply;
    const formattedAmountBeforeApply =
      discounts.total_amount_before_apply.formatted;

    let paxesLabel = '';
    paxes.forEach((pax: TicketTypes, idx: number) => {
      paxesLabel += `${pax.quantity} ${pax.age_band_label}${
        idx < paxes.length - 1 ? ',' : ''
      } `;
    });
    return (
      <>
        <FeesRow
          label={paxesLabel}
          priceBreakdown={
            <ThingItineraryPriceBreakdown
              totalAmount={formattedTotalAmount}
              discount={hasDiscount && formattedDiscount}
              amountBeforeDiscount={hasDiscount && formattedAmountBeforeApply}
            />
          }
        />
        <Divider />
        <div className="flex justify-between text-dark-1000">
          <p className="text-sm capitalize ">{payNowLabel}</p>
          <p className=" text-dark-1000text-sm font-semibold">
            {formattedTotalAmount}
          </p>
        </div>
      </>
    );
  };

  const PoliciesSection = () => {
    const CUTOFF_FLAG_ID = 'CUT_OFF_TIMES_LOCAL_BASED';
    const WEATHER_FLAG_ID = 'CANCEL_IF_BAD_WEATHER';
    const INSUFFICIENT_TRAVELERS_FLAG_ID = 'CANCEL_IF_INSUFFICIENT_TRAVELERS';

    const cutoffFlag = cancellationPolicy?.flags.find(
      (flag: any) => flag.flag_id === CUTOFF_FLAG_ID,
    );
    const weatherFlag = cancellationPolicy?.flags.find(
      (flag: any) => flag.flag_id === WEATHER_FLAG_ID,
    );
    const insufficientTravelersFlag = cancellationPolicy?.flags.find(
      (flag: any) => flag.flag_id === INSUFFICIENT_TRAVELERS_FLAG_ID,
    );

    const cancellationPolicyLabel = t(
      'cancellationPolicy',
      'Cancellation Policy',
    );

    return (
      <div className="text-sm ">
        <h4 className="text-sm  text-dark-700 font-normal">
          {cancellationPolicyLabel}
        </h4>
        <p>{cancellationPolicy?.description}</p>
        {cutoffFlag && (
          <p className="text-sm  text-dark-700">{cutoffFlag.description}</p>
        )}
        {weatherFlag && <p className="text-sm ">{weatherFlag.description}</p>}
        {insufficientTravelersFlag && (
          <p className="text-sm ">{insufficientTravelersFlag.description}</p>
        )}
      </div>
    );
  };

  const AdditionalRequestsSection = () => {
    const additionalResquestsLabel = 'Additional Requests';
    return (
      <div className="text-sm ">
        <h4 className="text-sm  text-dark-700 font-normal">
          {additionalResquestsLabel}
        </h4>
        <p>{item.customer_additional_requests}</p>
      </div>
    );
  };
  interface ExtraQuestionsProps {
    bookingAnswers?: BookingAnswer[];
    bookingQuestions?: BookingQuestion[];
  }

  const ExtraQuestionsSection = ({
    bookingAnswers,
    bookingQuestions,
  }: ExtraQuestionsProps) => {
    const PICKUP_POINT_ID = 'PICKUP_POINT';
    const pickupPoint = item.booking_data?.booking_answers?.find(
      (bookingAnswer: any) => bookingAnswer.question_id === PICKUP_POINT_ID,
    )?.value;
    const pickupLocations = item.item_data?.extra_data.pickup.locations;
    const selectedPickupLocation = pickupLocations?.find(
      (locationObject: any) => locationObject.location.ref == pickupPoint,
    )?.location;
    const pickupAddress = selectedPickupLocation?.address;
    const pickupName = selectedPickupLocation?.name;
    const pickupAddressFormatted = `${pickupAddress?.address1}${pickupAddress?.city}, ${pickupAddress?.country_code}, ${pickupAddress?.postal_code}`;

    const transformedAnswers = bookingAnswers?.map(
      (bookingAnswer: BookingAnswer) => {
        const answerLabel = bookingQuestions?.find(
          (bookingQuestion) => bookingQuestion.id === bookingAnswer.question_id,
        )?.label;
        let answerValue = bookingAnswer.value;
        if (bookingAnswer.question_id === PICKUP_POINT_ID) {
          answerValue = pickupAddress ? pickupAddressFormatted : pickupName;
        }
        return {
          id: bookingAnswer.question_id,
          value: answerValue,
          traveler: bookingAnswer.traveler_num,
          label: answerLabel,
        };
      },
    );

    return (
      <div className="text-sm ">
        {transformedAnswers?.map((answer) => {
          return (
            <div key={`${answer.id}-${answer.traveler}`} className="text-sm ">
              <h4 className="text-sm  text-dark-700 font-normal">
                {answer.label}
              </h4>
              <p>{answer.value}</p>
            </div>
          );
        })}
      </div>
    );
  };
  const hasAdditionalQuestions =
    item.booking_data?.booking_answers &&
    item.item_data?.extra_data.booking_questions;
  return (
    <>
      <Divider />
      <section className="flex flex-col gap-3 py-4 px-4 text-dark-1000">
        <h3 className="text-base capitalize">
          {quantity}x {ticketName}
        </h3>
        <FeesSection />
        <PoliciesSection />
        {item.customer_additional_requests && <AdditionalRequestsSection />}
        {hasAdditionalQuestions && (
          <ExtraQuestionsSection
            bookingAnswers={item.booking_data?.booking_answers}
            bookingQuestions={item.item_data?.extra_data.booking_questions}
          />
        )}
      </section>
    </>
  );
};

export default ThingTicketsInfo;
