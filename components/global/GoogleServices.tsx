import Script from 'next/script';
import React from 'react';

import { setIsMapsLoaded } from 'store/actions/core';
import { useDispatch } from 'react-redux';

// TODO: Use NEXT_PUBLIC_GOOGLE_MAP_KEY when added in the deployment
const MAPS_API_KEY = 'AIzaSyB_rHUVDeYtUuQ3fEuuBdmfgVnGuXUnVeU';

const GoogleServices = () => {
  const dispatch = useDispatch();
  const handleMapsLoaded = () => {
    dispatch(setIsMapsLoaded(true));
  };
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
      <Script
        onLoad={handleMapsLoaded}
        src={`https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places`}
        strategy="lazyOnload"
      />
    </>
  );
};

export default GoogleServices;
