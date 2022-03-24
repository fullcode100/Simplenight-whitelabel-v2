export const findOrFirst = <T extends unknown>(
  array: T[],
  predicate: (item: any) => boolean,
): T => {
  const found = array.find(predicate);
  return found || array[0];
};
