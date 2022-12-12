/* eslint-disable quotes */
const paragraphListMock = [
  {
    paragraph: "You'll be asked to pay the following charges at the property:",
    list: [
      'Breakage deposit: THB 150 per stay',
      'Christmas Eve (24 December) Gala Dinner per adult: THB 20',
      'Christmas Eve (24 December) Gala Dinner per child: THB 8 (up to 18 years old)',
      'Christmas Day (25 December) Gala Dinner per adult: THB 20',
      'Christmas Day (25 December) Gala Dinner per child: THB 8 (up to 18 years old)',
      "New Year's Eve (31 December) Gala Dinner per adult: THB 20",
      "New Year's Eve (31 December) Gala Dinner per child: THB 8 (up to 18 years old)",
      "New Year's Day (1 January) Gala Dinner per adult: THB 20",
      "New Year's Day (1 January) Gala Dinner per child: THB 8 (up to 18 years old)",
      '0.1 percent destination fee will be charged',
      'Cleaning fees vary based on unit and length of stay',
      'Administrative fee: THB 0.1',
      'Service fee: 0.2 percent',
    ],
  },
  {
    paragraph:
      'Deposit is payable by wire transfer and is due within 48 hours of booking the reservation.',
    list: ['Resort fee: THB 0.3 per accommodation, per stay'],
  },
  {
    paragraph: 'The resort fee includes:',
    list: ['Airport shuttle', 'Faxes', 'In-room safe', 'In-room coffee'],
  },
  {
    paragraph: 'We have included all charges provided to us by the property.',
    list: [],
  },
];
export const instructionsMock = {
  check_in_instructions: paragraphListMock,
  special_instructions: paragraphListMock,
  fees: {
    mandatory: paragraphListMock,
    optional: paragraphListMock,
  },
  policies: paragraphListMock,
};
