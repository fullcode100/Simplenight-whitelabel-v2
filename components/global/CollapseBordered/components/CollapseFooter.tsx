import { ReactNode } from 'react';

interface CollapseFooterProps {
  footer: ReactNode;
  show: boolean;
}
const CollapseFooter = ({ footer, show }: CollapseFooterProps) => {
  return <section className=" py-4 px-5">{footer}</section>;
};

export default CollapseFooter;
