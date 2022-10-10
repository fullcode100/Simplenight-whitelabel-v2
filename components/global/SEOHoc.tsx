import React from 'react';
import Head from 'next/head';
import { useBrandConfig } from 'hooks/branding/useBrandConfig';

interface SEOHocProps {
  children?: any;
}

const SEOHoc = ({ children }: SEOHocProps) => {
  const { information } = useBrandConfig() || {};
  const { partnerName } = information || {};

  const favicon = '/favicon.ico';

  return (
    <>
      <Head>
        <title>{partnerName}</title>
        <meta name="description" content="NextJs whitelabel proof of concept" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favicon} />
      </Head>
      {children}
    </>
  );
};

export default SEOHoc;
