import React from 'react';
import { obfuscateString } from 'helpers/stringUtils';
import { useApiEndpoint } from 'hooks/Api/useApiEndpoint';
import { useApiKey } from 'hooks/Api/useApiKey';
import Divider from 'components/global/Divider/Divider';
import Cell from '../Cell';

import styles from '../InfoSectionStyle.module.scss';

const VISIBLE_API_KEY_CHARS = 10;

const ApiInformation = () => {
  const apiEndpoint = useApiEndpoint('');
  const apiKey = useApiKey('');
  const obfuscatedApiKey = obfuscateString(
    apiKey,
    VISIBLE_API_KEY_CHARS,
    'Not set',
  );

  const ApiEndpoint = () => <Cell label="API endpoint" value={apiEndpoint} />;
  const ApiKey = () => <Cell label="API key" value={obfuscatedApiKey} />;

  return (
    <section className={styles.root}>
      <ApiEndpoint />
      <Divider />
      <ApiKey />
    </section>
  );
};

export default ApiInformation;
