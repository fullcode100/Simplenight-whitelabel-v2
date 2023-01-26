export const widgets: any = {
  PICKUP_POINT: 'PickupPoint',
  NUMBER_AND_UNIT: 'NumberUnit',
  LANG_GUIDE: 'LanguageGuide',
};

export const defaultPickup = {
  allow_custom_location: true,
  options: ['PICKUP'],
  description: '',
  locations: [
    {
      location: {
        ref: '',
        provider: '',
        name: '',
      },
      pickup_type: 'OTHER',
    },
  ],
};
