import React from 'react';
import Head from 'next/head';
import { useBrandConfig } from 'hooks/branding/useBrandConfig';

interface SEOHocProps {
  children?: any;
}

const SEOHoc = ({ children }: SEOHocProps) => {
  const { images, partnerName } = useBrandConfig();

  const favicon = images.favicon ?? '/favicon.ico';

  return (
    <>
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
