import React from 'react';
import Header from 'layouts/header/Header';

const DefaultLayout = ({ children }: any) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default DefaultLayout;
