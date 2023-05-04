import _ from 'lodash';
import { flatten } from 'flat';
import { Room } from 'hotels/helpers/room';

export const replaceStringWithChar = (string: string, char: string) => {
  const stringChars = string.split('');
  const transformedChars = stringChars.map(() => char);
  return transformedChars.join('');
};

export const obfuscateString = (
  string: string,
  amountOfCharsVisible: number,
  defaultValue = '',
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
};

export const camelToKebab = (key: string) =>
  key.replace(/([A-Z])/g, '-$1').toLowerCase();

export const camelKeysToKebabKeys = (obj: { [key: string]: string }) => {
  const newObject: { [key: string]: string } = {};

  Object.keys(obj).forEach((key: string) => {
    newObject[camelToKebab(key)] = obj[key];
  });

  return newObject;
};

export const flattenObjectOfObjects = (obj: { [key: string]: string }) => {
  const flattenedObj = {};
  Object.keys(obj).forEach((key) => {
    Object.assign(flattenedObj, obj[key]);
  });
  return flattenedObj;
};

export const flattenedObject = (obj: { [key: string]: any }, maxDepth = 1) =>
  flatten(obj, { maxDepth });

export const copy = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const fromUpperCaseToCapitilize = (text = '') => {
  const textArr = text?.split(' ');

  for (let i = 0; i < textArr.length; i++) {
    textArr[i] = textArr[i].charAt(0) + textArr[i].slice(1).toLowerCase();
  }

  return textArr?.join(' ');
};

export const fromLowerCaseToCapitilize = (text = '') => {
  const textArr = text?.split(' ');

  for (let i = 0; i < textArr.length; i++) {
    textArr[i] = textArr[i].charAt(0).toUpperCase() + textArr[i].slice(1);
  }

  return textArr?.join(' ');
};

export const getChildrenAges = (rooms: Room[]): string => {
  const childrenAges = rooms
    .map((room) => {
      return room.childrenAges;
    })
    .filter((arr) => arr.length > 0);

  return childrenAges.join(',');
};

export const haveKeyword = (str = '', keyword = '') => {
  return str.toLowerCase().indexOf(keyword.toLowerCase()) < 0;
};
