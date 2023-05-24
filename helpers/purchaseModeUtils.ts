import { envWL } from 'env';

export const hasCartMode = () => {
  if (envWL.NEXT_PUBLIC_PURCHASE_MODE === 'cart') return true;
  return false;
};
