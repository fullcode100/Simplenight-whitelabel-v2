import axios from 'axios';

export default (() => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ADMIN_ENDPOINT_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
    },
  });

  return instance;
})();
