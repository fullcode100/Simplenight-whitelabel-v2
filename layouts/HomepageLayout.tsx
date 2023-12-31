import React from 'react';
import Header from 'layouts/header/Header';
import Footer from './footer/Footer';

const HomepageLayout = ({ children }: any) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <section>
        <Header color="bg-dark-100" />
        {children}
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default HomepageLayout;
