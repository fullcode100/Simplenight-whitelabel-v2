import axios from 'apiCalls/config/axiosHelperSettings';

export const getSettings = () =>
  axios
    .get('/settings')
    .then((response) => {
      const settings = response.data.data;
      settings.features = {};
      return settings;
    })
    .catch((e) => console.error(e));
