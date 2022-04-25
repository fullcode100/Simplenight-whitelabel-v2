import { ColorWithStates } from 'helpers/colors/primaryColorVariants';
import { ReactElement } from 'react';

export interface ButtonVariantProp {
  value: any;
  colors: ColorWithStates;
  sizeClassname: string;
  disabledLeft?: boolean;
  disabledRight?: boolean;
  className: string;
  leftIcon?: React.ReactNode;
  [key: string]: any;
}
