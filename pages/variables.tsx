import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCredentials } from 'apiCalls/settings';

const NonProdOnlyPage = () => {
  interface EnvVar {
    Data: { [key: string]: null | string };
  }

  const [envVars, setEnvVars] = useState<EnvVar>();
  const router = useRouter();
  const env = process.env.NODE_ENV;
  const baseUrlPattern = /([https]+)(:\/\/)([a-z0-9.:-]+)+(\/)/;

  const getUrlAndCredentials = async () => {
    const originRefefer = window.location.href.match(baseUrlPattern)?.[0];
    try {
      const data = await getCredentials(originRefefer);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getBackendInfo = async () => {
    const data = await getUrlAndCredentials();
    try {
      const res = await axios.get(`${data.api_url}/settings`, {
        headers: {
          Accept: 'application/json',
          'X-API-KEY': data.token,
        },
      });
      setEnvVars(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (env === 'production') {
      router.replace('/');
    }
  }, []);

  useEffect(() => {
    getBackendInfo();
  }, []);

  const EnvVars = () => {
    const formattedData = Object.entries(envVars?.Data ?? {}).map(
      ([key, value]) => (
        <p key={key}>
          <strong>{key}</strong>: {value}
        </p>
      ),
    );

    return <div>{formattedData}</div>;
  };

  return (
    <div>
      <h3 className="pt-20 lg:pt-8">ENV VARS</h3>
      {envVars && <EnvVars />}
    </div>
  );
};

export default NonProdOnlyPage;
