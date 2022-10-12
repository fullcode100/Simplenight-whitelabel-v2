import axios from 'apiCalls/config/axiosHelperSettings';

const mockCategoriesSettings = [
  {
    icon: 'bed',
    searchFields: [
      {
        label: 'Location',
        value: 'location',
        options: {
          placeholder: 'xxxxxx',
        },
      },
      {
        label: 'Ocuppancy',
        value: 'ocuppancy',
        options: {
          placeholder: 'xxxxxxxx',
          fields: {
            children: true,
            adults: true,
            infants: false,
            childrenAges: true,
          },
        },
      },
    ],
    filteringAndSorting: [
      {
        key: 'paymentType',
        options: {
          filters: [
            {
              label: 'Free Cancelation',
              value: 'freeCancelation',
            },
          ],
        },
      },
    ],
    priority: 1,
    name: 'Hotels',
    alias: 'Hotels',
    whitelabelId: 'hotels',
  },
  {
    icon: 'backpack',
    searchFields: [
      {
        label: 'Location',
        value: 'location',
        options: {
          placeholder: 'xxxxxx',
        },
      },
      {
        label: 'Ocuppancy',
        value: 'ocuppancy',
        options: {
          placeholder: 'xxxxxxxx',
          fields: {
            children: true,
            adults: true,
            infants: false,
            childrenAges: true,
          },
        },
      },
    ],
    filteringAndSorting: [
      {
        key: 'paymentType',
        options: {
          filters: [
            {
              label: 'Free Cancelation',
              value: 'freeCancelation',
            },
          ],
        },
      },
    ],
    priority: 1,
    name: 'Things To Do',
    alias: 'Things To Do',
    whitelabelId: 'things-to-do',
  },
];

export const getSettings = () =>
  axios
    .get('/settings')
    .then((response) => {
      const settings = response.data.data;
      settings.categories = mockCategoriesSettings;
      return settings;
    })
    .catch((e) => console.error(e));
