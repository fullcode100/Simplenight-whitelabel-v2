// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const findOrFirst = <T extends unknown>(
  array: T[],
  predicate: (item: any) => boolean,
): T => {
  const found = array.find(predicate);
  return found || array[0];
};

export const checkIfAnyNull = (array: any[]): boolean =>
  array.some((item) => typeof item === 'undefined' || !item);

export const changeArraySize = (
  array: number[],
  newLength: number,
): number[] => {
  const oldArrayLength = array.length;

  if (oldArrayLength < newLength) {
    const newItems = Array(newLength - oldArrayLength).fill(0);
    return array.concat(newItems);
  }

  const itemsToDelete = oldArrayLength - newLength;
  array.splice(oldArrayLength - itemsToDelete, itemsToDelete);

  return array;
};
