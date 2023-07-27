import { ColorWithStates } from 'helpers/colors/primaryColorVariants';

export interface ButtonVariantProp {
  value: any;
  colors: ColorWithStates;
  sizeClassname: string;
  disabledLeft?: boolean;
  disabledRight?: boolean;
  className: string;
  leftIcon?: React.ReactNode;
  [key: string]: any;
  handleType?: 'submit' | 'button';
}
