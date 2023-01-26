/* eslint-disable indent */
import { MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import NumberInput from 'components/global/Input/NumberInput';
import {
  GuestsData,
  PricingTicketType,
} from 'thingsToDo/types/response/ThingsDetailResponse';
import Paragraph from 'components/global/Typography/Paragraph';

interface GuestsThingsModalProps {
  showGuestsThingsModal: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
  guestsData: any;
  setGuestsData: (data: GuestsData) => void;
  inputs: PricingTicketType[];
  isAdultRequired: boolean;
  activityMaxTravelers: number;
  setIsEditing?: (value: boolean) => void;
}

const GuestsThingsModal = ({
  showGuestsThingsModal,
  onClose,
  guestsData,
  setGuestsData,
  inputs,
  isAdultRequired,
  activityMaxTravelers,
  setIsEditing,
}: GuestsThingsModalProps) => {
  const [tg, i18next] = useTranslation('global');
  const [t] = useTranslation('things');
  const applyLabel = tg('apply', 'Apply');
  const guestsLabel = tg('guests', 'Guests');
  const agesLabel = tg('ages', 'Ages');
  const toLabel = tg('to', 'to');
  const minLabel = tg('min', 'Min');
  const maxLabel = tg('max', 'Max');
  const guestsForThisActivityLabel = t(
    'guestsForThisActivity',
    'guests for this activity.',
  );
  const oneAdultOrSeniorForThisActivityLabel = t(
    'minimumOneAdultOrSeniorForThisActivity',
    'Minimum one adult or senior for this activity.',
  );
  const minOneAdultOrSeniorLabel = t(
    'minOneAdultOrSenior',
    'Min. 1 Adult or Senior',
  );

  const [guests, setGuests] = useState(guestsData);

  const onApply = () => {
    setGuestsData(guests);
    if (setIsEditing) {
      setIsEditing(true);
    }
    onClose();
  };

  const SENIOR_LABEL = 'SENIOR';
  const ADULT_LABEL = 'ADULT';
  const isSeniorInput = (id: string) => id === SENIOR_LABEL;
  const isAdultInput = (id: string) => id === ADULT_LABEL;

  const handleCountChange = (value: any, key: string) => {
    setGuests({ ...guests, [key]: value });
  };

  const getMinRequiredTravelers = (min: number, id: string) => {
    const hasNoAdultTraveler = guests[ADULT_LABEL] === 0;
    const hasNoSeniorTraveler = guests[SENIOR_LABEL] === 0;

    if (
      (hasNoAdultTraveler && isSeniorInput(id)) ||
      (hasNoSeniorTraveler && isAdultInput(id))
    ) {
      return 1;
    }
    return min;
  };

  const getMax = (max: number, id: string) => {
    let availableTravelers = activityMaxTravelers;
    Object.keys(guests).forEach((key) => {
      if (key !== id) {
        availableTravelers -= guests[key];
      }
    });
    if (max < availableTravelers) return max;
    return availableTravelers;
  };

  const getMinText = (id: string, min: number) => {
    if (min === 0) return '';
    if (isAdultRequired && (isAdultInput(id) || isSeniorInput(id)) && min <= 1)
      return minOneAdultOrSeniorLabel;
    return `${minLabel}. ${min}`;
  };
  return (
    <FullScreenModal
      open={showGuestsThingsModal}
      closeModal={onClose}
      title={guestsLabel}
      primaryButtonText={applyLabel}
      primaryButtonAction={onApply}
      className={`lg:rounded-4 lg:overflow-hidden
      lg:max-w-[842px] lg:h-[660px]  lg:top-1/2 lg:left-1/2 lg:-translate-y-1/2 lg:-translate-x-1/2
      lg:shadow-full

      `}
    >
      <section className="h-full px-5 py-[22px] overflow-y-scroll">
        <section className="flex flex-col mb-6 gap-y-6">
          <Paragraph
            className="capitalize"
            size="small"
            textColor="text-dark-800"
          >{`${maxLabel}. ${activityMaxTravelers} ${guestsForThisActivityLabel}
            ${
              isAdultRequired && oneAdultOrSeniorForThisActivityLabel
            }`}</Paragraph>
          {isAdultRequired && (
            <p className="text-sm capitalize text-dark-800"></p>
          )}
          {inputs?.map((input) => {
            const {
              label,
              ticket_type_id: id,
              min_travelers: min,
              max_travelers: max,
              start_age: startAge,
              end_age: endAge,
            } = input;
            const subLabel = `${agesLabel} ${startAge} ${toLabel} ${endAge}`;
            const minText = getMinText(id, min);
            const maxText = `${
              max < activityMaxTravelers ? `${maxLabel}. ${max}` : ''
            }`;
            return (
              <NumberInput
                key={id}
                label={label}
                sublabel={subLabel}
                buttonsLabel={`${minText} ${maxText}`}
                value={guests[id]}
                onChange={(value) => handleCountChange(value, id)}
                min={
                  isAdultRequired && min <= 1
                    ? getMinRequiredTravelers(min, id)
                    : min
                }
                max={getMax(max, id)}
                disabled
              />
            );
          })}
        </section>
      </section>
    </FullScreenModal>
  );
};

export default GuestsThingsModal;
