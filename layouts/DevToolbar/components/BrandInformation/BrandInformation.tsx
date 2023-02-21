import Divider from 'components/global/Divider/Divider';
import { useSettings } from 'hooks/services/useSettings';
import React from 'react';

import styles from '../InfoSectionStyle.module.scss';

const BrandInformation = () => {
  const { data: brandConfig } = useSettings();
  const { partnerName, brandCode } = brandConfig;

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
