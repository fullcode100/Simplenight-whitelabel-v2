export const PICKUP_POINT_ID = 'PICKUP_POINT';
export const MEETING_POINT_ID = 'MEETING_POINT';
export const PICKUP_POINT_UNIT = 'LOCATION_REFERENCE';
export const FREETEXT_UNIT = 'FREETEXT';

export const questionsFormDataDestructuring = (data: any) => {
  let destructObject = {};
  Object.keys(data)?.forEach((key: string) => {
    if (data[key][key]) {
      destructObject = data[key];
      delete data[key];
    }
  });
  return { ...data, ...destructObject };
};
