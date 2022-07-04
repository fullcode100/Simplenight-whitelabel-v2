import React from 'react';

type MainProps = {
  children: React.ReactNode;
};

const CheckoutMain = ({ children }: MainProps) => {
  return <section>{children}</section>;
};

export default CheckoutMain;
