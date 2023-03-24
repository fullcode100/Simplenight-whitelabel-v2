const referralList = [
  {
    length: 2,
    value: 'wego',
  },
  {
    length: 3,
    value: 'google',
  },
  {
    length: 4,
    value: 'microsoft',
  },
];

export const getReferral = (params: string) => {
  const paramsArray = params?.split('|');

  return referralList.find((referral) => referral.length == paramsArray?.length)
    ?.value;
};
