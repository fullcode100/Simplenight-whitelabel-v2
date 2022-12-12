import { AnchorHTMLAttributes, FC } from 'react';

export const StyledLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = (
  props,
) => {
  return (
    <a
      {...props}
      className="text-base font-semibold underline text-primary-1000 hover:text-primary-600"
    />
  );
};
