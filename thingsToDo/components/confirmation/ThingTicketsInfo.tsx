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
import { formatObjectToString } from 'helpers/objectUtils';
import { Paragraph } from '@simplenight/ui';

interface Props {
  item: Item;
}

const ThingTicketsInfo = ({ item }: Props) => {
  const paxes = item.booking_data?.ticket_types || [];
  const quantity = item.quantity;
  const rate = item.rate;
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
          <Paragraph size="small" className="capitalize">
            {payNowLabel}
          </Paragraph>
          <Paragraph size="small" fontWeight="semibold">
            {formattedTotalAmount}
          </Paragraph>
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
      <div>
        <Paragraph size="small" textColor="text-dark-700">
          {cancellationPolicyLabel}
        </Paragraph>
        <Paragraph size="small">{cancellationPolicy?.description}</Paragraph>
        {cutoffFlag && (
          <Paragraph size="small" textColor="text-dark-700">
            {cutoffFlag.description}
          </Paragraph>
        )}
        {weatherFlag && (
          <Paragraph size="small">{weatherFlag.description}</Paragraph>
        )}
        {insufficientTravelersFlag && (
          <Paragraph size="small">
            {insufficientTravelersFlag.description}
          </Paragraph>
        )}
      </div>
    );
  };

  const AdditionalRequestsSection = () => {
    const additionalResquestsLabel = 'Additional Requests';
    return (
      <div>
        <Paragraph size="small" textColor="text-dark-700">
          {additionalResquestsLabel}
        </Paragraph>
        {item.customer_additional_requests && (
          <Paragraph size="small">
            {item.customer_additional_requests}
          </Paragraph>
        )}
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
        const hasCorrespondingBookingQuestion = bookingQuestions?.find(
          (bookingQuestion) => bookingQuestion.id === bookingAnswer.question_id,
        );
        let answerValue = formatObjectToString(bookingAnswer.value);
        if (bookingAnswer.question_id === PICKUP_POINT_ID) {
          answerValue = pickupAddress ? pickupAddressFormatted : pickupName;
        }
        if (hasCorrespondingBookingQuestion) {
          return {
            id: bookingAnswer.question_id,
            value: answerValue,
            traveler: bookingAnswer.traveler_num,
            label: answerLabel,
          };
        }
      },
    );

    return (
      <div className="text-sm ">
        {transformedAnswers?.map((answer) => {
          return (
            <div key={`${answer?.id}-${answer?.traveler}`} className="text-sm ">
              {answer?.label && (
                <Paragraph size="small" textColor="text-dark-700">
                  {answer?.label}
                </Paragraph>
              )}
              <Paragraph size="small">{answer?.value}</Paragraph>
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
        <Paragraph
          size="medium"
          className="capitalize"
          fontWeight="semibold"
        >{`${quantity}x ${ticketName}`}</Paragraph>
        <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {supplierReferenceID && (
            <SupplierReference supplierReferenceID={supplierReferenceID} />
          )}
          {vendorConfirmationNumber && (
            <section className="grid gap-0 ">
              <Paragraph
                fontWeight="semibold"
                textColor="text-dark-700"
                size="xs-sm"
              >
                {vendorConfirmationLabel}
              </Paragraph>
              <Paragraph
                fontWeight="semibold"
                textColor="text-primary-1000"
                size="xs-sm"
              >
                {vendorConfirmationNumber}
              </Paragraph>
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
