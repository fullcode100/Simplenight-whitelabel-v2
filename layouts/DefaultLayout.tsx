import React, { Fragment } from 'react';
import Header from 'layouts/header/Header';
import Footer from './footer/Footer';

const DefaultLayout = ({ children }: any) => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <section>
        <Header color="bg-dark-100" />
        <div className="mt-[68px]"></div>
        {children}
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default DefaultLayout;
