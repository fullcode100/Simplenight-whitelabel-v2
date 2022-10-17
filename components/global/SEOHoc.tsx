import React from 'react';
import Head from 'next/head';
import { useBrandConfig } from 'hooks/branding/useBrandConfig';

interface SEOHocProps {
  children?: any;
}

const SEOHoc = ({ children }: SEOHocProps) => {
  const {
    information,
    images: { favicon },
  } = useBrandConfig() || {};
  const { partnerName } = information || {};

  const defaultFavicon =
    'https://storage.googleapis.com/simplenight-customers-images/production/images/files/phpq0lQBJ.png';

  return (
    <>
      <Head>
        <title>{partnerName}</title>
        <meta name="description" content="NextJs whitelabel proof of concept" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favicon || defaultFavicon} />
      </Head>
      {children}
    </>
  );
};

export default SEOHoc;
