import React from 'react';
import { Item } from 'types/booking/bookingType';
import PlusIcon from 'public/icons/assets/Plus.svg';
import ThingItineraryPriceBreakdown from '../itinerary/ThingItineraryPriceBreakdown';
import Divider from 'components/global/Divider/Divider';
import { useTranslation } from 'react-i18next';
import {
  BookingAnswer,
  TicketTypes,
} from 'thingsToDo/types/request/ThingsCartRequest';
import { BookingQuestion } from 'thingsToDo/types/response/ThingsDetailResponse';
import Link from 'public/icons/assets/link.svg';
import SupplierReference from 'hotels/components/SupplierReference/SupplierReference';

interface Props {
  item: Item;
}

const ThingTicketsInfo = ({ item }: Props) => {
  const paxes = item.booking_data?.ticket_types || [];
  const quantity = item.quantity;
  const rate = item.item_data?.rate as any;
  const discounts = rate.discounts;
  const totalAmount = rate.total;
  const tickets = item.item_data?.extra_data.tickets[0];
  const ticketName = tickets?.name;
  const cancellationPolicy = tickets?.ticket_types[0].cancellation_policy;
  const [t] = useTranslation('things');
  const [g] = useTranslation('global');

  const voucherLabel = t('viewVoucher', 'View Voucher');
  const supplierReferenceID = item?.supplier_order_number;
  const vendorConfirmationNumber =
    item?.vendor_confirmation_code && item?.vendor_confirmation_code.length > 0
      ? item?.vendor_confirmation_code
      : '-';
  const vendorConfirmationLabel = t(
    'vendorConfirmation',
    'Vendor Confirmation Number',
  );

  const FeesRow = ({ priceBreakdown, label }: any) => {
    return (
      <section className="flex items-start justify-between">
        <section className="flex items-center gap-2 text-sm capitalize">
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
          <p className="font-semibold text-dark-1000text-sm">
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
        <h4 className="text-sm font-normal text-dark-700">
          {cancellationPolicyLabel}
        </h4>
        <p>{cancellationPolicy?.description}</p>
        {cutoffFlag && (
          <p className="text-sm text-dark-700">{cutoffFlag.description}</p>
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
        <h4 className="text-sm font-normal text-dark-700">
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
    const transformedAnswers = bookingAnswers?.map(
      (bookingAnswer: BookingAnswer) => {
        const answerLabel = bookingQuestions?.find(
          (bookingQuestion) => bookingQuestion.id === bookingAnswer.question_id,
        )?.label;
        const answerValue = bookingAnswer.value;

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
        {transformedAnswers?.map((answer: any) => {
          return (
            <div key={`${answer.id}-${answer.traveler}`} className="text-sm ">
              <h4 className="text-sm font-normal text-dark-700">
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
      <section className="flex flex-col gap-3 px-4 py-4 text-dark-1000">
        <h3 className="text-base capitalize">
          {quantity}x {ticketName}
        </h3>
        <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {supplierReferenceID && (
            <SupplierReference supplierReferenceID={supplierReferenceID} />
          )}
          {vendorConfirmationNumber && (
            <section className="grid gap-0 ">
              <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-700">
                {vendorConfirmationLabel}
              </p>
              <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-primary-1000">
                {vendorConfirmationNumber}
              </p>
            </section>
          )}
          {item.voucher && (
            <a
              href={item.voucher.url}
              target={'_blank'}
              className="flex items-center justify-center gap-2 p-3 text-xs font-semibold border bg-primary-100 text-primary-1000 hover:text-primary-1000 border-primary-300 rounded-4"
              rel="noreferrer"
            >
              {voucherLabel}
              <Link />
            </a>
          )}
        </section>
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