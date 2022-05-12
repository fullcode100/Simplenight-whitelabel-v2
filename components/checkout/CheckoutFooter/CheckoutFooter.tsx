import React from 'react';

type FooterProps = {
  type: 'client' | 'payment';
  children: React.ReactNode;
};

const CheckoutFooter = ({ children, type }: FooterProps) => {
  const styles = `flex flex-col gap-4 px-5 ${
    type === 'client'
      ? 'pt-3 pb-6 '
      : 'py-6 bg-dark-100 border-t border-dark-300'
  }`;

  return <section className={styles}>{children}</section>;
};

export default CheckoutFooter;
