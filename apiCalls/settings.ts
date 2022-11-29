import axios from 'apiCalls/config/axiosHelperSettings';

export const getSettings = async () => {
  try {
    const response = await axios.get('/settings');

    const settings = response.data.data;
    return settings;
  } catch (e) {
    console.error(e);
  }
};

export const getCredentials = async (referer?: string) => {
  axios.defaults.headers.common.Referer = referer ?? '';
  try {
    const response = await axios.get('/credentials');

    console.log('get credentials response', response);


    console.log(axios.defaults.headers);

    const credentials = response.data.data;
    return credentials;
  } catch (e) {
    console.error(e);
  }
};
