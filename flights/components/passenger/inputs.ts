export interface IPassenger {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  countryOfResidence?: string;
  loyaltyProgram?: string;
  loyaltyNumber?: string;
  gender?: GenderEnum;
  passportIdNumber?: string;
  country?: string;
  expiration?: Date;
  wheelChair?: boolean;
  vaccinationRecords?: boolean;
  knownTravelerNumber?: boolean;
  passengerNumber: number;
}

enum GenderEnum {
  female = 'female',
  male = 'male',
}
