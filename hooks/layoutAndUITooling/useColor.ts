import {
  ColorWithStates,
  getPrimaryVariants,
} from 'helpers/colors/primaryColorVariants';

const getSecondaryVariants = () => ({
  normal: 'bg-secondary-500',
  hover: 'bg-secondary-600',
  active: 'bg-secondary-700',
  disabled: 'bg-secondary-300',
});

export const useColor = (color: string, variant?: string): ColorWithStates => {
  switch (color) {
    case 'primary':
      return getPrimaryVariants(variant);
    case 'secondary':
      return getSecondaryVariants();
    default:
      return getPrimaryVariants(variant);
  }
};
