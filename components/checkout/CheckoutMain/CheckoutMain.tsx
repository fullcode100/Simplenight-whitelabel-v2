import React from 'react';

type MainProps = {
  children: React.ReactNode;
};

const CheckoutMain = ({ children }: MainProps) => {
  const styles = 'px-5 py-6';

  return <section className={styles}>{children}</section>;
};

export default CheckoutMain;
