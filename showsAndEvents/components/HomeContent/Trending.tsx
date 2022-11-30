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
import useQuery from 'hooks/pageInteraction/useQuery';

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

  const [loaded, setLoaded] = useState(true);
  const [trendingItems, setTrendingItems] = useState([]);

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
        setTrendingItems(data.items);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <section className="flex flex-col gap-4 mx-auto max-w-7xl lg:gap-4 lg:flex-col">
      <h5 className="text-dark-800">{title}</h5>
      <section className="flex flex-col">
        <CustomCarousel>
          {trendingItems.map((item: ShowsSearchResponse, index) => (
            <CardShow
              key={item.id}
              imageSrc={
                index > 2
                  ? `/images/mocks/trending/t${getRandomInt(3)}.png`
                  : `/images/mocks/trending/t${index}.png`
              }
              name={item.name}
              price={`${item.rate.total.net.currency} ${item.rate.total.net.formatted}`}
            />
          ))}
        </CustomCarousel>
      </section>
    </section>
  );
};

export default TrendingCarousel;
