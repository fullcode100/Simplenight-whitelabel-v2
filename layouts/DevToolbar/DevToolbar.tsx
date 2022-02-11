import React from 'react';
import Divider from 'components/global/Divider/Divider';
import BrandInformation from './components/BrandInformation/BrandInformation';

import styles from './DevToolbar.module.scss';
import ApiInformation from './components/ApiInformation/ApiInformation';
import GitInformation from './components/GitInformation/GitInformation';
import BrandingControl from './components/BrandingControl/BrandingControl';

const DevToolbar = () => {
  const Row = ({ children }: { children?: any }) => (
    <section className={styles.row}>{children}</section>
  );

  return (
    <header className={styles.root}>
      <Row>
        <BrandInformation />
        <Divider />
        <ApiInformation />
      </Row>
      <Row>
        <GitInformation />
        <Divider />
        <BrandingControl />
      </Row>
    </header>
  );
};

export default DevToolbar;
