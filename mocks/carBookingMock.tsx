/* eslint-disable quotes */
export const bookingMock = {
  Errors: [],
  Data: {
    Identification: 1,
    Confirmation: 'US830426150',
    CreatedDateTime: '2023-04-20T10:00:00Z',
    UpdatedDateTime: '2023-04-20T10:02:00Z',
    Status: 'CONFIRMED',
    Supplier: 14,
    Customer: {
      Primary: {
        Prefix: 'Mrs',
        GivenName: 'John',
        Surname: 'Doe',
        Phone: {
          AreaCode: '58',
          PhoneNumber: '555-123-4567',
        },
        Email: 'john.doe@example.com',
        Address: {
          AddressLine:
            '123 Elm St. Oklahoma City 73112 Oklahoma, United States of America',
          CountryCode: 'US',
        },
        Cintizenship: 'US',
      },
    },
    Locations: {
      PickUp: {
        Identifiction: '3802',
        DateTime: '2023-04-20T10:00:00Z',
        Name: 'New York: JFK International Airport',
      },
      Return: {
        Identifiction: '3716',
        DateTime: '2023-04-25T10:00:00Z',
        Name: 'Los Angeles - Airport (California)',
      },
    },
    Vehicle: {
      Identification: '50012',
      SecondaryIdentification: 'SFAR',
      AirConditionInd: 'true',
      TransmissionType: 'Automatic',
      FuelType: 'Unspecified',
      DriveType: 'Unspecified',
      PassengerQuantity: '5',
      BaggageQuantity: '4',
      DoorCount: '5',
      Category: '3',
      Size: '28',
      Model: {
        Identification: 'SFAR',
        Name: 'Dodge Journey or similar',
      },
      PictureURL:
        'https://ctimg-fleet.cartrawler.com/dodge/journey/primary.png',
    },
    Charges: {
      Amount: '1971.70',
      Currency: 'EUR',
    },
    CancellationPolicy: 'No fee for a cancellation.',
  },
};
