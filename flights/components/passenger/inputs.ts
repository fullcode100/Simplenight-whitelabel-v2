export interface IPassengerFormInput {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: Date;
  countryOfResidence: string;
  loyaltyProgram: string;
  loyaltyNumber: string;
  gender: GenderEnum;
  passportIdNumber: string;
  country: string;
  expiration: string;
}

enum GenderEnum {
  female = 'female',
  male = 'male',
  other = 'other',
}
