export const findOrFirst = <T extends unknown>(
  array: T[],
  predicate: (item: any) => boolean,
): T => {
  const found = array.find(predicate);
  return found || array[0];
};

export const checkIfAnyNull = (array: any[]): boolean =>
  array.some((item) => typeof item === 'undefined' || !!item);
