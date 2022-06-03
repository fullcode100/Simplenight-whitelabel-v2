import React from 'react';
import Header from 'layouts/header/Header';

const SearchLayout = ({ children }: any) => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <section>
        <Header color="bg-dark-100" />
        <div className="mt-[68px]"></div>
        {children}
      </section>
    </div>
  );
};

export default SearchLayout;
