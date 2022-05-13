import { ColorWithStates } from 'helpers/colors/primaryColorVariants';

type DropdownItemProps = {
  // General Data
  value: string;
  href?: string | undefined;
  colors?: ColorWithStates;
  selected?: boolean;
  disabled?: boolean;
  // Icons
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  // Checkboxes
  checkboxValue?: boolean;
  checkboxName?: string;
  checkboxMethod?: any;
};

export default DropdownItemProps;
