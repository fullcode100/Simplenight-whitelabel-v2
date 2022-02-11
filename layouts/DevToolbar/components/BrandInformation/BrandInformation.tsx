import Divider from 'components/global/Divider/Divider';
import { useBrandConfig } from 'hooks/branding/useBrandConfig';
import React from 'react';

import styles from '../InfoSectionStyle.module.scss';

const BrandInformation = () => {
  const { partnerName, brandCode } = useBrandConfig();

  return (
    <section className={styles.root}>
      <span className={styles.label}>Partner: </span>
      <span>{partnerName}</span>
      <Divider />
      <span className={styles.label}>Brand code:</span>
      <span>{brandCode}</span>
    </section>
  );
};

export default BrandInformation;
