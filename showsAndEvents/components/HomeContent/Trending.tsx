import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import CardShow from './components/CardShow';
import { useTranslation } from 'react-i18next';
import CustomCarousel from './components/CustomCarousel';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { ShowsSearchRequest } from 'showsAndEvents/types/request/ShowsSearchRequest';
import { formatAsSearchDate } from 'helpers/dajjsUtils';
import { ShowsSearchResponse } from 'showsAndEvents/types/response/ShowsSearchResponse';
import { useCategorySlug } from 'hooks/category/useCategory';
import CardShowSkeleton from './components/CardShowSkeleton';
import { ShowsSearchResponse as iShowAndEventsResult } from '../../types/response/ShowsSearchResponse';

interface TrendingCarouselProps {
  Category: CategoryOption;
}

// TODO: Temporal randon id image
const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const TrendingCarousel = ({ Category }: TrendingCarouselProps) => {
  const [t, i18next] = useTranslation('events');
  const title = t('trendingArtists', 'Trending Artists');
  const { ClientSearcher: Searcher } = Category.core;

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const apiUrl = useCategorySlug('shows-events')?.apiUrl ?? '';

  useEffect(() => {
    const params: ShowsSearchRequest = {
      start_date: formatAsSearchDate(dayjs()),
      end_date: formatAsSearchDate(dayjs().add(30, 'day')),
      dst_geolocation: '0,0',
      rsp_fields_set: 'basic',
      is_trending_req: true,
      apiUrl,
    };
    Searcher?.request?.(params, i18next)
      .then((data) => {
        setItems(data.items);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="flex flex-col gap-4 lg:mx-auto max-w-xs lg:max-w-7xl lg:gap-4 lg:flex-col w-full">
      <h5 className="text-dark-800">{title}</h5>
      <section className={'flex flex-col'}>
        <CustomCarousel>
          {loading
            ? [...Array(4)].map((i, e) => <CardShowSkeleton key={e} />)
            : items.map((item: ShowsSearchResponse, index) => {
                const urlDetail = ({
                  id,
                  extra_data: { starts_at: startsAt },
                }: iShowAndEventsResult) => {
                  return `/detail/shows-events/${id}?fromDate=${startsAt}`;
                };
                const url = urlDetail(item);
                const {
                  id,
                  name,
                  address,
                  rate: {
                    total: {
                      net: { currency, formatted },
                    },
                  },
                  thumbnail,
                } = item;
                const {
                  address1,
                  city,
                  state,
                  country_code: countryCode,
                } = address ?? {};
                return (
                  <CardShow
                    key={id}
                    imageSrc={thumbnail}
                    name={name}
                    url={url}
                    price={`${formatted}`}
                  />
                );
              })}
        </CustomCarousel>
      </section>
    </section>
  );
};

export default TrendingCarousel;
