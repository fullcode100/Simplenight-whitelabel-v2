export const generateRandomString = () =>
  `${Math.random().toString(36).slice(-8)}.A123`;

const TEMPORAL_CREDENTIALS = 'temporalCredentials';
interface TemporalCredentials {
  email: string;
  password: string;
}
export const setTemporalCredentials = (credentials: TemporalCredentials) => {
  localStorage.setItem(TEMPORAL_CREDENTIALS, JSON.stringify(credentials));
};
export const getTemporalCredentials = (): TemporalCredentials | null => {
  const value = localStorage.getItem(TEMPORAL_CREDENTIALS);
  if (value) {
    return JSON.parse(value) as TemporalCredentials;
  }
  return null;
};
export const cleanTemporalCredentials = () => {
  localStorage.removeItem(TEMPORAL_CREDENTIALS);
};
