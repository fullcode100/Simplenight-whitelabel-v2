import { useTranslation } from 'react-i18next';

import SeatsFilter from './Filters/SeatsFilter';
import PriceRangeFilter from './Filters/PriceRangeFilter';
import FilterContainer from './Filters/FilterContainer';

import DistanceFilter from './Filters/DistanceFilter';
import FilterCollapseTitle from './Filters/FilterCollapseTitle';
import Button from 'components/global/Button/Button';
import Close from 'public/icons/assets/close.svg';
import { useFilterShowsAndEvents } from 'showsAndEvents/hooks/useFilterShowsAndEvents';
import useQuery from 'hooks/pageInteraction/useQuery';
import FiltersIcon from 'public/icons/assets/filters.svg';
import {
  initialFilters,
  useSearchFilterStore,
} from 'hooks/showsAndEvents/useSearchFilterStore';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);

interface iShowAndEventsFilterFormDesktop {
  handleHideFilters: () => void;
  isMobile?: boolean;
  onClose: () => void;
  resultAmount: boolean;
}

const ShowAndEventsFilterFormDesktop = ({
  handleHideFilters,
  isMobile,
  onClose,
  resultAmount,
}: iShowAndEventsFilterFormDesktop) => {
  const { latitude, longitude } = useQuery();

  const { setFilters, filters } = useSearchFilterStore((state) => state);

  useFilterShowsAndEvents(latitude as string, longitude as string);

  const [t, i18n] = useTranslation('events');

  const clearFiltersText = t('clearFilters', 'Clear filters');
  const filtersText = t('filters', 'Filters');
  const priceText = t('price', 'Price');
  const distanceText = t('distance', 'Distance');
  const seatsText = t('seats', 'Seats');

  const getCounter = (): number => {
    let list: string[] = [];
    if (
      filters.minPrice > initialFilters.minPrice ||
      filters.maxPrice < initialFilters.maxPrice
    ) {
      list.push('price');
    } else {
      list = list.filter((e) => e !== 'price');
    }

    if (
      filters.minSeats > initialFilters.minSeats ||
      filters.maxSeats < initialFilters.maxSeats
    ) {
      list.push('seats');
    } else {
      list = list.filter((e) => e !== 'seats');
    }
    if (
      filters.minDistance > initialFilters.minDistance ||
      filters.maxDistance < initialFilters.maxDistance
    ) {
      list.push('distance');
    } else {
      list = list.filter((e) => e !== 'distance');
    }
    return list.length;
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
  };

  const FilterHeader = () => (
    <FilterContainer>
      <section className="flex items-center justify-between relative">
        <p className="text-lg font-semibold text-dark-1000">
          <button
            onClick={resultAmount ? onClose : undefined}
            className="hover:bg-primary-800 hover:text-white hover:border-white flex flex-row items-center px-2 py-1 border-2 rounded-3xl text-xs border-primary-1000 text-primary-1000 pl-[10px] pb-[12px] pr-[10px] pt-[12px]"
          >
            <FiltersIcon />
            <span className="ml-2">{filtersText}</span>
          </button>
          <section className="absolute left-16 -top-3">
            <div className="w-6 h-6 bg-primary-1000 rounded-full flex justify-center items-center">
              <span className="text-white font-light text-xs">
                {getCounter()}
              </span>
            </div>
          </section>
        </p>
        <section className="flex items-center">
          <button
            className="font-semibold underline capitalize text-primary-1000 text-xs"
            onClick={handleClearFilters}
          >
            {clearFiltersText}
          </button>
          {isMobile && (
            <button className="ml-2" onClick={handleHideFilters}>
              <Close />
            </button>
          )}
        </section>
      </section>
    </FilterContainer>
  );

  const setFiltersStore = (filter: string, value: string) => {
    setFilters({ ...filters, [filter]: value });
  };

  return (
    <section className="h-full pr-4">
      <FilterHeader />
      <Divider className="my-6" />
      <FilterCollapseTitle title={priceText}>
        <PriceRangeFilter
          minValue={Number(filters.minPrice)}
          maxValue={Number(filters.maxPrice)}
          onChangeMinPrice={(value: string) =>
            setFiltersStore('minPrice', value.toString())
          }
          onChangeMaxPrice={(value: string) =>
            setFiltersStore('maxPrice', value.toString())
          }
          setMinValue={(value) => setFiltersStore('minPrice', value.toString())}
          setMaxValue={(value) => setFiltersStore('maxPrice', value.toString())}
        />
      </FilterCollapseTitle>
      <Divider className="my-6" />
      <FilterCollapseTitle title={distanceText}>
        <DistanceFilter
          minValue={filters.minDistance}
          maxValue={filters.maxDistance}
          value={filters.maxDistance}
          onChangeDistance={(value: string) =>
            setFiltersStore('maxDistance', value.toString())
          }
          onChangeMinDistance={(value: string) =>
            setFiltersStore('minDistance', value.toString())
          }
          onChangeMaxDistance={(value: string) =>
            setFiltersStore('maxDistance', value.toString())
          }
        />
      </FilterCollapseTitle>
      <Divider className="my-6" />
      <FilterCollapseTitle title={seatsText}>
        <SeatsFilter
          minValue={Number(filters.minSeats)}
          maxValue={Number(filters.maxSeats)}
          value={Number(filters.maxSeats)}
          onChangeMaxSeats={(value: string) =>
            setFiltersStore('maxSeats', value.toString())
          }
          onChangeMinSeats={(value: string) =>
            setFiltersStore('minSeats', value.toString())
          }
          onChangeSeats={(value: string) =>
            setFiltersStore('maxSeats', value.toString())
          }
          setMaxValue={(value) => setFiltersStore('maxSeats', value.toString())}
          setMinValue={(value) => setFiltersStore('minSeats', value.toString())}
        />
      </FilterCollapseTitle>
      <section className="text-center lg:hidden">
        <Button
          onClick={handleHideFilters}
          value={'Apply Filters'}
          size="w-60 h-11 text-base leading-[18px]"
          className="mt-4 mb-12"
        />
      </section>
    </section>
  );
};

export default ShowAndEventsFilterFormDesktop;
