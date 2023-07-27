export const generateRandomString = () =>
  `${Math.random().toString(36).slice(-8)}.A123`;
export const NEW_EMAIL_VALIDATION_DATE = 'newEmailValidationLinkDate';
const getNewEmailValidationDateKey = (email: string) =>
  `${NEW_EMAIL_VALIDATION_DATE}_${email}`;
export const getNewEmailValidationLinkDate = (email: string) => {
  const value = localStorage.getItem(getNewEmailValidationDateKey(email));
  if (value) {
    return new Date(JSON.parse(value));
  }
  return null;
};

export const setNewEmailValidationLinkDate = (email: string, date: Date) => {
  localStorage.setItem(
    getNewEmailValidationDateKey(email),
    JSON.stringify(date),
  );
};

export const cleanNewEmailValidationLinkDate = () => {
  localStorage.removeItem(NEW_EMAIL_VALIDATION_DATE);
};
