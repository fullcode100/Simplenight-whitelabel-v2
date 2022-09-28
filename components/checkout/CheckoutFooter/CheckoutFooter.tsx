import React from 'react';

type FooterProps = {
  type: 'client' | 'payment';
  children: React.ReactNode;
  className?: string;
};

const CheckoutFooter = ({ children, type, className }: FooterProps) => {
  const styles = `flex flex-col lg:flex-row justify-between items-center gap-4 border-t border-dark-300 ${className} ${
    type === 'client' ? 'pt-3 pb-6 ' : 'p-6'
  }`;

  return (
    <section className={`${styles} lg:flex-row lg:pt-5`}>{children}</section>
  );
};

export default CheckoutFooter;
