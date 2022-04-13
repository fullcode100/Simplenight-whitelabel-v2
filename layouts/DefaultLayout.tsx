import React from 'react';
import Header from 'layouts/header/Header';
import Footer from './footer/Footer';

const DefaultLayout = ({ children }: any) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default DefaultLayout;
