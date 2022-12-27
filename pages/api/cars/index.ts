// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
// import { CarCategory } from 'cars';
import { Car, CarVendor, CarInfo } from 'cars/types/response/SearchResponse';
import axios from 'axios';
import moment from 'moment';

type Data = {
  cars: Car[];
};

type Vendor = {
  Vendor: CarVendor;
  VehAvails: Car[];
  Info: CarInfo;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const currency = req.query?.currency
    ? (req.query?.currency as string)
    : 'USD';
  // const lang = req.query?.lang ? req.query?.lang as string : 'EN';
  const geolocation = req.query?.geolocation as string;
  const geolocation2 = req.query?.geolocation as string;

  try {
    /*
    const postData = {
      product_types: ['car_rental'],
      car_rental_search: {
        age: 30,
        locations: {
          pickup_location: {
            date: `${req.query?.start_date}T${moment(
              req.query?.start_time,
              'hh:mm A',
            ).format('HH:mm:ss')}`,
            latitude: parseFloat(geolocation.split(',')[0]),
            longitude: parseFloat(geolocation.split(',')[1]),
          },
          return_location: {
            date: `${req.query?.end_date}T${moment(
              req.query?.end_time,
              'hh:mm A',
            ).format('HH:mm:ss')}`,
            latitude: parseFloat(geolocation2.split(',')[0]),
            longitude: parseFloat(geolocation2.split(',')[1]),
          },
        },
      },
    };

    const url = 'https://dev-api.simplenight.com/api/v1/multi/search'; // SN API v1
    const { data } = await axios.post(
      url,
      postData,
      {
        headers: {
          Accept: 'application/json',
          'X-API-KEY': '4I8FoZk7.Vtj5lDdPzv1vharxEzwp5gooD6nl1TXo',
        },
      },
    );
    */

    const getData = {
      pickUpDateTime: `${req.query?.start_date}T${moment(
        req.query?.start_time,
        'hh:mm A',
      ).format('HH:mm:ss')}`,
      returnDateTime: `${req.query?.end_date}T${moment(
        req.query?.end_time,
        'hh:mm A',
      ).format('HH:mm:ss')}`,
      pickUp_context: 'GEO',
      pickUp_location: geolocation,
      return_context: 'GEO',
      return_location: geolocation2,
      inventory_ids: ' ',
      rsp_fields_set: 'extended',
      currency: currency,
      // lang: lang,
    };

    const url = `https://dev-api.simplenight.com/v2/categories/car-rental/items/details?${new URLSearchParams(
      getData,
    )}`; // SN API v2

    const { data } = await axios.get(url, {
      headers: {
        'X-API-KEY': '4I8FoZk7.Vtj5lDdPzv1vharxEzwp5gooD6nl1TXo',
      },
    });

    if (
      data &&
      data.data &&
      data.data.items &&
      data.data.items[0] &&
      data.data.items[0].VehAvailRSCore &&
      data.data.items[0].VehAvailRSCore.VehVendorAvails &&
      data.data.items[0].VehAvailRSCore.VehVendorAvails.length
    ) {
      const cars: Car[] = [];
      data.data.items[0].VehAvailRSCore.VehVendorAvails.forEach(
        (itemVendor: Vendor, index: number) => {
          if (
            itemVendor.Vendor &&
            itemVendor.VehAvails &&
            itemVendor.VehAvails.length
          ) {
            itemVendor.VehAvails.forEach((itemCar: Car, index2: number) => {
              const car = itemCar;
              car.id = itemCar?.VehAvailCore?.Reference['@ID'];
              car.Vendor = itemVendor.Vendor;
              car.Info = itemVendor.Info;
              cars.push(car);
            });
          }
        },
      );
      res.status(200).json({ cars });
    } else res.status(400).json({ cars: [] });

    /*
    if (data?.car_rental_results) {
      const cars = data?.car_rental_results;
      cars.forEach((item: Car, index: number) => {
        cars[index].id = item.reference['@ID']
          ? item.reference['@ID']
          : `${index}`;
      });
      res.status(200).json({ cars });
    } else res.status(400).json({ cars: [] });
    */
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(400).json({ cars: [] });
    } else {
      res.status(400).json({ cars: [] });
    }
  }
}
