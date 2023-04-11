export const hasCartMode = () => {
  if (process.env.NEXT_PUBLIC_PURCHASE_MODE === 'cart') return true;
  return false;
};
