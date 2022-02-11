import { useEffect, useState } from 'react';

export const useApiKey = (defaultValue: string) => {
  const [apiKey, setApiKey] = useState(defaultValue ?? '');

  useEffect(() => {
    (async () => {
      const getApiKey = (await import('apiCalls/config/axiosHelper'))
        .getApiKey;

      const endpoint = getApiKey();
      setApiKey(endpoint);
    })();
  }, []);

  return apiKey;
};
