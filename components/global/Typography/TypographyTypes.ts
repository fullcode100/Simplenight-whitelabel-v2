type ColorName = 'primary' | 'dark' | 'green';

type ColorVariant =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '1000';

type ColorWithVariant = `${ColorName}-${ColorVariant}`;

type ColorWithoutVariant = 'white' | 'transparent';

export type TextColor = `text-${ColorWithVariant | ColorWithoutVariant}`;

export interface HeadingProps {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: string;
  className?: string;
  textColor?: TextColor;
}

export const headingClasses = {
  h1: 'text-[40px] leading-[46px] lg:text-[60px] lg:leading-[68px]',
  h2: 'text-[32px] leading-tight lg:text-[44px] lg:leading-[50px]',
  h3: 'text-[24px] leading-7 lg:text-[32px] lg:leading-[38px]',
  h4: 'text-lg leading-6 lg:text-[24px] lg:leading-[29px]',
  h5: 'text-[18px] leading-[22px] lg:text-lg lg:leading-6',
  h6: 'text-sm leading-5 lg:text-[18px] lg:leading-[22px]',
};

export interface ParagraphProps {
  fontWeight: 'normal' | 'medium' | 'semibold';
  size: 'large' | 'medium' | 'small' | 'xsmall';
  children: string;
  className?: string;
  textColor?: TextColor;
}

export const paragraphClasses = {
  large: 'text-lg leading-[28px]',
  medium: 'text-base leading-6',
  small: 'text-sm leading-[22px]',
  xsmall: 'text-[14px] leading-4',
};
