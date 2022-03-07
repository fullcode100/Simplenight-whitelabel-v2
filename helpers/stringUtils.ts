export const replaceStringWithChar = (string: string, char: string) => {
  const stringChars = string.split('');
  const transformedChars = stringChars.map(() => char);
  return transformedChars.join('');
};

export const obfuscateString = (
  string: string,
  amountOfCharsVisible: number,
  defaultValue: string = '',
) => {
  const firstChars = string.substring(0, amountOfCharsVisible);
  const lastChars = string.substring(amountOfCharsVisible - 1);
  const transformedLastChars = replaceStringWithChar(lastChars, '*');

  return string ? `${firstChars}${transformedLastChars}` : defaultValue;
};

export const getRGBFromHex = (hex: string): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return [r, g, b].join(', ');
};

export const getHexFromRGB = (rgb: string): string => {
  const rgbChars = rgb.split(', ');
  const r = rgbChars[0];
  const g = rgbChars[1];
  const b = rgbChars[2];

  return `#${r}${g}${b}`;
};

export const parseQueryNumber = (query: string | string[]): number => {
  const parsedQuery = parseInt(query as string, 10);
  return isNaN(parsedQuery) ? 0 : parsedQuery;
}
