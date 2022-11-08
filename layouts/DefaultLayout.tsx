import React from 'react';
import Header from 'layouts/header/Header';
import Footer from './footer/Footer';

const DefaultLayout = ({ children }: any) => {
  return (
    <div className="flex flex-col justify-between ">
      <section className="min-h-screen">
        <Header color="bg-dark-100" />
        <div className="mt-[60px] lg:mt-[125px]"></div>
        {children}
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default DefaultLayout;
