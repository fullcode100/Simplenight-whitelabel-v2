const propertyTypes = {
  HOTELS: 'HOTELS',
  VACATION_RENTALS: 'VACATION_RENTALS',
};

export const propertyTypesAdapter = (value: string): string => {
  const types = [];

  if (!value)
    return `${propertyTypes.HOTELS},${propertyTypes.VACATION_RENTALS}`;

  if (value.includes('hotels')) types.push(propertyTypes.HOTELS);
  if (value.includes('vacationRentals'))
    types.push(propertyTypes.VACATION_RENTALS);
  return types.join(',');
};
