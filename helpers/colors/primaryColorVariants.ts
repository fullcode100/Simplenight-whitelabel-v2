export interface ColorWithStates {
  normal: string;
  hover: string;
  active: string;
  disabled: string;
}

const getOutlinedVariant = (): ColorWithStates => ({
  normal: 'bg-transparent text-primary-1000 border-2 border-primary-1000',
  hover: 'hover:bg-primary-200',
  active: 'active:bg-primary-300',
  disabled: 'bg-transparent border-dark-300 border-2 text-dark-700',
});

export const getPrimaryVariants = (variant?: string): ColorWithStates => {
  if (variant === 'outlined') return getOutlinedVariant();

  return {
    normal: 'bg-primary-1000 text-white',
    hover: 'hover:bg-primary-800',
    active: 'active:bg-primary-700',
    disabled: 'bg-dark-300 text-dark-700',
  };
};
