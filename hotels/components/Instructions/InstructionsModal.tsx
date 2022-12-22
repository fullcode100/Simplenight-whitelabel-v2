import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Close from 'public/icons/assets/cross.svg';
import InstructionsSection from './InstructionsSection';
/* import {
  FeesInstructions,
  Instruction,
  InstructionItem,
} from 'hotels/types/response/SearchResponse'; */
import { CheckInInstruction, Fees } from '../../types/response/CartHotels';

import { hasInstructionsProps } from 'helpers/instructionUtil';

export interface InstructionProps {
  checkin_time: string | undefined;
  checkout_time: string | undefined;
  check_in_instructions?: CheckInInstruction[] | undefined;
  // special_instructions?: Instruction[];
  policies?: CheckInInstruction[] | undefined;
  fees?: Fees;
}

interface ModalProps {
  item: InstructionProps;
}

const InstructionsModal = ({ item }: ModalProps) => {
  const [t] = useTranslation();
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const specialInstructionsText = t(
    'specialInstructions',
    'Special Instructions',
  );
  const checkInInstructionsText = t(
    'checkInSpecialInstructions',
    '  Check-In & Special Instructions',
  );
  const hasInstructionProps = item && hasInstructionsProps(item as any);
  if (!hasInstructionProps) return null;

  const checkInTime = item?.checkin_time;
  const checkOutTime = item?.checkout_time;
  const checkInInstructions = item?.check_in_instructions;
  // const specialInstructions = item?.special_instructions;
  const fees = item?.fees;
  const policies = item?.policies;
  return (
    <section>
      <button
        className="text-primary-1000 underline"
        onClick={() => setOpen(true)}
      >
        {specialInstructionsText}
      </button>
      <FullScreenModal
        open={open}
        closeModal={onClose}
        title={''}
        noHeader={true}
        noFooter={true}
      >
        <header
          className={
            'sticky flex justify-between items-center px-5 pb-5 pt-12 shadow-container border-b border-dark-200 text-dark-1000'
          }
        >
          <h2 className={'font-semibold text-base text-dark-1000 '}>
            {checkInInstructionsText}
          </h2>
          <section className="flex justify-end gap-7 items-center">
            <button onClick={onClose}>
              <Close />
            </button>
          </section>
        </header>
        <section className="overflow-y-scroll">
          <section className="mt-6">
            <InstructionsSection
              checkInTime={checkInTime ? checkInTime : ''}
              checkOutTime={checkOutTime ? checkOutTime : ''}
              checkInInstructions={checkInInstructions}
              // specialInstructions={specialInstructions}
              fees={fees}
              policies={policies}
            />
          </section>
        </section>
      </FullScreenModal>
    </section>
  );
};

export default InstructionsModal;
