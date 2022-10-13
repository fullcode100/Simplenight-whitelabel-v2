import axios from 'apiCalls/config/axiosHelperSettings';

const mockCategoriesSettings = [
  {
    icon: 'parking-square',
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
    alias: 'B&B',
    whitelabelId: 'hotels',
  },
  {
    icon: 'car-sideview',
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
    alias: 'fdasfa',
    whitelabelId: 'hotelsa',
  },
  {
    icon: 'plane-fly',
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
    whitelabelId: 'entertainment',
  },
];

export const getSettings = () =>
  axios
    .get('/settings')
    .then((response) => {
      const settings = response.data.data;
      return settings;
    })
    .catch((e) => console.error(e));
