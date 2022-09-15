import Script from 'next/script';
import React from 'react';

const GoogleTagManager = () => {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-711765415"
        async={true}
        strategy="lazyOnload"
      />
      <Script id="GTM-2938401" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-41864771-1');
          gtag('config', 'AW-711765415');
        `}
      </Script>
    </>
  );
};

export default GoogleTagManager;
