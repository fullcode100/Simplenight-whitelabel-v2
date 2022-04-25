import { ColorWithStates } from 'helpers/colors/primaryColorVariants';
import { ReactElement } from 'react';

export interface ButtonVariantProp {
  value: any;
  colors: ColorWithStates;
  sizeClassname: string;
  disabled: boolean;
  className: string;
  icon?: ReactElement;
  [key: string]: any;
}
