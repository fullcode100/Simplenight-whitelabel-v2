export const travelersFormSchema = {
  type: 'object',
  required: ['firstName', 'lastName', 'country', 'phone', 'email'],
  properties: {
    firstName: {
      type: 'string',
      title: 'First name',
      default: '',
    },
    lastName: {
      type: 'string',
      title: 'Last name',
      default: '',
    },
    country: {
      type: 'string',
      title: 'Country',
      default: '',
    },
    phone: {
      type: 'string',
      title: 'Phone',
      default: '',
    },
    email: {
      type: 'string',
      title: 'Email',
      default: '',
    },
    primaryContact: {
      type: 'boolean',
      title: 'Create account from primary contact',
      description:
        'Primary Contact is the lead customer for this reservation. This name needs to match the name of the reservation and the voucher for the vendor of the reservation.',
      default: false,
    },
  },
};

export const travelersFormUiSchema = {
  firstName: {
    'ui:placeholder': 'First name',
  },
  country: {
    'ui:widget': 'CountryWidget',
  },
  phone: {
    'ui:widget': 'PhoneWidget',
    'ui:placeholder': 'Phone Number',
  },
};
