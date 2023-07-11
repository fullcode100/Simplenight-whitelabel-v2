import { AirportsMsResponse } from 'flights/types/response/AirportMSResponse';
import { AirportResponse } from 'flights/types/response/AirportResponse';

export const airportsAdapter = (res: AirportsMsResponse): AirportResponse => {
  return {
    data: res.data.map((item) => {
      return {
        id: item.id,
        type: item.type,
        subType: item.sub_type,
        name: item.name,
        detailedName: item.detailed_name,
        timeZoneOffset: item.time_zone_offset,
        iataCode: item.iata_code,
        geoCode: {
          latitude: +item.latitude,
          longitude: +item.longitude,
        },
        address: {
          cityName: item.city_name,
          cityCode: item.city_code,
          countryName: item.country_name,
          countryCode: item.country_code,
          stateCode: item.state_code,
          regionCode: item.region_code,
        },
      };
    }),
  };
};
