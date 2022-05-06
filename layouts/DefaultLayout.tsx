import React, { Fragment } from 'react';
import Header from 'layouts/header/Header';
import Footer from './footer/Footer';

const DefaultLayout = ({ children }: any) => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <>
        <Header />
        <div className="h-1 w-full" />
        {children}
      </>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
