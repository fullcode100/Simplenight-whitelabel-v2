import { InstructionItem } from 'hotels/types/response/SearchResponse';

export const hasInstructionsProps = (item: InstructionItem) => {
  const isCheckInInstructions =
    item?.check_in_instructions && item?.check_in_instructions?.length > 0;
  const specialInstructions =
    item?.special_instructions && item?.special_instructions?.length > 0;
  const policies = item?.policies && item?.policies?.length > 0;
  const feeMandatory =
    item?.fees?.mandatory && item?.fees?.mandatory.length > 0;
  const feeOptional = item?.fees?.optional && item?.fees?.optional.length > 0;
  const hasInstructions =
    isCheckInInstructions ||
    specialInstructions ||
    policies ||
    feeMandatory ||
    feeOptional ||
    false;
  return hasInstructions;
};
