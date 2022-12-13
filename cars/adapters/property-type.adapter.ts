const propertyTypes = {
  CARS: 'CARS',
  VACATION_RENTALS: 'VACATION_RENTALS',
};

export const propertyTypesAdapter = (value: string): string => {
  const types = [];

  if (!value) return `${propertyTypes.CARS},${propertyTypes.VACATION_RENTALS}`;

  if (value.includes('cars')) types.push(propertyTypes.CARS);
  if (value.includes('vacationRentals'))
    types.push(propertyTypes.VACATION_RENTALS);
  return types.join(',');
};
