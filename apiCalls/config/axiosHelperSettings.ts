import axios from 'axios';
import curlirize from 'axios-curlirize';

export default (() => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ADMIN_ENDPOINT_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
    },
  });

  curlirize(instance, (result: any, err: any) => {
    const curl = result.command;
    if (err) {
      console.error(`Failed request curl: ${curl}`);
    } else {
      console.log(`Successful request curl: ${curl}`);
    }
  });

  return instance;
})();
