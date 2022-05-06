import React from 'react';
import Head from 'next/head';
import { useBrandConfig } from 'hooks/branding/useBrandConfig';
import Script from 'next/script';
import { setIsMapsLoaded, setIsPaymentLoaded } from 'store/actions/core';
import { useDispatch } from 'react-redux';
import { getIsMapLoaded } from 'store/selectors/core';

interface SEOHocProps {
  children?: any;
}

const SEOHoc = ({ children }: SEOHocProps) => {
  const { images, partnerName } = useBrandConfig();

  const favicon = images.favicon ?? '/favicon.ico';

  const dispatch = useDispatch();
  const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;

  const hasMapsApiKey = MAPS_API_KEY && MAPS_API_KEY !== '';
  const isMapsLoaded = getIsMapLoaded();

  const handleMapsLoaded = () => {
    dispatch(setIsMapsLoaded(true));
  };

  const handlePaymentLibraryLoad = () => {
    dispatch(setIsPaymentLoaded(true));
  };

  return (
    <>
      {hasMapsApiKey && (
        <Script
          onLoad={handleMapsLoaded}
          src={`https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places`}
        />
      )}
      <Script
        onLoad={handlePaymentLibraryLoad}
        src="https://sandbox.web.squarecdn.com/v1/square.js"
      />
      <Head>
        <title>{partnerName}</title>
        <meta name="description" content="NextJs whitelabel proof of concept" />
        <link rel="icon" href={favicon} />
      </Head>
      {children}
    </>
  );
};

export default SEOHoc;
