import Divider from 'components/global/Divider/Divider';
import {
  FeesInstructions,
  Instruction,
} from 'hotels/types/response/SearchResponse';
import { useTranslation } from 'react-i18next';
import CheckInTime from '../CheckInTime/CheckInTime';
import CheckOutTime from '../CheckOutTime/CheckoutTime';
import InstructionList from './InstructionList';

interface InstructionsProps {
  checkInTime: string;
  checkOutTime: string;
  checkInInstructions?: Instruction[];
  specialInstructions?: Instruction[];
  policies?: Instruction[];
  fees?: FeesInstructions;
}

const PoliciesSection = ({
  checkInTime,
  checkOutTime,
  checkInInstructions,
  specialInstructions,
  fees,
  policies,
}: InstructionsProps) => {
  const [t] = useTranslation('hotels');
  const policiesText = t('policies', 'Policies');
  const feesText = t('fees', 'Fees');
  const optionalText = t('optional', 'Optional');
  const mandatoryText = t('mandatory', 'Mandatory');
  const hasPolicies = policies && policies?.length > 0;
  const hasMandatory = fees?.mandatory && fees?.mandatory?.length > 0;
  const hasOptional = fees?.optional && fees.optional.length > 0;
  const hasFees = hasMandatory || hasOptional;
  const hasCheckInInstructions =
    checkInInstructions && checkInInstructions?.length > 0;
  const hasSpecialInstructions =
    specialInstructions && specialInstructions?.length > 0;
  return (
    <section className="px-5 pb-3 space-y-5">
      <section className="flex flex-col lg:flex-row w-full pt-8">
        <section className="w-full lg:w-[50%]">
          <section className="pb-3 lg:pb-5">
            <CheckInTime time={checkInTime} />
          </section>
          {hasCheckInInstructions && (
            <InstructionList instructions={checkInInstructions} />
          )}
          {hasSpecialInstructions && (
            <InstructionList instructions={specialInstructions} />
          )}
        </section>
        <Divider className="py-3 block lg:hidden " />
        <section className="w-full lg:w-[50%] pt-3 lg:pt-0">
          <CheckOutTime time={checkOutTime} />
        </section>
      </section>
      <Divider className="py-2" />
      <section>
        {hasPolicies && (
          <section>
            <section className="mb-2">
              <h5 className="font-semibold text-dark-800">{policiesText}</h5>
            </section>
            <InstructionList instructions={policies} />
          </section>
        )}
      </section>
      {hasPolicies && hasFees && <Divider className="py-2" />}
      {hasFees && (
        <section>
          <section className="mb-2">
            <h5 className="font-semibold text-dark-800">{feesText}</h5>
          </section>
          {hasOptional && (
            <section className="mt-2">
              <h6 className="font-semibold text-dark-800">{optionalText}</h6>
              <InstructionList instructions={fees.optional as Instruction[]} />
            </section>
          )}
          {hasMandatory && (
            <section className="mt-2">
              <h6 className="font-semibold text-dark-800">{mandatoryText}</h6>
              <InstructionList instructions={fees.mandatory as Instruction[]} />
            </section>
          )}
        </section>
      )}
    </section>
  );
};

export default PoliciesSection;
