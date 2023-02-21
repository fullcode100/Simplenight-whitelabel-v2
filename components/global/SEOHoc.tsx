import React from 'react';
import Head from 'next/head';
import { useSettings } from 'hooks/services/useSettings';

interface SEOHocProps {
  children?: any;
}

const SEOHoc = ({ children }: SEOHocProps) => {
  const { data: brandConfig } = useSettings();
  const { information, images } = brandConfig;
  const { favicon } = images || {};
  const { partnerName } = information || {};

  const defaultFavicon =
    'https://storage.googleapis.com/simplenight-customers-images/production/images/files/phpq0lQBJ.png';

  return (
    <>
      <Head>
        <title>{partnerName}</title>
        <meta
          name="description"
          content="SIMPLENIGHT® is a Global Experience Platform™ providing cloud-based distribution, inventory management, merchandising, and technology solutions for the travel industry. SIMPLENIGHT®’s business-to-business (“B2B”) travel marketplace offers a unique distribution and merchandising solution that connects the global community of inventory suppliers with travel sellers."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favicon || defaultFavicon} />
      </Head>
      {children}
    </>
  );
};

export default SEOHoc;
