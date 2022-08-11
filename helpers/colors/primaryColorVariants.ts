/* eslint-disable indent */
export interface ColorWithStates {
  normal: string;
  hover: string;
  active: string;
  disabled: string;
  selectedText?: string;
}

const getOutlinedVariant = (): ColorWithStates => ({
  normal: 'bg-transparent text-dark-1000 border border-dark-1000',
  hover: 'hover:bg-primary-200',
  active: 'focus:bg-primary-300',
  disabled: 'bg-transparent border-dark-300 border text-dark-700',
});

const getDropdownVariant = (): ColorWithStates => ({
  normal: 'bg-transparent text-dark-1000',
  hover: 'hover:bg-dark-100 hover:text-dark-1000',
  active: 'bg-primary-100 text-primary-1000',
  disabled: 'bg-dark-200 text-dark-600 hover:text-dark-600',
  selectedText: 'text-primary-1000',
});

export const getPrimaryVariants = (variant?: string): ColorWithStates => {
  if (variant === 'outlined') return getOutlinedVariant();

  if (variant === 'dropdown') return getDropdownVariant();

  return {
    normal: 'bg-primary-1000 text-white',
    hover: 'hover:bg-primary-800',
    active: 'active:bg-primary-700',
    disabled: 'bg-dark-300 text-dark-700',
  };
};
