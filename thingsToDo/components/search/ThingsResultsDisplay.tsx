// Libraries
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// models
import { CategoryOption } from 'types/search/SearchTypeOptions';
// components
import ResultCard from './ResultCard/ResultCard';
// mocks
import { thingToDo } from '../../mocks/thingToDoMock';
import ThingsCancellable from './ThingsCancellable/ThingsCancellable';
import PriceDisplay from '../PriceDisplay/PriceDisplay';
import SearchViewSelectorFixed from 'components/global/SearchViewSelector/SearchViewSelectorFixed';
import { THINGS_CATEGORY } from 'thingsToDo';

interface ThingsResultsDisplayProps {
  ThingsCategory: CategoryOption;
}

const ThingsResultsDisplay = ({
  ThingsCategory,
}: ThingsResultsDisplayProps) => {
  const [t, i18next] = useTranslation('things');
  const thingsToDoLabel = t('thingsToDo', 'Things to Do');

  const resultsMock = [thingToDo];

  const urlDetail = () => {
    return `/detail/${THINGS_CATEGORY}/1`;
  };

  const ThingsToDoList = () => {
    return (
      <ul>
        {resultsMock.map((thingToDo) => {
          const {
            id,
            name,
            address,
            reviews: { rating, amount: reviewsAmount },
            phone_number: phoneNumber,
            tags,
            images,
            cancellation_policy: cancellationPolicy,
            rates,
          } = thingToDo;
          const formattedLocation = `${address?.address1}, ${address?.country_code}, ${address?.postal_code}`;

          const url = urlDetail();
          return (
            <div key={id}>
              <ResultCard
                url={url}
                icon={ThingsCategory.icon}
                categoryName={thingsToDoLabel}
                item={thingToDo}
                title={name}
                images={images}
                address={formattedLocation}
                className=" flex-0-0-auto"
                rating={rating}
                reviewsAmount={reviewsAmount}
                phoneNumber={phoneNumber}
                tags={tags}
                cancellable={
                  <ThingsCancellable cancellationPolicy={cancellationPolicy} />
                }
                priceDisplay={
                  <PriceDisplay
                    rate={rates}
                    totalLabel={`USD ${rates.total.formatted}`}
                  />
                }
              />
            </div>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="pt-6 px-4">
      <ThingsToDoList />
      <SearchViewSelectorFixed />
    </div>
  );
};

export default ThingsResultsDisplay;
