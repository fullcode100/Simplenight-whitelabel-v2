export const travelersFormSchema = {
  type: 'object',
  required: ['first_name', 'last_name', 'country', 'phone', 'email'],
  properties: {
    first_name: {
      type: 'string',
      title: 'First Name',
      default: '',
    },
    last_name: {
      type: 'string',
      title: 'Last Name',
      default: '',
    },
    country: {
      type: 'string',
      title: 'Country',
      default: '',
    },
    phone: {
      type: 'string',
      title: 'Phone Number',
      default: '',
    },
    email: {
      type: 'string',
      title: 'Email Address',
      default: '',
    },
    primary_contact: {
      type: 'boolean',
      title: 'Create Account From Order Name',
      description:
        'Order Name is the lead customer for this Order. This name needs to match the name of the reservation and the voucher for the vendor of the reservation.',
      default: false,
    },
  },
};

export const travelersFormUiSchema = {
  first_name: {
    'ui:placeholder': 'Name',
  },
  last_name: {
    'ui:placeholder': 'Name',
  },
  email: {
    'ui:placeholder': 'Email',
  },
  country: {
    'ui:widget': 'CountryWidget',
  },
  phone: {
    'ui:widget': 'PhoneWidget',
    'ui:placeholder': 'Phone Number',
  },
};
