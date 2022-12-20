import { useEffect, useState } from 'react';

export const useApiEndpoint = (defaultValue: string) => {
  const [apiEndpoint, setApiEndpoint] = useState(defaultValue ?? '');

  useEffect(() => {
    (async () => {
      const selectApiUrl = (await import('apiCalls/config/axiosHelper'))
        .selectApiUrl;

      const endpoint = selectApiUrl();
      setApiEndpoint(endpoint);
    })();
  }, []);

  return apiEndpoint;
};
