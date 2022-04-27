import { ColorWithStates } from 'helpers/colors/primaryColorVariants';

export interface ButtonVariantProp {
  value: any;
  colors: ColorWithStates;
  sizeClassname: string;
  disabled: boolean;
  className: string;
  leftIcon?: React.ReactNode;
  [key: string]: any;
}
