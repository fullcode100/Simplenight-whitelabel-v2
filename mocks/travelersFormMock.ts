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
    pacificShore: {
      type: 'object',
      title: 'Pacific Shores Hotel',
      description: 'Deluxe King Room',
      properties: {
        usePrimaryContact: {
          type: 'boolean',
          title: 'Use primary contact',
          default: false,
        },
        aditionalRequests: {
          type: 'string',
          title: 'Additional requests',
          default: '',
        },
      },
    },
    waldorfAstoria: {
      type: 'object',
      title: 'Waldorf Astoria Chicago',
      description: 'Double Standard Room',
      properties: {
        usePrimaryContact: {
          type: 'boolean',
          title: 'Use primary contact',
          default: false,
        },
        aditionalRequests: {
          type: 'string',
          title: 'Additional requests',
          description:
            'Your Tickets will be delivered to you via email right after checkout.',
          default: '',
        },
      },
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
  pacificShore: {
    usePrimaryContact: {
      'ui:widget': 'ToggleWidget',
    },
    aditionalRequests: {
      'ui:widget': 'textarea',
      'ui:placeholder': 'Enter optional request...',
    },
  },
  waldorfAstoria: {
    usePrimaryContact: {
      'ui:widget': 'ToggleWidget',
    },
    aditionalRequests: {
      'ui:widget': 'textarea',
      'ui:placeholder': 'Enter optional request...',
    },
  },
};
