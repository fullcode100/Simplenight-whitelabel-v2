import Divider from 'components/global/Divider/Divider';
import React from 'react';
import Cell from '../Cell';

import styles from '../InfoSectionStyle.module.scss';

const LAST_COMMIT_HASH = process.env.NEXT_PUBLIC_LAST_COMMIT_HASH;
const LAST_COMMIT_DATE = process.env.NEXT_PUBLIC_LAST_COMMIT_DATE;

const GitInformation = () => {
  const LastCommitHashSection = () => (
    <Cell label="Last Commit Hash:" value={LAST_COMMIT_HASH ?? ''} />
  );

  const LastCommitDateSection = () => (
    <Cell label="Last Commit Date:" value={LAST_COMMIT_DATE ?? ''} />
  );

  return (
    <section className={styles.root}>
      <LastCommitHashSection />
      <Divider />
      <LastCommitDateSection />
    </section>
  );
};

export default GitInformation;
