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

const getOutlinedVariants = () => ({
  normal: 'bg-primary-200 text-primary-1000 group-hover:text-white',
  hover: 'hover:bg-primary-800',
  active: 'active:bg-primary-300',
  disabled: 'bg-transparent border-dark-300 border-2 text-dark-700',
});

export const useColor = (color: string, variant?: string): ColorWithStates => {
  if (color === 'primary') return getPrimaryVariants(variant);
  if (color === 'secondary') return getSecondaryVariants();
  if (color === 'outlined') return getOutlinedVariants();
  return getPrimaryVariants(variant);
};
