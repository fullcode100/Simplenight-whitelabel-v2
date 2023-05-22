export type CarBookingResponseMs = {
  Errors: any[];
  Data: {
    Identification: number;
    Confirmation: string;
    CreatedDateTime: string;
    UpdatedDateTime: string;
    Status: string;
    Supplier: number;
    Customer: {
      Primary: {
        Prefix: string;
        GivenName: string;
        Surname: string;
        Phone: {
          AreaCode: string;
          PhoneNumber: string;
        };
        Email: string;
        Address: {
          AddressLine: string;
          CountryCode: string;
        };
        Cintizenship: string;
      };
    };
    Locations: {
      PickUp: {
        Identifiction: string;
        DateTime: string;
        Name: string;
      };
      Return: {
        Identifiction: string;
        DateTime: string;
        Name: string;
      };
    };
    Vehicle: {
      Identification: string;
      SecondaryIdentification: string;
      AirConditionInd: string;
      TransmissionType: string;
      FuelType: string;
      DriveType: string;
      PassengerQuantity: string;
      BaggageQuantity: string;
      DoorCount: string;
      Category: string;
      Size: string;
      Model: {
        Identification: string;
        Name: string;
      };
      PictureURL: string;
    };
    Charges: {
      Amount: string;
      Currency: string;
    };
    Vendor?: {
      Name: string;
      Identification: string;
      VendorPictureURL: string;
    };
    CancellationPolicy: string;
  };
};
