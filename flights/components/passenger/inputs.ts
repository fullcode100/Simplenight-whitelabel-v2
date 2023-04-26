export interface IPassenger {
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
  wheelChair: boolean;
  vaccinationRecords: boolean;
  knownTravelerNumber: boolean;
}

enum GenderEnum {
  female = 'female',
  male = 'male',
}
