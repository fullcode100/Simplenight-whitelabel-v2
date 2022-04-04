export const deepMerge = (target: any, source: any) => {
  const isObject = (item: any) => item && typeof item === 'object';

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key: string) => {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    });
  }

  return target;
};

export const deepCopy = (obj: any) => {
  if (obj === null || typeof obj !== 'object') return obj;

  const copy = obj.constructor();

  for (const attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = deepCopy(obj[attr]);
  }

  return copy;
};
