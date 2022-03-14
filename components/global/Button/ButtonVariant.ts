import { ColorWithStates } from "helpers/colors/primaryColorVariants";

export interface ButtonVariantProp {
  value: any;
  colors: ColorWithStates;
  sizeClassname: string;
  disabled: boolean;
  className: string;
  [key:string]: any;
}
