import Carousel from 'react-multi-carousel';
import { useTranslation } from 'react-i18next';
import useQuery from 'hooks/pageInteraction/useQuery';
import { StringGeolocation } from 'types/search/Geolocation';
import { formatAsSearchDate } from 'helpers/dajjsUtils';
import CustomArrow from '../../../../components/global/CarouselNew/components/CustomArrow';
import HorizontalItemCard from '../HorizontalItemCard/HorizontalItemCard2';
import LocationMap from '../../../../components/global/LocationMap/LocationMap';
import { useState } from 'react';
import classnames from 'classnames';
import { MapViewProps } from './MapViewTypes';
import CarItemRateInfo from 'cars/components/search/CarItemRateInfo';
import { Car } from 'cars/types/response/SearchResponse';
import PriceDisplay from '../../PriceDisplay/PriceDisplay';
import CarCancellable from 'cars/components/search/CarCancellable';
import CarFeatures from 'cars/components/search/CarFeatures';
import { Item } from 'types/cart/CartType';

const MapView = ({ CarCategory, items, createUrl }: MapViewProps) => {
  const [t, i18next] = useTranslation('cars');
  const carLabel = t('car', 'Car');
  const fromLabel = t('from', 'From');

  const {
    startDate,
    endDate,
    startTime,
    endTime,
    latitude,
    longitude,
    latitude2,
    longitude2,
    currency,
  } = useQuery();

  const [activeItem, setActiveItem] = useState(0);
  const nextItem = activeItem + 1;
  const handleBeforeCarouselChange = (prev: number) => {
    setActiveItem(prev);
  };

  const currentItem = items?.[activeItem];
  const coordinates = {
    latitude: parseFloat(currentItem.remarks.split(',')[0]),
    longitude: parseFloat(currentItem.remarks.split(',')[1]),
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <section className="relative">
        <LocationMap
          center={{
            latitude: coordinates?.latitude
              ? coordinates?.latitude - 0.0013
              : 0,
            longitude: coordinates?.longitude ? coordinates?.longitude : 0,
          }}
          coords={[
            {
              latitude: coordinates?.latitude ? coordinates?.latitude : 0,
              longitude: coordinates?.longitude ? coordinates?.longitude : 0,
            },
          ]}
          zoom={17}
          height={575}
        />
        <section className="absolute w-full bottom-0">
          <Carousel
            partialVisible={false}
            responsive={responsive}
            draggable
            autoPlay={false}
            shouldResetAutoplay={false}
            beforeChange={handleBeforeCarouselChange}
            customLeftArrow={
              <CustomArrow
                className="z-10 absolute left-0 -translate-y-7"
                position="left"
              />
            }
            customRightArrow={
              <CustomArrow
                className="z-10 absolute right-0 -translate-y-7"
                position="right"
              />
            }
          >
            {items.map((car, index) => {
              const url = createUrl(car);
              const title = car.car_model;
              const companyName = car.company_short_name;
              const companyImage = car.company_picture.svg_url;
              const image = car.picture_url;
              const address = car.address_line;
              const isNext = index === nextItem;

              const cardClassName = classnames(
                'flex-0-0-auto transition-all duration-300',
                {
                  'ml-[-30px]': isNext,
                },
              );

              const geolocation = `${latitude},${longitude}`;
              const geolocation2 = `${latitude2},${longitude2}`;
              const cartItem: Item = {
                category: 'CAR-RENTAL',
                sector: 'other',
                booking_data: {
                  inventory_id: '7e6cfd32:7264P3',
                  search: {
                    start_date: formatAsSearchDate(
                      startDate as unknown as string,
                    ),
                    end_date: formatAsSearchDate(endDate as unknown as string),
                    start_time: startTime as unknown as string,
                    end_time: endTime as unknown as string,
                    geolocation: geolocation as unknown as StringGeolocation,
                    geolocation2: geolocation2 as unknown as StringGeolocation,
                    currency: currency as unknown as string,
                  },
                  car: car,
                  rate: {
                    total: {
                      prepaid: {
                        amount: parseFloat(car.rate.totalAmount as string),
                        currency: car.rate.currencyCode ?? 'USD',
                      },
                    },
                  },
                },
              };

              return (
                <section key={index + '-image'} className="w-full p-5">
                  <HorizontalItemCard
                    key={`car_${index}`}
                    title={title}
                    subtitle={
                      <img
                        src={companyImage}
                        alt={companyName}
                        style={{ maxWidth: '70px', maxHeight: '25px' }}
                      />
                    }
                    image={image}
                    price={<CarItemRateInfo item={car} />}
                    className=" flex-0-0-auto"
                    url={url}
                    priceDisplay={<PriceDisplay item={car} isSearch={true} />}
                    cancellable={<CarCancellable item={car} />}
                    features={<CarFeatures item={car} />}
                    address={address}
                  />
                </section>
              );
            })}
          </Carousel>
        </section>
      </section>
    </>
  );
};

export default MapView;
